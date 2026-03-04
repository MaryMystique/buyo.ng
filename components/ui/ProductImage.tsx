 "use client";
 import Image from "next/image";
 import { useState } from "react";

 interface ProductImageProps {
  src: string;
  alt: string;
  emoji: string;
  fill?: boolean;
  className?: string;
 }

 export default function ProductImage({
  src,
  alt,
  emoji,
  fill = false,
  className = "",
 }: ProductImageProps) {
  const [error, setError] = useState(false);

  // If no image path or image failed to load, show emoji fallback
  if (!src || error) {
    return (
      <div className={`flex items-center justify-center text-6xl ${className}`}>
        {emoji}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}