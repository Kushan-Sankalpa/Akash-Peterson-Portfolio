const About = () => {
  const skills = [
    "Graphic Design",
    "Photography",
    "Social Media Design",
    "Visual Storytelling",
    "Print Design",
    "Brand Creatives",
  ];

  const meta = [
    { label: "Role", value: "Designer & Photographer" },
    { label: "Discipline", value: "Digital / Print / Brand" },
    { label: "Based in", value: "Sri Lanka" },
    { label: "Status", value: "Open to opportunities" },
  ];

  return (
    <section className="c-space section-spacing" id="about">
      <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5 sm:mb-16 sm:pb-6">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
            01 / About
          </p>
          <h2 className="text-heading text-white">About Me</h2>
        </div>
        <p className="hidden text-xs tracking-[0.3em] text-white/40 uppercase sm:block">
          Profile / 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-20">
        <aside className="lg:col-span-4 lg:self-stretch">
          <div className="w-full max-w-[280px] sm:max-w-[340px] lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/assets/ashi_profile.png"
                alt="Portrait of Akash Peterson"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="mt-5 space-y-1.5 sm:mt-6">
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Currently
              </p>
              <h3 className="text-lg font-medium leading-snug text-white">
                Graphic Designer & Photographer
              </h3>
              <p className="text-sm leading-6 text-white/55">
                Sri Lanka / currently working with Hashtag Digital Marketing
                Agency.
              </p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="max-w-3xl">
            <h3 className="text-[1.75rem] font-medium leading-[1.15] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              Designing clear, considered visuals.
              <span className="text-white/45">
                {" "}
                Built to help brands speak with confidence.
              </span>
            </h3>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:mt-8 sm:text-lg sm:leading-8">
              I work across graphic design, photography and brand communication,
              with hands-on experience in digital media, print production and
              visual storytelling. My approach is quiet, intentional, and rooted
              in craft.
            </p>

            <dl className="mt-10 grid grid-cols-1 border-t border-white/10 sm:mt-14 sm:grid-cols-2">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between gap-5 border-b border-white/10 py-4 sm:gap-6 sm:py-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:pl-8"
                >
                  <dt className="text-xs tracking-[0.2em] text-white/40 uppercase sm:tracking-[0.25em]">
                    {item.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 sm:mt-14">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
                  Core Skills
                </p>
                <span className="text-xs text-white/30">
                  {skills.length} disciplines
                </span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium tracking-wide text-white/75 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:px-4"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
