/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '@/assets/lanyard/card.glb';
import lanyard from '@/assets/lanyard/lanyard.png';
import owlSurfLogo from '@/assets/logo-main.jpg';
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

const drawRoundImage = (ctx, image, x, y, size) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(image, x, y, size, size);
  ctx.restore();
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
        dpr={[0.75, isMobile ? 0.9 : 1]}
        gl={{ alpha: transparent, antialias: false, powerPreference: 'high-performance' }}
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
  const { nodes, materials } = useGLTF(cardGLB);
  const fallbackBandTexture = useTexture(lanyard);
  const [bandTexture, setBandTexture] = useState(null);
  const [cardTexture, setCardTexture] = useState(null);
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
    let generatedCard;

    const buildTextures = async () => {
      const [logoImage, avatarImage] = await Promise.all([
        loadImage(owlSurfLogo),
        person?.avatar ? loadImage(person.avatar) : loadImage(owlSurfLogo),
      ]);

      if (cancelled) return;

      const bandCanvas = document.createElement('canvas');
      bandCanvas.width = 1024;
      bandCanvas.height = 250;
      const bandCtx = bandCanvas.getContext('2d');
      const bandGradient = bandCtx.createLinearGradient(0, 0, bandCanvas.width, 0);
      bandGradient.addColorStop(0, '#071012');
      bandGradient.addColorStop(0.5, '#4bc2c2');
      bandGradient.addColorStop(1, '#071012');
      bandCtx.fillStyle = bandGradient;
      bandCtx.fillRect(0, 0, bandCanvas.width, bandCanvas.height);
      bandCtx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      bandCtx.fillRect(0, 88, bandCanvas.width, 74);
      bandCtx.font = '900 44px Montserrat, Arial, sans-serif';
      bandCtx.textAlign = 'center';
      bandCtx.textBaseline = 'middle';
      bandCtx.fillStyle = '#061112';

      for (let x = 68; x < bandCanvas.width + 160; x += 210) {
        drawRoundImage(bandCtx, logoImage, x - 42, 41, 84);
        bandCtx.fillText('OWLSURF', x + 92, 126);
      }

      generatedBand = new THREE.CanvasTexture(bandCanvas);
      generatedBand.wrapS = THREE.RepeatWrapping;
      generatedBand.wrapT = THREE.RepeatWrapping;
      generatedBand.colorSpace = THREE.SRGBColorSpace;
      setBandTexture(generatedBand);

      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = 720;
      cardCanvas.height = 1010;
      const ctx = cardCanvas.getContext('2d');
      ctx.fillStyle = '#07090d';
      ctx.fillRect(0, 0, 720, 1010);

      const avatarSize = 560;
      const avatarX = 80;
      const avatarY = 245;
      ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

      generatedCard = new THREE.CanvasTexture(cardCanvas);
      generatedCard.flipY = false;
      generatedCard.colorSpace = THREE.SRGBColorSpace;
      generatedCard.anisotropy = 8;
      setCardTexture(generatedCard);
    };

    buildTextures().catch(() => {
      if (!cancelled) {
        setBandTexture(null);
        setCardTexture(null);
      }
    });

    return () => {
      cancelled = true;
      generatedBand?.dispose();
      generatedCard?.dispose();
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
  fallbackBandTexture.wrapS = fallbackBandTexture.wrapT = THREE.RepeatWrapping;
  const activeBandTexture = bandTexture || fallbackBandTexture;
  const activeCardTexture = cardTexture || null;

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
              {activeCardTexture ? (
                <meshPhysicalMaterial
                  color="#ffffff"
                  map={activeCardTexture}
                  map-anisotropy={8}
                  clearcoat={0}
                  roughness={0.9}
                  metalness={0.08}
                  transparent={false}
                />
              ) : (
                <meshPhysicalMaterial
                  color="#07090d"
                  clearcoat={0}
                  roughness={0.9}
                  metalness={0.08}
                  transparent={false}
                />
              )}
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={activeBandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
useTexture.preload(lanyard);
