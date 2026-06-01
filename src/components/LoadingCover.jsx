import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */

const LoadingCover = ({ isReady, progress }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const displayProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const status = isReady
    ? "Visual experience ready"
    : displayProgress > 1
      ? "Loading 3D experience"
      : "Preparing visual experience";

  useEffect(() => {
    if (!isReady) return undefined;

    setIsLeaving(true);
    const timeoutId = window.setTimeout(() => setIsVisible(false), 850);
    return () => window.clearTimeout(timeoutId);
  }, [isReady]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`loading-cover fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-primary px-6 ${
        isLeaving ? "loading-cover--leaving" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`${status}: ${displayProgress}%`}
    >
      <div className="loading-cover-grid absolute inset-0 opacity-55" />
      <div className="loading-cover-glow absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/15 blur-3xl sm:h-[36rem] sm:w-[36rem]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <p className="text-[0.65rem] font-medium tracking-[0.5em] text-white/45 uppercase sm:text-xs">
          Visual Portfolio
        </p>

        <div className="relative mt-10 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="loading-orbit absolute inset-0 rounded-full border border-lavender/45" />
          <div className="loading-orbit loading-orbit--reverse absolute inset-4 rounded-full border border-dashed border-white/25" />
          <div className="loading-pulse absolute inset-9 rounded-full bg-lavender/15 blur-xl" />
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.045] text-2xl font-semibold tracking-[0.12em] text-white shadow-[0_0_45px_rgba(122,87,219,0.35)] sm:h-24 sm:w-24 sm:text-3xl">
            AP
          </div>
        </div>

        <h1 className="mt-9 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Akash Peterson
        </h1>
        <p className="mt-2 text-sm tracking-[0.12em] text-white/55 uppercase sm:text-base">
          Graphic Designer & Photographer
        </p>

        <div className="mt-10 w-full">
          <div className="flex items-center justify-between gap-5 text-[0.65rem] font-medium tracking-[0.22em] text-white/45 uppercase">
            <span>{status}</span>
            <span className="text-white/80">{displayProgress}%</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="loading-progress h-full rounded-full bg-gradient-to-r from-royal via-lavender to-aqua"
              style={{ width: `${Math.max(displayProgress, 4)}%` }}
            />
          </div>
        </div>

        <p className="mt-6 text-xs leading-5 text-white/35">
          Loading the interactive 3D scene and preparing the portfolio.
        </p>
      </div>
    </div>
  );
};

export default LoadingCover;
