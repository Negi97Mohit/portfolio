// src/components/PortfolioScene.js

import React, {
    useRef, useState, useEffect, useCallback, useMemo,
    forwardRef, useImperativeHandle
} from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei'; 
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

import EarthTexture from '../assets/earth_texture.jpg';
import WindowPlaceholderTexture_fallback from '../assets/panel_placeholder.jpg'; 

// IMPORTANT: Path to your GLOBAL background image
// Ensure this path is correct and the image is in your assets folder.
import YourBackgroundImage from '../assets/background_image.jpg'; 

// --- Background Component (for global scene background) ---
function Background() {
  const { scene } = useThree(); 
  const texture = useLoader(THREE.TextureLoader, YourBackgroundImage); 

  useEffect(() => {
    if (texture) {
      scene.background = texture;
    }
    return () => {
      scene.background = null; 
    };
  }, [scene, texture]);

  return null; 
}


// --- Internal Globe Component ---
function GlobeMesh({ onClick }) {
  const texture = useLoader(THREE.TextureLoader, EarthTexture);
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });
  return (
    <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={onClick}
        userData={{ isInteractive: true, sectionId: null }} 
        receiveShadow
        castShadow 
        renderOrder={0} 
    >
      <sphereGeometry args={[1.2, 64, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.3} 
        roughness={0.6} 
      />
    </mesh>
  );
}

