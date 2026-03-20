"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import { env } from '@/util/constants/common';
import { useRouter } from 'next/navigation';
import { postServiceData } from '@/apiservices/service';
import ImageModal from '../ImageModal';
import BreadCrumb from '../BreadCrumb';

const Servicebody = ({ slug, allclient,services }) => {

    const router = useRouter();
    const [modalImage, setModalImage] = useState(null);
    const openModal = (img) => {
        setModalImage(img); // open modal with clicked image
    };

    const closeModal = () => {
        setModalImage(null); // close modal
    };

    const [enrichedChildren, setEnrichedChildren] = useState([]);

   
    const service = useMemo(() => {
        if (!services || !services.length) return null;
       
        const appSlugs = [
            "application-development",
            "application-maintenance",
            "ui-ux",
            "professional-services",
        ];

        if (appSlugs.includes(slug)) {
            const parent = services.find(s => s.slug === "application-solutioning");
            return parent?.children?.find(c => c.slug === slug) || null;
        }

        return services.find(s => s.slug === slug) || null;
    }, [services, slug]);

    
    useEffect(() => {
        if (!service?.children) return;

        const enrich = async () => {
            const result = await Promise.all(
                service.children?.map(async (child) => {
                    const contents = child?.menu_contents?.contents || [];

                    const enrichedContents = await Promise.all(
                        contents?.map(async (c) => {
                            if (!c.extra_description) return c;
                            try {
                                const data = await postServiceData(
                                    "get-casestudy-by-slug",
                                    env.ACCESS_TOKEN,
                                    c.extra_description
                                );
                                return { ...c, casestudy: data };
                            } catch {
                                return c;
                            }
                        })
                    );

                    return {
                        ...child,
                        menu_contents: {
                            ...child.menu_contents,
                            contents: enrichedContents,
                        },
                    };
                })
            );

            setEnrichedChildren(result);
        };

        enrich();
    }, [service]);

    /**
     * ⏳ SAFE RETURNS (AFTER hooks)
     */
    if (router.isFallback ) {
        return <div>Loading...</div>;
    }

    if (!service) {
        return <div>Service not found</div>;
    }

    /**
     * 🔹 SEO
     */
    // const metaTitle = seometadata?.title || "Services";
    // const metaKeyword =
    //     seometadata?.keyword ||
    //     "services, beas consultancy, business solutions, software development";
    // const metaDesc =
    //     seometadata?.description ||
    //     service?.menu_contents?.description
    //         ?.replace(/(<([^>]+)>)/gi, "")
    //         ?.slice(0, 50);

    // const metaImage = seometadata?.image
    //     ? `${env.BACKEND_BASE_URL}${seometadata.image}`
    //     : `${env.BACKEND_BASE_URL}${service.image}`;

    // const metaUrl = seometadata?.url
    //     ? `${env.FRONTEND_BASE_URL}services/${seometadata.url}`
    //     : `${env.FRONTEND_BASE_URL}services/${service.slug}`;

    return (
        <>
            {/* <SEO
                title={metaTitle}
                description={metaDesc}
                keywords={metaKeyword}
                image={metaImage}
                url={metaUrl}
                author="BEAS Consultancy And Services Private Limited"
            /> */}

            <main>
                <BreadCrumb
                    pagetitle={service.name}
                    pageslug="Service"
                    pageBanner={`assets/img/menu-content/${service?.menu_contents?.banner}`}
                />

                <div className="py-5">
                    {enrichedChildren?.map((item1, index1) => (
                        <React.Fragment key={index1}>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="about_texts">
                                            <span
                                                className="ServicesPara mb-4"
                                                dangerouslySetInnerHTML={{ __html: item1.description }}
                                            />
                                            {item1.slug === "cloud-services" && (
                                                <div>
                                                    <ul style={{ listStyleType: 'none' }}>
                                                        <li>a) <span onClick={() => openModal('/assets/images/aws.webp')} className="bblue-llink">Amazon Web Services (AWS)</span></li>
                                                        <li>b) <span onClick={() => openModal('/assets/images/azure.webp')} className="bblue-llink"> Azure Cloud</span></li>
                                                        <li>c) <span onClick={() => openModal('/assets/images/oracle_cloud.webp')} className="bblue-llink"> Oracle Cloud</span></li>
                                                        <li>d) <span onClick={() => openModal('/assets/images/google_cloud.webp')} className="bblue-llink"> Google Cloud</span></li>

                                                    </ul>
                                                </div>
                                            )
                                            }
                                            {item1?.image && (
                                                <span
                                                    onClick={() => openModal(`${env.BACKEND_BASE_URL}${item1?.image}`)}
                                                    style={{ cursor: "pointer", color: '#0081d2', fontWeight: '600', textDecoration: 'underline' }}
                                                >
                                                    shown in the diagram.
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                            <section className="section-services">
                                <Container>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="imageTextBlock">
                                                <div className="row center-cols py-3">

                                                    {slug !== "professional-services" ? (
                                                        item1.menu_contents?.contents
                                                            ?.sort((a, b) => Number(a.extra_order) - Number(b.extra_order))
                                                            ?.map((content, index) => {
                                                                const cs = content?.casestudy?.data?.casestudy;
                                                                if (!cs?.slug) return null;

                                                                return (
                                                                    <Col xs={12} md={4} key={index}>
                                                                        <div className="guiditem">
                                                                            <div className="blog-hm-img">
                                                                                <Image
                                                                                    src={`${env.BACKEND_BASE_URL}${cs?.image}`}
                                                                                    alt="case-study"
                                                                                    width={400}
                                                                                    height={400}
                                                                                    priority
                                                                                    fetchPriority="high"
                                                                                    className="img-fluid"
                                                                                />
                                                                            </div>

                                                                            <div className="ggrey-bg">
                                                                                <h5 className="blog-hm-title pbb-5">
                                                                                    {cs?.title}
                                                                                </h5>

                                                                                <div className="mb-0 portfilo-hm-desc color-black pbb-5">
                                                                                    {cs?.short_desc}
                                                                                </div>

                                                                                <div className="d-flex justify-content-center mt-35">
                                                                                    <Link
                                                                                        href={{
                                                                                            pathname: "/casestudy",
                                                                                            query: { id: cs?.slug },
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
                                                            })
                                                    ) : (
                                                        <BannerCarousal page="clients" clients={allclient} />
                                                    )}

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                        </React.Fragment>
                    ))}
                </div>

                <ImageModal
                    show={!!modalImage}
                    image={modalImage}
                    onClose={() => setModalImage(null)}
                />
            </main>
        </>
    );
};

export default Servicebody;