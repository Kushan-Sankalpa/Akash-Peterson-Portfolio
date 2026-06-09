import { useCallback, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
// import ExpertiseStack from "./sections/ExpertiseStack";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import LoadingCover from "./components/LoadingCover";

const App = () => {
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [canLoadPortfolioMedia, setCanLoadPortfolioMedia] = useState(false);

  const handleSceneProgress = useCallback((progress) => {
    setSceneProgress(Math.min(progress, 94));
  }, []);

  const handleSceneReady = useCallback(() => {
    setSceneProgress(100);
    setIsSceneReady(true);
  }, []);

  return (
    <>
      <LoadingCover
        progress={sceneProgress}
        isReady={isSceneReady}
        onHidden={() => setCanLoadPortfolioMedia(true)}
      />
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <Hero
          onSceneProgress={handleSceneProgress}
          onSceneReady={handleSceneReady}
        />
        <About />
        {/* <ExpertiseStack /> */}
        <Projects canLoadMedia={canLoadPortfolioMedia} />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer/>
      </div>
    </>
  );
};

export default App;
