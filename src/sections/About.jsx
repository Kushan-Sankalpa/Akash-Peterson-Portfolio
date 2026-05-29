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
    { label: "Role",     value: "Designer & Photographer" },
    { label: "Discipline", value: "Digital · Print · Brand" },
    { label: "Based in", value: "Sri Lanka" },
    { label: "Status",   value: "Open to opportunities" },
  ];

  const highlights = [
    { k: "04+",   v: "Years of creative practice" },
    { k: "Digital", v: "Social, marketing & content design" },
    { k: "Print",   v: "Production, framing & finishing" },
  ];

  return (
    <section className="c-space section-spacing" id="about">
      {/* Section label */}
      <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
            01 — About
          </p>
          <h2 className="text-heading text-white">About Me</h2>
        </div>
        <p className="hidden text-xs tracking-[0.3em] text-white/40 uppercase sm:block">
          Profile / 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 lg:items-stretch">
        {/* LEFT — sticky portrait */}
        <aside className="lg:col-span-4 lg:self-stretch">
          <div className="w-full max-w-[300px] sm:max-w-[340px] lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/assets/ashi_profile.png"
                alt="Portrait of Ashi"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="mt-6 space-y-1.5">
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Currently</p>
              <h3 className="text-lg font-medium leading-snug text-white">
                Graphic Designer & Photographer
              </h3>
              <p className="text-sm leading-6 text-white/55">
                Sri Lanka — working with a digital marketing & social media agency.
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT — editorial column */}
        <div className="lg:col-span-8">
          <div className="max-w-3xl">
            {/* Lede */}
            <h3 className="text-[2rem] font-medium leading-[1.15] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              Designing clear, considered visuals —
              <span className="text-white/45"> built to help brands speak with confidence.</span>
            </h3>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              I work across graphic design, photography and brand communication,
              with hands-on experience in digital media, print production and
              visual storytelling. My approach is quiet, intentional, and rooted
              in craft.
            </p>

            {/* Meta */}
            <dl className="mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="flex justify-between gap-6 border-b border-white/10 py-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:pl-8"
                >
                  <dt className="text-xs tracking-[0.25em] text-white/40 uppercase">
                    {m.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-white">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Skills */}
            <div className="mt-14">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
                  Core Skills
                </p>
                <span className="text-xs text-white/30">{skills.length} disciplines</span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium tracking-wide text-white/75 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.k} className="bg-black/50 p-6">
                  <p className="text-3xl font-medium tracking-tight text-white">
                    {h.k}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{h.v}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                Let's work together
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#work"
                className="text-sm font-medium text-white/60 underline-offset-4 transition hover:text-white hover:underline"
              >
                View selected work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
