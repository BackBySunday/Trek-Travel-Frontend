import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getOperatorSummaries } from "@/lib/operators";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trek Operators",
  description: "Browse the trek operators on BackBySunday: their treks, ratings, reviews and photos.",
  alternates: { canonical: "/operators" },
};

export default async function OperatorsDirectoryPage() {
  const operators = await getOperatorSummaries();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[#101010] [--bg:#eef1f6]">
      <header className="relative z-50 mx-auto w-full max-w-7xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6 md:pt-8 lg:px-8 xl:pt-10">
        <Navbar variant="solid" logoSrc="/Footer/footer-logo.png" />
      </header>

      <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-[30px]">
        <h1 className="font-urbanist text-3xl font-medium sm:text-4xl">Trek operators</h1>
        <p className="mt-2 max-w-xl font-urbanist text-sm text-[#666] sm:text-base">
          {operators.length > 0
            ? `${operators.length} operator${operators.length === 1 ? "" : "s"} running weekend treks on BackBySunday.`
            : "No operators have published treks yet."}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {operators.map((op) => (
            <Link
              key={op.id}
              href={`/operators/${op.slug}`}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(16,16,16,0.08)]"
            >
              <span className="relative block h-32 bg-[#F6F7F7]">
                {op.coverUrl ? (
                  <Image src={op.coverUrl} alt="" fill unoptimized={/^https?:/.test(op.coverUrl)} sizes="400px" className="object-cover" />
                ) : null}
              </span>
              <span className="flex flex-1 flex-col gap-2 p-5">
                <span className="flex items-center gap-3">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#F6F7F7] font-urbanist text-lg font-semibold">
                    {op.logoUrl ? (
                      <Image src={op.logoUrl} alt="" fill unoptimized={/^https?:/.test(op.logoUrl)} sizes="48px" className="object-cover" />
                    ) : (
                      op.name.charAt(0)
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-urbanist text-lg font-medium">{op.name}</span>
                    {op.city ? <span className="block font-urbanist text-xs text-[#8E8E8E]">{op.city}</span> : null}
                  </span>
                </span>
                {op.about ? <span className="line-clamp-2 font-urbanist text-sm text-[#666]">{op.about}</span> : null}
                <span className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 font-urbanist text-xs text-[#6b7470]">
                  <span>&#9733; {op.reviewCount > 0 ? op.rating.toFixed(1) : "New"}</span>
                  <span>{op.trekCount} {op.trekCount === 1 ? "trek" : "treks"}</span>
                  <span>{op.followerCount} followers</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
