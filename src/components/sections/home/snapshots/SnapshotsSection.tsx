import SectionBadge from "@/components/layout/SectionBadge";
import SnapshotsCarousel from "./SnapshotsCarousel";
import SnapshotsIntro from "./SnapshotsIntro";

export default function SnapshotsSection() {
  return (
    <section className="w-full bg-white py-12 text-[#101010] sm:py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-4 text-center sm:gap-6 lg:px-[30px]">
        <SectionBadge>Snapshots</SectionBadge>
        <SnapshotsIntro />
      </div>
      <SnapshotsCarousel />
    </section>
  );
}
