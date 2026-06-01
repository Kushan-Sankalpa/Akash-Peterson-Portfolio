import { useState } from "react";
import { Particles } from "../components/Particles";
import { contactDetails } from "../constants/profile";

const contactOptions = [
  {
    label: "Email",
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
  },
  {
    label: "WhatsApp",
    value: contactDetails.primaryPhoneDisplay,
    href: contactDetails.whatsapp,
  },
  {
    label: "Primary Call",
    value: contactDetails.primaryPhoneDisplay,
    href: `tel:${contactDetails.primaryPhone}`,
  },
  {
    label: "Alternate Call",
    value: contactDetails.secondaryPhoneDisplay,
    href: `tel:${contactDetails.secondaryPhone}`,
  },
  {
    label: "Based In",
    value: contactDetails.location,
    href: "https://www.google.com/maps/search/?api=1&query=Battaramulla%2C%20Sri%20Lanka",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative c-space section-spacing" id="contact">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="border-b border-white/10 pb-6">
        <p className="mb-3 text-xs font-medium tracking-[0.4em] text-white/40 uppercase">
          04 / Contact
        </p>
        <h2 className="text-heading text-white">Let&apos;s Work Together</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
          For graphic design, photography or creative collaboration, reach out
          directly or prepare an email below.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {contactOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target={option.href.startsWith("http") ? "_blank" : undefined}
              rel={option.href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.055]"
            >
              <p className="text-xs tracking-[0.25em] text-white/40 uppercase">
                {option.label}
              </p>
              <p className="mt-2 break-words text-base font-medium text-white sm:text-lg">
                {option.value}
              </p>
              <p className="mt-4 text-xs tracking-[0.18em] text-lavender uppercase">
                Open -&gt;
              </p>
            </a>
          ))}
        </div>

        <form
          className="rounded-2xl border border-white/10 bg-primary/80 p-5 sm:p-7"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-medium text-white">Send an inquiry</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Submitting opens your email app with the message prepared for Akash.
          </p>

          <div className="mt-6">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Your name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="field-input field-input-focus"
              placeholder="Tell Akash about your project..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-md bg-radial from-lavender to-royal px-4 py-3 text-base font-medium text-white transition hover:-translate-y-0.5"
          >
            Prepare Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
