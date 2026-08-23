"use client";

import Image from 'next/image';
import type { GalleryItem } from '@/types';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="group relative rounded-lg overflow-hidden border border-[#424754]/25 bg-[#262a31] aspect-[4/3]">
          <Image
            src={item.imageUrl}
            alt={item.caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0e14]/30 to-transparent opacity-85" />
          <div className="absolute bottom-0 p-4 z-10">
            <h4 className="font-sans font-bold text-sm text-on-surface tracking-tight">{item.caption}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
