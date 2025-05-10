// MainCarousel.js
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';
import './MainCarouselStyles.css';

const MainCarousel = () => {
    const items = mainCarouselData.map((item) => (
        <div className="carousel-item">
            <img className='cursor-pointer w-full h-auto object-cover' role='presentation' src={item.image} alt="" />
        </div>
    ));

    const responsive = {
        0: { items: 1 },     // 1 item on very small screens
        600: { items: 1 },   // 1 item on slightly larger screens
        960: { items: 1 },   // 1 item on medium screens
        1280: { items: 1 },  // 1 item on large screens
        // Add or adjust breakpoints as needed to ensure only 1 item is shown
    };

    return (
        <div className="main-carousel-container">
            <AliceCarousel
                items={items}
                disableButtonsControls={mainCarouselData.length <= 1} // Hide buttons if only one item
                autoPlay
                autoPlayInterval={3000}
                infinite={mainCarouselData.length > 1} // Only infinite if more than one item
                responsive={responsive}
                mouseTracking
                touchTracking
                disablePrevAndNextButtons // This line removes the arrows
            />
        </div>
    );
};

export default MainCarousel;