'use client'; // new-edit

import React, { useEffect, useRef, useState } from 'react';
// SLICK CAROUSEL IMPORTS (COMMENTED OUT - KEEP FOR REFERENCE)
// import Slider from 'react-slick';
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import { useRouter } from 'next/navigation';
import { env } from '@/util/constants/common';
import Image from 'next/image';
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

// OWL CAROUSEL IMPORTS
import dynamic from 'next/dynamic';
// CSS imports moved to globals.css to avoid @import issues

// OWL Carousel Code Start
// Direct import of custom wrapper to avoid module resolution issues
import OwlCarousel from './OwlCarouselWrapper';
// OWL Carousel Code End

// OLD DYNAMIC IMPORT - Not needed here, handled in BannerCarousalClient
const BannerCarousal = ({ page, technologiya, clients, projects, testimonials, blogs, technologies }) => {

  const router = useRouter();
  
  // OLD CODE - Slick slider ref
  // const sliderRef = useRef(null);
  
  // OWL Carousel Code Start
  const owlRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  // OWL Carousel Code End

  // OLD CODE - Slick useEffect for refresh
  // useEffect(() => {
  //   setIsMounted(true);
  //   
  //   const timer1 = setTimeout(() => {
  //     window.dispatchEvent(new Event('resize'));
  //     
  //     if (sliderRef.current && sliderRef.current.innerSlider) {
  //       sliderRef.current.innerSlider.onWindowResized();
  //     }
  //     
  //     if (sliderRef.current && sliderRef.current.slickGoTo) {
  //       sliderRef.current.slickGoTo(0, true);
  //     }
  //   }, 300);
  //   
  //   const timer2 = setTimeout(() => {
  //     window.dispatchEvent(new Event('resize'));
  //     
  //     if (sliderRef.current && sliderRef.current.innerSlider) {
  //       sliderRef.current.innerSlider.onWindowResized();
  //     }
  //   }, 500);
  //   
  //   const handleResize = () => {
  //     if (sliderRef.current && sliderRef.current.innerSlider) {
  //       sliderRef.current.innerSlider.onWindowResized();
  //     }
  //   };
  //   
  //   window.addEventListener('resize', handleResize);
  //   
  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // OWL Carousel Code Start
  useEffect(() => {
    setIsMounted(true);
    
    // Force refresh after mount for OWL Carousel
    const timer = setTimeout(() => {
      if (owlRef.current) {
        // OWL Carousel refresh method
        window.dispatchEvent(new Event('resize'));
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  // OWL Carousel Code End

  // OLD BREAKPOINT CONFIGURATION (SLICK)
  // const createSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
  //   dots: sliderDot,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: slidesToShowDefault,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   autoplaySpeed: 3000,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
  //       }
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       }
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       }
  //     }
  //   ]
  // });

  // OWL Carousel Code Start
  const createOwlCarouselOptions = (itemsDefault, dots = false, loop = true) => ({
    items: itemsDefault,
    loop: loop,
    margin: 10,
    nav: true,
    dots: dots,
    // autoplay: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 5
      },
      576: {
        items: 1,
        margin: 5
      },
      768: {
        items: 1,
        margin: 8
      },
      992: {
        items: 2, // KEY FIX - 2 items at 992px
        margin: 10
      },
      1200: {
        items: itemsDefault > 3 ? 3 : itemsDefault,
        margin: 10
      }
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  });

  const testimoniolnewOwlOptions = (itemsDefault, dots = false) => ({
    items: itemsDefault,
    loop: true,
    margin: 20,
    nav: true,
    dots: dots,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      768: {
        items: 1,
        margin: 15
      },
      1024: {
        items: 1,
        margin: 20
      },
      1199: {
        items: itemsDefault > 2 ? 2 : itemsDefault,
        margin: 20
      }
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  });

  const blogOwlOptions = (itemsDefault, dots = false) => ({
    items: itemsDefault,
    loop: false,
    margin: 20,
    nav: true,
    dots: dots,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      768: {
        items: 1,
        margin: 15
      },
      1024: {
        items: 2,
        margin: 20
      },
      1199: {
        items: itemsDefault > 3 ? 3 : itemsDefault,
        margin: 20
      }
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  });

  const clientOwlOptions = {
    items: 5,
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    // autoplay: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 5
      },
      420: {
        items: 1,
        margin: 8
      },
      576: {
        items: 2,
        margin: 10
      },
      768: {
        items: 2,
        margin: 12
      },
      992: {
        items: 3,
        margin: 15
      },
      1200: {
        items: 3,
        margin: 15
      },
      1400: {
        items: 4,
        margin: 15
      }
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  };
  // OWL Carousel Code End

  const technologySliderSettings = {
    modules: [Grid, Autoplay],
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    spaceBetween: 12,
    slidesPerView: 6,
    grid: { rows: 2, fill: 'row' },
  
    // Important for responsiveness recalculation
    observer: true,
    observeParents: true,
    watchOverflow: true,
  
    breakpoints: {
      // 1 column x 2 rows for tiny screens
      320: { slidesPerView: 1, grid: { rows: 2, fill: 'row' }, spaceBetween: 8 },
      480: { slidesPerView: 2, grid: { rows: 2, fill: 'row' }, spaceBetween: 10 },
      600: { slidesPerView: 2, grid: { rows: 2, fill: 'row' }, spaceBetween: 10 },
      768: { slidesPerView: 3, grid: { rows: 2, fill: 'row' }, spaceBetween: 12 },
      1024: { slidesPerView: 4, grid: { rows: 2, fill: 'row' }, spaceBetween: 14 },
      1400: { slidesPerView: 6, grid: { rows: 2, fill: 'row' }, spaceBetween: 16 },
    },
  };
  
  
  //const technologysettings = technologySliderSettings();


  // OLD SLICK SETTINGS (COMMENTED OUT)
  // const settings = createSliderSettings(3);
  // const workareasettings = createSliderSettings(2);
  // const toolssettings = createSliderSettings(6);
  // const testimonialsettings = createSliderSettings(1);
  // const testimonialnewsettings = testimoniolnewSliderSettings(2);
  // const blogsettings = blogSliderSettings(3);

  // OWL Carousel Code Start
  const settings = createOwlCarouselOptions(3);
  const workareasettings = createOwlCarouselOptions(2);
  const toolssettings = createOwlCarouselOptions(6);
  const testimonialsettings = createOwlCarouselOptions(1);
  const testimonialnewsettings = testimoniolnewOwlOptions(2);
  const blogsettings = blogOwlOptions(3);
  const clientsettings = clientOwlOptions;
  // OWL Carousel Code End

  return (
    <>

      
      {page == 'projects' && (
        // OLD CODE - Slick Slider
        // <Slider ref={sliderRef} {...settings}>
        
        // OWL Carousel Code Start
        isMounted ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <OwlCarousel ref={owlRef} {...settings}>
          {projects?.map((item, index) => {
            const titleText = item?.title
              ? item.title.split(" ").slice(0, 4).join(" ") + "..."
              : "";
            return (<Col xs={12} lg={4} key={index}>
              <div className="portfolio-work-wrap">
                <div className="portfolio-work-wrap__img">
                  <Image
                    src={`${env.BACKEND_BASE_URL}${item.image}`}
                    alt="Hero Banner"
                    width={400}
                    height={300}
                    className="img-fluid"
                  />
                </div>
                <div
                  className="portfolio-work-wrap__block"
                  onClick={() => router.push(`/casestudy/${item.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="portfolio-work-wrap__txt">
                    <p>{titleText}</p>
                  </div>
                  <p className="link-txt"><ArrowUpRight /></p>
                </div>
              </div>
            </Col>);
          })}
            </OwlCarousel>
          </div>
        ) : (
          <div className="slider-loading">Loading carousel...</div>
        )
        // OWL Carousel Code End
      )}

      {page == 'testimonial' && (
        // OLD CODE - Slick Slider
        // <Slider ref={sliderRef} {...testimonialsettings}>
        
        // OWL Carousel Code Start
        <div style={{ position: 'relative', width: '100%' }}>
          <OwlCarousel ref={owlRef} {...testimonialsettings}>
          {testimonials?.map((item, index) => (
            <div className="client-testimonial" key={index}>
              <div className="testimonial-wrapper">
                <div className="testimonial">
                  <p>
                    {item.message}
                  </p>
                </div>
                <div className="media">
                  <Image
                    src={`${env.BACKEND_BASE_URL}assets/img/testimonial/${item.profile_photo_path}`}
                    alt="Hero Banner"
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                  <div className="media-body">
                    <div className="overview">
                      <div className="overview-box">
                        <div className="name"><b>{item.name}</b></div>
                        <div className="grey-txt" dangerouslySetInnerHTML={{ __html: item?.role }} />
                      </div>
                      <div className="overview-box-quote">
                        <Image
                          src="/assets/images/quote.png"
                          alt="Hero Banner"
                          width={40}
                          height={30}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
        </div>
        // OWL Carousel Code End
      )}

      {page == 'tools' && (
        // OLD CODE - Slick Slider
        // <Slider {...toolssettings}>
        
        // OWL Carousel Code Start
        <OwlCarousel ref={owlRef} {...toolssettings}>
          {technologiya?.map((item, index) => (
            <div className='tools' key={index}>
              <div className='tools-image'>
                <Image
                  src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`}
                  alt="technology"
                  width={120}
                  height={80}
                  className="img-fluid"
                />
              </div>
            </div>
          ))}
        </OwlCarousel>
        // OWL Carousel Code End
      )}
      {page == 'clients' && (
        // OLD CODE - Slick Slider
        // <Slider {...clientsettings}>
        
        // OWL Carousel Code Start
        <OwlCarousel ref={owlRef} {...clientsettings}>
          {clients?.map((item, index) => (
            <div className="client-logo" key={index}>
              <Image
                src={`${env.BACKEND_BASE_URL}${item.logo}`}
                alt="client logo"
                fill
                sizes="(max-width: 768px) 100px, 150px"
                className="client_logo_img"
              />
            </div>
          ))}
        </OwlCarousel>
        // OWL Carousel Code End
      )}

      {page == 'testimonialnew' && (
        // OLD CODE - Slick Slider
        // <Slider {...testimonialnewsettings}>
        
        // OWL Carousel Code Start
        <OwlCarousel ref={owlRef} {...testimonialnewsettings}>
          {testimonials?.map((item, index) => {
            const messageText = item?.message
              ? item.message
              : "";
            return (
              <div className="test-box" key={index}>
                <div className="quote-txt">
                  <p>{messageText}</p>
                </div>
                <div className="tester">
                  <div className="tester-img">
                    <Image
                      src={`${env.BACKEND_BASE_URL}assets/img/testimonial/${item.profile_photo_path}`}
                      alt="image"
                      width={50}
                      height={50}
                      className="img-fluid"
                    />
                  </div>
                  <div className="tester-name">
                    <h2>{item.name}</h2>
                    <p dangerouslySetInnerHTML={{ __html: item?.role }} />
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
        // OWL Carousel Code End
      )}

      {page == 'projectsnew' && (
        // OLD CODE - Slick Slider
        // <Slider ref={sliderRef} {...settings}>
        
        // OWL Carousel Code Start
        isMounted ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <OwlCarousel ref={owlRef} {...settings}>
          {projects
          ?.filter(item => item?.slug !== "bmc-car-parking")
          ?.map((item, index) => {
            const titleText = item?.title
              ? item?.title
              : "";
            const longdesc = item?.long_desc ? item.long_desc.split(",") : [];
            
            return (
              <div key={index}>
                <div className="port-box" onClick={() => router.push(`/casestudy/${item.slug}`)}>
                  <div className="port-img port-img2">
                    <p className='port-badge'>{index+1}/{projects?.length-1}</p>
                    <Image
                      src={`${env.BACKEND_BASE_URL}${item.image}`}
                      alt="projects"
                      width={400}
                      height={300}
                      className="img-fluid port-shw"
                    />
                  </div>
                  <div className="pport_image_title_block">
                    <h3 className='pport-image-title'>{titleText}</h3>
                  </div>
                  <div className='blog-hm-desc p-3'>{item?.short_desc}</div>
                  <div className="port-tags">
                    { longdesc?.map((item, index)=>(
                    <h4 key={index}>{item}</h4>
                    )) }
                  </div>
                </div>
              </div>
            );
          })}
            </OwlCarousel>
          </div>
        ) : (
          <div className="slider-loading">Loading carousel...</div>
        )
        // OWL Carousel Code End
      )}

      {page == 'blogs' && (
        // OLD CODE - Slick Slider
        // <Slider {...blogsettings}>
        
        // OWL Carousel Code Start
        <OwlCarousel ref={owlRef} {...blogsettings}>
          {blogs?.map((item, index) => {
            const titleText = item?.title;
            const short_desc = item?.short_desc;
            const slug = item?.slug;
            const createdAtString = item?.created_at;
            const created_at = createdAtString ? new Date(createdAtString) : null;
            const day = created_at ? created_at.getDate() : "";
            const month = created_at ? created_at.getMonth() + 1 : "";
            const monthName = created_at
            ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(created_at)
            : "";
            const year = created_at ? created_at.getFullYear() : "";

            return (
              <div key={index} className='test-box'>
                <Link href={`blogs/${slug}`}>
                  <div className="guiditem">
                    <div className="blog-hm-img">
                      <Image
                        src={`${env.BACKEND_BASE_URL}${item.image}`}
                        alt="blog"
                        width={400}
                        height={300}
                        className="img-fluid port-shw"
                      />
                      <div className="guidcal">
                        <strong>{day}</strong> <br/><span>{monthName}</span>
                      </div>
                    </div>
                    <div className="guidtext">
                      <h5 className='blog-hm-title'>{titleText}</h5>
                      <div
                        className="mb-0 blog-hm-desc color-black"
                        dangerouslySetInnerHTML={{ __html: short_desc }}
                      ></div>
                      <div className="d-flex justify-content-center mt-35">
                        <div className="post-job-btn">Read More</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </OwlCarousel>
        // OWL Carousel Code End
      )}

      {page == 'technology' && (

        <div className="tech-slider-wrap">
        <Swiper {...technologySliderSettings}>
          {technologies?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="tech-card tech-list-bx">
              <div className="tech-list-rap">
                {/* if logo is an <img> */}
                {/* <img src={logo} alt={`logo-${i}`} className="tech-img" /> */}
                <Image
                width={100}
                height={100}
                src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`}
                alt={item.name}
                className="tech-img"
                loading="lazy"
              />
              {/* <h5>{item.name}</h5> */}
                {/* or any card content */}
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      )}
      
    </>
  );
};

export default BannerCarousal;
