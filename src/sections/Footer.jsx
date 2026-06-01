import { contactDetails } from "../constants/profile";

const Footer = () => {
  return (
    <footer className="c-space pb-5 pt-12 text-sm text-neutral-400">
      <div className="mb-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-white/80">Akash Peterson</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={`mailto:${contactDetails.email}`}
            className="transition hover:text-white"
          >
            {contactDetails.email}
          </a>
          <a
            href={contactDetails.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            WhatsApp
          </a>
        </div>
        <p>Copyright {new Date().getFullYear()} Akash Peterson.</p>
      </div>
    </footer>
  );
};

export default Footer;
