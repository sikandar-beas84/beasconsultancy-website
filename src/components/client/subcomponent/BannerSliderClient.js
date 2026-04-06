///  ======   New Banner Code -- start  ==========
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { env } from '@/util/constants/common';
import Image from 'next/image';

const BannerSlider = ({ bannerSlide }) => {

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const currentRef = useRef(null);
  const prevRef = useRef(null);

  const duration = 5000;

  // 🔥 Animate Slide
  const animateSlide = () => {
    const current = currentRef.current;
    const prev = prevRef.current;

    if (!current || !prev) return;

    const items = current.querySelectorAll('.anim-item');
    const img = current.querySelector('.hero-img');

    // Reset
    gsap.set(items, { opacity: 0, y: 50 });
    gsap.set(img, { scale: 1.1 });

    // Fade transition (background)
    gsap.fromTo(prev, { opacity: 1 }, { opacity: 0, duration: 1 });
    gsap.fromTo(current, { opacity: 0 }, { opacity: 1, duration: 1 });

    // Timeline
    const tl = gsap.timeline();

    tl.to(img, {
      scale: 1,
      duration: 6,
      ease: "power2.out"
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=5.5");
  };

  // 🔁 Auto Slide
  useEffect(() => {
    animateSlide();

    const timer = setTimeout(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % bannerSlide.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [index]);

  const current = bannerSlide?.[index];
  const prev = bannerSlide?.[prevIndex];

  return (
    <section className="hero-banner">

      {/* 🔹 Previous Slide (for fade out) */}
      <div className="slide prev-slide" ref={prevRef}>
        <Image
          src={`${env.BACKEND_BASE_URL}${prev?.image}`}
          alt=""
          fill
          className="hero-img"
        />
      </div>

      {/* 🔹 Current Slide */}
      <div className="slide active-slide" ref={currentRef}>
        <Image
          src={`${env.BACKEND_BASE_URL}${current?.image}`}
          alt=""
          fill
          className="hero-img"
        />

        <div className="content">
          <div className="container">
            <div className="bnr-txt">

              <p className="anim-item">{current?.slug}</p>

              <h1 className="anim-item">{current?.title}</h1>

              <p className="anim-item">{current?.description}</p>

              <div className="anim-item">
                {current?.order == 1 &&
                  <Link href={`services/analytics-and-ai`} className="bnr-btn">EXPLORE AI</Link>
                }
                {current?.order == 2 &&
                  <Link href={`/contact`} className="bnr-btn">CONTACT US</Link>
                }
                {current?.order == 3 &&
                  <Link href={`/services`} className="bnr-btn">LEARN MORE</Link>
                }
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 🔥 BUTTONS */}
      <button
        className="nav prev"
        onClick={() => {
          setPrevIndex(index);
          setIndex((index - 1 + bannerSlide.length) % bannerSlide.length);
        }}
      >
        ‹
      </button>

      <button
        className="nav next"
        onClick={() => {
          setPrevIndex(index);
          setIndex((index + 1) % bannerSlide.length);
        }}
      >
        ›
      </button>

      {/* 🔥 STYLES */}
      <style jsx>{`

        // .hero-banner {
        //   position: relative;
        //   height: 100vh;
        //   overflow: hidden;
        // }

        // .slide {
        //   position: absolute;
        //   width: 100%;
        //   height: 100%;
        //   top: 0;
        //   left: 0;
        //   opacity: 0;
        // }

        // .active-slide {
        //   opacity: 1;
        //   z-index: 2;
        // }

        // .prev-slide {
        //   z-index: 1;
        // }

        // .hero-img {
        //   object-fit: cover;
        // }

        // .content {
        //   position: absolute;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   width: 100%;
        //   color: #fff;
        // }

        // .bnr-txt {
        //   max-width: 700px;
        // }

        // .bnr-btn {
        //   margin-top: 20px;
        //   display: inline-block;
        //   background: #fff;
        //   color: #000;
        //   padding: 10px 20px;
        // }

        // /* 🔥 NAV BUTTONS */
        // .nav {
        //   position: absolute;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   z-index: 5;
        //   background: rgba(0,0,0,0.5);
        //   color: #fff;
        //   border: none;
        //   font-size: 30px;
        //   padding: 10px 15px;
        //   cursor: pointer;
        // }

        // .prev {
        //   left: 20px;
        // }

        // .next {
        //   right: 20px;
        // }

      `}</style>
    </section>
  );
};

export default BannerSlider;




///  ======   New Banner Code -- end  ==========

///  ======   OLD Banner Code -- start  ==========



// import React, { useState } from 'react'
// import Link from 'next/link'
// import Carousel from 'react-bootstrap/Carousel';
// import Container from 'react-bootstrap/Container';
// import { Col, Row } from "react-bootstrap";
// import { motion } from 'framer-motion';
// import { ArrowUpRight } from 'react-feather';
// import { env } from '@/util/constants/common';
// import Image from 'next/image';

// const BannerSlider = ({ bannerSlide }) => {

//   return (
//     <>
//       <Carousel slide={false} fade={false} interval={3000}>
//         {bannerSlide?.map((item, index) => {
//           const descriptionText = item?.description;
//           // descriptionText="Empower your digital transformation with artificial intelligence, intelligent automation, and next-gen software innovation.";
//           return (
//             <Carousel.Item key={index}>
//               <div className='banner'>
//                 <div className="banner_thumb_img">
//                   <Image
//                     src={`${env.BACKEND_BASE_URL}${item?.image}`}
//                     alt="Hero Banner"
//                     width={1600}
//                     height={800}
//                     priority={index === 0}
//                     fetchPriority={index === 0 ? "high" : "auto"}
//                     className="img-fluid"
//                     sizes="100vw"
//                   />

//                   <Carousel.Caption>
//                     <div className="banner_text_infos">
//                       <div className="container">
//                         <div className="bnr-txt">
//                           <p>{item?.slug}</p>
//                           <h1 className="drop_ani">{item?.title}</h1>
//                           <p>
//                             {/* <div className='fw-300' dangerouslySetInnerHTML={{ __html: descriptionText }} /> */}
//                             {descriptionText}
//                           </p>
//                         { item?.order == 1 &&
//                   <Link href={`services/analytics-and-ai`} className="bnr-btn thar-three">EXPLORE AI</Link>
//                 }
//                 { item?.order == 2 &&
//                   <Link href={`/contact`} className="bnr-btn thar-three">CONTACT US</Link>
//                 }
//                 { item?.order == 3 &&
//                   <Link href={`/services`} className="bnr-btn thar-three">LEARN MORE</Link>
//                 }
//                         </div>
//                       </div>
//                     </div>
//                   </Carousel.Caption>
//                 </div>
//                 <div className="scroll_down_am what1" onClick={() =>
//                   document
//                     .getElementById('what_why_panel1')
//                     ?.scrollIntoView({ behavior: 'smooth' })
//                 }>
//                   <div className="mouse_scroll">
//                     <div className="mouse">
//                       <div className="wheel"></div>
//                     </div>
//                     <div className="weh_m">
//                       <span className="m_scroll_arrows unu"></span>
//                       <span className="m_scroll_arrows doi"></span>
//                       <span className="m_scroll_arrows trei"></span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Carousel.Item>
//           );
//         })}
//       </Carousel>

//     </>
//   )
// }

// export default React.memo(BannerSlider);


///  ======   OLD Banner Code -- end  ==========