'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { env } from '../../util/constants/common';
import { useInView } from 'framer-motion';

const StatCounterClient = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Add your counter animation logic here
      const counters = document.querySelectorAll('.count-number');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
          const count = parseInt(counter.innerText);
          const increment = target / 100;
          
          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
          }
        };
        updateCount();
      });
    }
  }, [isInView]);

  return stats?.map((item, index) => (
    <div className="counter col-lg-3 col-md-6 col-sm-6 col-6" key={index} ref={ref}>
      <div className="stat-box">
        <div className="stat-img">
          <Image 
            width={100} 
            height={100} 
            style={{ minWidth: "42px" }} 
            src={`${env.BACKEND_BASE_URL}${item.icon}`} 
            alt={item.title}
            loading="lazy" 
          />
        </div>
        <div className="d-flexrt">
          <h3 className="count-number">{item?.short_desc}</h3>
        </div>
        <p>{item?.title}</p>
      </div>
    </div>
  ));
};

export default StatCounterClient;