'use client'; // new-edit

import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
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

// OLD DYNAMIC IMPORT - Not needed here, handled in BannerCarousalClient
const BannerCarousal = ({ page, technologiya, clients, projects, testimonials, blogs, technologies }) => {

  const router = useRouter();
  
  // OLD CODE - No slider ref
  // const sliderRef = useRef(null);
  
  // NEW CODE - Add slider ref and isMounted state
  const sliderRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // OLD CODE - No useEffect for refresh
  // (no useEffect existed)
  
  // NEW CODE - Simple useEffect for refresh and mount state
  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    
    // Simple refresh after mount
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // OLD BREAKPOINT CONFIGURATION
  // const createSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
  //   dots: sliderDot,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: slidesToShowDefault,
  //   slidesToScroll: 1,
  //    autoplay: false,
  //   // autoplay: true,
  //   autoplaySpeed: 3000,
  //   responsive: [
  //     {
  //       breakpoint: 1199,
  //       settings: {
  //         slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
  //       }
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //       }
  //     }
  //   ]
  // });

  // NEW BREAKPOINT CONFIGURATION - Fixed for proper responsive behavior
  const createSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
    dots: sliderDot,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: 1,
    autoplay: false,
    // autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200, // Screens less than 1200px
        settings: {
          slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
        }
      },
      {
        breakpoint: 992, // Screens less than 992px (tablets) - THIS IS THE KEY FIX
        settings: {
          slidesToShow: 2, // Force 2 slides for portfolio section
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Screens less than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576, // Screens less than 576px (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  const testimoniolnewSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
    dots: sliderDot,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: 1,
    // autoplay: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: slidesToShowDefault > 2 ? 2 : slidesToShowDefault,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

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


  // Default settings
  const settings = createSliderSettings(3);
  // Work Area settings
  const workareasettings = createSliderSettings(2);

  // Tools settings
  const toolssettings = createSliderSettings(6);
  // testimonial settings
  const testimonialsettings = createSliderSettings(1);
  // client settings
  // const clientsettings = createSliderSettings(5); // ---   old code client carusal

  // ---  new code for client carusal +++ start +++

  const clientsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // ---  new code for client carusal +++ end +++
 
  const testimonialnewsettings = testimoniolnewSliderSettings(2);


  const blogSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
    dots: sliderDot,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: 1,
    // autoplay: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  const blogsettings = blogSliderSettings(3);

  return (
    <>

      
      {page == 'projects' && (
        <Slider {...settings}>
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
                  style={{ cursor: 'pointer' }} // Optional: makes it feel clickable
                >
                  <div className="portfolio-work-wrap__txt">
                    <p>{titleText}</p>
                  </div>
                  <p className="link-txt"><ArrowUpRight /></p>
                </div>

              </div>

            </Col>);
          })}

        </Slider>
      )}

      {page == 'testimonial' && (
        <Slider {...testimonialsettings}>

          {testimonials?.map((item, index) => (
            <div className="client-testimonial">
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
                        {/* <div className="details">{item.role}</div> */}
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

        </Slider>
      )}
      {page == 'tools' && (
        <Slider {...toolssettings}>

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

        </Slider>
      )}
      {page == 'clients' && (
        <Slider {...clientsettings}>

          {clients?.map((item, index) => (
            <>
            {/* // <div className='client-logo' key={index}>
            //   <Image
            //     src={`${env.BACKEND_BASE_URL}${item.logo}`}
            //     alt="client logo"
            //     width={150}
            //     height={80}
            //     wi
            //     className="img-fluid client_logo_img"
            //   />
            // </div> */}

              <div className="client-logo">
                  <Image
                    src={`${env.BACKEND_BASE_URL}${item.logo}`}
                    alt="client logo"
                    fill
                    sizes="(max-width: 768px) 100px, 150px"
                    className="client_logo_img"
                  />
              </div>
            </>

          ))}

        </Slider>
      )}

      {page == 'testimonialnew' && (
        <Slider {...testimonialnewsettings}>

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
        </Slider>
      )}

      {page == 'projectsnew' && (
        // OLD CODE - No hydration check, slider renders immediately
        // <Slider ref={sliderRef} {...settings}>
        
        // NEW CODE - Only render slider after component is mounted to prevent hydration issues
        isMounted ? (
          <Slider ref={sliderRef} {...settings}>
          {projects
          ?.filter(item => item?.slug !== "bmc-car-parking")
          ?.map((item, index) => {

            // const titleText = item?.title
            //   ? item?.title.split(" ").slice(0, 4).join(" ") + ""
            //   : "";
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

        </Slider>
        ) : (
          // NEW CODE - Show loading state while component mounts
          <div className="slider-loading">Loading carousel...</div>
        )
      )}

      {page == 'blogs' && (
        <Slider {...blogsettings}>

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
                  <Link
                  href={`blogs/${slug}`}
                  
                >
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
                        <div className="d-flex justify-content-center mt-35"><div className="post-job-btn">Read More</div></div>
                      
                      </div>
                  </div>
                  </Link>
                </div>
            );
          })}
        </Slider>
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
