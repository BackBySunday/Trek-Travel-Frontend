"use client";

import Image from "next/image";
import { useState } from "react";
import OperatorMark from "./OperatorMark";
import {
  FollowingIcon,
  FollowIcon,
  MessageIcon,
  PinIcon,
  ShareIcon,
  StatIcon,
  VerifiedTick,
} from "./OperatorIcons";
import type { Operator } from "./OperatorProfileSection";

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-[#D7D7D7]" aria-hidden="true" />;
}

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Number((value / 1000).toFixed(1))}k`;
  }

  return String(value);
}

export default function OperatorHeader({ operator }: { operator: Operator }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="mx-auto max-w-[1846px] px-[30px] pt-[25px] text-[#101010]">
      <div className="relative h-[220px] overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-[#F6F7F7] sm:h-[330px]">
        <Image
          src={operator.coverUrl}
          alt=""
          fill
          priority
          sizes="(min-width: 1920px) 1846px, calc(100vw - 2rem)"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
      </div>

      <div className="relative -mt-12 flex flex-col gap-5 sm:-mt-[72px] sm:flex-row sm:items-end sm:gap-6">
        <OperatorMark operator={operator} className="ring-4 ring-[var(--bg)]" />

        <div className="flex-1 sm:pb-1">
          <div className="flex items-center gap-2">
            <h1 className="font-urbanist text-3xl font-medium leading-tight text-[#1A1A17] sm:text-4xl">
              {operator.name}
            </h1>
            {operator.verified ? <VerifiedTick size={20} /> : null}
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-urbanist text-sm text-[#666]">
            <span className="inline-flex items-center gap-1">
              <PinIcon />
              {operator.homeBase}
            </span>
            <Dot />
            <span>Since {operator.since}</span>
            <Dot />
            <span className="inline-flex items-center gap-1">
              <span className="text-[#FEB531]">
                <StatIcon icon="star" />
              </span>
              <span className="font-medium text-[#101010]">
                {operator.rating.toFixed(1)}
              </span>
              {operator.reviewCount} reviews
            </span>
            <Dot />
            <span>{formatCount(operator.followerCount)} followers</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:translate-y-3 sm:pb-1">
          <button
            type="button"
            aria-label={isFollowing ? "Following" : "Follow"}
            aria-pressed={isFollowing}
            onClick={() => setIsFollowing((current) => !current)}
            className="group relative h-11 w-[132px] overflow-hidden rounded-full bg-[rgba(20,20,20,0.84)] font-urbanist text-sm font-medium text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#101010] transition-all duration-300 ease-out ${
                isFollowing ? "left-1" : "left-[92px]"
              }`}
            >
              {isFollowing ? <FollowingIcon /> : <FollowIcon />}
            </span>
            <span
              aria-hidden="true"
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-nowrap transition-all duration-300 ease-out ${
                isFollowing
                  ? "translate-x-5 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              Follow
            </span>
            <span
              aria-hidden="true"
              className={`absolute left-12 top-1/2 -translate-y-1/2 text-nowrap transition-all duration-300 ease-out ${
                isFollowing
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-5 opacity-0"
              }`}
            >
              Following
            </span>
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-3 rounded-full border border-[#D7D7D7] bg-white py-1 pl-4 pr-1 font-urbanist text-sm font-medium text-[#101010] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-nowrap">Message</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6F7F7] text-[#101010]">
              <MessageIcon />
            </span>
          </button>
          <button
            type="button"
            aria-label="Share organiser"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#D7D7D7] bg-white text-[#666] transition-colors hover:border-[#101010] hover:text-[#101010]"
          >
            <ShareIcon />
          </button>
        </div>
      </div>

      <p className="mt-6 max-w-2xl font-urbanist text-base leading-relaxed text-[#666]">
        {operator.bio} Trips run in small groups with certified leads, and every
        departure is insured and briefed the evening before you set off.
      </p>
    </section>
  );
}
