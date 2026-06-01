import { lazy, Suspense, useEffect, useState } from "react";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";

const HeroCanvas = lazy(() => import("../components/HeroCanvas"));

const Hero = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const show = () => setShowCanvas(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(show, { timeout: 1000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(show, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="flex min-h-screen items-start justify-center overflow-hidden c-space md:justify-start">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        {showCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </figure>
    </section>
  );
};

export default Hero;
