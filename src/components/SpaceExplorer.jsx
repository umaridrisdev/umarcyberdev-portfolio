import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { X, Compass, Rocket, Shield, Info, Zap, Volume2, VolumeX, Eye, Navigation, Target, RotateCcw, ArrowRight, Sparkles, MapPin, Award, Cpu } from 'lucide-react';

// ─── OUTPOST & CELESTIAL DATA ───────────────────────────────────────────────
const CELESTIAL_DESTINATIONS = [
  {
    id: 'apoxyl-hub',
    name: 'Apoxyl Cyber Orbital Hub',
    category: 'HEADQUARTERS & ENTREPRENEURSHIP',
    badge: '🚀 APOXYLTECH HEADQUARTERS',
    color: '#06b6d4',
    pos: { x: 0, y: 20, z: -160 },
    radius: 16,
    type: 'station',
    description: 'The flagship cyber station founded by Umar Idris Abubakar in Bauchi State, Nigeria. Serves as the central command node for digital innovation, youth tech empowerment, and full-stack software architecture.',
    techs: ['Software Architecture', 'Digital Identity Verification', 'Youth Tech Incubator', 'Mentorship Labs']
  },
  {
    id: 'earth',
    name: 'Earth Homeworld Station',
    category: 'PRIMARY LOCATION',
    badge: '🌍 EARTH BASE (BAUCHI, NIGERIA)',
    color: '#3b82f6',
    pos: { x: -140, y: -20, z: -320 },
    radius: 42,
    type: 'planet',
    description: 'Home base of Umar Idris Abubakar in Bauchi State, Nigeria. Core operational node for software development, client projects, and ICT infrastructure.',
    techs: ['Bauchi State, Nigeria', 'CompTIA Security+', 'Python & JavaScript', 'Full-Stack Web']
  },
  {
    id: 'moon-base',
    name: 'Security+ Lunar Defense Outpost',
    category: 'CYBERSECURITY & HARDENING',
    badge: '🛡️ COMPTIA CERTIFIED BASE',
    color: '#38bdf8',
    pos: { x: -60, y: 35, z: -360 },
    radius: 14,
    type: 'moon',
    description: 'Fortified defensive station operating NIST SP 800-53 threat defense frameworks, SOC incident response monitoring, packet inspection, and vulnerability scanning.',
    techs: ['CompTIA Security+ (SY0-701)', 'NIST Frameworks', 'Cisco Ethical Hacking', 'Wireshark & Nmap']
  },
  {
    id: 'vortex-core',
    name: 'Accretion Vortex Singularity Core',
    category: 'DEEP SPACE COSMOS',
    badge: '🌌 COSMIC VORTEX CORE',
    color: '#38bdf8',
    pos: { x: 120, y: 150, z: -680 },
    radius: 65,
    type: 'vortex',
    description: 'A breathtaking cosmic vortex black hole singularity with spiraling electric cyan plasma accretion disks, intense gravitational light bending, and high-energy particle swirls.',
    techs: ['Cosmic Plasma Dynamics', 'Event Horizon Shaders', 'Quantum Singularity Physics']
  },
  {
    id: 'saturn-ring',
    name: 'Saturn Quantum Computing Hub',
    category: 'DEEP SPACE RESEARCH',
    badge: '🪐 SATURN QUANTUM SECTOR',
    color: '#eab308',
    pos: { x: -420, y: 110, z: -720 },
    radius: 58,
    type: 'planet',
    hasRings: true,
    description: 'Deep space sector symbolizing Umar’s unlimited technological ambition, quantum computing explorations, and scalable system engineering.',
    techs: ['Quantum Computing Concepts', 'Infinite Scalability', 'Advanced System Security']
  },
  {
    id: 'mars-lab',
    name: 'AI & Vision Autonomous Research Base',
    category: 'ARTIFICIAL INTELLIGENCE',
    badge: '🤖 AI & COMPUTER VISION',
    color: '#ef4444',
    pos: { x: 320, y: -70, z: -520 },
    radius: 26,
    type: 'planet',
    description: 'AI research dome housing KdexSmArt Facial Recognition Attendance Systems and AI-Powered Student Admission Management Platforms.',
    techs: ['Python', 'OpenCV / Computer Vision', 'React', 'Node.js', 'PostgreSQL', 'SQLite']
  },
  {
    id: 'jupiter-station',
    name: 'Power Learn Project Scholar Colony',
    category: 'SCHOLARSHIP & SOCIAL IMPACT',
    badge: '⚡ PLP SCHOLAR SECTOR',
    color: '#a855f7',
    pos: { x: -280, y: -120, z: -480 },
    radius: 50,
    type: 'planet',
    description: 'Full-stack software engineering scholarship base focused on building scalable, real-world digital applications for social impact across Africa.',
    techs: ['Full-Stack Web', 'Database Systems', 'Agile Engineering', 'Tech for Impact']
  }
];

