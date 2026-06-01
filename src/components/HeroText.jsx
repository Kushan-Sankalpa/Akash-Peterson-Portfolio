import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Visual", "Timeless"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative z-10 w-full pt-20 sm:pt-28 md:pt-36 lg:pt-40">
      <div className="w-full max-w-5xl text-left">
        <div className="flex flex-col items-start text-left">
          <motion.p
            className="mb-2 text-sm font-medium tracking-wide text-neutral-400 sm:mb-3 sm:text-lg md:mb-4 lg:text-xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            Hi, I&apos;m a Visual Creator
          </motion.p>

          <motion.h1
            className="max-w-xs text-3xl font-semibold leading-tight text-neutral-200 sm:max-w-xl sm:text-5xl md:max-w-4xl lg:text-6xl xl:text-7xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Graphic Designer & Photographer
          </motion.h1>

          <motion.div
            className="mt-2 sm:mt-4"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="text-4xl font-black leading-none text-white sm:text-6xl lg:text-8xl xl:text-9xl"
            />
          </motion.div>

          <motion.p
            className="mt-3 max-w-xs text-xl font-medium leading-snug text-neutral-300 sm:mt-4 sm:max-w-sm sm:text-3xl md:mt-5 md:max-w-2xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Designs & captured moments.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroText;
