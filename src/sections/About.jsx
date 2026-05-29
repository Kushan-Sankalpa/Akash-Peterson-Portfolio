const About = () => {
  const skills = [
    "Graphic Design",
    "Photography",
    "Social Media Design",
    "Visual Storytelling",
    "Print Design",
    "Brand Creatives",
  ];

  const experience = [
    "Currently working with a digital marketing and social media agency",
    "Experience in graphic design, photography, printing, and framing",
    "Strong focus on clean visuals, composition, and creative storytelling",
  ];

  return (
    <section className="c-space section-spacing" id="about">
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-white/50 uppercase">
          About
        </p>
        <h2 className="text-heading text-white">About Me</h2>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-stretch">
        {/* Left Sticky Image Section */}
        <div className="lg:col-span-4 lg:self-stretch">
          <div className="w-full max-w-[280px] sm:max-w-[320px] lg:sticky lg:top-28 lg:max-w-[340px]">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/assets/ashi_profile.png"
                alt="Profile"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-semibold leading-snug text-white">
                Graphic Designer & Photographer
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Visual creator based in Sri Lanka, focused on design,
                photography, and meaningful creative communication.
              </p>
            </div>
          </div>
        </div>

        {/* Right About Section */}
        <div className="lg:col-span-8">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-medium tracking-[0.35em] text-white/50 uppercase">
              Creative Profile
            </p>

            <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              I create clean, purposeful visuals through graphic design,
              photography, and storytelling.
            </h3>

            <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
              I am a dedicated Graphic Designer and Photographer with practical
              experience in digital media, social media content, print design,
              photography, and visual storytelling. My work focuses on creating
              clear, modern, and impactful visuals that help brands communicate
              with confidence.
            </p>

            <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
              With experience across digital marketing, design studios,
              printing, framing, and photography, I bring both creative thinking
              and hands-on production knowledge into every project.
            </p>

            {/* Experience */}
            <div className="mt-10">
              <p className="mb-5 text-sm font-medium tracking-[0.3em] text-white/50 uppercase">
                Experience
              </p>

              <div className="space-y-5">
                {experience.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
                    <p className="text-base leading-7 text-white/75">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-10">
              <p className="mb-5 text-sm font-medium tracking-[0.3em] text-white/50 uppercase">
                Core Skills
              </p>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold text-white">4+</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Years of creative experience
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-white">Digital</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Social media and marketing design
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-white">Print</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Print design and production knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;