// --- Internal Animated Section Window Component (Panels always face camera) ---
function AnimatedSectionWindow({
    sectionData, 
    orbitPosition,
    orbitRotation, // This will be [0,0,0] from windowTransforms for orbiting panels
    isExpanded,
    isFrontWindow,
    onClick,
    orbitGroupRef, // Prop to access the main orbiting group's ref
}) {
    const { Component: SectionComponent, id: sectionId, panelTexture: panelTexturePath } = sectionData;
    const [isHovered, setIsHovered] = useState(false);
    const windowGroupRef = useRef(); // Ref for this specific window's main animated.group
    
    const currentPanelTexture = useLoader(THREE.TextureLoader, panelTexturePath || WindowPlaceholderTexture_fallback); 

    // Using user's latest dimensions for the panels
    const planeWidth = 2;  
    const planeHeight = planeWidth * (7/6); // Approx 2.33

    const groupSpringProps = useSpring({
        position: isExpanded ? [0, 0, 3.6] : orbitPosition, 
        // When expanded, rotation is [0,0,0]. 
        // When orbiting, X and Z are 0 (from orbitRotation). Y rotation is handled by useFrame.
        // The spring's Y rotation target for orbiting state is effectively the current dynamic rotation from useFrame.
        rotation: isExpanded 
            ? [0, 0, 0] 
            : [orbitRotation[0], windowGroupRef.current?.rotation.y || 0, orbitRotation[2]],
        scale: isExpanded 
            ? [1, 1, 1] 
            : (isHovered ? [1.1, 1.1, 1] : (isFrontWindow ? [1.05, 1.05, 1] : [1, 1, 1])),
        config: { mass: 1, tension: 210, friction: 26 },
    });

    const planeSpringProps = useSpring({
        scale: isExpanded ? [1.5, 1.5, 1] : [1, 1, 1], 
        meshOpacity: isExpanded ? 0.1 : 1.0, 
        meshEmissiveIntensity: 0, 
        config: { mass: 1, tension: 210, friction: 26 },
    });

    const htmlSpringProps = useSpring({
        contentOpacity: isExpanded ? 1 : 0, 
        config: { mass: 1, tension: 170, friction: 26, delay: isExpanded ? 150 : 0 },
    });

    // useFrame hook to make the panel always face the camera when not expanded
    useFrame(({ camera }) => {
        if (windowGroupRef.current && !isExpanded && orbitGroupRef?.current) {
            const panelWorldPosition = new THREE.Vector3();
            windowGroupRef.current.getWorldPosition(panelWorldPosition);
            
            // Target camera's XZ position but at the panel's Y height to keep it upright
            const targetLookAtPosition = new THREE.Vector3(camera.position.x, panelWorldPosition.y, camera.position.z);
            
            // Create a temporary matrix to represent the lookAt rotation in world space
            const m4 = new THREE.Matrix4();
            m4.lookAt(panelWorldPosition, targetLookAtPosition, windowGroupRef.current.up); // Use panel's up vector

            // Extract the quaternion from this matrix (desired world orientation)
            const worldQuaternion = new THREE.Quaternion().setFromRotationMatrix(m4);

            // Get the inverse of the parent's (orbitGroupRef) world quaternion
            const parentWorldQuaternionInverse = new THREE.Quaternion();
            orbitGroupRef.current.getWorldQuaternion(parentWorldQuaternionInverse).invert();

            // Convert the desired world quaternion to local quaternion for the panel
            // localQuaternion = parentWorldQuaternionInverse * worldQuaternion
            const localQuaternion = parentWorldQuaternionInverse.multiply(worldQuaternion);
            
            // Apply the local quaternion to the panel's group, slerp for smoothness
            // This directly sets the orientation, overriding the Y-rotation from the spring for orbiting state.
            windowGroupRef.current.quaternion.slerp(localQuaternion, 0.1); 
        } else if (windowGroupRef.current && isExpanded) {
            // When expanded, ensure the spring-driven rotation (to [0,0,0]) is applied
            // This might be needed if slerp from useFrame doesn't fully yield to spring on expansion
            const targetRotation = groupSpringProps.rotation.get(); // Get target from spring
            windowGroupRef.current.rotation.set(targetRotation[0], targetRotation[1], targetRotation[2]);
        }
    });


    const handlePointerOver = useCallback((event) => {
        event.stopPropagation();
        if (!isExpanded) {
            setIsHovered(true);
            document.body.style.cursor = 'pointer';
        } else if (isExpanded && event.object?.parent?.userData?.sectionId === sectionId) {
            document.body.style.cursor = 'pointer';
        }
    }, [isExpanded, sectionId]);

    const handlePointerOut = useCallback(() => {
        setIsHovered(false);
        document.body.style.cursor = 'auto';
    }, []);
    
    const currentRenderOrder = isExpanded ? 10 : 1;

    return (
        <animated.group
            ref={windowGroupRef} // Assign ref to the group
            position={groupSpringProps.position}
            // For orbiting panels, X and Z rotation are 0 from orbitRotation.
            // Y rotation is controlled by the quaternion update in useFrame.
            // When expanded, the spring animates rotation to [0,0,0].
            // We set X and Z from spring, Y is handled by quaternion or spring depending on isExpanded.
            rotation-x={groupSpringProps.rotation.get()[0]} 
            rotation-z={groupSpringProps.rotation.get()[2]}
            // rotation-y is managed by the quaternion in useFrame or by spring when expanding
            scale={groupSpringProps.scale} 
            onClick={(e) => onClick(sectionId, e)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            userData={{ sectionId, isInteractive: true }}
            renderOrder={currentRenderOrder}
        >
            <animated.mesh
                scale={planeSpringProps.scale} 
                castShadow
                receiveShadow
            >
                <planeGeometry args={[planeWidth, planeHeight]} /> 
                <animated.meshStandardMaterial
                    map={currentPanelTexture} 
                    metalness={0}       
                    roughness={1}       
                    side={THREE.DoubleSide}
                    transparent={true} 
                    opacity={planeSpringProps.meshOpacity} 
                    emissive={"#000000"}      
                    emissiveIntensity={planeSpringProps.meshEmissiveIntensity} 
                />
            </animated.mesh>

            <animated.group style={{ opacity: htmlSpringProps.contentOpacity }}>
                {isExpanded && SectionComponent && (
                    <Html
                        center
                        position={[0, 0, 0.15]}  
                        transform
                        zIndexRange={[100, 0]}
                        distanceFactor={3}  
                        style={{
                            width: '600px',  
                            height: '700px', 
                            pointerEvents: 'none',
                            overflow: 'hidden' 
                        }}
                    >
                        <div
                            className="portfolio-html-content" 
                            style={{ 
                                pointerEvents: isExpanded ? 'auto' : 'none',
                                width: '100%', 
                                height: '100%',
                                overflowY: 'auto', 
                                overflowX: 'hidden'
                            }}
                        >
                            <div style={{ position: 'relative' }}> 
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClick(sectionId, e);}}
                                    className="close-button" 
                                    aria-label="Close Section"
                                    style={{ zIndex: 10 }} 
                                >
                                    &times;
                                </button>
                                <SectionComponent />
                            </div>
                        </div>
                    </Html>
                )}
            </animated.group>
        </animated.group>
    );
}


