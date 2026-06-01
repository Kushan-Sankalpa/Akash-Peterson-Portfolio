import { useState } from "react";

const categories = [
  { id: "graphic-designs", label: "Graphic Designs" },
  { id: "photography", label: "Photography" },
];

const designCollections = [
  {
    id: "dialog-axiata",
    title: "Dialog Axiata",
    type: "Corporate Campaign Design",
    description:
      "A collection of campaign layouts and promotional creatives designed for Dialog Enterprise business communication.",
    images: [
      "/assets/dialog1.jpeg",
      "/assets/dialog3.jpg",
      "/assets/Bizpack Unlimited-01.jpg",
    ],
  },
  {
    id: "google-io-extended",
    title: "Google I/O Extended",
    type: "Event Visual Direction",
    description:
      "Event posters, social content and apparel artwork built around a vivid technology-focused visual system.",
    images: [
      "/assets/dialog4.jpg",
      "/assets/Logo Post.jpg",
      "/assets/Option 4.jpg",
      "/assets/Tshirt.jpg",
    ],
  },
  {
    id: "creative-explorations",
    title: "Creative Explorations",
    type: "Digital Artwork",
    description:
      "Selected experimental visuals that explore color, composition and digital atmosphere.",
    images: ["/assets/g.png", "/assets/dialog2.jpg"],
  },
];

const Projects = () => {
  const [category, setCategory] = useState("graphic-designs");
  const [selectedCollection, setSelectedCollection] = useState(
    designCollections[0]
  );
  const [selectedImage, setSelectedImage] = useState(null);

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
              Browse selected design work by collection, with photography series
              ready to be added as the portfolio grows.
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
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designCollections.map((collection, index) => {
              const isSelected = selectedCollection.id === collection.id;

              return (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => setSelectedCollection(collection)}
                  className={`group overflow-hidden rounded-2xl border bg-white/[0.025] text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.055] ${
                    isSelected
                      ? "border-lavender/70"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="relative h-40 overflow-hidden sm:h-48">
                    <img
                      src={collection.images[0]}
                      alt={`${collection.title} cover`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/15 to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-white/75 uppercase backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
                          {collection.type}
                        </p>
                        <h3 className="mt-2 text-xl font-medium text-white">
                          {collection.title}
                        </h3>
                      </div>
                      <span className="text-sm text-white/45">
                        {collection.images.length}
                      </span>
                    </div>
                    <p className="mt-4 text-xs tracking-[0.18em] text-white/45 uppercase">
                      Open collection
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs tracking-[0.25em] text-lavender uppercase">
                  Open Collection
                </p>
                <h3 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
                  {selectedCollection.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                  {selectedCollection.description}
                </p>
              </div>
              <p className="shrink-0 text-xs tracking-[0.22em] text-white/40 uppercase">
                {selectedCollection.images.length} artworks
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedCollection.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/25"
                >
                  <img
                    src={image}
                    alt={`${selectedCollection.title} artwork ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <span className="text-xs tracking-[0.2em] text-white/70 uppercase">
                      Artwork {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-white/60">View</span>
                  </div>
                </button>
              ))}
            </div>
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
              photo series. Add each series as its own folder to keep the gallery
              easy to browse on desktop and mobile.
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Artwork preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs tracking-[0.2em] text-white uppercase transition hover:bg-white hover:text-primary sm:right-8 sm:top-8"
          >
            Close
          </button>
          <img
            src={selectedImage}
            alt="Selected artwork preview"
            className="max-h-[88vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Projects;
