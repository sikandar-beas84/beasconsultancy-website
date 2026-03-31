'use client';

// RESTORED - Working dynamic import with hydration prevention
import dynamic from 'next/dynamic';
import React from 'react';

const BannerCarousal = dynamic(() => import('./subcomponent/BannerCarousal'), {
  ssr: false, // Disable server-side rendering to prevent hydration mismatch
  loading: () => <div className="slider-loading">Loading carousel...</div> // Loading state
});

const BannerCarousalClient = (props) => {
  // OLD CODE - No client-side check
  // return <BannerCarousal {...props} />;
  
  // NEW CODE - Additional client-side check to prevent hydration
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className="slider-loading">Loading carousel...</div>;
  }
  
  return <BannerCarousal {...props} />;
};

export default BannerCarousalClient;