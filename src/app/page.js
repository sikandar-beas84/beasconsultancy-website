import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import { env } from '@/util/constants/common';

// Import client components
import BannerSliderClient from '@/components/client/BannerSliderClient';
import BannerCarousalClient from '@/components/client/BannerCarousalClient';
import TechnologySliderClient from '@/components/client/TechnologySliderClient';
import IndustriesProcessClient from '@/components/client/IndustriesProcessClient';
// import ModalClient from '@/components/client/ModalClient';
import ServiceCardClient from '@/components/client/ServiceCardClient';
import StatCounterClient from '@/components/client/StatCounterClient';
import { getDataService, postService } from '@/apiservices/service';

// Metadata for SEO (Next.js 16+)
export async function generateMetadata() {
  try {
    const seoRes = await postService('get-seo-by-slug', '');

    const seometadata = seoRes?.data?.seometa || null;

    return {
      title: seometadata?.title || "Home",
      description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
      keywords: seometadata?.keyword || "IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy",
      authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
      openGraph: {
        title: seometadata?.title || "Home",
        description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        images: seometadata?.image
          ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
        url: seometadata?.url
          ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
          : `${env.FRONTEND_BASE_URL}`,
      },
    };
  } catch (error) {
    return {
      title: "Home",
      description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
    };
  }
}

