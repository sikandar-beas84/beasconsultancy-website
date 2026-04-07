"use client"
import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import Link from 'next/link'
import Image from 'next/image';
import { env } from '@/util/constants/common';
import { useRouter } from 'next/navigation';
import BreadCrumb from '../BreadCrumb';

const Career = ({ careers, menucareer }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

 
  return (
    <>
     
      <main>
        <BreadCrumb pagetitle="Career" pageBanner={`assets/img/menu-content/${menucareer?.menu_contents?.banner}`} />
        <Container className='py-5'>

          <Row>
            <Col>
              <h1 className='inner-page-title'>{menucareer?.menu_contents?.title}</h1>
              <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
            </Col>
          </Row>
        </Container>

        <Container className='pb-5'>
          <Row>
            {careers?.map((item, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <Link href={`/career/${item?.title}`} className="">
                  <div className='skill-wrap'>
                    <div className='sill-wrap-head'>
                      <div className='skill-wrap-img-without-bg'>
                        <Image width={60} height={60} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" loading="lazy" />
                      </div>
                      <div className='skill-wrap-head-text'>{item?.role}</div>
                    </div>
                    <div className='sill-wrap-text'>
                      {item?.responsibility}
                    </div>
                    <p className='job-experience-txt'>{item.experience}</p>
                    <button type="button" className="btn btn-primary-blue">Apply</button>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </>
  )
}
export default Career
