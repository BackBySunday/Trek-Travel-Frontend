import SectionBadge from "@/components/layout/SectionBadge";
import TrekCard, {
  TrekCardGlassFilters,
  type TrekCardProps,
} from "@/components/layout/TrekCard";
import TopCategoriesIntro from "./TopCategoriesIntro";
import ViewAllTreksButton from "./ViewAllTreksButton";

const trekCards: TrekCardProps[] = [
  {
    title: "Vasota Fort Trek",
    description:
      "A boat ride from Bamnoli leads into Koyna forest trails, Shivsagar backwater views, and remote fort ruins.",
    image: "/Top-Categories/vasota-fort-trek.png",
    alt: "Trekkers climbing rocks near a lake",
    durationTag: "1D",
    rating: "4.4",
    ratingCount: "92",
    altitude: "3,842 ft",
    difficulty: "Moderate",
    duration: "4-7 Hours",
    spots: "18 left",
    nextDeparture: "Sat, 19 Sep",
    operator: "JKL Trek",
    price: "₹ 1,900",
  },
  {
    title: "Lohagad Fort Trek",
    description:
      "An easy Lonavala fort route known for stone gates, Vinchu Kata ramparts, and Pawna Lake views.",
    image: "/Top-Categories/lohagad-fort-trek.png",
    alt: "Vertical trek destination preview",
    durationTag: "1D",
    rating: "4.7",
    ratingCount: "128",
    altitude: "3,389 ft",
    difficulty: "Easy",
    duration: "1-2 Hours",
    spots: "12 left",
    nextDeparture: "Sun, 20 Sep",
    operator: "Travel Trek",
    price: "₹ 1,250",
  },
  {
    title: "Rajmachi Trail",
    description:
      "A Lonavala-Karjat trail to Udhewadi and the twin forts of Shrivardhan and Manaranjan.",
    image: "/Top-Categories/rajmachi-trail.png",
    alt: "Adventure destination preview",
    durationTag: "1N/2D",
    rating: "4.6",
    ratingCount: "116",
    altitude: "2,710 ft",
    difficulty: "Easy-Moderate",
    duration: "5-6 Hours",
    spots: "9 left",
    nextDeparture: "Sat, 26 Sep",
    operator: "JKL Trek",
    price: "₹ 2,100",
  },
  {
    title: "Harishchandragad",
    description:
      "A route-dependent Sahyadri fort trek with Konkan Kada, cave temples, and Taramati Peak views.",
    image: "/Top-Categories/harishchandragad-trek.png",
    alt: "Trekkers climbing a rocky trail",
    durationTag: "2D/1N",
    rating: "4.8",
    ratingCount: "154",
    altitude: "4,671 ft",
    difficulty: "Moderate-Hard",
    duration: "7 Hours",
    spots: "6 left",
    nextDeparture: "Fri, 2 Oct",
    operator: "Wild Trails",
    price: "₹ 2,850",
  },
  {
    title: "Kalsubai Peak",
    description:
      "Climb Maharashtra's highest peak from Bari village, with iron ladders, ridges, and summit views.",
    image: "/Top-Categories/kalsubai-peak.png",
    alt: "Mountain trek destination preview",
    durationTag: "1N/1D",
    rating: "4.7",
    ratingCount: "139",
    altitude: "5,400 ft",
    difficulty: "Moderate",
    duration: "3-4 Hours",
    spots: "14 left",
    nextDeparture: "Sat, 10 Oct",
    operator: "Peak Route",
    price: "₹ 1,750",
  },
  {
    title: "Devkund Waterfall",
    description:
      "A Bhira forest trail with rocky patches and stream crossings leading to a blue plunge waterfall.",
    image: "/Top-Categories/devkund-waterfall.png",
    alt: "Forest adventure destination preview",
    durationTag: "1D",
    rating: "4.5",
    ratingCount: "87",
    altitude: "1,545 ft",
    difficulty: "Easy-Moderate",
    duration: "5-6 Hours",
    spots: "20 left",
    nextDeparture: "Sun, 5 Oct",
    operator: "Travel Trek",
    price: "₹ 1,550",
  },
  {
    title: "Andharban Forest",
    description:
      "A descending Tamhini Ghat forest trail from Pimpri toward Bhira backwaters through dense canopy.",
    image: "/Top-Categories/andharban-forest.png",
    alt: "Trekkers on a scenic trail",
    durationTag: "1D",
    rating: "4.6",
    ratingCount: "103",
    altitude: "2,160 ft",
    difficulty: "Moderate",
    duration: "5-6 Hours",
    spots: "8 left",
    nextDeparture: "Sat, 26 Sep",
    operator: "Wild Trails",
    price: "₹ 1,800",
  },
  {
    title: "Sandhan Valley",
    description:
      "A Samrad village canyon route through narrow basalt walls, boulder sections, and rappelling patches.",
    image: "/Top-Categories/sandhan-valley.png",
    alt: "Vertical mountain route preview",
    durationTag: "2D/1N",
    rating: "4.8",
    ratingCount: "121",
    altitude: "1,200 ft",
    difficulty: "Moderate-Hard",
    duration: "2D",
    spots: "5 left",
    nextDeparture: "Sat, 7 Nov",
    operator: "Peak Route",
    price: "₹ 3,200",
  },
];

export default function TopCategoriesSection() {
  return (
    <section id="treks" className="w-full bg-[var(--bg)] px-4 pb-10 pt-16 text-[#101010] sm:pb-12 lg:px-[30px]">
      <TrekCardGlassFilters />
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 sm:gap-6">
        <SectionBadge>Tour Categories</SectionBadge>
        <TopCategoriesIntro />
        <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-5 lg:mt-10 xl:grid-cols-4">
          {trekCards.map((card) => (
            <TrekCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-5 flex w-full justify-center sm:mt-8">
          <ViewAllTreksButton />
        </div>
      </div>
    </section>
  );
}
