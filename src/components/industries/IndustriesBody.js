'use client'
import React, { useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import { env } from '../../util/constants/common';
import BreadCrumb from '../BreadCrumb';

const IndustriesBody = ({ slug, industries, initialIndustry, initialEnrichedContents }) => {
    /**
     * 🔍 Resolve industry FROM CONTEXT using slug
     * Now using the pre-resolved industry from SSR
     */
    const industry = useMemo(() => {
        if (initialIndustry) return initialIndustry;
        
        // Fallback to client-side resolution if SSR didn't provide it
        if (!industries) return null;
        let currentLevel = industries;
        let found = null;

        for (const part of slug) {
            found = industries?.find(item => item.slug === part);
            if (!found) return null;
            currentLevel = found.children || [];
        }
        return found;
    }, [industries, slug, initialIndustry]);

    // Use the pre-enriched contents from SSR
    const enrichedContents = initialEnrichedContents || [];

    if (!industry) {
        return <div>Industry not found</div>;
    }

    return (
        <>
            <main>
                <BreadCrumb
                    pagetitle={industry.name}
                    pageslug="Industry"
                    pageBanner={`assets/img/menu-content/${industry?.menu_contents?.banner}`}
                />

                <Container className="pt-5">
                    <Row>
                        <Col>
                            <div className="about_texts">
                                <h1>{industry.name}</h1>
                                <div
                                    className="ServicesPara mb-4"
                                    dangerouslySetInnerHTML={{ __html: industry.description }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>

                <section>
                    <Container className="pb-5">
                        <div className="imageTextBlock">
                            <div className="row center-cols">
                                {enrichedContents?.map((item, index) => {
                                    const casestudyData = item?.casestudy?.data?.casestudy;
                                    if (!casestudyData?.slug) return null;
                                    return (
                                        <Col xs={12} md={4} key={index}>
                                            <div className="guiditem">
                                                <div className="blog-hm-img">
                                                    <Image
                                                        src={`${env.BACKEND_BASE_URL}${casestudyData.image}`}
                                                        alt="case-study"
                                                        width={400}
                                                        height={400}
                                                        className="img-fluid"
                                                        priority={index < 3}
                                                    />
                                                </div>

                                                <div className="ggrey-bg">
                                                    <h5 className="blog-hm-title pbb-5">
                                                        {casestudyData.title}
                                                    </h5>

                                                    <div className="mb-0 portfilo-hm-desc color-black pbb-5">
                                                        {casestudyData.short_desc}
                                                    </div>

                                                    <div className="bbbblue-border"></div>

                                                    <div className="d-flex justify-content-center mt-35">
                                                        <Link
                                                            href={{
                                                                pathname: "/casestudy",
                                                                query: { id: casestudyData.slug },
                                                            }}
                                                            className="post-job-btn"
                                                        >
                                                            Read Case Study
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    );
};

export default IndustriesBody;