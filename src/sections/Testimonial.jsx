import Marquee from "../components/Marquee";

/* eslint-disable react/prop-types */

const clientLogos = [
  { name: "CBL", image: "/assets/Project_Logos/cbl.webp" },
  { name: "DFCC Bank", image: "/assets/Project_Logos/DFCC.webp" },
  { name: "Dialog", image: "/assets/Project_Logos/dialog.webp" },
  { name: "DP Logistics", image: "/assets/Project_Logos/dp_logistics.webp" },
  { name: "Michelin", image: "/assets/Project_Logos/michelin.webp" },
  { name: "Ministry of Health", image: "/assets/Project_Logos/moh.jpg" },
  {
    name: "Nations Trust Bank",
    image: "/assets/Project_Logos/Nations_Trust_Bank_logo.webp",
  },
  { name: "Ncinga", image: "/assets/Project_Logos/ncinga.webp" },
  { name: "Pan Asia Bank", image: "/assets/Project_Logos/PABC.jpg" },
  { name: "PIL", image: "/assets/Project_Logos/pil.webp" },
  {
    name: "Union Assurance",
    image: "/assets/Project_Logos/Union_Assurance_logo.webp",
  },
];

const firstRow = clientLogos.slice(0, Math.ceil(clientLogos.length / 2));
const secondRow = clientLogos.slice(Math.ceil(clientLogos.length / 2));

const LogoCard = ({ image, name }) => {
  return (
    <figure className="flex h-28 w-56 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-5 shadow-lg transition hover:-translate-y-1 sm:h-32 sm:w-64 sm:p-6">
      <img
        className="h-full w-full object-contain"
        src={image}
        alt={`${name} logo`}
        loading="lazy"
      />
    </figure>
  );
};

export default function Testimonial() {
  return (
    <section className="mt-25 items-start c-space md:mt-35">
      <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
        04 / Collaborations
      </p>
      <h2 className="text-heading">Clients & Collaborations</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
        Selected brands and organizations represented across creative work and
        professional collaborations.
      </p>

      <div className="relative mt-10 flex w-full flex-col items-center justify-center overflow-hidden sm:mt-12">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((client) => (
            <LogoCard key={client.name} {...client} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((client) => (
            <LogoCard key={client.name} {...client} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary"></div>
      </div>
    </section>
  );
}
