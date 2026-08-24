import Image from "next/image";
import Link from "next/link";

export type FeaturedDestinationCardProps = {
  image: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  isTall?: boolean;
  href?: string;
};

export default function FeaturedDestinationCard({
  image,
  alt,
  label,
  title,
  description,
  isTall = false,
  href = "/trek-details",
}: FeaturedDestinationCardProps) {
  return (
    <Link
      href={href}
      className={`featured-destination-card group relative min-h-[280px] overflow-hidden rounded-[30px] bg-[#d9d9d9] no-underline outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#101010] ${
        isTall ? "is-tall" : ""
      }`}
      aria-label={`View details for ${title}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-[#181818]/20 to-[#666]/0" />
      <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
        <span className="trek-pill-glass h-7 px-3 font-urbanist text-xs leading-none sm:h-8 sm:px-4 sm:text-sm">
          <span className="trek-pill-glass-effect" />
          <span className="trek-pill-glass-tint" />
          <span className="trek-pill-glass-shine" />
          <span className="trek-pill-glass-content">{label}</span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 overflow-hidden p-4 text-left sm:p-5 lg:p-6">
        <h3 className="w-full font-urbanist text-lg font-semibold leading-tight tracking-[-0.001em] text-white sm:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="w-full max-w-[526px] font-urbanist text-sm font-medium leading-snug text-white sm:text-[15px] lg:text-lg">
          {description}
        </p>
      </div>
    </Link>
  );
}
