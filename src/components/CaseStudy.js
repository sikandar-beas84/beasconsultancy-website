'use client'
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "react-feather";
import { env } from "@/util/constants/common";
import { useRouter } from "next/navigation";
import SlideQueryComponent from "./SlideQueryComponent";
import BannerCarousal from "./client/subcomponent/BannerCarousal";
import BreadCrumb from "./BreadCrumb";

const CasestudyGeneric = ({
    casestudy,
    menucasestudy,
    projects,
    currentSlug,
    homeData,
    slug,
    arrow
}) => {
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;

    /* ----------------------------------
       SPA STATE
    ---------------------------------- */
    const initialIndex = projects.findIndex(
        (p) => p.slug === currentSlug
    );

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const activeCaseStudy = projects[activeIndex];

    /* ----------------------------------
       Delayed Form
    ---------------------------------- */
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowForm(true), 15000);
        return () => clearTimeout(timer);
    }, []);

    /* ----------------------------------
       Sync URL → STATE (on refresh)
    ---------------------------------- */
    useEffect(() => {
        const idx = projects.findIndex(
            (p) => p.slug === slug
        );
        if (idx !== -1 && idx !== activeIndex) {
            setActiveIndex(idx);
        }
    }, [slug]);

    /* ----------------------------------
       Next / Prev Logic
    ---------------------------------- */
    const prevIndex =
        (activeIndex - 1 + projects.length) % projects.length;
    const nextIndex =
        (activeIndex + 1) % projects.length;

    const changeCaseStudy = (index) => {
        const project = projects[index];

        router.push(
            `/casestudy/${project.slug}`,
            undefined,
            { shallow: true }
        );

        setActiveIndex(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ----------------------------------
       Helper
    ---------------------------------- */
    const parseHTMLWithEnv = (html) => {
        if (!html) return "";
        return html
            .replace(/\{env\.SITE_URL\}/g, env.SITE_URL)
            .replace(
                /\{env\.BACKEND_BASE_URL\}/g,
                env.BACKEND_BASE_URL
            );
    };

    /* ----------------------------------
       SEO
    ---------------------------------- */
    // const metaTitle = seometadata?.title || activeCaseStudy?.title;
    // const metaKeyword =
    //     seometadata?.keyword ||
    //     "case study, business solution, project success";
    // const metaDesc =
    //     seometadata?.description ||
    //     "Learn how BEAS delivered business impact";
    // const metaImage = seometadata?.image
    //     ? `${env.BACKEND_BASE_URL}${seometadata.image}`
    //     : `${env.BACKEND_BASE_URL}${activeCaseStudy?.image}`;
    // const metaUrl = `${env.FRONTEND_BASE_URL}casestudy/${activeCaseStudy?.slug}`;
    // const metaAuthor =
    //     seometadata?.author ||
    //     "BEAS Consultancy And Services Private Limited";
    
    return (
        <>
            {/* <SEO
                title={metaTitle}
                description={metaDesc}
                keywords={metaKeyword}
                image={metaImage}
                url={metaUrl}
                author={metaAuthor}
            /> */}

            <main>
                <BreadCrumb
                    pagetitle={activeCaseStudy?.title}
                    pageslug="Casestudy"
                    pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`}
                    totalCasestudy={{
                        currentStudy: activeIndex + 1,
                        totalStudy: projects.length,
                    }}
                />

                <div className="bgF2F4F7 p-relative">
                    {arrow && <Container fluid>
                        <div className="d-flex justify-content-between carosalArrow">
                            <button
                                className="btn btn-primary"
                                onClick={() => changeCaseStudy(prevIndex)}
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => changeCaseStudy(nextIndex)}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </Container>}

                    <Container className="pb-5 ccase-study-container">
                        <Row>
                            <Col xs={12}>
                                <h1 className="inner-page-title-small">
                                    {activeCaseStudy?.title}
                                </h1>
                            </Col>

                            <Col xs={12} lg={5}>
                                <Image
                                    width={600}
                                    height={150}
                                    src={`${env.BACKEND_BASE_URL}${activeCaseStudy?.image}`}
                                    alt="image"
                                    className="img-fluid"
                                    loading="lazy"
                                />
                            </Col>

                            <Col xs={12} lg={7}>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0" className="blue-bg2">
                                        <Accordion.Header>
                                            Project Overview / Business Need
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        activeCaseStudy?.business_need,
                                                }}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1" className="green-bg">
                                        <Accordion.Header>
                                            BEAS’s Solution
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: parseHTMLWithEnv(
                                                        activeCaseStudy?.beas_solution
                                                    ),
                                                }}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2" className="yellow-bg">
                                        <Accordion.Header>
                                            {activeCaseStudy?.benefits_to_the_customer
                                                ? "Benefits To The Customer"
                                                : "Sample Screen"}  
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {activeCaseStudy?.benefits_to_the_customer ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            activeCaseStudy?.benefits_to_the_customer,
                                                    }}
                                                />
                                            ) : (
                                                <Image
                                                    width={550}
                                                    height={50}
                                                    src={`${env.BACKEND_BASE_URL}${activeCaseStudy?.samplescreen}`}
                                                    alt="image"
                                                    className="img-fluid"
                                                />
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="3" className="orange-bg">
                                        <Accordion.Header>
                                            Technology Platform
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {activeCaseStudy?.technology_platform?.map(
                                                    (item, index) => (
                                                        <li key={index}>{item}</li>
                                                    )
                                                )}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} className="mt-5 text-center">
                                <h1 className="inner-page-title mb-2">
                                    {homeData?.portfoliohomepage?.title}
                                </h1>
                                <p>{homeData?.portfoliohomepage?.long_desc}</p>
                            </Col>

                            <Col xs={12} className="my-3">
                                <BannerCarousal
                                    page="projectsnew"
                                    projects={homeData?.projects}
                                />
                            </Col>
                        </Row>
                    </Container>

                    {showForm && (
                        <SlideQueryComponent modalshow={showForm} />
                    )}
                </div>
            </main>
        </>
    );
};
export default CasestudyGeneric;
