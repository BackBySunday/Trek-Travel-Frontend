import Image from "next/image";

export default function GalleryPanel({
  galleryImages,
  operatorName,
}: {
  galleryImages: string[];
  operatorName: string;
}) {
  return (
    <>
      <p className="mb-6 max-w-xl font-urbanist text-sm text-[#666]">
        {galleryImages.length} photos from past departures.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((image, index) => (
          <div
            key={image}
            className={`relative min-h-[210px] overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] ${
              index === 0 ? "sm:col-span-2 sm:min-h-[340px]" : ""
            }`}
          >
            <Image
              src={image}
              alt={`${operatorName} trek gallery ${index + 1}`}
              fill
              sizes={index === 0 ? "50vw" : "25vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
