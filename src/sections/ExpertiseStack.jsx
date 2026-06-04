import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";

const expertiseCards = [
  {
    title: "Graphic Design",
    label: "Campaign systems",
    copy:
      "Social posts, digital ads, print layouts and launch creatives shaped for clean brand communication.",
    tags: ["Campaigns", "Social Media", "Print"],
    mark: "GD",
    stat: "01",
    tint: "#33c2cc",
    surface:
      "linear-gradient(135deg, rgba(51, 194, 204, 0.24), rgba(122, 87, 219, 0.1), rgba(255,255,255,0.03))",
  },
  {
    title: "Branding",
    label: "Identity direction",
    copy:
      "Logo refinement, brand kits, visual rules and rollout assets that keep a brand recognizable everywhere.",
    tags: ["Identity", "Guidelines", "Rollout"],
    mark: "BR",
    stat: "02",
    tint: "#57db96",
    surface:
      "linear-gradient(135deg, rgba(87, 219, 150, 0.22), rgba(51, 194, 204, 0.08), rgba(255,255,255,0.03))",
  },
  {
    title: "Photography",
    label: "Visual capture",
    copy:
      "Portrait, event and brand photography prepared for campaigns, profiles and digital storytelling.",
    tags: ["Portraits", "Events", "Retouching"],
    mark: "PH",
    stat: "03",
    tint: "#d6995c",
    surface:
      "linear-gradient(135deg, rgba(214, 153, 92, 0.24), rgba(234, 72, 132, 0.08), rgba(255,255,255,0.03))",
  },
  {
    title: "Content Design",
    label: "Digital storytelling",
    copy:
      "Consistent content layouts for reels covers, carousels, awareness posts and brand-led communication.",
    tags: ["Carousels", "Post Sets", "Stories"],
    mark: "CD",
    stat: "04",
    tint: "#ea4884",
    surface:
      "linear-gradient(135deg, rgba(234, 72, 132, 0.22), rgba(202, 47, 140, 0.08), rgba(255,255,255,0.03))",
  },
  {
    title: "Production Design",
    label: "Final artwork",
    copy:
      "Press ads, packaging mockups, event invitations and export-ready artwork prepared with production details in mind.",
    tags: ["Artwork", "Mockups", "Prepress"],
    mark: "PD",
    stat: "05",
    tint: "#cc6033",
    surface:
      "linear-gradient(135deg, rgba(204, 96, 51, 0.24), rgba(214, 153, 92, 0.08), rgba(255,255,255,0.03))",
  },
];

const ExpertiseStack = () => {
  const handleSkip = () => {
    document.getElementById("work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative c-space mt-20 md:mt-30" id="expertise">
      <div className="border-b border-white/10 pb-6">
        <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
          02 / Expertise
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-heading text-white">What I Create</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Five focused creative areas across design, branding, photography
              and production-ready artwork.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs tracking-[0.3em] text-white/35 uppercase sm:block">
              Services / Stack
            </p>
            <button
              type="button"
              onClick={handleSkip}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-[0.18em] text-white/70 uppercase transition hover:border-white/35 hover:bg-white/[0.09] hover:text-white"
            >
              Skip to Work
            </button>
          </div>
        </div>
      </div>

      <ScrollStack className="expertise-scroll-shell mt-6 sm:mt-8">
        {expertiseCards.map((card) => (
          <ScrollStackItem
            key={card.title}
            itemClassName="expertise-stack-card"
            style={{
              "--stack-card-surface": card.surface,
              "--stack-card-tint": card.tint,
            }}
          >
            <article className="relative grid h-full overflow-hidden rounded-[2rem] bg-[#080a16] lg:grid-cols-[1.12fr_0.88fr]">
              <div
                className="absolute inset-0 opacity-80"
                style={{ background: "var(--stack-card-surface)" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,18,0.82),rgba(3,4,18,0.44),rgba(3,4,18,0.2))]" />
              <div
                className="absolute left-0 top-0 h-full w-1.5"
                style={{ backgroundColor: "var(--stack-card-tint)" }}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: "var(--stack-card-tint)" }}
                    />
                    <p className="text-[0.65rem] font-medium tracking-[0.24em] text-white/50 uppercase">
                      {card.label}
                    </p>
                  </div>
                  <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.02] text-white sm:text-4xl lg:text-5xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                    {card.copy}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/14 bg-primary/35 px-3 py-1.5 text-xs font-medium text-white/78 backdrop-blur sm:px-4"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-5 flex items-end justify-between gap-5 lg:mt-0 lg:flex-col lg:items-end">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[0.7rem] font-medium tracking-[0.25em] text-white/58 uppercase">
                  {card.stat}
                </span>
                <div className="relative flex aspect-square w-28 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/14 bg-primary/55 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur sm:w-36 lg:w-44">
                  <div className="absolute inset-3 rounded-[1rem] border border-white/12" />
                  <div className="absolute inset-6 rounded-[0.8rem] border border-dashed border-white/18" />
                  <div
                    className="absolute h-20 w-20 rounded-full blur-2xl sm:h-28 sm:w-28"
                    style={{ backgroundColor: "var(--stack-card-tint)" }}
                  />
                  <span className="relative text-4xl font-bold tracking-[0.08em] text-white sm:text-6xl">
                    {card.mark}
                  </span>
                </div>
              </div>
            </article>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default ExpertiseStack;
