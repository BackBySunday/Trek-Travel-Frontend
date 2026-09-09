"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const snapshotRows = [
  [
    {
      src: "/Hero/mountain-ridge-trail.jpg",
      alt: "Trekkers on a sunlit ridge above mountain valleys",
      shape: "wide",
      position: "50% 65%",
    },
    {
      src: "/Hero/card-3.png",
      alt: "Trekker descending a mountain path beside a wooden railing",
      shape: "portrait",
      position: "50% 50%",
    },
    {
      src: "/Hero/card-1.png",
      alt: "Two hikers helping each other climb rocks beside a lake",
      shape: "landscape",
      position: "50% 55%",
    },
    {
      src: "/Hero/western-ghats-cliff.jpg",
      alt: "Green mountain cliffs and a hilltop fort",
      shape: "wide",
      position: "50% 65%",
    },
    {
      src: "/Featured-Destination/featured-himachal-pradesh-upper.png",
      alt: "Wooden mountain temple beneath snow-covered peaks",
      shape: "portrait",
      position: "50% 65%",
    },
  ],
  [
    {
      src: "/Hero/card-2.png",
      alt: "Backpacker walking toward a village in a rocky mountain valley",
      shape: "portrait",
      position: "50% 55%",
    },
    {
      src: "/Hero/misty-hills-dawn.jpg",
      alt: "Layers of mist drifting across green hills at dawn",
      shape: "wide",
      position: "50% 65%",
    },
    {
      src: "/Why-Trek-With-Us/Card-1.png",
      alt: "Two backpackers following a grassy hillside trail",
      shape: "portrait",
      position: "50% 50%",
    },
    {
      src: "/Hero/sahyadri-fort-sunrise.png",
      alt: "Sahyadri fort and surrounding mountains at sunrise",
      shape: "wide",
      position: "50% 55%",
    },
    {
      src: "/Featured-Destination/featured-uttarakhand-lower.png",
      alt: "Waterfall flowing through a green mountain village",
      shape: "landscape",
      position: "50% 70%",
    },
  ],
];

type Snapshot = (typeof snapshotRows)[number][number];

function SnapshotGroup({ snapshots, duplicate = false }: { snapshots: Snapshot[]; duplicate?: boolean }) {
  return (
    <ul className="snapshots-panorama-group" aria-hidden={duplicate}>
      {snapshots.map((snapshot) => (
        <li
          key={snapshot.src}
          className={`snapshots-panorama-card snapshots-panorama-card--${snapshot.shape}`}
        >
          <Image
            src={snapshot.src}
            alt={duplicate ? "" : snapshot.alt}
            fill
            draggable={false}
            className="pointer-events-none select-none object-cover"
            style={{ objectPosition: snapshot.position }}
            sizes={
              snapshot.shape === "portrait"
                ? "(min-width: 1440px) 174px, (min-width: 1024px) 12vw, 128px"
                : snapshot.shape === "wide"
                  ? "(min-width: 1440px) 460px, (min-width: 768px) 33vw, 250px"
                  : "(min-width: 1440px) 374px, (min-width: 768px) 26vw, 210px"
            }
          />
        </li>
      ))}
    </ul>
  );
}

export default function SnapshotsCarousel() {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetsRef = useRef([0, 0]);
  const dragRef = useRef<{
    id: number;
    x: number;
    offsets: number[];
  } | null>(null);

  useEffect(() => {
    let frameId = 0;
    let previousTime = performance.now();

    function wrapOffset(track: HTMLDivElement, value: number) {
      const cycleWidth = track.scrollWidth / 2;
      if (!cycleWidth) return 0;
      return ((value % cycleWidth) + cycleWidth) % cycleWidth;
    }

    function animate(time: number) {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;

      trackRefs.current.forEach((track, index) => {
        if (!track) return;
        const direction = index === 0 ? 1 : -1;
        const nextOffset = wrapOffset(track, offsetsRef.current[index] + direction * elapsed * 0.04);
        offsetsRef.current[index] = nextOffset;
        track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
      });

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  function wrapOffset(track: HTMLDivElement, value: number) {
    const cycleWidth = track.scrollWidth / 2;
    if (!cycleWidth) return 0;
    return ((value % cycleWidth) + cycleWidth) % cycleWidth;
  }

  function endDrag(pointerId: number) {
    if (dragRef.current?.id !== pointerId) return;
    dragRef.current = null;
  }

  return (
    <div
      className="snapshots-panorama"
      role="region"
      aria-roledescription="carousel"
      aria-label="Trail snapshots"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
          id: event.pointerId,
          x: event.clientX,
          offsets: [...offsetsRef.current],
        };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.id !== event.pointerId) return;

        event.preventDefault();
        const distance = event.clientX - drag.x;
        trackRefs.current.forEach((track, index) => {
          if (!track) return;
          const nextOffset = wrapOffset(track, drag.offsets[index] - distance);
          offsetsRef.current[index] = nextOffset;
          track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
        });
      }}
      onPointerUp={(event) => endDrag(event.pointerId)}
      onPointerCancel={(event) => endDrag(event.pointerId)}
      onLostPointerCapture={(event) => endDrag(event.pointerId)}
    >
      {snapshotRows.map((row, index) => (
        <div key={index} className="snapshots-panorama-row">
          <div
            ref={(element) => {
              trackRefs.current[index] = element;
            }}
            className="snapshots-panorama-track"
          >
            <SnapshotGroup snapshots={row} />
            <SnapshotGroup snapshots={row} duplicate />
          </div>
        </div>
      ))}
    </div>
  );
}
