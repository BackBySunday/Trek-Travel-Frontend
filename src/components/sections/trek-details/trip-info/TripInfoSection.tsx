import TripInfoCard from "./TripInfoCard";
import TripInfoOverview from "./TripInfoOverview";

export default function TripInfoSection() {
  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-5">
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,900px)_460px] lg:justify-between lg:gap-12 xl:gap-16">
        <TripInfoOverview />
        <TripInfoCard />
      </div>
    </section>
  );
}
