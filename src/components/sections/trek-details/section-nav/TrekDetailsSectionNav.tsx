"use client";

import { useEffect, useState } from "react";

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "route-details", label: "Route" },
  { id: "itinerary", label: "Itinerary" },
  { id: "pickup-drop", label: "Pickup" },
  { id: "included", label: "Included" },
  { id: "things-to-carry", label: "Carry" },
  { id: "safety", label: "Safety" },
  { id: "policies", label: "Policies" },
  { id: "photos", label: "Photos" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "related-treks", label: "Related treks" },
];

export default function TrekDetailsSectionNav() {
  const [activeSection, setActiveSection] = useState(sectionLinks[0].id);

  useEffect(() => {
    const sections = sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.35, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full px-4 text-[#101010] sm:px-6 lg:px-[30px]">
      <div className="mx-auto grid w-full max-w-[1500px] lg:grid-cols-[minmax(0,900px)_460px] lg:justify-between lg:gap-12 xl:gap-16">
        <nav
          aria-label="Trek details sections"
          className="flex h-12 w-full items-end gap-1 overflow-x-auto border-b border-[#E5E5E5] bg-white/95 backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sectionLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex h-12 shrink-0 items-end px-2.5 pb-3 pt-2 font-urbanist text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]/15 sm:px-3 sm:text-sm ${
                  isActive
                    ? "text-[#101010]"
                    : "text-[#777] hover:text-[#393939]"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-[#101010] sm:inset-x-3" />
                ) : null}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
