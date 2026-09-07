"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CloseIcon,
  ExternalLinkIcon,
  PlayIcon,
} from "../OperatorIcons";
import type { OperatorVideo } from "../OperatorProfileSection";

function VideoCard({
  video,
  featured = false,
  className = "",
  onOpen,
}: {
  video: OperatorVideo;
  featured?: boolean;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative min-h-[240px] overflow-hidden rounded-[20px] border border-[#DDE2EA] bg-[#F6F7F7] text-left outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#101010] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] sm:min-h-[280px] ${className}`}
    >
      <Image
        src={video.thumb}
        alt=""
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 760px" : "420px"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 transition-colors group-hover:from-black/78" />
      <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition-transform group-hover:scale-110">
        <PlayIcon />
      </span>
      <span className="absolute right-3 top-3 rounded bg-black/70 px-1.5 py-0.5 font-urbanist text-xs font-medium text-white">
        {video.duration}
      </span>
      <span
        className={`absolute inset-x-0 bottom-0 flex flex-col p-4 text-white ${
          featured ? "sm:p-6" : "sm:p-5"
        }`}
      >
        <span
          className={`line-clamp-2 font-urbanist font-medium leading-tight ${
            featured ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {video.title}
        </span>
        <span className="mt-1 font-urbanist text-xs text-white/65">
          {video.views} views - {video.posted}
        </span>
      </span>
    </button>
  );
}

export default function VideosPanel({
  operatorName,
  videos,
}: {
  operatorName: string;
  videos: OperatorVideo[];
}) {
  const [active, setActive] = useState<OperatorVideo | null>(null);
  const [featured, ...rest] = videos;

  useEffect(() => {
    if (!active) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!featured) {
    return (
      <p className="py-10 text-center font-urbanist text-sm text-[#666]">
        This organiser hasn&apos;t posted videos yet.
      </p>
    );
  }

  return (
    <>
      <p className="mb-6 max-w-xl font-urbanist text-sm leading-6 text-[#666]">
        Route walk-throughs, gear talks and trail films posted by {operatorName}.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:auto-rows-[190px] lg:grid-cols-6">
        <VideoCard
          video={featured}
          featured
          className="sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-0"
          onOpen={() => setActive(featured)}
        />
        {rest.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            className={
              index < 2
                ? "lg:col-span-2 lg:min-h-0"
                : "lg:col-span-2 lg:row-span-2 lg:min-h-0"
            }
            onOpen={() => setActive(video)}
          />
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:text-white"
          >
            <CloseIcon />
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-[20px]">
              <Image
                src={active.thumb}
                alt=""
                fill
                sizes="90vw"
                className="object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/40">
                <a
                  href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-urbanist text-sm font-medium text-black transition-transform hover:scale-105"
                >
                  <PlayIcon />
                  Play video
                </a>
              </span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-urbanist text-base font-medium text-white">
                  {active.title}
                </p>
                <p className="font-urbanist text-xs text-white/60">
                  {active.views} views - {active.posted}
                </p>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 font-urbanist text-xs text-white/70 hover:text-white"
              >
                YouTube
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
