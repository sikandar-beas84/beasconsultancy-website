'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { env } from '../../util/constants/common';

const ServiceCardClient = ({ services }) => {
  const finalServices = useMemo(() => {
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
  }, [services]);

  return finalServices?.map((item, index) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
      <Link href={`/services/${item?.slug}`}>
        <div className="srvc-box fst-srvc-bx sevc-1 hverx">
          <Image
            width={90}
            height={90}
            src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`}
            className="img-fluid srvc-icon"
            alt={item?.name || 'service'}
            loading="lazy"
          />
          <div className="srvc-bxtx">
            <h3 className='text-center'>{item?.name}</h3>
            <p className='service-hm-desc text-center'>{item?.description}</p>
            <p className='blue-text text-center'><u>Read More...</u></p>
          </div>
        </div>
      </Link>
    </div>
  ));
};

export default React.memo(ServiceCardClient);