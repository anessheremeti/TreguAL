import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const Carousel = ({ items }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScrollState);
    return () => el?.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scrollByAmount(-300)}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full bg-white/10 backdrop-blur-xl shadow
          hover:bg-white/20 transition-all hidden md:block
          ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : ""}
        `}
      >
        ◀
      </button>

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto scroll-smooth 
          snap-x snap-mandatory pb-5 no-scrollbar
        "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[220px]" 
          >
            <ProductCard product={item} />
            {console.log("ITEM FROM CAROUSEL:", item)}

          </div>
          
        ))}
        
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scrollByAmount(300)}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full bg-white/10 backdrop-blur-xl shadow
          hover:bg-white/20 transition-all hidden md:block
          ${!canScrollRight ? "opacity-30 cursor-not-allowed" : ""}
        `}
      >
        ▶
      </button>
    </div>
  );
};

export default Carousel;
