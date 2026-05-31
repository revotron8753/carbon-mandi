import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { IMAGES, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

interface PhotoSlotProps {
  /** Which slot from the IMAGES registry to render. */
  slot: ImageKey;
  /** Override the default alt text. */
  alt?: string;
  /** Aspect ratio (e.g. "4/5", "16/9", "1/1"). Omit when using `fill`. */
  aspectRatio?: string;
  /** When true, ignore aspect ratio and take the parent container's full size. */
  fill?: boolean;
  /** Optional priority hint for above-the-fold images. */
  priority?: boolean;
  /** Extra classes on the outer wrapper. */
  className?: string;
  /**
   * Extra classes on the inner <Image>. Use this to override object-fit or
   * object-position, e.g. `object-cover object-right` so the focal point
   * stays visible after cropping.
   */
  imgClassName?: string;
}

/**
 * Universal photo slot. Renders an optimised <Image> when the real photo
 * is wired into IMAGES, otherwise a clean placeholder that names the
 * expected file so we never lose track of what's missing.
 */
export function PhotoSlot({
  slot,
  alt,
  aspectRatio = "4/5",
  fill = false,
  priority,
  className,
  imgClassName,
}: PhotoSlotProps) {
  const meta = IMAGES[slot];
  const altText = alt ?? meta.alt;

  return (
    <div
      style={fill ? undefined : { aspectRatio }}
      className={cn(
        "relative overflow-hidden bg-card ring-1 ring-line",
        fill ? "h-full w-full" : "w-full rounded-2xl",
        className
      )}
    >
      {meta.src ? (
        <Image
          src={meta.src}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("object-cover", imgClassName)}
          priority={priority}
        />
      ) : (
        <Placeholder filename={meta.filename} alt={altText} />
      )}
    </div>
  );
}

function Placeholder({ filename, alt }: { filename: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#eef2eb,transparent_60%),radial-gradient(circle_at_70%_80%,#f3f8f4,transparent_60%)] p-6 text-center">
      <ImageIcon size={28} strokeWidth={1.4} className="text-mission/40" />
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-mission/60">
        Photo slot
      </p>
      <p className="mt-1 max-w-[80%] text-xs font-medium text-ink-soft">
        {filename}
      </p>
      <p className="mt-3 max-w-[80%] text-[11px] leading-relaxed text-ink-muted">
        {alt}
      </p>
    </div>
  );
}
