"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Shot = { src: string; width: number; height: number; alt: string };

// The cover crops its screenshots; this shows them whole without leaving the page.
export function ScreenshotViewer({
  shots,
  caption,
  children,
}: {
  shots: Shot[];
  caption: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const step = (change: number) =>
    setIndex((index + change + shots.length) % shots.length);
  const open = () => {
    if (!dialog.current?.showModal) return false;
    setIndex(0);
    dialog.current.showModal();
    return true;
  };

  return (
    <figure className="detail-art">
      <div className="detail-art-cover" onClick={open}>
        {children}
      </div>
      <figcaption>
        <span>{caption}</span>
        <a
          className="text-link"
          href={shots[0].src}
          target="_blank"
          rel="noopener noreferrer"
          aria-haspopup="dialog"
          onClick={(event) => {
            if (open()) event.preventDefault();
          }}
        >
          View real screenshots ({shots.length})
        </a>
      </figcaption>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-label="Project screenshots"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="screenshot-dialog-body">
          <Image
            key={shot.src}
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            loading="lazy"
          />
          <p aria-live="polite">
            <span>
              {index + 1} / {shots.length}
            </span>{" "}
            {shot.alt}
          </p>
          <div className="screenshot-dialog-actions">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => step(-1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => step(1)}
            >
              Next
            </Button>
            <Button
              type="button"
              className="rounded-full"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
