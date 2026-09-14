"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";

type LabelValuePair = [label: string, value: string];

const itineraryImages = [
  "/Hero/card-1.png",
  "/Hero/card-2.png",
  "/Hero/card-3.png",
];

const trailImages = [
  "/Hero/card-1.png",
  "/Hero/card-2.png",
  "/Hero/card-3.png",
  "/Hero/sahyadri-fort-sunrise.png",
  "/Featured-Destination/featured-pune-upper.png",
  "/Featured-Destination/featured-pune-lower.png",
  "/Featured-Destination/featured-uttarakhand-secondary.png",
  "/Featured-Destination/featured-himachal-pradesh-upper.png",
  "/Hero/mountain-ridge-trail.jpg",
];

const trailImageSpans = [
  "col-span-6 row-span-2 sm:col-span-7",
  "col-span-6 sm:col-span-5",
  "col-span-3 sm:col-span-2",
  "col-span-3 sm:col-span-3",
  "col-span-6 sm:col-span-5",
  "col-span-3 sm:col-span-4",
  "col-span-3 sm:col-span-3",
  "col-span-6 sm:col-span-5",
  "col-span-6 sm:col-span-7",
];

const trailPreviewImages = trailImages;

const trekFacts: LabelValuePair[] = [
  ["Region", "Sahyadris"],
  ["Base village", "Bamnoli"],
  ["Difficulty", "Light"],
  ["Trail type", "Forest + fort"],
  ["Terrain", "Boat, forest, gradual climb"],
  ["Best for", "Weekend trekkers"],
  ["Best season", "Oct-Feb"],
];

const routeDetails: LabelValuePair[] = [
  ["Trail distance", "18 km approx."],
  ["Trail time", "6 hours"],
  ["Highest point", "1,400 m"],
  ["Route feel", "Backwater crossing, forest walk, fort climb"],
];

const pickupDetails: LabelValuePair[] = [
  ["Pickup city", "Pune"],
  ["Meeting point", "Toll Road - Dehradun"],
  ["Start window", "Early morning"],
  ["Return", "Evening, traffic dependent"],
];

const includedItems = [
  "Forest entry coordination",
  "Local trek lead",
  "Basic first-aid support",
  "Boat and trail coordination",
];

const excludedItems = [
  "Personal expenses",
  "Pickup outside listed points",
  "Meals not mentioned",
  "Personal gear or rentals",
];

const thingsToCarry = [
  "Trekking shoes with good grip",
  "Two litres of water",
  "Rain layer or windcheater",
  "Personal medicines",
  "Small daypack and torch",
];

const safetyItems = [
  "Small group pacing with a local lead",
  "Basic first-aid carried by the team",
  "Route decisions depend on weather and forest access",
  "Beginner friendly, but uneven forest patches need attention",
];

const policyItems = [
  "Operator cancellation rules apply after booking.",
  "Route timing may shift because of weather, forest access, or traffic.",
  "Travelers should follow guide instructions during boat and forest sections.",
];

const reviews = [
  {
    name: "Aarav P.",
    stars: 5,
    daysAgo: 12,
    text: "The boat ride and forest section made the trek feel different from a usual weekend climb.",
    trek: "Vasota Fort Trek",
  },
  {
    name: "Nisha K.",
    stars: 5,
    daysAgo: 28,
    text: "Well paced and easy to follow. The pickup clarity helped a lot before booking.",
    trek: "Vasota Fort Trek",
  },
  {
    name: "Rahul S.",
    stars: 4,
    daysAgo: 47,
    text: "Good beginner trek with enough views and quiet trail time to feel worth the weekend.",
    trek: "Vasota Fort Trek",
  },
];

const ratingDistribution = [78, 15, 4, 2, 1];

const faqs = [
  {
    question: "Is this trek beginner friendly?",
    answer:
      "Yes, it suits beginners with average fitness, but the trail can still have uneven forest patches and changing weather.",
  },
  {
    question: "Is pickup included?",
    answer:
      "Pickup is available from the listed fixed point. Any pickup outside the listed route is not included.",
  },
  {
    question: "Can the route change?",
    answer:
      "Yes. Forest access, boat timing, rain, and local conditions can change the exact route or schedule.",
  },
];

