import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Visual", "Timeless"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative z-10 w-full pt-24 sm:pt-28 md:pt-36 lg:pt-40">
      <div className="c-space w-full">
        <div className="max-w-5xl text-left">
          {/* Desktop / Tablet View */}
          <div className="hidden flex-col items-start md:flex">
            <motion.p
              className="mb-4 text-lg font-medium tracking-wide text-neutral-400 lg:text-xl"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              Hi, I&apos;m a Visual Creator
            </motion.p>

            <motion.h1
              className="max-w-4xl text-5xl font-semibold leading-tight text-neutral-200 lg:text-6xl xl:text-7xl"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              Graphic Designer & Photographer
            </motion.h1>

            <motion.div
              className="mt-3"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              <FlipWords
                words={words}
                className="text-6xl font-black leading-none text-white lg:text-8xl xl:text-9xl"
              />
            </motion.div>

            <motion.p
              className="mt-5 max-w-2xl text-2xl font-medium leading-snug text-neutral-300 lg:text-3xl"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8 }}
            >
              Designs & captured moments.
            </motion.p>
          </div>

          {/* Mobile View */}
          <div className="flex flex-col items-start text-left md:hidden">
            <motion.p
              className="mb-3 text-base font-medium tracking-wide text-neutral-400 sm:text-lg"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              Hi, I&apos;m a Visual Creator
            </motion.p>

            <motion.h1
              className="max-w-sm text-4xl font-semibold leading-tight text-neutral-200 sm:max-w-xl sm:text-5xl"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              Graphic Designer & Photographer
            </motion.h1>

            <motion.div
              className="mt-3"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              <FlipWords
                words={words}
                className="text-5xl font-black leading-none text-white sm:text-6xl"
              />
            </motion.div>

            <motion.p
              className="mt-4 max-w-sm text-2xl font-medium leading-snug text-neutral-300 sm:text-3xl"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8 }}
            >
              Designs & moments.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroText;