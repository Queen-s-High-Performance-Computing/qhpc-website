"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Images, X } from "lucide-react";

const photographs = [
  {
    src: "/projects/qhpc-rack-img-3168-2026.webp",
    alt: "QHPC five-board Raspberry Pi rack with the vertical Ethernet switch and short connecting cables",
    caption: "Five Raspberry Pis, removable trays, and the integrated switch",
  },
  {
    src: "/projects/qhpc-rack-img-3163-2026.webp",
    alt: "White QHPC Raspberry Pi rack with the embossed side logo, cables, and switch",
    caption: "White enclosure, custom side panel, and cable routing",
  },
] as const;

/** An accessible photo preview without navigating away from the homepage. */
export function RackPhotoLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const open = () => {
    setIndex(0);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const showPrevious = () => setIndex((i) => (i + photographs.length - 1) % photographs.length);
  const showNext = () => setIndex((i) => (i + 1) % photographs.length);
  const photo = photographs[index];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="mt-4 flex w-full items-center gap-3 rounded-xl border border-border bg-surface-raised p-3 text-left transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Open photographs of the assembled QHPC Raspberry Pi rack"
      >
        <Image
          src={photographs[0].src}
          alt=""
          width={72}
          height={80}
          className="h-[80px] w-[72px] shrink-0 rounded-lg object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-text-primary">View the finished rack</span>
          <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
            Two photos of the assembled cluster
          </span>
        </span>
        <Images className="mr-1 shrink-0 text-primary" size={20} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="QHPC Raspberry Pi rack photo gallery"
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); showPrevious(); }
          if (event.key === "ArrowRight") { event.preventDefault(); showNext(); }
        }}
        className="m-auto max-h-[96dvh] w-[min(92vw,970px)] max-w-none overflow-hidden rounded-2xl border border-[#344b70] bg-[#0c1e3c] p-0 text-white shadow-2xl backdrop:bg-[#020817]/85"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-base font-semibold sm:text-lg">QHPC Raspberry Pi cluster</h2>
            <p className="text-xs text-[#b5c8e5]">The assembled rack · {index + 1} of {photographs.length}</p>
          </div>
          <button type="button" onClick={close} aria-label="Close photos" className="rounded-lg p-2 text-[#cfddf5] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex h-[min(64dvh,590px)] items-center justify-center bg-[#07162a] p-3 sm:p-5">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 970px) 92vw, 920px"
            className="object-contain p-3 sm:p-5"
            priority={false}
          />
          <button type="button" onClick={showPrevious} aria-label="Previous photo" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-[#0c1e3c]/80 p-2 text-white hover:bg-[#1a385f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" onClick={showNext} aria-label="Next photo" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-[#0c1e3c]/80 p-2 text-white hover:bg-[#1a385f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <p className="text-sm text-[#d4e1f5]">{photo.caption}</p>
          <div className="flex shrink-0 gap-2" aria-label="Choose a photo">
            {photographs.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-label={`View photo ${itemIndex + 1}`}
                aria-current={index === itemIndex ? "true" : undefined}
                className={`h-2.5 w-2.5 rounded-full border border-white/70 ${index === itemIndex ? "bg-white" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
