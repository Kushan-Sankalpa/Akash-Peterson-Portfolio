import { useEffect, useRef, useState } from "react";
import { additionalProjects, featuredProjects } from "../constants/projects";

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
    .slice(0, 3);

const LogoPanel = ({ project }) => (
  <div className="flex h-32 items-center justify-center overflow-hidden bg-white p-5 sm:h-36 sm:p-6">
    {project.logo ? (
      <img
        src={project.logo}
        alt={`${project.title} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold tracking-[0.15em] text-white">
        {getInitials(project.title)}
      </div>
    )}
  </div>
);

const CardContent = ({ project, index }) => (
  <>
    <LogoPanel project={project} />
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase">
            {project.type}
          </p>
          <h3 className="mt-2 text-lg font-medium text-white sm:text-xl">
            {project.title}
          </h3>
        </div>
        <span className="text-xs tracking-[0.18em] text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-4 text-xs tracking-[0.18em] text-lavender uppercase">
        {project.gallery ? "View case study ->" : "Open Drive folder ->"}
      </p>
    </div>
  </>
);

const ProjectCard = ({ project, index, onOpenCaseStudy }) => {
  const className =
    "group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] text-left transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]";

  if (project.gallery) {
    return (
      <button
        type="button"
        onClick={() => onOpenCaseStudy(project)}
        className={className}
      >
        <CardContent project={project} index={index} />
      </button>
    );
  }

  return (
    <a
      href={project.driveUrl}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      <CardContent project={project} index={index} />
    </a>
  );
};

const DialogCaseStudy = ({ project, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const touchStartX = useRef(null);
  const gallery = project.gallery;

  const showPrevious = () => {
    setSelectedImageIndex((current) =>
      current === null ? current : (current - 1 + gallery.length) % gallery.length
    );
  };

  const showNext = () => {
    setSelectedImageIndex((current) =>
      current === null ? current : (current + 1) % gallery.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImageIndex === null) {
        if (event.key === "Escape") onClose();
        return;
      }

      if (event.key === "Escape") setSelectedImageIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (distance > 45) showPrevious();
    if (distance < -45) showNext();
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary">
      <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium tracking-[0.2em] text-lavender uppercase transition hover:text-white"
            >
              &lt;- Back to selected work
            </button>
            <p className="mt-8 text-xs tracking-[0.25em] text-white/40 uppercase">
              Local Case Study / Campaign Design
            </p>
            <h2 className="mt-3 text-3xl font-medium text-white sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Selected campaign creatives and promotional designs. Artwork is
              loaded progressively as you scroll to keep the portfolio fast.
            </p>
          </div>
          <a
            href={project.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-xs font-medium tracking-[0.18em] text-white uppercase transition hover:border-white/40 hover:bg-white/[0.09]"
          >
            Open Drive folder
          </a>
        </div>

        <div className="mt-6 space-y-5 sm:mt-10 sm:space-y-8">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-2 text-left transition hover:border-white/25 sm:p-3"
            >
              <img
                src={image}
                alt={`${project.title} design ${index + 1}`}
                className="mx-auto max-h-[85vh] w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.01]"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery preview`}
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs tracking-[0.18em] text-white uppercase transition hover:bg-white hover:text-primary sm:right-6 sm:top-6"
          >
            Close
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-3 py-3 text-sm text-white transition hover:bg-white hover:text-primary sm:left-6 sm:px-4"
            aria-label="Previous image"
          >
            &lt;-
          </button>

          <img
            key={gallery[selectedImageIndex]}
            src={gallery[selectedImageIndex]}
            alt={`${project.title} design ${selectedImageIndex + 1}`}
            className="max-h-[88vh] max-w-[88vw] rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-3 py-3 text-sm text-white transition hover:bg-white hover:text-primary sm:right-6 sm:px-4"
            aria-label="Next image"
          >
            -&gt;
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/65 uppercase">
            {selectedImageIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [category, setCategory] = useState("graphic-designs");
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject]);

  const visibleProjects = showAll
    ? [...featuredProjects, ...additionalProjects]
    : featuredProjects;

  return (
    <section className="relative c-space section-spacing" id="work">
      <div className="border-b border-white/10 pb-6">
        <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
          02 / Selected Work
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-heading text-white">Creative Portfolio</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Browse selected graphic-design collaborations. Open Dialog for a
              local case study or visit each brand folder for the complete
              archive.
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
          <div className="mt-8 grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 lg:grid-cols-4">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenCaseStudy={setActiveProject}
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
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.25em] text-lavender uppercase">
              Photography Archive
            </p>
            <h3 className="mt-3 text-2xl font-medium text-white sm:text-3xl">
              Photography collections are ready to be added.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              This section is prepared for portrait, event, travel or commercial
              photo series. Each series can be added as its own folder without
              slowing the initial page load.
            </p>
          </div>
        </div>
      )}

      {activeProject && (
        <DialogCaseStudy
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
