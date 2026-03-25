import React from "react";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "../lib/utils";

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="mt-20 relative" style={{ background: "#020103" }}>
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-3xl font-bold cursor-default">
                    {brandName}
                  </span>
                </div>
                <p className="text-zinc-400 font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 cursor-default">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <a  // ✅ Fixed: was missing opening <a tag
                      key={index}
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-400 max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <a  // ✅ Fixed: was missing opening <a tag
                      key={index}
                      className="hover:text-white duration-300 hover:font-semibold"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-base text-zinc-400 text-center md:text-left cursor-default">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-zinc-400 hover:text-white transition-colors duration-300 hover:font-medium"
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div
          className="bg-gradient-to-b from-white/20 via-white/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div
          className="absolute duration-400 drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl left-1/2 flex items-center justify-center p-3 -translate-x-1/2 z-10 border border-transparent hover:border-white transition-all"
          style={{ background: "#020103" }}
        >
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24  rounded-2xl flex items-center justify-center shadow-lg">
            {brandIcon || (
              <NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-zinc-950 drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow */}
        <div
          className="absolute bottom-28 w-full h-24 blur-[1em]"
          style={{
            background: "linear-gradient(to top, #020103, rgba(2,1,3,0.8), rgba(2,1,3,0.4))",
          }}
        />
      </footer>
    </section>
  );
};