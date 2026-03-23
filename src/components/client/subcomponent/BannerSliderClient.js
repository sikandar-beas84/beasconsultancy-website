import React, { useState } from 'react'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'react-feather';
import { env } from '@/util/constants/common';
import Image from 'next/image';

const BannerSlider = ({ bannerSlide }) => {

  return (
    <>
      <Carousel slide={true} fade={false} interval={3000}>
        {bannerSlide?.map((item, index) => {
          const descriptionText = item?.description;
          // descriptionText="Empower your digital transformation with artificial intelligence, intelligent automation, and next-gen software innovation.";
          return (
            <Carousel.Item key={index}>
              <div className='banner'>
                <div className="banner_thumb_img">
                  <Image
                    src={`${env.BACKEND_BASE_URL}${item?.image}`}
                    alt="Hero Banner"
                    width={1600}
                    height={800}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="img-fluid"
                    sizes="100vw"
                  />

                  <Carousel.Caption>
                    <div className="banner_text_infos">
                      <div className="container">
                        <div className="bnr-txt">
                          <p>{item?.slug}</p>
                          <h1 className="drop_ani">{item?.title}</h1>
                          <p>
                            {/* <div className='fw-300' dangerouslySetInnerHTML={{ __html: descriptionText }} /> */}
                            {descriptionText}
                          </p>
                        { item?.order == 1 &&
                  <Link href={`services/analytics-and-ai`} className="bnr-btn thar-three">EXPLORE AI</Link>
                }
                { item?.order == 2 &&
                  <Link href={`/contact`} className="bnr-btn thar-three">CONTACT US</Link>
                }
                { item?.order == 3 &&
                  <Link href={`/services`} className="bnr-btn thar-three">LEARN MORE</Link>
                }
                        </div>
                      </div>
                    </div>
                  </Carousel.Caption>
                </div>
                <div className="scroll_down_am what1" onClick={() =>
                  document
                    .getElementById('what_why_panel1')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }>
                  <div className="mouse_scroll">
                    <div className="mouse">
                      <div className="wheel"></div>
                    </div>
                    <div className="weh_m">
                      <span className="m_scroll_arrows unu"></span>
                      <span className="m_scroll_arrows doi"></span>
                      <span className="m_scroll_arrows trei"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>

    </>
  )
}

export default React.memo(BannerSlider);