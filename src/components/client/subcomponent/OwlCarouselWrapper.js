'use client';

import React, { useEffect, useRef, useState } from 'react';

const OwlCarouselWrapper = ({ children, className = '', ...options }) => {
  const carouselRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isOwlLoaded, setIsOwlLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side and after OWL is loaded
    if (isClient && carouselRef.current && !isOwlLoaded) {
      // Try to load OWL Carousel
      import('owl.carousel').then((Owl) => {
        if (Owl && typeof window !== 'undefined' && window.$) {
          // Initialize OWL Carousel
          window.$(carouselRef.current).owlCarousel({
            ...options,
            onInitialized: function() {
              setIsOwlLoaded(true);
            },
            onResized: function() {
              // Handle resize
            }
          });
        } else {
          console.warn('OWL Carousel or jQuery not available, using fallback');
          setIsOwlLoaded(true); // Mark as loaded to show content
        }
      }).catch((error) => {
        console.error('Error loading OWL Carousel:', error);
        setIsOwlLoaded(true); // Show content even if OWL fails
      });
    }

    // Cleanup
    return () => {
      if (isOwlLoaded && carouselRef.current && window.$) {
        try {
          window.$(carouselRef.current).owlCarousel('destroy');
        } catch (e) {
          console.warn('Error destroying OWL Carousel:', e);
        }
      }
    };
  }, [isClient, isOwlLoaded]);

  // Update options when they change
  useEffect(() => {
    if (isOwlLoaded && carouselRef.current && window.$) {
      try {
        window.$(carouselRef.current).trigger('refresh.owl.carousel');
      } catch (e) {
        console.warn('Error refreshing OWL Carousel:', e);
      }
    }
  }, [options, isOwlLoaded]);

  if (!isClient) {
    return <div className="slider-loading">Loading carousel...</div>;
  }

  return (
    <div 
      ref={carouselRef} 
      className={`owl-carousel owl-theme ${className}`}
      style={{ opacity: isOwlLoaded ? 1 : 0.7 }}
    >
      {children}
    </div>
  );
};

export default OwlCarouselWrapper;
