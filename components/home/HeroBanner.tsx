"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero/h6.jpg",
    badge: "New Arrivals 🎉",
    heading: "Shop Everything",
    highlight: "You Love",
    subtext: "Clothing, Appliances, Kitchen & Cosmetics — all in one place.",
    cta: { label: "Shop Now →", href: "/products" },
    overlay: "bg-black/50",
  },
  {
    image: "/hero/h0.jpg",
    badge: "Top Picks 🔥",
    heading: "Style That",
    highlight: "Speaks Volumes",
    subtext: "Discover the latest fashion trends delivered fast across Nigeria.",
    cta: { label: "Shop Clothing →", href: "/products?category=clothing" },
    overlay: "bg-black/40",
  },
  {
    image: "/hero/app.jpg",
    badge: "Best Deals 💥",
    heading: "Equip Your",
    highlight: "Home & Kitchen",
    subtext: "Premium appliances and kitchen essentials at the best prices.",
    cta: { label: "Shop Appliances →", href: "/products?category=appliances" },
    overlay: "bg-black/50",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Go to a specific slide with transition
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const prevSlide = () => {
    const newIndex = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(newIndex);
  };

  const nextSlide = useCallback(() => {
    const newIndex = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(newIndex);
  }, [current, goToSlide]);

  // Auto advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer); // cleanup on unmount
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <section className="relative h-[88vh] flex items-center overflow-hidden">

      {/* Background Images — all mounted, only current is visible */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={`Slide ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover object-center"
          />
          {/* Overlay per slide */}
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      {/* Content */}
      <div
        className={`relative z-10 w-full transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-xl ">

          {/* Badge */}
          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            {slide.badge}
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {slide.heading} <br />
            <span className="text-orange-400">{slide.highlight}</span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-gray-100 mb-8 leading-relaxed max-w-md drop-shadow">
            {slide.subtext}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href={slide.cta.href}
              className="bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold hover:bg-orange-600 transition-all text-sm shadow-lg"
            >
              {slide.cta.label}
            </Link>
            <Link
              href="/products"
              className="bg-white/20 text-white border border-white/40 px-7 py-3.5 rounded-full font-bold hover:bg-white/30 transition-all text-sm"
            >
              Browse All
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 md:gap-10">
            {[
              { value: "500+", label: "Products" },
              { value: "2k+", label: "Customers" },
              { value: "Fast", label: "Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-xl md:text-2xl font-bold text-orange-400">{stat.value}</p>
                <p className="text-gray-300 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 text-white p-2.5 rounded-full hover:bg-white/40 transition-all border border-white/30"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 text-white p-2.5 rounded-full hover:bg-white/40 transition-all border border-white/30"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-orange-500 w-3 h-1"
                : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </section>
  );
}