// --- Main Scene Component ---
const PortfolioScene = forwardRef(({ sections }, ref) => {
    const safeSections = Array.isArray(sections) ? sections : [];
    const numSections = safeSections.length;
    const orbitRadius = 3.6; 
    const angleStep = numSections > 0 ? (Math.PI * 2) / numSections : 0;

    const orbitGroupRef = useRef(); // This ref is passed to children
    const controlsRef = useRef();
    const currentRotationY = useRef(0);
    const [targetRotationY, setTargetRotationY] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
    const [expandedSectionId, setExpandedSectionId] = useState(null);
    const [frontWindowIndex, setFrontWindowIndex] = useState(0);
    const { clock, camera, gl } = useThree(); 

    useEffect(() => {
        camera.far = 2000; 
        camera.updateProjectionMatrix();
    }, [camera]);

    const handleWheel = useCallback((event) => {
        if (expandedSectionId === null) {
            setIsRotating(true);
            const rotationAmount = event.deltaY * 0.006;
            setTargetRotationY((prevTarget) => prevTarget + rotationAmount);
        }
    }, [expandedSectionId, setIsRotating, setTargetRotationY]); 

    const handleInteractiveClick = useCallback((sectionId, event) => {
        event?.stopPropagation();
        const currentExpanded = expandedSectionId;

        if (currentExpanded === sectionId) {
            setExpandedSectionId(null);
            setIsRotating(true);
            if (controlsRef.current) controlsRef.current.enabled = true;
        } else if (sectionId !== null) {
            setIsRotating(false);
            const snapYAngle = 0;
            setTargetRotationY(snapYAngle);
            currentRotationY.current = snapYAngle;
            if (orbitGroupRef.current) {
                orbitGroupRef.current.rotation.set(0, snapYAngle, 0);
            }
            if (controlsRef.current) {
                controlsRef.current.enabled = false;
                controlsRef.current.setAzimuthalAngle(0);
                controlsRef.current.setPolarAngle(Math.PI / 2);
                controlsRef.current.update();
            }
            setExpandedSectionId(sectionId);
        } else { 
             setExpandedSectionId(null); 
             setIsRotating(true);
             if (controlsRef.current) controlsRef.current.enabled = true;
        }
    }, [expandedSectionId, setExpandedSectionId, setIsRotating, setTargetRotationY]); 

    const handleCanvasPointerMissed = useCallback((event) => {
        if (expandedSectionId !== null) {
            setExpandedSectionId(null);
            setIsRotating(true);
            if (controlsRef.current) controlsRef.current.enabled = true;
        }
    }, [expandedSectionId, setExpandedSectionId, setIsRotating]); 

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape' && expandedSectionId !== null) { 
            event.preventDefault();
            handleInteractiveClick(expandedSectionId, event); 
        } else if (expandedSectionId === null) {
            let rotationAmount = 0;
            const keyRotationStep = numSections > 0 ? angleStep / 2 : 0.1; 
            if (event.key === 'ArrowLeft') rotationAmount = -keyRotationStep;
            else if (event.key === 'ArrowRight') rotationAmount = keyRotationStep;
            if (rotationAmount !== 0) {
                event.preventDefault(); setIsRotating(true);
                setTargetRotationY((prevTarget) => prevTarget + rotationAmount);
            }
        
            if ((event.key === 'Enter' || event.key === ' ') && numSections > 0) {
                event.preventDefault();
                const frontSectionId = safeSections[frontWindowIndex]?.id; 
                if (frontSectionId) handleInteractiveClick(frontSectionId, event); 
            }
        }
    }, [expandedSectionId, frontWindowIndex, safeSections, angleStep, numSections, handleInteractiveClick, setIsRotating, setTargetRotationY]); 

    useEffect(() => {
        const canvasParentEl = gl.domElement.parentElement; 
        if (canvasParentEl) {
             canvasParentEl.addEventListener('wheel', handleWheel, { passive: false }); 
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            if(canvasParentEl){
                canvasParentEl.removeEventListener('wheel', handleWheel);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleWheel, handleKeyDown, gl.domElement]); 

    useFrame((state, delta) => {
        let currentGroupRotation = 0; 
        if (orbitGroupRef.current) { 
            if (isRotating && expandedSectionId === null) { 
                const idleRotationSpeed = 0.06; 
                const idleRotation = clock.elapsedTime * idleRotationSpeed; 
                const lerpFactor = 0.08;
                currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, targetRotationY, lerpFactor);
                currentGroupRotation = currentRotationY.current + idleRotation; 
                orbitGroupRef.current.rotation.y = currentGroupRotation;
            } else { 
                currentGroupRotation = currentRotationY.current;
                orbitGroupRef.current.rotation.y = currentGroupRotation;
                if(expandedSectionId !== null){ 
                     orbitGroupRef.current.rotation.x = 0;
                     orbitGroupRef.current.rotation.z = 0;
                }
            }

            if (numSections > 0 && expandedSectionId === null) { 
                let minDiff = Infinity;
                let closestIdx = 0;
                const normalizedGroupRotation = (currentGroupRotation % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
                for (let i = 0; i < numSections; i++) {
                    const targetAngleForSectionToBeFront = (-(angleStep * i) % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
                    let diff = Math.abs(targetAngleForSectionToBeFront - normalizedGroupRotation);
                    diff = Math.min(diff, Math.PI * 2 - diff); 

                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = i;
                    }
                }
                if (closestIdx !== frontWindowIndex) { 
                     setFrontWindowIndex(closestIdx);
                }
            }
        }
    });

    // MODIFIED: windowTransforms now sets initial Y rotation to 0 for panels
    const windowTransforms = useMemo(() => {
        if (!Array.isArray(safeSections) || numSections === 0) return [];
        return safeSections.map((section, index) => {
            const angle = angleStep * index;
            const x = orbitRadius * Math.sin(angle);
            const z = orbitRadius * Math.cos(angle);
            const y = 0;
            // Initial local Y rotation is 0. useFrame in AnimatedSectionWindow will handle facing the camera.
            const rotationY = 0; 
            return { id: section.id, orbitPosition: [x, y, z], orbitRotation: [0, rotationY, 0] };
        });
    }, [safeSections, angleStep, orbitRadius, numSections]); 

    useImperativeHandle(ref, () => ({ handleCanvasPointerMissed }));

    const fixedCameraDistance = 10; 

    return (
        <>
            <Background />

            <ambientLight intensity={0.8} /> 
            <directionalLight
                position={[10, 15, 10]} 
                intensity={1.8}        
                castShadow
                shadow-mapSize-width={1024} 
                shadow-mapSize-height={1024}
                shadow-camera-far={50} 
                shadow-camera-left={-15} 
                shadow-camera-right={15} 
                shadow-camera-top={15} 
                shadow-camera-bottom={-15}
             />
            <pointLight position={[-8, -8, -10]} intensity={0.6} color="#ffffff" distance={50} decay={1.5}/> 
            <hemisphereLight skyColor={"#87ceeb"} groundColor={"#404040"} intensity={0.6} /> 
            
            <GlobeMesh onClick={(e) => handleInteractiveClick(null, e)} /> 

             <group ref={orbitGroupRef}> {/* orbitGroupRef is defined here */}
                {Array.isArray(safeSections) && safeSections.length > 0 && windowTransforms.length > 0 &&
                    safeSections.map((section, index) => {
                    const transform = windowTransforms.find(t => t.id === section.id);
                    if (!transform) return null; 
                    return (
                        <AnimatedSectionWindow
                            key={section.id}
                            sectionData={section} 
                            orbitPosition={transform.orbitPosition}
                            orbitRotation={transform.orbitRotation} // Will be [0,0,0] from windowTransforms
                            isExpanded={expandedSectionId === section.id}
                            isFrontWindow={index === frontWindowIndex && expandedSectionId === null}
                            onClick={handleInteractiveClick}
                            orbitGroupRef={orbitGroupRef} // Pass the orbitGroupRef here
                        />
                    );
                })}
            </group>
            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false} 
                minDistance={fixedCameraDistance} 
                maxDistance={fixedCameraDistance} 
                target={[0, 0, 0]}
                enabled={expandedSectionId === null}
                minPolarAngle={Math.PI / 2} 
                maxPolarAngle={Math.PI / 2}  
                minAzimuthAngle={-Infinity} 
                maxAzimuthAngle={Infinity}
            />
        </>
     );
});

export default PortfolioScene;
