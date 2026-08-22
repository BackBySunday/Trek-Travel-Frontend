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
      "Vasota Fort is located near Bamnoli village in Satara, surrounded by dense forest and lake views.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Trekkers climbing rocks near a lake",
    durationTag: "1N/2D",
    rating: "4.4",
    altitude: "2,000 ft",
    difficulty: "Moderate",
    duration: "4 Hours",
    operator: "JKL Trek",
    price: "₹ 1,900",
  },
  {
    title: "Lohagad Fort Trek",
    description:
      "A scenic Sahyadri route with strong fort walls, green valleys, and beginner-friendly trail sections.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Vertical trek destination preview",
    durationTag: "1D",
    rating: "4.7",
    altitude: "3,389 ft",
    difficulty: "Easy",
    duration: "3 Hours",
    operator: "Travel Trek",
    price: "₹ 1,250",
  },
  {
    title: "Rajmachi Trail",
    description:
      "Walk through forest paths, waterfalls, and old trade routes leading toward twin hill forts.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Adventure destination preview",
    durationTag: "1N/2D",
    rating: "4.6",
    altitude: "2,710 ft",
    difficulty: "Moderate",
    duration: "5 Hours",
    operator: "JKL Trek",
    price: "₹ 2,100",
  },
  {
    title: "Harishchandragad",
    description:
      "A classic mountain trek known for dramatic cliffs, temple ruins, and sunrise views.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Trekkers climbing a rocky trail",
    durationTag: "2D/1N",
    rating: "4.8",
    altitude: "4,671 ft",
    difficulty: "Hard",
    duration: "7 Hours",
    operator: "Wild Trails",
    price: "₹ 2,850",
  },
  {
    title: "Kalsubai Peak",
    description:
      "Climb Maharashtra's highest peak with ridge views, iron ladders, and open summit skies.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Mountain trek destination preview",
    durationTag: "1N/1D",
    rating: "4.7",
    altitude: "5,400 ft",
    difficulty: "Moderate",
    duration: "6 Hours",
    operator: "Peak Route",
    price: "₹ 1,750",
  },
  {
    title: "Devkund Waterfall",
    description:
      "A refreshing forest trail ending at a blue plunge pool and waterfall hidden in the hills.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Forest adventure destination preview",
    durationTag: "1D",
    rating: "4.5",
    altitude: "2,700 ft",
    difficulty: "Easy",
    duration: "4 Hours",
    operator: "Travel Trek",
    price: "₹ 1,550",
  },
  {
    title: "Andharban Forest",
    description:
      "Descend through dense canopies, misty valleys, and monsoon-fed streams in the Sahyadris.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Trekkers on a scenic trail",
    durationTag: "1D",
    rating: "4.6",
    altitude: "2,160 ft",
    difficulty: "Moderate",
    duration: "5 Hours",
    operator: "Wild Trails",
    price: "₹ 1,800",
  },
  {
    title: "Sandhan Valley",
    description:
      "Explore a dramatic canyon route with rock patches, narrow passages, and stargazing camps.",
    image: "/Top-Categories/Trek-Card.png",
    alt: "Vertical mountain route preview",
    durationTag: "2D/1N",
    rating: "4.8",
    altitude: "4,255 ft",
    difficulty: "Hard",
    duration: "8 Hours",
    operator: "Peak Route",
    price: "₹ 3,200",
  },
];

export default function TopCategoriesSection() {
  return (
    <section className="w-full bg-white px-4 pb-10 pt-16 text-[#101010] sm:pb-12 lg:px-5">
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