const itineraryDays = [
  {
    day: "Day 1",
    title: "Depart from Pune and reach Bamnoli",
    description:
      "Start early from Pune and drive toward Bamnoli near the Koyna backwaters. After basic checks and local coordination, continue toward the Vasota trail access point.",
    isOpen: true,
  },
  {
    day: "Day 2",
    title: "Boat ride across Shivsagar backwaters",
    description:
      "Cross the backwaters by boat and enter the forested section leading toward Vasota Fort. The route is known for quiet water views and dense Sahyadri vegetation.",
  },
  {
    day: "Day 3",
    title: "Trek to Vasota Fort",
    description:
      "Walk through forest trails and gradual climbs to reach the fort area. Explore viewpoints, old ruins, and wide views of the Koyna landscape before beginning the descent.",
  },
  {
    day: "Day 4",
    title: "Return to Bamnoli and Pune",
    description:
      "Return by boat to Bamnoli and continue the drive back toward Pune, with arrival depending on weather, traffic, and local route conditions.",
  },
];

export default function TripInfoOverview() {
  const [openDays, setOpenDays] = useState(() =>
    new Set(
      itineraryDays
        .filter((day) => day.isOpen)
        .map((day) => day.day),
    ),
  );
  const [openFaq, setOpenFaq] = useState(faqs[0].question);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  function toggleDay(day: string) {
    setOpenDays((current) => {
      const next = new Set(current);

      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }

      return next;
    });
  }

  function openPhotoViewer(image: string) {
    const imageIndex = trailImages.indexOf(image);

    setSelectedPhotoIndex(imageIndex >= 0 ? imageIndex : 0);
  }

  function closeGallery() {
    setIsGalleryOpen(false);
    setSelectedPhotoIndex(null);
  }

  function showPreviousPhoto() {
    setSelectedPhotoIndex((current) =>
      current === null ? current : (current - 1 + trailImages.length) % trailImages.length,
    );
  }

  function showNextPhoto() {
    setSelectedPhotoIndex((current) =>
      current === null ? current : (current + 1) % trailImages.length,
    );
  }

  useEffect(() => {
    if (!isGalleryOpen && selectedPhotoIndex === null) return;

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (selectedPhotoIndex !== null) {
          if (!isGalleryOpen) {
            closeGallery();
            return;
          }

          setSelectedPhotoIndex(null);
          return;
        }

        setIsGalleryOpen(false);
      }

      if (selectedPhotoIndex !== null && event.key === "ArrowLeft") {
        setSelectedPhotoIndex((current) =>
          current === null ? current : (current - 1 + trailImages.length) % trailImages.length,
        );
      }

      if (selectedPhotoIndex !== null && event.key === "ArrowRight") {
        setSelectedPhotoIndex((current) =>
          current === null ? current : (current + 1) % trailImages.length,
        );
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, selectedPhotoIndex]);

  return (
    <div className="flex w-full flex-col items-start gap-8 text-[#101010] sm:gap-9">
      <section
        id="overview"
        className="grid w-full scroll-mt-20 items-start gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(250px,0.82fr)] lg:gap-12"
      >
        <div className="flex max-w-[680px] flex-col items-start">
          <p className="font-urbanist text-2xl font-medium leading-tight text-[#101010] sm:text-3xl lg:text-[34px]">
            Overview
          </p>
          <h2 className="mt-6 font-urbanist text-[1.5rem] font-light italic leading-[1.22] text-[#101010] sm:text-[1.7rem] lg:text-[30px]">
            <strong className="font-medium">Vasota Fort</strong> is one of the
            Sahyadri&apos;s most rewarding forest routes, with a quiet boat
            approach and fort views that earn every step.
          </h2>
          <p className="mt-6 max-w-[640px] font-urbanist text-sm leading-6 tracking-[0.02em] text-[#666] sm:text-base">
            This weekend route is built for travellers from Pune who want a
            managed escape with clear pickup coordination, a local trek lead,
            steady pacing, and enough time on the trail to enjoy the forest,
            backwaters, and fort viewpoints without feeling rushed.
          </p>
        </div>

        <FactList items={trekFacts} />
      </section>

      <CompactSection
        id="route-details"
        title="Route Details"
        description="Forest paths, a backwater crossing, and a steady fort climb in one compact weekend route."
      >
        <FactList items={routeDetails} compact />
      </CompactSection>

      <section id="itinerary" className="flex w-full scroll-mt-20 flex-col items-start gap-6">
        <SectionHeading
          title="Full Itinerary"
          description="From Pune to Bamnoli, across the Koyna backwaters, and up to Vasota Fort."
        />
        <DashedDivider />

        <div className="flex w-full flex-col items-start gap-5">
          {itineraryDays.map((day, index) => {
            const isOpen = openDays.has(day.day);
            const panelId = `itinerary-${day.day.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <div
                key={day.day}
                className="grid w-full grid-cols-1 md:grid-cols-[21px_minmax(0,1fr)] md:gap-x-4"
              >
                <div className="relative hidden md:block">
                  <span className="absolute left-0 top-[6px] h-5 w-5 rounded-full border border-[#1A1A17] bg-white" />
                  {index < itineraryDays.length - 1 && (
                    <span className="absolute bottom-[-20px] left-[10px] top-[26px] border-l border-[#1A1A17]" />
                  )}
                </div>

                <div className="flex w-full flex-col items-start gap-6">
                  <div className="flex w-full flex-col items-start gap-3">
                    <div className="flex w-full items-center justify-between gap-4">
                      <p className="font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-[#393939] sm:text-lg">
                        {day.day}
                      </p>
                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[57px] bg-[#FAFAFA] p-2.5"
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${day.day}`}
                        onClick={() => toggleDay(day.day)}
                      >
                        {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                      </button>
                    </div>
                    <div id={panelId} className="flex w-full flex-col items-start gap-1">
                      <p className="w-full font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-black sm:text-lg">
                        {day.title}
                      </p>
                      <p className="w-full font-urbanist text-base leading-[1.45] tracking-[0.02em] text-[#101010] sm:text-lg">
                        {day.description}
                      </p>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                      {itineraryImages.map((image, imageIndex) => (
                        <button
                          key={image}
                          type="button"
                          className="group relative h-[160px] overflow-hidden rounded-[20px] bg-[#F6F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]/20 sm:h-[175px] lg:h-[190px]"
                          onClick={() => openPhotoViewer(image)}
                          aria-label={`Open itinerary ${day.day} preview ${imageIndex + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`Itinerary ${day.day} preview ${imageIndex + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 260px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {index < itineraryDays.length - 1 && <DashedDivider />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CompactSection
        id="pickup-drop"
        title="Pickup & Drop"
        description="Fixed pickup keeps the city exit and return plan predictable."
      >
        <FactList items={pickupDetails} compact />
      </CompactSection>

      <section id="included" className="flex w-full scroll-mt-20 flex-col items-start gap-4">
        <SectionHeading
          title="Included / Not Included"
          description="A clear split of what the operator manages and what stays with the traveller."
        />
        <div className="grid w-full max-w-[640px] gap-3.5 sm:grid-cols-2">
          <Checklist title="Included" items={includedItems} icon="check" />
          <Checklist title="Not included" items={excludedItems} icon="cross" />
        </div>
      </section>

      <CompactSection
        id="things-to-carry"
        title="Things to Carry"
        description="The small essentials that make the forest and boat sections easier."
      >
        <SimpleList items={thingsToCarry} />
      </CompactSection>

      <CompactSection
        id="safety"
        title="Safety"
        description="How the team manages pacing, route calls, and basic trail support."
      >
        <SimpleList items={safetyItems} />
      </CompactSection>

      <CompactSection
        id="policies"
        title="Policies"
        description="Booking rules and route changes to know before reserving."
      >
        <SimpleList items={policyItems} />
      </CompactSection>

      <section id="photos" className="flex w-full scroll-mt-20 flex-col items-start gap-5">
        <SectionHeading
          title="Photos"
          description="A quick visual sense of the backwater approach, forest path, and fort-side terrain."
        />
        <div className="grid w-full max-w-[900px] auto-rows-[126px] grid-cols-6 gap-3 sm:auto-rows-[148px] sm:grid-cols-12">
          {trailPreviewImages.map((image, index) => (
            <div
              key={image}
              className={`group relative overflow-hidden rounded-[20px] bg-[#F6F7F7] ${
                index > 3 ? "hidden sm:block" : ""
              } ${trailImageSpans[index]}`}
            >
              <Image
                src={image}
                alt={`Vasota Fort trail preview ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 520px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
              <button
                type="button"
                className="absolute inset-0 z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
                onClick={() => openPhotoViewer(image)}
                aria-label={`Open Vasota Fort trail preview ${index + 1}`}
              />
              {(index === 3 || index === trailPreviewImages.length - 1) && (
                <>
                  <span
                    className={`absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-t from-black/55 to-transparent ${
                      index === 3 ? "sm:hidden" : "hidden sm:block"
                    }`}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className={`absolute bottom-3 right-3 z-[3] h-8 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-black/50 px-3 font-urbanist text-[11px] font-semibold tracking-[0.02em] text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:text-xs ${
                      index === 3 ? "inline-flex sm:hidden" : "hidden sm:inline-flex"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedPhotoIndex(null);
                      setIsGalleryOpen(true);
                    }}
                    aria-label="View all photos"
                  >
                    <PhotoGridIcon />
                    All photos
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="flex w-full scroll-mt-20 flex-col items-start gap-5">
        <SectionHeading
          title="Reviews"
          description="Recent traveller notes from the same trek."
        />
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full max-w-[500px] items-center gap-5 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-4 sm:p-5">
            <div className="flex items-end gap-2">
              <span className="font-urbanist text-[42px] font-medium leading-none text-[#101010]">
                4.8
              </span>
              <span className="pb-1 font-urbanist text-sm text-[#666]">
                128 reviews
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              {ratingDistribution.slice(0, 3).map((pct, index) => (
                <div key={pct} className="flex items-center gap-2">
                  <span className="w-3 font-urbanist text-xs text-[#8E8E8E]">
                    {5 - index}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                    <span
                      className="block h-full rounded-full bg-[#FEB531]"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-8 text-right font-urbanist text-xs text-[#8E8E8E]">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full max-w-[780px] gap-3.5 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((review) => (
              <div key={review.name} className="w-[260px] shrink-0 sm:w-[280px]">
                <figure className="flex h-full min-h-[146px] flex-col gap-2.5 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1A1A17] font-urbanist text-xs text-white">
                      {review.name[0]}
                    </span>
                    <div>
                      <p className="font-urbanist text-sm font-medium text-[#101010]">
                        {review.name}
                      </p>
                      <p className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < review.stars ? "text-[#FEB531]" : "text-[#D7D7D7]"
                            }
                          >
                            <StarIcon />
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className="ml-auto font-urbanist text-xs text-[#8E8E8E]">
                      {review.daysAgo}d ago
                    </span>
                  </div>
                  <blockquote className="font-urbanist text-[13px] leading-relaxed text-[#666]">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-auto font-urbanist text-xs text-[#8E8E8E]">
                    on {review.trek}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="flex w-full scroll-mt-20 flex-col items-start gap-4">
        <SectionHeading
          title="FAQ"
          description="Quick answers before booking."
        />
        <div className="w-full max-w-[720px] divide-y divide-[#D7D7D7] rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] px-5 sm:px-6">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.question;
            const panelId = `faq-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? "" : faq.question)}
                >
                  <span className="font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-[#101010]">
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                </button>
                {isOpen && (
                  <p
                    id={panelId}
                    className="mt-3 max-w-[720px] font-urbanist text-sm leading-6 tracking-[0.02em] text-[#666] sm:text-base"
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {isGalleryOpen && selectedPhotoIndex === null && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-white text-[#101010]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trek-gallery-title"
        >
          <div className="sticky top-0 z-10 border-b border-[#E5E5E5] bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-[30px]">
            <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D7D7D7] bg-[#F6F7F7] px-4 font-urbanist text-sm font-semibold tracking-[0.02em] text-[#101010] transition-colors hover:border-[#AFAFAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]/15"
                onClick={closeGallery}
              >
                <ArrowLeftIcon />
                Back
              </button>
              <p className="font-urbanist text-sm font-medium tracking-[0.02em] text-[#666]">
                {trailImages.length} photos
              </p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-[30px]">
            <div className="flex flex-col items-start gap-2">
              <h2
                id="trek-gallery-title"
                className="font-urbanist text-2xl font-medium leading-tight text-[#101010] sm:text-3xl lg:text-[34px]"
              >
                Vasota Fort Photos
              </h2>
              <p className="max-w-[680px] font-urbanist text-sm leading-6 tracking-[0.02em] text-[#666] sm:text-base">
                Backwaters, forest approach, trail details, and fort-side views from this route.
              </p>
            </div>

            <div className="grid auto-rows-[120px] grid-cols-6 gap-3 sm:auto-rows-[180px] sm:grid-cols-12 lg:auto-rows-[220px]">
              {trailImages.map((image, index) => (
                <button
                  key={`${image}-gallery`}
                  type="button"
                  className={`group relative overflow-hidden rounded-[20px] bg-[#F6F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]/20 ${trailImageSpans[index]}`}
                  onClick={() => setSelectedPhotoIndex(index)}
                  aria-label={`Open Vasota Fort gallery photo ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Vasota Fort gallery photo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-black/80 px-4 py-5 text-white backdrop-blur-xl sm:px-6 lg:px-[30px]"
          role="dialog"
          aria-modal="true"
          aria-label={`Vasota Fort photo ${selectedPhotoIndex + 1} of ${trailImages.length}`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={closeGallery}
            aria-label="Close photo viewer"
          />
          <div className="relative z-10 flex h-full w-full max-w-[1320px] flex-col items-center justify-center gap-4">
            <div className="flex w-full items-center justify-between gap-3">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 font-urbanist text-sm font-semibold tracking-[0.02em] text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
                onClick={isGalleryOpen ? () => setSelectedPhotoIndex(null) : closeGallery}
              >
                <ArrowLeftIcon />
                {isGalleryOpen ? "All photos" : "Back"}
              </button>
              <p className="font-urbanist text-sm font-semibold tracking-[0.02em] text-white/80">
                {selectedPhotoIndex + 1} / {trailImages.length}
              </p>
            </div>

            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              <button
                type="button"
                className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 sm:left-0 sm:h-11 sm:w-11"
                onClick={showPreviousPhoto}
                aria-label="Show previous photo"
              >
                <ChevronLeftIcon />
              </button>
              <div className="relative h-full max-h-[78vh] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={trailImages[selectedPhotoIndex]}
                  alt={`Vasota Fort enlarged gallery photo ${selectedPhotoIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <button
                type="button"
                className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 sm:right-0 sm:h-11 sm:w-11"
                onClick={showNextPhoto}
                aria-label="Show next photo"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <h2 className="w-fit font-urbanist text-2xl font-medium leading-tight sm:text-3xl lg:text-[34px]">
        {title}
      </h2>
      <p className="w-full max-w-[720px] font-urbanist text-sm leading-6 tracking-[0.02em] text-[#666] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function CompactSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex w-full scroll-mt-20 flex-col items-start gap-4">
      <SectionHeading title={title} description={description} />
      <div className="w-full max-w-[720px] rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] px-5 py-[18px] sm:px-6 sm:py-5">
        {children}
      </div>
    </section>
  );
}

function FactList({
  items,
  compact = false,
}: {
  items: LabelValuePair[];
  compact?: boolean;
}) {
  return (
    <dl
      className={`w-full divide-y divide-[#D7D7D7] ${
        compact ? "" : "border-b border-[#D7D7D7] pt-1"
      }`}
    >
      {items.map(([label, value]) => (
        <div
          key={label}
          className={`flex items-center justify-between gap-5 ${
            compact ? "py-2 first:pt-0 last:pb-0" : "py-3"
          }`}
        >
          <dt className="font-urbanist text-sm leading-none tracking-[0.02em] text-[#858585]">
            {label}
          </dt>
          <dd className="text-right font-urbanist text-sm font-semibold leading-snug tracking-[0.02em] text-[#101010]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Checklist({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: "check" | "cross";
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-[18px] sm:p-5">
      <h3 className="font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-[#101010] sm:text-lg">
        {title}
      </h3>
      <div className="flex w-full flex-col items-start gap-2.5">
        {items.map((item) => (
          <div key={item} className="flex w-full items-center gap-2">
            {icon === "check" ? <CheckIcon /> : <CrossIcon />}
            <p className="font-urbanist text-sm font-medium leading-[1.45] tracking-[0.02em] text-[#101010]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="grid w-full gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 font-urbanist text-sm leading-6 tracking-[0.02em] text-[#393939] sm:text-base"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A1A17]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DashedDivider() {
  return <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7.63 4.51C8.68 2.61 9.21 1.67 10 1.67C10.79 1.67 11.32 2.61 12.37 4.51L12.65 5C12.95 5.53 13.1 5.8 13.33 5.98C13.56 6.16 13.85 6.22 14.44 6.36L14.97 6.48C17.02 6.94 18.04 7.17 18.29 7.96C18.53 8.74 17.83 9.56 16.43 11.19L16.07 11.61C15.67 12.08 15.48 12.31 15.39 12.6C15.3 12.89 15.33 13.2 15.39 13.81L15.44 14.38C15.65 16.56 15.76 17.65 15.12 18.13C14.48 18.62 13.52 18.18 11.6 17.29L11.11 17.06C10.56 16.81 10.29 16.69 10 16.69C9.71 16.69 9.44 16.81 8.89 17.06L8.4 17.29C6.48 18.18 5.52 18.62 4.88 18.13C4.24 17.65 4.35 16.56 4.56 14.38L4.61 13.81C4.67 13.2 4.7 12.89 4.61 12.6C4.52 12.31 4.33 12.08 3.93 11.61L3.57 11.19C2.17 9.56 1.47 8.74 1.71 7.96C1.96 7.17 2.98 6.94 5.03 6.48L5.56 6.36C6.15 6.22 6.44 6.16 6.67 5.98C6.9 5.8 7.05 5.53 7.35 5L7.63 4.51Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        d="M15 6L9 12L15 18M10 12H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function PhotoGridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path
        d="M2.25 4.75C2.25 3.78 3.03 3 4 3H12C12.97 3 13.75 3.78 13.75 4.75V11.25C13.75 12.22 12.97 13 12 13H4C3.03 13 2.25 12.22 2.25 11.25V4.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M3.25 10.75L5.38 8.62C5.73 8.27 6.29 8.27 6.64 8.62L7.25 9.23L9.12 7.36C9.47 7.01 10.03 7.01 10.38 7.36L12.75 9.73"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M6 5.75H6.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      className="h-5 w-5 shrink-0 sm:h-[26px] sm:w-[26px]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0001 23.8333C7.8932 23.8333 5.33976 23.8333 3.75325 22.2468C2.16675 20.6603 2.16675 18.1069 2.16675 13C2.16675 7.89311 2.16675 5.33967 3.75325 3.75316C5.33976 2.16666 7.8932 2.16666 13.0001 2.16666C18.107 2.16666 20.6604 2.16666 22.2469 3.75316C23.8334 5.33967 23.8334 7.89311 23.8334 13C23.8334 18.1069 23.8334 20.6603 22.2469 22.2468C20.6604 23.8333 18.107 23.8333 13.0001 23.8333ZM17.3663 9.71713C17.6836 10.0344 17.6836 10.5489 17.3663 10.8662L11.9496 16.2828C11.6323 16.6001 11.1179 16.6001 10.8006 16.2828L8.63389 14.1162C8.31659 13.7989 8.31659 13.2844 8.63389 12.9671C8.95119 12.6498 9.46564 12.6498 9.78294 12.9671L11.3751 14.5593L16.2172 9.71713C16.5345 9.39983 17.049 9.39983 17.3663 9.71713Z"
        fill="#171A26"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <span
      className="relative h-5 w-5 shrink-0 sm:h-[26px] sm:w-[26px]"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#171A26] sm:w-[18px]" />
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#171A26] sm:w-[18px]" />
    </span>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.43057 8.5119C4.70014 8.19741 5.17361 8.16099 5.48811 8.43055L12 14.0122L18.5119 8.43056C18.8264 8.16099 19.2999 8.19741 19.5695 8.5119C19.839 8.8264 19.8026 9.29987 19.4881 9.56944L12.4881 15.5694C12.2072 15.8102 11.7928 15.8102 11.5119 15.5694L4.51192 9.56944C4.19743 9.29987 4.161 8.8264 4.43057 8.5119Z"
        fill="#909090"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5694 15.4881C19.2999 15.8026 18.8264 15.839 18.5119 15.5694L12 9.98779L5.48808 15.5694C5.17359 15.839 4.70011 15.8026 4.43054 15.4881C4.16098 15.1736 4.1974 14.7001 4.51189 14.4305L11.5119 8.43054C11.7928 8.1898 12.2072 8.1898 12.4881 8.43054L19.4881 14.4305C19.8026 14.7001 19.839 15.1736 19.5694 15.4881Z"
        fill="#909090"
      />
    </svg>
  );
}
