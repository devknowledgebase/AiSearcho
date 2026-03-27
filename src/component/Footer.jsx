"use client";
import { Footer } from "../ui/modem-animated-footer";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  NotepadTextDashed,
} from "lucide-react";
import logo from "./Logo.svg"

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:kumard.07.dev@gmail.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "Pricing", href: "/" },
    { label: "Templates", href: "/" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <Footer
      brandName="AISearcho"
      brandDescription="AI-driven SEO tools optimize websites for everyone effortlessly and effectively with smart automation."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Dev"
      creatorUrl="http://github.com/devknowledgebase"
      brandIcon={<img src={logo} alt="logo" className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 object-contain drop-shadow-lg" />}
    />
  );
}