// ─── HELPER: PROCEDURAL HIGH-RES TEXTURE GENERATORS ───────────────────────
function createPlanetTexture(colorHex, detailHex, type = 'earth') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (type === 'earth') {
    ctx.fillStyle = detailHex;
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const rx = 50 + Math.random() * 140;
      const ry = 40 + Math.random() * 90;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'saturn' || type === 'jupiter') {
    ctx.globalAlpha = 0.45;
    for (let y = 0; y < canvas.height; y += 10) {
      ctx.fillStyle = y % 20 === 0 ? detailHex : '#ffffff';
      ctx.fillRect(0, y, canvas.width, 6 + Math.sin(y * 0.12) * 4);
    }
    ctx.globalAlpha = 1.0;
  } else if (type === 'moon' || type === 'mars') {
    ctx.fillStyle = detailHex;
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 3 + Math.random() * 28;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// ─── ACCRETION DISK PLASMA VORTEX TEXTURE ──────────────────────────────────
function createAccretionVortexTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const cx = 512;
  const cy = 512;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 1024);

  // Concentric spiraling energy rings
  for (let r = 480; r > 60; r -= 4) {
    const norm = r / 480;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);

    let col = `rgba(6, 182, 212, ${0.8 - norm * 0.7})`;
    if (r > 380) col = `rgba(59, 130, 246, ${0.6 - norm * 0.5})`;
    if (r < 180) col = `rgba(245, 158, 11, ${0.9 - norm * 0.4})`;

    ctx.strokeStyle = col;
    ctx.lineWidth = 3.5;
    ctx.stroke();
  }

  // Spiral swirl filaments
  for (let i = 0; i < 180; i++) {
    const angle = i * 0.2;
    const dist = 80 + i * 2.2;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * dist * 0.4, cy + Math.sin(angle) * dist * 0.4, dist * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(251, 191, 36, 0.12)';
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  // Central event horizon black hole mask
  const maskGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
  maskGrad.addColorStop(0, 'rgba(0,0,0,1)');
  maskGrad.addColorStop(0.7, 'rgba(0,0,0,0.95)');
  maskGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = maskGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 95, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createSaturnRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(234, 179, 8, 0)');
  grad.addColorStop(0.2, 'rgba(234, 179, 8, 0.8)');
  grad.addColorStop(0.5, 'rgba(202, 138, 4, 0.95)');
  grad.addColorStop(0.8, 'rgba(161, 98, 7, 0.6)');
  grad.addColorStop(1, 'rgba(234, 179, 8, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ─── MAIN 3D VR SPACE EXPLORER COMPONENT ───────────────────────────────────
export default function SpaceExplorer({ isOpen, onClose }) {
  const mountRef = useRef(null);
  const audioContextRef = useRef(null);

  // States
  const [activeDestination, setActiveDestination] = useState(CELESTIAL_DESTINATIONS[3]); // Vortex Core default
  const [isVrStereoMode, setIsVrStereoMode] = useState(false);
  const [showIntelCard, setShowIntelCard] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [telemetry, setTelemetry] = useState({ x: 0, y: 20, z: 0, pitch: 0, yaw: 0, speed: 'NORMAL' });
  const [crosshairLocked, setCrosshairLocked] = useState(null);

  // Internal 3D Refs
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    starsMesh: null,
    starPositions: null,
    vortexRingMesh: null,
    vortexParticlesMesh: null,
    vortexParticlePositions: null,
    celestialMeshes: [],
    camPos: new THREE.Vector3(0, 20, 0),
    targetPos: new THREE.Vector3(0, 20, -160),
    rotation: { pitch: 0, yaw: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    keys: {},
    warpProgress: 0,
    warpTarget: null,
  });

  // Audio Sound Generator
  const playSoundEffect = useCallback((type) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'warp') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }, [isMuted]);

  // ── INIT THREE.JS 3D SCENE ────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060e, 0.0006);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 3000);
    camera.position.set(0, 20, 0);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 3. Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x93c5fd, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    mainLight.position.set(200, 300, -400);
    scene.add(mainLight);

    const vortexLight = new THREE.PointLight(0x06b6d4, 3.5, 900);
    vortexLight.position.set(120, 150, -680);
    scene.add(vortexLight);

    // 4. Procedural 3D Starfield & Lens Flare Cross Stars (4,500 particles)
    const starCount = 4500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 700 + Math.random() * 1100;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const col = new THREE.Color().setHSL(0.55 + Math.random() * 0.25, 0.9, 0.7 + Math.random() * 0.3);
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });
    const starsMesh = new THREE.Points(starGeo, starMat);
    scene.add(starsMesh);

    // 5. GIANT TILTED ACCRETION VORTEX DISK (The Core Attraction)
    const vortexGroup = new THREE.Group();
    vortexGroup.position.set(120, 150, -680);

    // Vortex Accretion Plane
    const vortexTex = createAccretionVortexTexture();
    const vortexGeo = new THREE.PlaneGeometry(650, 650, 128, 128);
    const vortexMat = new THREE.MeshBasicMaterial({
      map: vortexTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
    });
    const vortexMesh = new THREE.Mesh(vortexGeo, vortexMat);
    vortexMesh.rotation.x = Math.PI / 2.6;
    vortexMesh.rotation.z = Math.PI / 6;
    vortexGroup.add(vortexMesh);

    // Black Hole Singularity Core Sphere
    const coreGeo = new THREE.SphereGeometry(65, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    vortexGroup.add(coreMesh);

    // Event Horizon Glowing Cyan Rim
    const horizonGeo = new THREE.SphereGeometry(72, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    vortexGroup.add(horizonMesh);

    // Swirling Vortex Particle Accretion Disk (4,000 Spiral Particles)
    const vortexParticleCount = 4000;
    const vParticleGeo = new THREE.BufferGeometry();
    const vParticlePos = new Float32Array(vortexParticleCount * 3);
    const vParticleColors = new Float32Array(vortexParticleCount * 3);

    for (let i = 0; i < vortexParticleCount; i++) {
      const radius = 70 + Math.random() * 260;
      const angle = Math.random() * Math.PI * 2;
      const heightOffset = (Math.random() - 0.5) * 20;

      vParticlePos[i * 3] = Math.cos(angle) * radius;
      vParticlePos[i * 3 + 1] = heightOffset;
      vParticlePos[i * 3 + 2] = Math.sin(angle) * radius;

      const col = new THREE.Color().setHSL(0.52 + Math.random() * 0.15, 0.95, 0.6 + Math.random() * 0.4);
      vParticleColors[i * 3] = col.r;
      vParticleColors[i * 3 + 1] = col.g;
      vParticleColors[i * 3 + 2] = col.b;
    }

    vParticleGeo.setAttribute('position', new THREE.BufferAttribute(vParticlePos, 3));
    vParticleGeo.setAttribute('color', new THREE.BufferAttribute(vParticleColors, 3));

    const vParticleMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const vortexParticlesMesh = new THREE.Points(vParticleGeo, vParticleMat);
    vortexParticlesMesh.rotation.x = Math.PI / 2.6;
    vortexParticlesMesh.rotation.z = Math.PI / 6;
    vortexGroup.add(vortexParticlesMesh);

    scene.add(vortexGroup);

    // 6. Create 3D Celestial Objects
    const celestialMeshes = [];

    CELESTIAL_DESTINATIONS.forEach((data) => {
      if (data.type === 'vortex') {
        celestialMeshes.push({ mesh: vortexGroup, data });
        return;
      }

      const group = new THREE.Group();
      group.position.set(data.pos.x, data.pos.y, data.pos.z);

      if (data.type === 'station') {
        // Apoxyl Cyber Station 3D Structure
        const coreGeo = new THREE.OctahedronGeometry(data.radius, 2);
        const coreMat = new THREE.MeshPhongMaterial({
          color: 0x06b6d4,
          emissive: 0x083344,
          wireframe: true,
          shininess: 100,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);

        // Ring outer array
        const ringGeo = new THREE.TorusGeometry(data.radius * 1.8, 1.4, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 3;
        group.add(ring);

        // Point light core
        const pointLight = new THREE.PointLight(0x06b6d4, 2.5, 120);
        group.add(pointLight);
      } else {
        // Spherical Planet
        let texType = 'earth';
        let detailCol = '#1e3a8a';
        if (data.id === 'earth') { texType = 'earth'; detailCol = '#15803d'; }
        else if (data.id === 'saturn-ring') { texType = 'saturn'; detailCol = '#ca8a04'; }
        else if (data.id === 'mars-lab') { texType = 'mars'; detailCol = '#7f1d1d'; }
        else if (data.id === 'jupiter-station') { texType = 'jupiter'; detailCol = '#581c87'; }
        else if (data.id === 'moon-base') { texType = 'moon'; detailCol = '#334155'; }

        const planetTex = createPlanetTexture(data.color, detailCol, texType);
        const sphereGeo = new THREE.SphereGeometry(data.radius, 64, 64);
        const sphereMat = new THREE.MeshStandardMaterial({
          map: planetTex,
          roughness: 0.55,
          metalness: 0.25,
        });
        const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
        group.add(planetMesh);

        // Atmosphere Shell Glow
        const atmoGeo = new THREE.SphereGeometry(data.radius * 1.06, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(data.color),
          transparent: true,
          opacity: 0.22,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
        });
        const atmo = new THREE.Mesh(atmoGeo, atmoMat);
        group.add(atmo);

        // Saturn Rings
        if (data.hasRings) {
          const ringGeo = new THREE.RingGeometry(data.radius * 1.4, data.radius * 2.4, 64);
          const ringTex = createSaturnRingTexture();
          const ringMat = new THREE.MeshBasicMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.88,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2.3;
          group.add(ringMesh);
        }
      }

      scene.add(group);
      celestialMeshes.push({ mesh: group, data });
    });

    // Store in internal ref
    const s = stateRef.current;
    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.starsMesh = starsMesh;
    s.starPositions = starPositions;
    s.vortexRingMesh = vortexMesh;
    s.vortexParticlesMesh = vortexParticlesMesh;
    s.vortexParticlePositions = vParticlePos;
    s.celestialMeshes = celestialMeshes;

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Mouse & Drag Handlers
    const onMouseDown = (e) => {
      s.isDragging = true;
      s.dragStart = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!s.isDragging) return;
      const dx = e.clientX - s.dragStart.x;
      const dy = e.clientY - s.dragStart.y;
      s.dragStart = { x: e.clientX, y: e.clientY };

      s.rotation.yaw -= dx * 0.003;
      s.rotation.pitch -= dy * 0.003;
      s.rotation.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, s.rotation.pitch));
    };

    const onMouseUp = () => { s.isDragging = false; };

    const onKeyDown = (e) => { s.keys[e.key] = true; };
    const onKeyUp = (e) => { s.keys[e.key] = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // 9. 60 FPS Render Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate Accretion Vortex Disk & Celestial Bodies
      if (vortexMesh) vortexMesh.rotation.z += 0.004;
      if (vortexParticlesMesh) vortexParticlesMesh.rotation.z += 0.008;

      celestialMeshes.forEach(({ mesh, data }) => {
        mesh.rotation.y += (data.type === 'station' ? 0.015 : 0.005);
      });

      // Process Keyboard Flight Movement
      const moveSpeed = 50 * delta;
      const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(s.rotation.pitch, s.rotation.yaw, 0, 'YXZ'));
      const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(s.rotation.pitch, s.rotation.yaw, 0, 'YXZ'));

      if (s.keys['w'] || s.keys['W'] || s.keys['ArrowUp']) s.camPos.addScaledVector(forward, moveSpeed);
      if (s.keys['s'] || s.keys['S'] || s.keys['ArrowDown']) s.camPos.addScaledVector(forward, -moveSpeed);
      if (s.keys['a'] || s.keys['A'] || s.keys['ArrowLeft']) s.camPos.addScaledVector(right, -moveSpeed);
      if (s.keys['d'] || s.keys['D'] || s.keys['ArrowRight']) s.camPos.addScaledVector(right, moveSpeed);

      // Handle Hyperspace Warp Drive Jump Transition
      if (s.warpTarget) {
        s.warpProgress += delta * 0.8;
        s.camPos.lerp(s.warpTarget, 0.05);

        // Stretch Starfield along movement vector for Warp Streak Effect
        const posAttr = starsMesh.geometry.attributes.position;
        for (let i = 0; i < starCount; i++) {
          posAttr.array[i * 3 + 2] += 15.0;
          if (posAttr.array[i * 3 + 2] > 700) posAttr.array[i * 3 + 2] = -700;
        }
        posAttr.needsUpdate = true;

        if (s.camPos.distanceTo(s.warpTarget) < 45 || s.warpProgress >= 1.0) {
          s.warpTarget = null;
          s.warpProgress = 0;
          setIsWarping(false);
        }
      }

      // Update Camera Position & Rotation
      camera.position.copy(s.camPos);
      camera.rotation.set(s.rotation.pitch, s.rotation.yaw, 0, 'YXZ');

      // Update HUD Telemetry State
      setTelemetry({
        x: Math.round(s.camPos.x),
        y: Math.round(s.camPos.y),
        z: Math.round(s.camPos.z),
        pitch: (s.rotation.pitch * (180 / Math.PI)).toFixed(1),
        yaw: (s.rotation.yaw * (180 / Math.PI)).toFixed(1),
        speed: s.warpTarget ? 'WARP 9.8' : 'IMPULSE 1.0'
      });

      // Target Crosshair Lock Check
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(celestialMeshes.map(c => c.mesh), true);

      if (intersects.length > 0) {
        let hitObj = intersects[0].object;
        while (hitObj.parent && !hitObj.parent.isScene && hitObj.parent !== scene) {
          hitObj = hitObj.parent;
        }
        const found = celestialMeshes.find(c => c.mesh === hitObj);
        if (found) setCrosshairLocked(found.data);
      } else {
        setCrosshairLocked(null);
      }

      // Render: Single Camera or Stereoscopic VR Dual Eye Split-Screen Mode
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;

      if (isVrStereoMode) {
        renderer.setScissorTest(true);

        // Left Eye Viewport
        renderer.setViewport(0, 0, w / 2, h);
        renderer.setScissor(0, 0, w / 2, h);
        camera.position.x = s.camPos.x - 0.8;
        renderer.render(scene, camera);

        // Right Eye Viewport
        renderer.setViewport(w / 2, 0, w / 2, h);
        renderer.setScissor(w / 2, 0, w / 2, h);
        camera.position.x = s.camPos.x + 0.8;
        renderer.render(scene, camera);

        renderer.setScissorTest(false);
      } else {
        renderer.setViewport(0, 0, w, h);
        renderer.render(scene, camera);
      }
    };

    animate();

    // Clean up Three.js instance
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen, isVrStereoMode]);

  // ── TRIGGER HYPERSPACE WARP JUMP ──────────────────────────────────────────
  const triggerWarpJump = (dest) => {
    setActiveDestination(dest);
    playSoundEffect('warp');
    setIsWarping(true);

    const s = stateRef.current;
    // Position camera just outside target radius
    const targetOffset = new THREE.Vector3(dest.pos.x, dest.pos.y + 12, dest.pos.z + dest.radius * 2.6);
    s.warpTarget = targetOffset;
    s.warpProgress = 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#04060e] text-slate-100 font-mono select-none overflow-hidden animate-in fade-in duration-500">
      
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* VR Cockpit Visor HUD Frame Overlay (Curved Cyber Visor) */}
      <div className="absolute inset-0 z-10 pointer-events-none border-[12px] sm:border-[20px] border-slate-950/80 rounded-[40px] sm:rounded-[60px] shadow-[inset_0_0_90px_rgba(6,182,212,0.3)] flex flex-col justify-between p-4 sm:p-6">
        
        {/* TOP TELEMETRY HUD BAR */}
        <div className="flex items-center justify-between bg-slate-950/80 border border-cyan-500/40 rounded-2xl px-4 py-2.5 backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30 flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white tracking-wider text-xs sm:text-sm flex items-center gap-2">
                APOXYL 3D HYPER-REALISTIC COSMIC VORTEX SPACE SIMULATOR
                {isVrStereoMode && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-extrabold animate-pulse">
                    🕶️ VR HEADSET STEREO MODE ACTIVE
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-cyan-400/90 hidden sm:block">Swirling Accretion Plasma Vortex • 3D Planetary Orbits • Real-Time Spatial Flight</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Target Intel Card Toggle */}
            <button
              onClick={() => {
                setShowIntelCard(!showIntelCard);
                playSoundEffect('click');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                showIntelCard
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400'
              }`}
              title="Toggle Target Intel Card Overlay"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">{showIntelCard ? 'Hide Intel' : 'Target Intel'}</span>
            </button>

            {/* Audio Hum Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect('click');
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
              title="Toggle Audio Effects"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
            </button>

            {/* Toggle VR Dual Eye Mode */}
            <button
              onClick={() => {
                setIsVrStereoMode(!isVrStereoMode);
                playSoundEffect('click');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                isVrStereoMode
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse'
                  : 'bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50'
              }`}
              title="Toggle VR Dual-Eye Split Screen View for Mobile VR Headsets"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{isVrStereoMode ? 'Exit VR Mode' : 'VR Headset View'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/60 transition-colors"
              title="Close Space Explorer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER TARGET RETICLE & WARP ANIMATION OVERLAY */}
        <div className="relative flex-1 flex items-center justify-center pointer-events-none">
          
          {/* Central Target Crosshair */}
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-cyan-500/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/80" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/80" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-cyan-400/80" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-cyan-400/80" />
          </div>

          {/* Crosshair Lock Toast Notification */}
          {crosshairLocked && (
            <div className="absolute bottom-12 p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/60 text-center space-y-1 shadow-2xl backdrop-blur-md animate-in zoom-in-95 duration-200">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <Target className="w-3.5 h-3.5 animate-spin" /> Target Lock Acquired
              </span>
              <p className="text-sm font-extrabold text-white">{crosshairLocked.name}</p>
              <p className="text-[10px] text-slate-400">{crosshairLocked.badge}</p>
            </div>
          )}

          {/* Warp Drive Active Screen Banner */}
          {isWarping && (
            <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 animate-pulse">
              <Zap className="w-12 h-12 text-cyan-400 animate-bounce" />
              <h2 className="text-2xl font-extrabold text-white tracking-widest uppercase">HYPERSPACE WARP DRIVE ENGAGED</h2>
              <p className="text-xs text-cyan-300">Accelerating to target coordinates: {activeDestination.name}</p>
            </div>
          )}

        </div>

        {/* BOTTOM CONTROLS & FLIGHT NAVIGATION BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pointer-events-auto">
          
          {/* Left HUD Column: Live Flight Telemetry */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" /> FLIGHT TELEMETRY
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400 text-[10px] font-bold">
                {telemetry.speed}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-[11px] text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[9px] text-slate-500">X-POS</p>
                <p className="text-white font-bold">{telemetry.x}</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[9px] text-slate-500">Y-POS</p>
                <p className="text-white font-bold">{telemetry.y}</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[9px] text-slate-500">Z-POS</p>
                <p className="text-white font-bold">{telemetry.z}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              ⌨️ WASD / Arrow Keys: Fly | 🖱 Drag: Look | 🕶 VR Mode: Headset View
            </p>
          </div>

          {/* Center/Right HUD Column: Celestial Destinations Selector */}
          <div className="lg:col-span-8 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Select 3D Destination to Warp
              </span>
              <span className="text-[10px] text-cyan-400">Click any destination to launch Hyperspace Jump</span>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {CELESTIAL_DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => triggerWarpJump(dest)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl border text-xs text-left transition-all font-mono ${
                    activeDestination.id === dest.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dest.color }} />
                    {dest.name}
                  </p>
                  <p className="text-[9px] text-slate-400 truncate max-w-[140px]">{dest.badge}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* INTEL CARD MODAL FOR SELECTED DESTINATION */}
      {showIntelCard && activeDestination && (
        <div className="absolute top-20 right-6 z-20 w-80 sm:w-96 p-5 rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl space-y-4 font-sans animate-in slide-in-from-right-5 duration-300 pointer-events-auto">
          
          <div className="flex items-start justify-between border-b border-slate-800 pb-3 font-mono">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">
                {activeDestination.badge}
              </span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{activeDestination.category}</p>
            </div>
            <button
              onClick={() => setShowIntelCard(false)}
              className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Intel Card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-sans">{activeDestination.name}</h3>
            <p className="text-xs font-mono text-cyan-400">
              Coordinates: X:{activeDestination.pos.x} | Y:{activeDestination.pos.y} | Z:{activeDestination.pos.z}
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 font-sans">
            {activeDestination.description}
          </p>

          <div className="space-y-2 font-mono text-xs">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Deployed Security & Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {activeDestination.techs.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => triggerWarpJump(activeDestination)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-extrabold font-mono text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
          >
            <Rocket className="w-4 h-4 text-slate-950 animate-bounce" />
            <span>ENGAGE WARP DRIVE TO DESTINATION</span>
          </button>

        </div>
      )}

    </div>
  );
}
