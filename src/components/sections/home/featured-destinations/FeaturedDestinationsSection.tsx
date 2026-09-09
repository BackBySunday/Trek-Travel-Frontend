import SectionBadge from "@/components/layout/SectionBadge";
import FeaturedDestinationCard, {
  type FeaturedDestinationCardProps,
} from "./FeaturedDestinationCard";
import FeaturedDestinationsIntro from "./FeaturedDestinationsIntro";

const destinationTitle = "Vasota Fort Trek";
const destinationDescription =
  "Vasota Fort is located at an altitude of 1171 m near Bamnoli village in Satara district.";

const destinationColumns: FeaturedDestinationCardProps[][] = [
  [
    {
      image: "/Featured-Destination/featured-himachal-pradesh-upper.png",
      alt: "Featured travel destination upper card one",
      label: "Himachal Pradesh",
      title: destinationTitle,
      description: destinationDescription,
    },
    {
      image: "/Featured-Destination/featured-uttarakhand-lower.png",
      alt: "Featured travel destination lower card one",
      label: "Uttrakhand",
      title: destinationTitle,
      description: destinationDescription,
    },
  ],
  [
    {
      image: "/Featured-Destination/featured-pune-tall.png",
      alt: "Featured travel destination upper card two",
      label: "Pune",
      title: destinationTitle,
      description: destinationDescription,
      isTall: true,
    },
    {
      image: "/Featured-Destination/featured-uttarakhand-secondary.png",
      alt: "Featured travel destination lower card two",
      label: "uttrakhand",
      title: destinationTitle,
      description: destinationDescription,
    },
  ],
  [
    {
      image: "/Featured-Destination/featured-pune-upper.png",
      alt: "Featured travel destination upper card three",
      label: "Pune",
      title: destinationTitle,
      description: destinationDescription,
    },
    {
      image: "/Featured-Destination/featured-pune-lower.png",
      alt: "Featured travel destination lower card three",
      label: "Pune",
      title: destinationTitle,
      description: destinationDescription,
    },
  ],
];

export default function FeaturedDestinationsSection() {
  return (
    <section id="destinations" className="featured-destinations-section w-full bg-[var(--bg)] px-4 py-12 text-[#101010] sm:py-16 lg:px-[30px]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 sm:gap-6">
        <SectionBadge>Featured Destinations</SectionBadge>
        <FeaturedDestinationsIntro />
        <div className="featured-destination-grid mt-8 grid w-full gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {destinationColumns.map((column, columnIndex) => (
            <div
              key={column.map((destination) => destination.image).join("-")}
              className={`featured-destination-column ${
                columnIndex === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {column.map((destination) => (
                <FeaturedDestinationCard key={destination.image} {...destination} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
