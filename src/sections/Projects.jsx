import { useEffect, useRef, useState } from "react";
import {
  additionalProjects,
  featuredProjects,
  photographyProjects,
} from "../constants/projects";

/* eslint-disable react/prop-types */

const categories = [
  { id: "graphic-designs", label: "Graphic Designs" },
  { id: "photography", label: "Photography" },
];

const getInitials = (title) =>
  title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const useDeferredVisibility = (enabled) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || isVisible) return undefined;

    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, isVisible]);

  return [elementRef, isVisible];
};

const SkeletonTile = () => (
  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/12 via-white/5 to-white/0" />
);

const DeferredImage = ({
  src,
  alt,
  canLoad,
  fit = "cover",
  priority = false,
  className = "",
}) => {
  const [frameRef, isVisible] = useDeferredVisibility(canLoad);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldRender = canLoad && (priority || isVisible);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div ref={frameRef} className="relative h-full w-full overflow-hidden rounded-[inherit]">
      {!isLoaded && <SkeletonTile />}
      {shouldRender ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full transition duration-500 ${
            fit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover"
          } ${isLoaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"} ${className}`}
        />
      ) : null}
    </div>
  );
};

const LogoTile = ({ project }) => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/12 to-white/5 p-5">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        project.accent || "from-aqua/15 via-lavender/10 to-transparent"
      }`}
    />
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[1.1rem] border border-white/10 bg-primary/55 p-4 text-center">
      {project.logo ? (
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          className="max-h-16 w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="text-2xl font-semibold tracking-[0.18em] text-white">
          {getInitials(project.title)}
        </span>
      )}
      <p className="mt-4 text-[0.65rem] tracking-[0.18em] text-white/55 uppercase">
        {project.actionHint}
      </p>
    </div>
  </div>
);

const GalleryVisual = ({ project, canLoadMedia, priority }) => {
  const preview = project.previews[0];

  return (
    <div className="h-full p-3">
      {preview ? (
        <div className="h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(3,4,18,0.08)]">
          <DeferredImage
            src={preview}
            alt={`${project.title} preview`}
            canLoad={canLoadMedia}
            fit="contain"
            priority={priority}
          />
        </div>
      ) : (
        <LogoTile project={project} />
      )}
    </div>
  );
};

const PdfVisual = ({ project }) => (
  <div className="relative h-full overflow-hidden rounded-[1.6rem] p-3">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        project.accent || "from-sand/25 via-orange-500/10 to-transparent"
      }`}
    />
    <div className="relative grid h-full grid-cols-[1.15fr_0.85fr] gap-2">
      <div className="flex flex-col justify-between rounded-2xl bg-white p-5 text-primary shadow-[0_18px_45px_rgba(3,4,18,0.14)]">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-primary/50 uppercase">
            PDF
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight">
            {project.title}
          </h3>
        </div>
        <p className="text-sm leading-6 text-primary/60">{project.actionHint}</p>
      </div>
      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-primary/75 p-4">
        <p className="text-[0.65rem] tracking-[0.2em] text-white/45 uppercase">
          Direct Access
        </p>
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-5">
          <p className="text-sm leading-6 text-white/75">
            Opens the final PDF directly in a new tab.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const FolderVisual = ({ project, canLoadMedia }) => (
  <div className="relative h-full overflow-hidden rounded-[1.6rem] p-3">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        project.accent || "from-aqua/15 via-lavender/10 to-transparent"
      }`}
    />
    <div className="relative grid h-full grid-cols-[1.2fr_0.8fr] gap-2">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(3,4,18,0.08)]">
        <DeferredImage
          src={project.previews[0]}
          alt={`${project.title} folder cover`}
          canLoad={canLoadMedia}
          fit="contain"
          priority
          className="p-4 sm:p-5"
        />
      </div>
      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-primary/75 p-4">
        <p className="text-[0.65rem] tracking-[0.2em] text-white/45 uppercase">
          Archive
        </p>
        <div>
          <h3 className="text-xl font-semibold text-white">Photography Folder</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Open the full Google Drive collection for photography work.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProjectVisual = ({ project, canLoadMedia, priority }) => {
  if (project.visualType === "pdf") {
    return <PdfVisual project={project} />;
  }

  if (project.visualType === "folder") {
    return <FolderVisual project={project} canLoadMedia={canLoadMedia} />;
  }

  return (
    <GalleryVisual
      project={project}
      canLoadMedia={canLoadMedia}
      priority={priority}
    />
  );
};

const ProjectCard = ({ project, index, canLoadMedia }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noreferrer"
    className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025] text-left transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]"
  >
    <div
      className={`pointer-events-none absolute inset-0 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 ${
        project.accent || "from-aqua/15 via-lavender/10 to-transparent"
      } bg-gradient-to-br`}
    />
    <div className="relative">
      <div className="aspect-[16/11] bg-gradient-to-br from-white/5 to-transparent">
        <ProjectVisual
          project={project}
          canLoadMedia={canLoadMedia}
          priority={index < 2}
        />
      </div>

      <div className="border-t border-white/10 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase">
              {project.type}
            </p>
            <h3 className="mt-2 text-xl font-medium text-white">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.6rem] tracking-[0.18em] text-white/60 uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.18em] text-lavender uppercase">
            {project.actionHint}
          </p>
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.65rem] font-medium tracking-[0.18em] text-white uppercase transition group-hover:border-white/35 group-hover:bg-white/[0.1]">
            {project.actionLabel}
          </span>
        </div>
      </div>
    </div>
  </a>
);

const Projects = ({ canLoadMedia = false }) => {
  const [category, setCategory] = useState("graphic-designs");
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? [...featuredProjects, ...additionalProjects]
    : featuredProjects;

  return (
    <section className="relative c-space section-spacing" id="work">
      <div className="border-b border-white/10 pb-6">
        <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
          03 / Selected Work
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-heading text-white">Creative Portfolio</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              A faster, cleaner archive of graphic design and photography work.
              Each card shows one selected preview, while full folders and
              PDF pieces open directly in a new tab.
            </p>
          </div>
          <p className="text-xs tracking-[0.3em] text-white/35 uppercase">
            Visual Archive / 2026
          </p>
        </div>
      </div>

      <div className="mt-7 flex w-full rounded-full border border-white/10 bg-white/[0.03] p-1 sm:w-fit">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            className={`flex-1 rounded-full px-3 py-2.5 text-[0.65rem] font-medium tracking-[0.14em] uppercase transition sm:flex-none sm:px-6 sm:text-xs sm:tracking-[0.18em] ${
              category === item.id
                ? "bg-white text-primary"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {category === "graphic-designs" ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                canLoadMedia={canLoadMedia}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-xs font-medium tracking-[0.2em] text-white uppercase transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.09]"
            >
              {showAll ? "Show featured projects" : "View all projects"}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-8 grid max-w-3xl grid-cols-1 gap-5">
          {photographyProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              canLoadMedia={canLoadMedia}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
