import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  type Mesh,
  type ShaderMaterial,
} from "three";

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

function EnergyRings({
  bead,
  wrap,
}: {
  bead: RefObject<HTMLSpanElement | null>;
  wrap: RefObject<HTMLDivElement | null>;
}) {
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const comet = useRef<Mesh>(null);
  const matA = useRef<ShaderMaterial>(null);
  const matB = useRef<ShaderMaterial>(null);

  const sparkPos = useMemo(() => {
    const n = 80;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * 0.72;
      arr[i * 3 + 1] = Math.sin(a) * 0.72;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (matA.current) matA.current.uniforms.uTime.value = t;
    if (matB.current) matB.current.uniforms.uTime.value = t * 0.7;
    if (ringA.current) ringA.current.rotation.z += 0.35 * d;
    if (ringB.current) ringB.current.rotation.z -= 0.22 * d;
    const head = t * Math.PI;
    const x = Math.cos(head) * 0.72;
    const y = Math.sin(head) * 0.72;
    if (comet.current) {
      comet.current.position.set(x, y, 0.04);
      const pulse = 0.9 + 0.2 * Math.sin(t * 8);
      comet.current.scale.setScalar(pulse);
    }
    const el = bead.current;
    const box = wrap.current;
    if (el && box) {
      const px = box.clientWidth * 0.46;
      el.style.transform = `translate3d(${Math.cos(head) * px}px, ${Math.sin(head) * px}px, 0)`;
    }
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.03, 14, 96]} />
        <shaderMaterial
          ref={matA}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uA: { value: new Color(0x0a66ff) },
            uB: { value: new Color(0xff4a12) },
          }}
          vertexShader={FLOW_VERT}
          fragmentShader={FLOW_FRAG}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.018, 10, 80]} />
        <shaderMaterial
          ref={matB}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uA: { value: new Color(0x1ad0ff) },
            uB: { value: new Color(0x4d7cff) },
          }}
          vertexShader={FLOW_VERT}
          fragmentShader={FLOW_FRAG}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={0xb8f0ff}
          size={0.035}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </points>
      <mesh ref={comet}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={0xffffff}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function EnergyHaloCanvas({
  bead,
  wrap,
}: {
  bead: RefObject<HTMLSpanElement | null>;
  wrap: RefObject<HTMLDivElement | null>;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas
      className="absolute inset-0 size-full"
      orthographic
      frameloop="always"
      camera={{ position: [0, 0, 3], zoom: 140 }}
      dpr={1}
      gl={{
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      }}
      style={{ pointerEvents: "none" }}
    >
      <EnergyRings bead={bead} wrap={wrap} />
    </Canvas>
  );
}
