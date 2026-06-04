/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '@/assets/lanyard/card.glb';
import owlSurfLogo from '@/assets/logo-main.webp';
import owlIcon from '@/assets/owl-icon.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const BAND_TEXTURE_SCALE = 4;
const BAND_TEXTURE_WIDTH = 2048 * BAND_TEXTURE_SCALE;
const BAND_TEXTURE_HEIGHT = 512 * BAND_TEXTURE_SCALE;
const BAND_LOGO_SIZE = 392;

const drawRoundImage = (ctx, image, x, y, size) => {
  const sourceSize = Math.min(image.naturalWidth || image.width, image.naturalHeight || image.height);
  const sourceX = ((image.naturalWidth || image.width) - sourceSize) / 2;
  const sourceY = ((image.naturalHeight || image.height) - sourceSize) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, x, y, size, size);
  ctx.restore();
};

const drawCenteredText = (ctx, text, x, y, maxWidth, fontSize, weight = 800) => {
  ctx.font = `${weight} ${fontSize}px Montserrat, Arial, sans-serif`;
  let width = ctx.measureText(text).width;
  while (width > maxWidth && fontSize > 26) {
    fontSize -= 2;
    ctx.font = `${weight} ${fontSize}px Montserrat, Arial, sans-serif`;
    width = ctx.measureText(text).width;
  }
  ctx.fillText(text, x, y);
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  className = '',
  person,
  startOffset = 0,
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`lanyard-wrapper ${className}`}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.25 : 2]}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={2.2} />
        <directionalLight intensity={2.6} position={[3, 4, 8]} />
        <directionalLight intensity={1.2} position={[-4, 2, 4]} />
        <pointLight intensity={1.4} position={[0, -2, 5]} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} person={person} startOffset={startOffset} />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, person, startOffset = 0 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes } = useGLTF(cardGLB);
  const [bandTexture, setBandTexture] = useState(null);
  const [badgeTexture, setBadgeTexture] = useState(null);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, dragged]);

  useEffect(() => {
    let cancelled = false;
    let generatedBand;
    let generatedBadge;

    const buildTextures = async () => {
      const [logoImage, avatarImage] = await Promise.all([
        loadImage(owlIcon),
        loadImage(person?.avatar || owlSurfLogo),
      ]);

      if (cancelled) return;

      const bandCanvas = document.createElement('canvas');
      bandCanvas.width = BAND_TEXTURE_WIDTH;
      bandCanvas.height = BAND_TEXTURE_HEIGHT;
      const bandCtx = bandCanvas.getContext('2d');
      bandCtx.imageSmoothingEnabled = true;
      bandCtx.imageSmoothingQuality = 'high';

      bandCtx.fillStyle = '#030506';
      bandCtx.fillRect(0, 0, bandCanvas.width, bandCanvas.height);

      for (let x = 256 * BAND_TEXTURE_SCALE; x < bandCanvas.width + 640 * BAND_TEXTURE_SCALE; x += 640 * BAND_TEXTURE_SCALE) {
        drawRoundImage(
          bandCtx,
          logoImage,
          x - (BAND_LOGO_SIZE / 2) * BAND_TEXTURE_SCALE,
          ((512 - BAND_LOGO_SIZE) / 2) * BAND_TEXTURE_SCALE,
          BAND_LOGO_SIZE * BAND_TEXTURE_SCALE
        );
      }

      generatedBand = new THREE.CanvasTexture(bandCanvas);
      generatedBand.wrapS = THREE.RepeatWrapping;
      generatedBand.wrapT = THREE.RepeatWrapping;
      generatedBand.colorSpace = THREE.SRGBColorSpace;
      generatedBand.anisotropy = 8;
      generatedBand.generateMipmaps = false;
      generatedBand.minFilter = THREE.LinearFilter;
      generatedBand.magFilter = THREE.NearestFilter;
      setBandTexture(generatedBand);

      const badgeCanvas = document.createElement('canvas');
      badgeCanvas.width = 1024;
      badgeCanvas.height = 1024;
      const ctx = badgeCanvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, 1024, 1024);

      const avatarGlow = ctx.createRadialGradient(512, 430, 40, 512, 430, 420);
      avatarGlow.addColorStop(0, 'rgba(75, 194, 194, 0.3)');
      avatarGlow.addColorStop(1, 'rgba(75, 194, 194, 0)');
      ctx.fillStyle = avatarGlow;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.fillStyle = 'rgba(3, 10, 12, 0.82)';
      ctx.beginPath();
      ctx.roundRect(126, 104, 772, 812, 84);
      ctx.fill();
      ctx.strokeStyle = 'rgba(75, 194, 194, 0.42)';
      ctx.lineWidth = 10;
      ctx.stroke();

      const avatarSize = 520;
      const avatarX = 252;
      const avatarY = 164;
      ctx.save();
      ctx.shadowColor = 'rgba(75, 194, 194, 0.42)';
      ctx.shadowBlur = 28;
      ctx.fillStyle = '#061012';
      ctx.beginPath();
      ctx.arc(512, avatarY + avatarSize / 2, avatarSize / 2 + 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      drawRoundImage(ctx, avatarImage, avatarX, avatarY, avatarSize);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(512, avatarY + avatarSize / 2, avatarSize / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(75, 194, 194, 0.82)';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(512, avatarY + avatarSize / 2, avatarSize / 2 + 22, -0.22 * Math.PI, 1.12 * Math.PI);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#4bc2c2';
      drawCenteredText(ctx, (person?.title || 'Digital strategy').toUpperCase(), 512, 780, 650, 58, 900);

      generatedBadge = new THREE.CanvasTexture(badgeCanvas);
      generatedBadge.colorSpace = THREE.SRGBColorSpace;
      generatedBadge.anisotropy = 8;
      generatedBadge.minFilter = THREE.LinearMipmapLinearFilter;
      generatedBadge.magFilter = THREE.LinearFilter;
      setBadgeTexture(generatedBadge);
    };

    buildTextures().catch(() => {
      if (!cancelled) {
        setBandTexture(null);
        setBadgeTexture(null);
      }
    });

    return () => {
      cancelled = true;
      generatedBand?.dispose();
      generatedBadge?.dispose();
    };
  }, [person?.avatar, person?.name, person?.title]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (!fixed.current) return;

    [j1, j2].forEach(ref => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
      ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = 'chordal';
  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5 + startOffset * 0.12, startOffset * 0.18, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1 + startOffset * 0.16, -startOffset * 0.12, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5 - startOffset * 0.1, startOffset * 0.1, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2 + startOffset * 0.18, startOffset * 0.26, 0]} rotation={[0, startOffset * 0.16, startOffset * 0.1]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshBasicMaterial
                color="#082023"
              />
            </mesh>
            {badgeTexture && (
              <mesh position={[0, 0.57, 0.016]}>
                <planeGeometry args={[0.72, 0.72]} />
                <meshBasicMaterial
                  color="#ffffff"
                  map={badgeTexture}
                  transparent
                  alphaTest={0.05}
                  depthTest={false}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial color="#4bc2c2" roughness={0.34} metalness={0.72} clearcoat={0.35} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial color="#4bc2c2" roughness={0.34} metalness={0.72} clearcoat={0.35} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        {bandTexture ? (
          <meshLineMaterial
            color="#ffffff"
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            useMap
            map={bandTexture}
            repeat={[-4, 1]}
            lineWidth={1.38}
          />
        ) : (
          <meshLineMaterial
            color="#030506"
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            lineWidth={1.38}
          />
        )}
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
