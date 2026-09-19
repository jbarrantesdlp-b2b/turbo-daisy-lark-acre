const VIEW = 320;
const COUNT = 192;
const WG = 64;
const H = 0.11;
const MASS = 0.018;
const RHO0 = 1.0;
const STIFF = 2.8;
const VISC = 0.12;
const RING_R = 0.72;

export const FLOW = {
  core: 2.8,
  tongues: 4.2,
  color: 7.0,
} as const;

const COLOR_W = ((Math.PI * 2) / FLOW.color).toFixed(4);

const COMPUTE = /* wgsl */ `
const COUNT: u32 = ${COUNT}u;
const H: f32 = ${H};
const H2: f32 = ${H * H};
const MASS: f32 = ${MASS};
const RHO0: f32 = ${RHO0};
const STIFF: f32 = ${STIFF};
const VISC: f32 = ${VISC};
const RING: f32 = ${RING_R};
const POLY6: f32 = 4.0 / (3.14159265 * H2 * H2 * H2 * H);
const SPIKY: f32 = -10.0 / (3.14159265 * H2 * H2 * H);
const VISC_LAP: f32 = 40.0 / (3.14159265 * H2 * H2 * H);

struct Particle {
  pos: vec2f,
  vel: vec2f,
  rho: f32,
  _p: f32,
}
struct Params { dt: f32, time: f32, _a: f32, _b: f32, }

@group(0) @binding(0) var<storage, read> src: array<Particle>;
@group(0) @binding(1) var<storage, read_write> dst: array<Particle>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${WG})
fn density(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= COUNT) { return; }
  let pi = src[i];
  var rho = 0.0;
  for (var j = 0u; j < COUNT; j++) {
    let d = pi.pos - src[j].pos;
    let d2 = dot(d, d);
    if (d2 < H2) {
      let u = H2 - d2;
      rho += MASS * POLY6 * u * u * u;
    }
  }
  var o = pi;
  o.rho = max(rho, 0.08);
  dst[i] = o;
}

@compute @workgroup_size(${WG})
fn integrate(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= COUNT) { return; }
  let pi = src[i];
  let pr_i = STIFF * (pi.rho - RHO0);
  var f = vec2f(0.0);
  for (var j = 0u; j < COUNT; j++) {
    if (j == i) { continue; }
    let pj = src[j];
    var r = pi.pos - pj.pos;
    var d2 = dot(r, r);
    if (d2 >= H2 || d2 < 1.0e-8) { continue; }
    let d = sqrt(d2);
    r /= d;
    let pr_j = STIFF * (pj.rho - RHO0);
    let w = H - d;
    f -= r * MASS * (pr_i + pr_j) / (2.0 * pj.rho) * SPIKY * w * w;
    f += VISC * MASS * (pj.vel - pi.vel) / pj.rho * VISC_LAP * w;
  }
  let rad = length(pi.pos);
  let nrm = pi.pos / max(rad, 0.04);
  f += nrm * (RING - rad) * 6.5;
  let tang = vec2f(-nrm.y, nrm.x);
  let head = params.time * 3.14159265;
  let ang = atan2(pi.pos.y, pi.pos.x);
  let da = atan2(sin(ang - head), cos(ang - head));
  let pulse = max(0.0, 1.0 - abs(da) * 1.7);
  f += tang * (0.55 + 2.4 * pulse * pulse);
  var vel = (pi.vel + f * params.dt) * 0.978;
  var pos = pi.pos + vel * params.dt;
  var o = pi;
  o.pos = pos;
  o.vel = vel;
  dst[i] = o;
}
`;

const RENDER = /* wgsl */ `
struct Particle {
  pos: vec2f,
  vel: vec2f,
  rho: f32,
  _p: f32,
}
struct Params { dt: f32, time: f32, _a: f32, _b: f32, }
@group(0) @binding(0) var<storage, read> particles: array<Particle>;
@group(0) @binding(1) var<uniform> params: Params;

struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f,
  @location(1) tint: f32,
  @location(2) dens: f32,
}

@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VSOut {
  let p = particles[iid];
  let local = vec2f(f32(vid & 1u) * 2.0 - 1.0, f32(vid >> 1u) * 2.0 - 1.0);
  let spd = length(p.vel);
  var dir = p.vel / max(spd, 0.04);
  if (spd < 0.04) { dir = vec2f(-p.pos.y, p.pos.x) / max(length(p.pos), 0.04); }
  let side = vec2f(-dir.y, dir.x);
  let ang = atan2(p.pos.y, p.pos.x);
  let head = params.time * 3.14159265;
  let da = atan2(sin(ang - head), cos(ang - head));
  let pulse = max(0.0, 1.0 - abs(da) * 1.7);
  let len = 0.05 + spd * 0.08 + pulse * 0.05;
  let wid = 0.032 + pulse * 0.02;
  let world = p.pos + dir * local.x * len + side * local.y * wid;
  let tint = 0.5 + 0.5 * sin(ang + params.time * ${COLOR_W});
  return VSOut(vec4f(world, 0.0, 1.0), local, tint, clamp(p.rho, 0.2, 2.0) + pulse);
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4f {
  let t = max(0.0, 1.0 - dot(in.local, in.local));
  let g = t * t;
  var col = mix(vec3f(0.08, 0.45, 1.0), vec3f(0.85, 0.96, 1.0), g);
  col = mix(col, vec3f(1.0, 0.36, 0.07), (1.0 - in.tint) * 0.5);
  let a = g * (0.45 + in.dens * 0.28);
  return vec4f(col * a, a);
}
`;

