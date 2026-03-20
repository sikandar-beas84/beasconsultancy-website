import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { env } from '../../util/constants/common';

// This is now a Server Component (no 'use client' directive)
const ServiceCard = async ({ services }) => {
  // Helper function to process services (can be used in both server and client if needed)
  const processServices = (services) => {
    if (!Array.isArray(services)) return [];

    const expandedServices = services.flatMap((item) => {
      if (item.slug === "application-solutioning") {
        return Array.isArray(item.children) ? item.children : [];
      }
      return [item];
    });

    const bottomSlugs = new Set(["ui-ux", "professional-services"]);

    return expandedServices.sort((a, b) => {
      const aLast = bottomSlugs.has(a.slug);
      const bLast = bottomSlugs.has(b.slug);

      if (aLast && !bLast) return 1;
      if (!aLast && bLast) return -1;
      return 0;
    });
  };

  const finalServices = processServices(services);

  return (
    <>
      {finalServices?.map((item, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={item?.id || index}>
          <Link href={`/services/${item?.slug}`} className="text-decoration-none">
            <div className="srvc-box fst-srvc-bx sevc-1 hverx">
              {item?.menu_contents?.icon && (
                <Image
                  width={90}
                  height={90}
                  src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`}
                  className="img-fluid srvc-icon"
                  alt={item?.name || 'service'}
                  loading="lazy"
                />
              )}
              <div className="srvc-bxtx">
                <h3 className='text-center'>{item?.name}</h3>
                <p className='service-hm-desc text-center'>{item?.description}</p>
                <p className='blue-text text-center'><u>Read More...</u></p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ServiceCard;