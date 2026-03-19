'use client';

import Image from 'next/image';
import { env } from '../../util/constants/common';
import TechnologySlider from './subcomponent/TechnologySlider';

const TechnologySliderClient = ({ technologies }) => {
  const sortedTechnologies = [...(technologies || [])]
    .sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <TechnologySlider>
      {sortedTechnologies.map((item, i) => (
        <div key={i} className='technology-wrap'>
          <Image
            width={100}
            height={100}
            src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`}
            alt={item.name}
            className="tech-img"
            loading="lazy"
          />
          <div 
            dangerouslySetInnerHTML={{ __html: item.description }} 
            className='mb-0 technology-name'
          />
        </div>
      ))}
    </TechnologySlider>
  );
};

export default TechnologySliderClient;