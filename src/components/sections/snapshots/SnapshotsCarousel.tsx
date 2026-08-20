"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties } from "react";

const snapshots = Array.from({ length: 12 }, (_, index) => index);

export default function SnapshotsCarousel() {
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const dragRef = useRef<{
    id: number;
    x: number;
    rotation: number;
  } | null>(null);

  function setRotation(value: number) {
    rotationRef.current = value;
    ringRef.current?.style.setProperty("--snapshots-drag-rotate", `${value}deg`);
  }

  function endDrag(pointerId: number) {
    if (dragRef.current?.id !== pointerId) return;

    dragRef.current = null;
    ringRef.current?.classList.remove("is-dragging");
  }

  return (
    <div
      className="snapshots-3d-scene relative mt-8 w-screen overflow-hidden sm:mt-10 lg:mt-12"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        ringRef.current?.classList.add("is-dragging");
        dragRef.current = {
          id: event.pointerId,
          x: event.clientX,
          rotation: rotationRef.current,
        };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.id !== event.pointerId) return;

        setRotation(drag.rotation - (event.clientX - drag.x) * 0.25);
      }}
      onPointerUp={(event) => endDrag(event.pointerId)}
      onPointerCancel={(event) => endDrag(event.pointerId)}
    >
      <div
        className="pointer-events-none absolute -bottom-4 -top-4 left-0 z-10 w-4 bg-[rgba(253,253,253,0.60)] blur-[9.45px] sm:w-5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -top-4 right-0 z-10 w-4 bg-[rgba(253,253,253,0.60)] blur-[9.45px] sm:w-5"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="snapshots-3d-ring"
        style={{ "--snapshot-count": snapshots.length } as CSSProperties}
      >
        {snapshots.map((snapshot) => (
          <div
            key={snapshot}
            className="snapshots-3d-card"
            style={{ "--snapshot-index": snapshot } as CSSProperties}
          >
            <Image
              src="/Hero/card-3.png"
              alt={
                snapshot === 0
                  ? "Trekker walking along a mountain trail"
                  : ""
              }
              fill
              className="pointer-events-none select-none object-cover"
              sizes="(min-width: 1024px) 280px, 45vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