export type EnergyRingGpu = {
  frame: (timeSec: number, dt: number) => number;
  destroy: () => void;
};

function seed() {
  const data = new Float32Array(COUNT * 6);
  for (let i = 0; i < COUNT; i++) {
    const a = (i / COUNT) * Math.PI * 2 + (i % 3) * 0.01;
    const r = RING_R + ((i % 5) - 2) * 0.008;
    const o = i * 6;
    data[o] = Math.cos(a) * r;
    data[o + 1] = Math.sin(a) * r;
    data[o + 2] = -Math.sin(a) * 0.35;
    data[o + 3] = Math.cos(a) * 0.35;
    data[o + 4] = RHO0;
    data[o + 5] = 0;
  }
  return data;
}

export async function createEnergyRingGpu(
  canvas: HTMLCanvasElement,
): Promise<EnergyRingGpu | null> {
  const gpu = navigator.gpu;
  if (!gpu) return null;
  const adapter = await gpu.requestAdapter({ powerPreference: "low-power" });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext("webgpu");
  if (!ctx) {
    device.destroy();
    return null;
  }

  canvas.width = VIEW;
  canvas.height = VIEW;
  const format = gpu.getPreferredCanvasFormat();
  ctx.configure({ device, format, alphaMode: "premultiplied" });

  const bytes = COUNT * 24;
  const bufA = device.createBuffer({
    size: bytes,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const bufB = device.createBuffer({
    size: bytes,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(bufA, 0, seed());

  const uniformBuf = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  device.pushErrorScope("validation");
  const csMod = device.createShaderModule({ code: COMPUTE });
  const fsMod = device.createShaderModule({ code: RENDER });
  const densPipe = device.createComputePipeline({
    layout: "auto",
    compute: { module: csMod, entryPoint: "density" },
  });
  const intPipe = device.createComputePipeline({
    layout: "auto",
    compute: { module: csMod, entryPoint: "integrate" },
  });
  const renderPipe = device.createRenderPipeline({
    layout: "auto",
    vertex: { module: fsMod, entryPoint: "vs" },
    fragment: {
      module: fsMod,
      entryPoint: "fs",
      targets: [
        {
          format,
          blend: {
            color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
            alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
          },
        },
      ],
    },
    primitive: { topology: "triangle-strip" },
  });
  const err = await device.popErrorScope();
  if (err) {
    device.destroy();
    return null;
  }

  const gx = Math.ceil(COUNT / WG);
  const densAB = device.createBindGroup({
    layout: densPipe.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: bufA } },
      { binding: 1, resource: { buffer: bufB } },
      { binding: 2, resource: { buffer: uniformBuf } },
    ],
  });
  const intBA = device.createBindGroup({
    layout: intPipe.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: bufB } },
      { binding: 1, resource: { buffer: bufA } },
      { binding: 2, resource: { buffer: uniformBuf } },
    ],
  });
  const renderBind = device.createBindGroup({
    layout: renderPipe.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: bufA } },
      { binding: 1, resource: { buffer: uniformBuf } },
    ],
  });

  const uniforms = new Float32Array(4);
  let alive = true;

  return {
    frame(timeSec: number, dt: number) {
      if (!alive) return 0;
      uniforms[0] = Math.min(0.02, Math.max(0.008, dt || 0.016));
      uniforms[1] = timeSec;
      device.queue.writeBuffer(uniformBuf, 0, uniforms);
      const enc = device.createCommandEncoder();

      const d = enc.beginComputePass();
      d.setPipeline(densPipe);
      d.setBindGroup(0, densAB);
      d.dispatchWorkgroups(gx);
      d.end();

      const it = enc.beginComputePass();
      it.setPipeline(intPipe);
      it.setBindGroup(0, intBA);
      it.dispatchWorkgroups(gx);
      it.end();

      const r = enc.beginRenderPass({
        colorAttachments: [
          {
            view: ctx.getCurrentTexture().createView(),
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
      r.setPipeline(renderPipe);
      r.setBindGroup(0, renderBind);
      r.draw(4, COUNT);
      r.end();
      device.queue.submit([enc.finish()]);
      return (timeSec * Math.PI * 2) / FLOW.core;
    },
    destroy() {
      alive = false;
      bufA.destroy();
      bufB.destroy();
      uniformBuf.destroy();
      device.destroy();
    },
  };
}
