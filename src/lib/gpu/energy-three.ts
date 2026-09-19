import * as THREE from "three";

const VIEW = 320;

const FLOW_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FLOW_FRAG = `
uniform float uTime;
uniform vec3 uA;
uniform vec3 uB;
varying vec2 vUv;
void main() {
  float t = fract(vUv.x - uTime * 0.45);
  float head = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.18, 0.42, t));
  float body = 0.28 + 0.22 * sin(vUv.x * 40.0 + uTime * 8.0);
  vec3 col = mix(uA, uB, 0.5 + 0.5 * sin(vUv.x * 6.28318 + uTime * 0.9));
  col = mix(col, vec3(0.95, 0.98, 1.0), head);
  float a = min(1.0, body + head);
  gl_FragColor = vec4(col * a, a);
}
`;

export type EnergyRingGpu = {
  frame: (timeSec: number, dt: number) => number;
  destroy: () => void;
};

function flowMat(a: THREE.Color, b: THREE.Color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uA: { value: a },
      uB: { value: b },
    },
    vertexShader: FLOW_VERT,
    fragmentShader: FLOW_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
}

export function createEnergyThree(canvas: HTMLCanvasElement): EnergyRingGpu | null {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
    premultipliedAlpha: true,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(VIEW, VIEW, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1.15, 1.15, 1.15, -1.15, 0.1, 8);
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  const ringA = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.03, 14, 96),
    flowMat(new THREE.Color(0x0a66ff), new THREE.Color(0xff4a12)),
  );
  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.018, 10, 80),
    flowMat(new THREE.Color(0x1ad0ff), new THREE.Color(0x4d7cff)),
  );
  ringA.rotation.x = Math.PI / 2;
  ringB.rotation.x = Math.PI / 2;

  const sparkCount = 80;
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i++) {
    const a = (i / sparkCount) * Math.PI * 2;
    sparkPos[i * 3] = Math.cos(a) * 0.72;
    sparkPos[i * 3 + 1] = Math.sin(a) * 0.72;
    sparkPos[i * 3 + 2] = 0;
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      color: 0xb8f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  );

  const comet = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );

  const group = new THREE.Group();
  group.add(ringA, ringB, sparks, comet);
  scene.add(group);

  const mats = [ringA.material, ringB.material] as THREE.ShaderMaterial[];
  let alive = true;

  return {
    frame(timeSec: number) {
      if (!alive) return 0;
      const t = timeSec;
      mats[0].uniforms.uTime.value = t;
      mats[1].uniforms.uTime.value = t * 0.7;
      ringA.rotation.z = t * 0.35;
      ringB.rotation.z = -t * 0.22;
      const head = t * Math.PI;
      comet.position.set(Math.cos(head) * 0.72, Math.sin(head) * 0.72, 0.04);
      const pulse = 0.9 + 0.2 * Math.sin(t * 8);
      comet.scale.setScalar(pulse);
      renderer.render(scene, camera);
      return head;
    },
    destroy() {
      alive = false;
      renderer.setAnimationLoop(null);
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      sparkGeo.dispose();
      comet.geometry.dispose();
      mats[0].dispose();
      mats[1].dispose();
      (sparks.material as THREE.Material).dispose();
      (comet.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}
