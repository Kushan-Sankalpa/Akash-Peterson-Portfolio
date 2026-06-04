"use client";

/* eslint-disable react/prop-types */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="c-space section-spacing" id="experience" ref={containerRef}>
      <div className="border-b border-white/10 pb-6">
        <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
          04 / Experience
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-heading text-white">My Work Experience</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              A hands-on creative journey across design, photography, print
              production and social media communication.
            </p>
          </div>
          <p className="text-xs tracking-[0.3em] text-white/35 uppercase">
            Since 2018
          </p>
        </div>
      </div>

      <div ref={contentRef} className="relative mt-8 pb-8 sm:mt-12 sm:pb-14">
        {data.map((item, index) => (
          <article
            key={`${item.job}-${item.date}`}
            className="relative grid grid-cols-1 gap-3 pb-7 pl-9 sm:gap-4 sm:pb-9 sm:pl-12 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <div className="absolute left-0 top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-lavender/60 bg-midnight sm:h-5 sm:w-5">
              <div className="h-1.5 w-1.5 rounded-full bg-lavender sm:h-2 sm:w-2" />
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-lavender uppercase">
                {item.date}
              </p>
              <p className="mt-2 text-xs tracking-[0.2em] text-white/30 uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <p className="text-xs tracking-[0.22em] text-white/40 uppercase">
                {item.title}
              </p>
              <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">
                {item.job}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/55">
                {item.description}
              </p>
              <ul className="mt-5 space-y-3">
                {item.contents.map((content) => (
                  <li
                    key={content}
                    className="flex gap-3 text-sm leading-6 text-white/70"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender/80" />
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-[7px] top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-700 to-transparent sm:left-[9px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-lavender/70 to-transparent"
          />
        </div>
      </div>
    </section>
  );
};