// Next.js 16+ Server Component with async data fetching
export default async function Home() {
  try {
    // Fetch data directly in the Server Component
    const [banners, services,aboutus, common,industries,testimonials, technologies,projects, blogs] = await Promise.all([
      getDataService('get-home-banners'),
      getDataService('get-home-services'),
      getDataService('get-home-aboutus'),
      getDataService('get-home-common'),
      getDataService('get-home-industries'),
      getDataService('get-home-testimonials'),
      getDataService('get-home-technologies'),
      getDataService('get-projects'),
      getDataService('get-home-blogs')
    ]);

    const homeData = common?.data || null;
    const aboutuspreviewText = aboutus?.data?.aboutus?.menu_contents?.description;
    return (
      <>
        {/* Modal Client Component */}
        {/* <ModalClient /> */}

        <main>
          <section>
            {/* Banner Section */}
            <Container fluid className="mtt-100">
              <Row>
                <Col className="px-0 beas_banner">
                  <BannerSliderClient bannerSlide={banners.data?.banners ?? []} />
                </Col>
              </Row>
            </Container>

            {/* Service Section */}
            
            <div className="service mb-0" id="what_why_panel1">
              <div className="container">
                <div className="serv-head">
                  <h2>{common?.data?.servicehomepage?.title}</h2>
                  <p>{common?.data?.servicehomepage?.long_desc}</p>
                </div>
              </div>
              <div className="service-inr">
                <div className="container">
                  <div className="srvc-txt">
                    <div className="srvc-txt-top">
                      <div className="row">
                        <ServiceCardClient services={services?.data?.services?.children} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="About">
              <div className="container">
                <div className="serv-head stat-head">
                  <h2>{aboutus?.data?.aboutus?.name}</h2>
                  <p>
                    {aboutuspreviewText}{' '}
                    <Link href="/about" className="blue-text">
                      <u>Read More...</u>
                    </Link>
                  </p>
                </div>
                <div className="stat-bod">
                  <div className="counter-show">
                    <div className="row">
                      <StatCounterClient stats={homeData?.commonaboutus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="why">
              <div className="container">
                {homeData?.whychooseus?.map((item, index) =>
                  item.slug === "why-choose-us-content" && (
                    <React.Fragment key={index}>
                      <div className="serv-head stat-head why-head">
                        <h2>{item?.title}</h2>
                        <p className="" dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </div>
                    </React.Fragment>
                  )
                )}
                <div className="why-inr">
                  <div className="row">
                    {homeData?.whychooseus?.map((item, index) =>
                      item.slug === "why-choose-us-sub-content" && (
                        <React.Fragment key={index}>
                          <div className="col-lg-4 col-md-6 col-sm-6 p-0">
                            <div className="why-box why-1">
                              <div className="why-img">
                                <Image
                                  width={70}
                                  height={70}
                                  src={`${env.BACKEND_BASE_URL}${item.image}`}
                                  alt={item.title}
                                  loading="lazy"
                                />
                              </div>
                              <h3>{item.title}</h3>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Section */}
            <div className="portfolio">
              <div className="container">
                <div className="port-head">
                  <div className="port-hd-txt">
                    <h2>{homeData?.portfoliohomepage?.title}</h2>
                    <p>{homeData?.portfoliohomepage?.long_desc}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <BannerCarousalClient
                      page="projectsnew"
                      projects={projects?.data?.projects}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Process Section */}
            <IndustriesProcessClient
              industryData={industries?.data?.industries?.children}
              pageTitle={industries?.data?.industries?.title}
              pageDesc={industries?.data?.industries?.long_desc}
            />

            {/* Consultation Section */}
            <div className="more">
              <div className="more-inr">
                <div className="container">
                  <div className="more-txt">
                    <div className="mr-txt-lft">
                      <h2>{homeData?.consultanthomepage?.title}</h2>
                      <p>{homeData?.consultanthomepage?.long_desc}</p>
                    </div>
                    <Link
                      href={homeData?.consultanthomepage?.short_desc || '#'}
                      className="mr-btn"
                    >
                      Get Free Consultation Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="tachnology">
              <div className="container">
                <div className="tech-hd">
                  <h2>{homeData?.technologyhomepage?.title}</h2>
                  <p>{homeData?.technologyhomepage?.long_desc}</p>
                </div>
                <div className="tech-list-r">
                  <div className="row">
                    <div className='col-12'>
                      <div className='technology-box pb-5'>
                        <TechnologySliderClient technologies={technologies?.data?.technologies} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="testimonial">
              <div className="container">
                <div className="serv-head test-head">
                  <h2>{homeData?.testimonialhomepage?.title}</h2>
                  <p>{homeData?.testimonialhomepage?.long_desc}</p>
                  <img src="assets/images/test-star-grp.png" alt="stars" />
                </div>
                <div className="test-inr">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <BannerCarousalClient
                        page="testimonialnew"
                        testimonials={testimonials?.data?.testimonials}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs Section */}
            <div className="Blogs">
              <div className="container">
                <div className="Blogs-head">
                  <h2>{homeData?.bloghomepage?.title}</h2>
                  <p>{homeData?.bloghomepage?.long_desc}</p>
                </div>
                <div className="Blogs-inr">
                  <div className="row">
                    {blogs?.data?.blogs?.map((item, index) => {
                      const createdAtString = item?.created_at;
                      const created_at = createdAtString ? new Date(createdAtString) : null;
                      const monthName = created_at
                        ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(created_at)
                        : "";

                      return (
                        <div className='col-12 col-md-4' key={index}>
                          <div className='test-box'>
                            <Link href={`blogs/${item.slug}`}>
                              <div className="guiditem">
                                <div className="blog-hm-img">
                                  <Image
                                    src={`${env.BACKEND_BASE_URL}${item.image}`}
                                    alt={item.title}
                                    width={400}
                                    height={400}
                                    priority={index < 3}
                                    fetchPriority={index < 3 ? "high" : "auto"}
                                    className="img-fluid port-shw"
                                  />
                                  <div className="guidcal">
                                    <strong>{created_at?.getDate()}</strong> <br />
                                    <span>{monthName}</span>
                                  </div>
                                </div>
                                <div className="guidtext">
                                  <h5 className='blog-hm-title'>{item.title}</h5>
                                  <div
                                    className="mb-0 blog-hm-desc color-black"
                                    dangerouslySetInnerHTML={{ __html: item.short_desc }}
                                  />
                                  <div className="d-flex justify-content-center mt-35">
                                    <div className="post-job-btn">Read More</div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error fetching home data:', error);

    // Return a fallback UI or error message
    return (
      <div className="container text-center py-5">
        <h2>Something went wrong</h2>
        <p>Please try again later</p>
      </div>
    );
  }
}