import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/* eslint-disable react/prop-types */

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const NAV_OFFSET = 88;

const easeInOutCubic = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

function Navigation({ onNavigate }) {
  return (
    <ul className="nav-ul">
      {navItems.map((item) => (
        <li className="nav-li" key={item.href}>
          <a
            className="nav-link"
            href={item.href}
            onClick={(event) => onNavigate(event, item.href)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const scrollFrameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const smoothScrollTo = (targetTop) => {
    if (scrollFrameRef.current) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, targetTop);
      return;
    }

    const duration = Math.min(950, Math.max(520, Math.abs(distance) * 0.45));
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeInOutCubic(elapsed);

      window.scrollTo(0, startTop + distance * easedProgress);

      if (elapsed < 1) {
        scrollFrameRef.current = window.requestAnimationFrame(step);
      }
    };

    scrollFrameRef.current = window.requestAnimationFrame(step);
  };

  const handleNavigate = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const targetTop =
      href === "#home"
        ? 0
        : Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
          );

    setIsOpen(false);
    smoothScrollTo(targetTop);
    window.history.pushState(null, "", href);
  };

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2">
          <a
            href="#home"
            onClick={(event) => handleNavigate(event, "#home")}
            className="flex min-h-12 items-center transition-opacity hover:opacity-85"
            aria-label="Akash Peterson home"
          >
            {logoFailed ? (
              <span className="text-xl font-bold text-white">
                Akash Peterson
              </span>
            ) : (
              <img
                src="/assets/ashiyalogo1.png"
                alt="Akash Peterson"
                className="h-14 w-auto max-w-[210px] object-contain sm:h-16 sm:max-w-[280px]"
                onError={() => setLogoFailed(true)}
              />
            )}
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation onNavigate={handleNavigate} />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onNavigate={handleNavigate} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
