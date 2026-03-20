import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import BreadCrumb from '../BreadCrumb';
import { env } from '../../util/constants/common';

const AboutUs = ({ aboutus, commonaboutus }) => {

    // ---- Split description once (server-side safe)
    const descriptionText = aboutus?.description
        ? aboutus.description.split(' ').slice(0, 139).join(' ')
        : '';

    const descriptionTextTwo = aboutus?.description
        ? aboutus.description.split(' ').slice(139).join(' ')
        : '';


   

    return (
        <>
           

            <main>
                <BreadCrumb
                    pagetitle="About Us"
                    pageBanner={`assets/img/menu-content/${aboutus?.menu_contents?.banner || ''}`}
                />
                {/* ===== About Intro ===== */}
                <section className="section-padding">
                    <Container>
                        <Row>
                            <Col lg={5} md={5}>
                                <div className="about_imgs">
                                    <span>
                                        <Image
                                            src={`${env.BACKEND_BASE_URL}${aboutus?.image}`}
                                            alt="About Beas"
                                            width={500}
                                            height={200}
                                            priority
                                            className="img-fluid about_thumb_img"
                                        />
                                    </span>
                                </div>
                            </Col>

                            <Col lg={7} md={7}>
                                <div className="about_texts">
                                    <h1>{aboutus?.menu_contents?.title}</h1>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: descriptionText }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* ===== Description Continued ===== */}
                <section className="section-abuts">
                    <Container>
                        <Row>
                            <Col>
                                <div className='ser_rea'>
                                    <div
                                        className="about_texts"
                                        suppressHydrationWarning
                                        dangerouslySetInnerHTML={{ __html: descriptionTextTwo }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>

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

                {/* ===== Mission / Strategy ===== */}
                <div className="why_abt">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <div className="our_misson_boxs">
                                    {aboutus?.menu_contents?.contents
                                        ?.filter(item => item.extra_title !== 'Corporate Strategy')
                                        ?.map((item, index) => (
                                            <div key={index} className="mission_boxs our_box_mi">
                                                <h2>{item.extra_title}</h2>
                                                <p>{item.extra_description}</p>
                                            </div>
                                        ))}
                                </div>
                            </Col>

                            <Col md={6}>
                                {aboutus?.menu_contents?.contents
                                    ?.filter(item => item.extra_title === 'Corporate Strategy')
                                    ?.map((item, index) => (
                                        <div key={index} className="why_abuts">
                                            <h2>{item.extra_title}</h2>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.extra_description
                                                }}
                                            />
                                        </div>
                                    ))}
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* ===== Counters ===== */}
                <section className="meter-area">
                    <Container>
                        <h2>
                            We've helped businesses increase their revenues significantly
                            in their very first year of partnering with us!
                        </h2>

                        <div className="counter-show">
                            <Row>
                                <div className='all-meter'>
                                    <ul>
                                        {commonaboutus
                                            ?.filter(item =>
                                                ['Clients', 'Experts', 'Projects', 'Years Experience'].includes(item.title)
                                            )
                                            ?.map((item, index) => (
                                                <li key={index} className="meter-box">
                                                    <span className="timer count-number">
                                                        {item.short_desc}
                                                    </span>
                                                    <p>{item.long_desc}</p>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </Row>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    );
};

export default AboutUs;
// export async function getStaticProps() {
//     try {
//         const [homeres, aboutRes, commonRes, seoRes] = await Promise.all([
//             HomeService.homePage(),
//             HomeService.menuAboutusPage(),
//             HomeService.commonaboutusPage(),
//             HomeService.seobyslug('about')
//         ]);

//         return {
//             props: {
//                 homeData: homeres?.data || null,
//                 aboutus: aboutRes?.data?.aboutus || null,
//                 commonaboutus: commonRes?.data?.commonaboutus || [],
//                 seometadata: seoRes?.data?.seometa || null
//             },
//             revalidate: 600 // 10 minutes
//         };
//     } catch (error) {
//         return { notFound: true };
//     }
// }
