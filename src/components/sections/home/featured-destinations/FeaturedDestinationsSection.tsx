import SectionBadge from "@/components/layout/SectionBadge";
import FeaturedDestinationCard, {
  type FeaturedDestinationCardProps,
} from "./FeaturedDestinationCard";
import FeaturedDestinationsIntro from "./FeaturedDestinationsIntro";

const destinationColumns: FeaturedDestinationCardProps[][] = [
  [
    {
      image: "/Featured-Destination/featured-himachal-pradesh-upper.png",
      alt: "Wooden Himachali temple with snow covered Himalayan mountains",
      label: "Himachal Pradesh",
      title: "Himachal Temple Valley",
      description:
        "A wooden Himalayan temple complex framed by snow peaks, cedar slopes, and mountain village views.",
    },
    {
      image: "/Featured-Destination/featured-uttarakhand-lower.png",
      alt: "Green Uttarakhand valley village with terraced fields and streams",
      label: "Uttarakhand",
      title: "Uttarakhand Valley Retreat",
      description:
        "Terraced hill villages, pine-covered slopes, and clear mountain streams below cloudy Himalayan ridges.",
    },
  ],
  [
    {
      image: "/Featured-Destination/featured-jaipur-amer-fort.png",
      alt: "Amer Fort and hill ramparts overlooking Maota Lake in Jaipur",
      label: "Rajasthan",
      title: "Jaipur Amer Fort",
      description:
        "Sandstone fort walls, Aravalli hill ramparts, and lake views from one of Jaipur's classic heritage landmarks.",
      isTall: true,
    },
    {
      image: "/Featured-Destination/featured-uttarakhand-secondary.png",
      alt: "Trekkers looking across a rocky high altitude Himalayan pass",
      label: "Ladakh",
      title: "High Himalayan Pass",
      description:
        "A rugged high-altitude trail across barren ridges, wide valleys, and cloud-brushed mountain passes.",
    },
  ],
  [
    {
      image: "/Featured-Destination/featured-pune-upper.png",
      alt: "Agra Fort walls overlooking the Yamuna with the Taj Mahal in the distance",
      label: "Agra",
      title: "Agra Fort & Taj View",
      description:
        "Red sandstone fort walls overlooking the Yamuna, with the Taj Mahal visible across the river.",
    },
    {
      image: "/Featured-Destination/featured-pune-lower.png",
      alt: "Misty Himalayan trekking trail beside a rocky mountain stream",
      label: "Himachal Pradesh",
      title: "Hampta Valley Trek",
      description:
        "A misty Himalayan trail following a cold mountain stream through rocky meadows and green valley slopes.",
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
