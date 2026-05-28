// ProjectDetails.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription = [],
  image,
  gallery = [],
  tags = [],
  href = "",
  closeModal,
}) => {
  // Fallback: if no gallery provided, use the single image
  const images = useMemo(() => (gallery && gallery.length ? gallery : [image]), [gallery, image]);
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const goPrev = () => setIdx((i) => (i - 1 + total) % total);
  const goNext = () => setIdx((i) => (i + 1) % total);
  const goTo = (i) => setIdx(i);

  // Close on ESC, navigate with ← →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal?.();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, total]);

  // Close when clicking backdrop
  const dialogRef = useRef(null);
  const onBackdrop = (e) => {
    if (e.target === dialogRef.current) closeModal?.();
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
      className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-sm"
      onMouseDown={onBackdrop}
    >
      <motion.div
        className="relative max-w-3xl w-[92vw] md:w-[820px] border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-md top-4 right-4 bg-black/50 hover:bg-black/70 transition"
          aria-label="Close"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="close" />
        </button>

        {/* GALLERY */}
        <div className="relative bg-black/20">
          <img
            key={images[idx]} // force fade when src changes
            src={images[idx]}
            alt={`${title} — ${idx + 1}/${total}`}
            className="w-full max-h-[62vh] object-cover md:object-contain transition-opacity duration-300"
            style={{ aspectRatio: "16 / 9" }}
            draggable={false}
          />

          {total > 1 && (
            <>
              {/* nav arrows */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Previous image"
              >
                <img src="assets/chevron-left.svg" className="w-5 h-5" alt="" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Next image"
              >
                <img src="assets/chevron-right.svg" className="w-5 h-5" alt="" />
              </button>

              {/* counter */}
              <div className="absolute bottom-3 right-3 text-xs md:text-sm px-2 py-1 rounded bg-black/60 text-white">
                {idx + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* body */}
        <div className="p-5 md:p-6">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 text-neutral-300">{description}</p>

          {/* bullets */}
          {Array.isArray(subDescription) && subDescription.length > 0 && (
            <ul className="mb-4 list-disc list-inside text-neutral-300 space-y-1">
              {subDescription.map((line, i) => (
                <li key={i} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          )}

          {/* tag logos + link */}
          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex flex-wrap gap-3">
              {Array.isArray(tags) &&
                tags.map((tag) => (
                  <img
                    key={tag.id}
                    src={tag.path}
                    alt={tag.name}
                    title={tag.name}
                    className="rounded-lg size-9 md:size-10 hover:opacity-90"
                  />
                ))}
            </div>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-white/90 hover:text-white"
              >
                View Project
                <img src="assets/arrow-up.svg" className="size-4" alt="" />
              </a>
            ) : (
              <span className="text-white/50 text-sm">No external link</span>
            )}
          </div>

          {/* thumbnails */}
          {total > 1 && (
            <div className="mt-5 grid grid-cols-5 md:grid-cols-6 gap-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => goTo(i)}
                  className={`relative rounded-lg overflow-hidden border ${
                    i === idx ? "border-white/80" : "border-white/10 hover:border-white/30"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <img src={src} alt="" className="h-16 w-full object-cover" />
                  {i === idx && (
                    <span className="absolute inset-0 ring-2 ring-white/80 rounded-lg pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
