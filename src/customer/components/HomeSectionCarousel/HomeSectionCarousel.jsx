// src/customer/components/HomeSectionCarousel/HomeSectionCarousel.jsx
import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../components/HomeSectionCard/HomeSectionCard.css"; // Corrected import path

const categories = [
  { image: "/images/mugs.jpg", title: "Mugs", description: "Personalized, printed, and color-changing mugs" },
  { image: "/images/lamps.jpg", title: "Lamps", description: "Night lamps, LED lamps, decorative lamps" },
  { image: "/images/accessories.jpg", title: "Accessories", description: "Watches, sunglasses, handbags" },
  { image: "/images/softtoys.jpg", title: "Soft Toys", description: "Teddy bears, plush toys, stuffed animals" },
  { image: "/images/gourmet.jpg", title: "Gourmet & Chocolates", description: "Premium chocolates, snack baskets, coffee blends" },
  { image: "/images/books.jpg", title: "Books & Stationery", description: "Journals, planners, bookmarks" },
  { image: "/images/props.jpg", title: "Party Props", description: "Party decorations, greeting cards, balloons" },
  { image: "/images/figurines.jpg", title: "Figurines", description: "Collectible showpieces, idols, and decorative statues" },
  { image: "/images/vases.jpg", title: "Vases", description: "Elegant ceramic, glass, and wooden vases" },
  { image: "/images/photoframes.jpg", title: "Photo Frames", description: "Classic, modern, and customized picture frames" }
];

const HomeSectionCarousel = () => {
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 }
  };

  const items = categories.map((category, index) => (
    <HomeSectionCard key={index} image={category.image} title={category.title} description={category.description} />
  ));

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  return (
    <div className="relative px-4 lg:px-8">
      <h3 className="text-2xl font-semibold mb-4">Shop by Categories</h3>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableDotsControls
          disableButtonsControls
          infinite
          responsive={responsive}
        />

        {/* Left Arrow */}
        <button
          onClick={slidePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-50 hover:bg-gray-100 focus:outline-none"
        >
          <KeyboardArrowLeftIcon />
        </button>

        {/* Right Arrow */}
        <button
          onClick={slideNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-50 hover:bg-gray-100 focus:outline-none"
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;