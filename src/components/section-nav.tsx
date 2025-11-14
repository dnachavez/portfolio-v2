"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionNavProps {
  sections: { id: string; label: string }[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="space-y-4">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            "flex items-center gap-3 text-sm transition-all group w-full text-left",
            activeSection === id
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            className={cn(
              "h-px bg-current transition-all duration-300 ease-out",
              activeSection === id ? "w-16" : "w-8 group-hover:w-16"
            )}
          />
          {label}
        </button>
      ))}
    </nav>
  );
}
