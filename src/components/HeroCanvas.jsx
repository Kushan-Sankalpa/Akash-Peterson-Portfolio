import { Suspense, useEffect } from "react";
import { Float, useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Astronaut } from "./Astronaut";
import Loader from "./Loader";

/* eslint-disable react/prop-types */

const SceneReady = ({ onReady }) => {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
};

const HeroCanvas = ({ onProgress, onReady }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { progress } = useProgress();

  useEffect(() => {
    onProgress(progress);
  }, [onProgress, progress]);

  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <Suspense fallback={<Loader />}>
        <Float>
          <Astronaut
            scale={isMobile && 0.23}
            position={isMobile && [0, -1.5, 0]}
          />
        </Float>
        <Rig />
        <SceneReady onReady={onReady} />
      </Suspense>
    </Canvas>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default HeroCanvas;
