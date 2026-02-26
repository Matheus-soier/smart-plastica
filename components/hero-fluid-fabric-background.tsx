"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;
varying vec3 vViewPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(
    permute(
      permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)
    ) +
    i.x + vec4(0.0, i1.x, i2.x, 1.0)
  );
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(
    0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
    0.0
  );
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vUv = uv;
  float t = uTime * 0.08;
  float wave1 = sin((position.x * 0.4 + position.y * 0.3) + t) * 1.5;
  float wave2 = sin((position.x * -0.2 + position.y * 0.5) - t * 0.8) * 0.8;
  float noiseVal = snoise(vec3(position.x * 0.25, position.y * 0.25, t * 0.5)) * 1.2;

  vElevation = wave1 + wave2 + noiseVal;
  vec3 newPosition = position;
  newPosition.z += vElevation;

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vViewPosition = -mvPosition.xyz;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;
varying vec3 vViewPosition;

void main() {
  vec3 colorDark = vec3(0.22, 0.09, 0.04);
  vec3 colorMid = vec3(0.45, 0.20, 0.08);
  vec3 colorLight = vec3(0.65, 0.35, 0.18);
  vec3 colorHighlight = vec3(0.82, 0.55, 0.35);

  vec3 dx = dFdx(vViewPosition);
  vec3 dy = dFdy(vViewPosition);
  vec3 normal = normalize(cross(dx, dy));

  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.5));
  vec3 viewDir = normalize(vViewPosition);
  vec3 halfVector = normalize(lightDir + viewDir);

  float diffuseLight = max(dot(normal, lightDir), 0.0);
  float specularLight = pow(max(dot(normal, halfVector), 0.0), 32.0) * 0.35;

  float h = smoothstep(-2.0, 2.0, vElevation);
  vec3 baseColor = mix(colorDark, colorMid, smoothstep(0.1, 0.4, h));
  baseColor = mix(baseColor, colorLight, smoothstep(0.4, 0.7, h));
  baseColor = mix(baseColor, colorHighlight, smoothstep(0.7, 0.95, h));

  vec3 finalColor = baseColor * (diffuseLight * 0.5 + 0.6);
  finalColor += specularLight * vec3(0.8, 0.6, 0.4);

  float threadFreq = 350.0;
  float distortion = vElevation * 0.15;
  float threads = sin((vUv.y * 3.0 + vUv.x * 2.0 + distortion) * threadFreq);
  threads = smoothstep(0.2, 1.0, threads);
  finalColor -= threads * 0.06;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

type HeroFluidFabricBackgroundProps = {
  className?: string;
};

export function HeroFluidFabricBackground({ className }: HeroFluidFabricBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f7ede4");

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = isMobile ? 5.2 : 4.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Mobile uses a lighter mesh and broader plane to keep fluidity and framing stable.
    const geometry = new THREE.PlaneGeometry(isMobile ? 20 : 18, isMobile ? 20 : 18, isMobile ? 256 : 512, isMobile ? 256 : 512);
    const uniforms = {
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });
    (material.extensions as { derivatives?: boolean }).derivatives = true;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = isMobile ? -Math.PI / 3.9 : -Math.PI / 4;
    mesh.rotation.z = isMobile ? Math.PI / 5.1 : Math.PI / 6;
    scene.add(mesh);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const compactViewport = width < 768;
      camera.fov = compactViewport ? 58 : 50;
      camera.position.z = compactViewport ? 5.2 : 4.5;
      mesh.rotation.x = compactViewport ? -Math.PI / 3.9 : -Math.PI / 4;
      mesh.rotation.z = compactViewport ? Math.PI / 5.1 : Math.PI / 6;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compactViewport ? 1.35 : 2));
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 [filter:blur(3px)] [transform:scale(1.05)] md:[filter:blur(4px)] md:[transform:scale(1.02)]",
        className,
      )}
    />
  );
}
