import { contactDetails } from "../constants/profile";

const Footer = () => {
  return (
    <footer className="c-space pb-5 pt-12 text-sm text-neutral-400">
      <div className="mb-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-white/80">Akash Peterson</p>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${contactDetails.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
            aria-label="Email Akash Peterson"
            title="Email Akash Peterson"
          >
            <img
              src="/assets/socials/email.svg"
              alt=""
              className="h-5 w-5"
            />
          </a>
          <a
            href={contactDetails.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
            aria-label="Message Akash Peterson on WhatsApp"
            title="Message Akash Peterson on WhatsApp"
          >
            <img
              src="/assets/socials/whatsApp.svg"
              alt=""
              className="h-5 w-5"
            />
          </a>
        </div>
        <p>Copyright {new Date().getFullYear()} Akash Peterson.</p>
      </div>
    </footer>
  );
};

export default Footer;
