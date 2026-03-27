'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import BreadCrumb from '../BreadCrumb';
import Image from 'next/image';
import { env } from '@/util/constants/common';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const InduIndustriesMain = ({ industries }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const industryList = industries?.children || [];
    const stripHtml = (html, wordLimit = 2000) => {
        if (!html) return '';
        const text = html.replace(/<[^>]+>/g, '');
        const words = text.split(/\s+/).slice(0, wordLimit);
        return words.join(' ') + (words.length >= wordLimit ? '...' : '');
    };


    return (

        <>
            <main>
                <BreadCrumb pagetitle="Industries" pageBanner={`assets/img/menu-content/${industries?.menu_contents?.banner}`} />
                <Container className='py-5'>
                <Row>
                    <Col>
                    <div className="about_texts">
                        <h1>{industries?.menu_contents?.short_desc}</h1>
                        {/* <p>{industries?.menu_contents?.description}</p> */}
                        <p dangerouslySetInnerHTML={{ __html: industries?.menu_contents?.description }} />
                    </div>
                    </Col>
                </Row>
                </Container>
                <section className="section-abuts section-services">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="ser_rea services_sec pt-0">
                        {industryList?.map((item, index) => {
                            const isOddRow = index % 2 === 0; // 0,2,4 => row 1,3,5

                            return (
                            <div className="row no-gutters align-items-center" key={index}>
                                {isOddRow ? (
                                <>

                                    <div className="col-lg-6 col-12 order-lg-2 order-2">
                                    <div className="services-text">
                                        <h2>{item?.name}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: item?.description }} />
                                        <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                        Read More
                                        </Link>
                                    </div>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="col-lg-6 col-12 order-lg-1 order-1">
                                    <div className="mediaimg">
                                        <Image
                                        width={600}
                                        height={150}
                                        src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                        alt="industry image"
                                        className="img-fluid"
                                        loading="lazy"
                                        />
                                    </div>
                                    </div>
                                </>
                                ) : (
                                <>

                                    <div className="col-lg-6 col-12 order-lg-1 order-2">
                                    <div className="services-text">
                                        <h2>{item?.name}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: item?.description }} />
                                        <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                        Read More
                                        </Link>
                                    </div>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="col-lg-6 col-12 order-lg-2 order-1">
                                    <div className="mediaimg">
                                        <Image
                                        width={600}
                                        height={150}
                                        src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                        alt="industry image"
                                        className="img-fluid"
                                        loading="lazy"
                                        />
                                    </div>
                                    </div>
                                </>
                                )}
                            </div>
                            );
                        })}
                        </div>


                    </div>
                    </div>
                </div>
                <div className="shp1">
                    <Image
                    src="/assets/images/ser-bg.png"
                    alt="shape"
                    width={474}
                    height={73}
                    loading="lazy"

                    />
                </div>
                <div className="shp2">
                    <Image
                    src="/assets/images/ser-bg2.png"
                    alt="shape"
                    width={474}
                    height={73}
                    loading="lazy"

                    />
                </div>


                </section>
            </main>
        </>
    )
}
export default InduIndustriesMain;