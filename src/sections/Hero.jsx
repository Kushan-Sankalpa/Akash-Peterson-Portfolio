import { lazy, Suspense, useEffect, useState } from "react";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";

/* eslint-disable react/prop-types */

const HeroCanvas = lazy(() => import("../components/HeroCanvas"));

const Hero = ({ onSceneProgress, onSceneReady }) => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    let secondFrameId;
    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => setShowCanvas(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      if (secondFrameId) window.cancelAnimationFrame(secondFrameId);
    };
  }, []);

  return (
    <section
      className="flex min-h-screen scroll-mt-24 items-start justify-center overflow-hidden c-space md:justify-start"
      id="home"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        {showCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas
              onProgress={onSceneProgress}
              onReady={onSceneReady}
            />
          </Suspense>
        )}
      </figure>
    </section>
  );
};

export default Hero;
