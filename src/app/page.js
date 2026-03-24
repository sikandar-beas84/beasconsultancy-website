import React, { Suspense } from 'react';
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
import ServiceCardClient from '@/components/client/ServiceCardClient';
import StatCounterClient from '@/components/client/StatCounterClient';
import { getDataService, getDataServiceLongCashe, postService, postServiceLongCashe } from '@/apiservices/service';

// Loading fallback components
const SectionLoader = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-text"></div>
  </div>
);

// Metadata for SEO (Next.js 16+)
export async function generateMetadata() {
  try {
    const seoRes = await postServiceLongCashe('get-seo-by-slug', '');
    const seometadata = seoRes?.data?.seometa || null;

    return {
      title: seometadata?.title || "Home",
      description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
      keywords: seometadata?.keyword || "IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy",
      authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
      openGraph: {
        title: seometadata?.title || "Home",
        description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        images: seometadata?.image ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
        url: seometadata?.url ? `${env.FRONTEND_BASE_URL}${seometadata?.url}` : `${env.FRONTEND_BASE_URL}`,
      },
    };
  } catch (error) {
    return {
      title: "Home",
      description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
    };
  }
}

// Separate components for each section with their own data fetching
async function BannerSection() {
  const banners = await getDataService('get-home-banners');
  return (
    <Container fluid className="mtt-100">
      <Row>
        <Col className="px-0 beas_banner">
          <BannerSliderClient bannerSlide={banners.data?.banners ?? []} />
        </Col>
      </Row>
    </Container>
  );
}

async function ServiceSection() {
  const [services, common] = await Promise.all([
    getDataService('get-home-services'),
    getDataServiceLongCashe('get-home-common')
  ]);
  
  return (
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
  );
}

async function AboutSection() {
  const [aboutus, common] = await Promise.all([
    getDataService('get-home-aboutus'),
    getDataServiceLongCashe('get-home-common')
  ]);
  
  const aboutuspreviewText = aboutus?.data?.aboutus?.menu_contents?.description;
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function WhyChooseUsSection() {
  const common = await getDataServiceLongCashe('get-home-common');
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function PortfolioSection() {
  const [projects, common] = await Promise.all([
    getDataService('get-projects'),
    getDataServiceLongCashe('get-home-common')
  ]);
  
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function IndustriesSection() {
  const industries = await getDataService('get-home-industries');
  
  return (
    <IndustriesProcessClient
      industryData={industries?.data?.industries?.children}
      pageTitle={industries?.data?.industries?.title}
      pageDesc={industries?.data?.industries?.long_desc}
    />
  );
}

async function ConsultationSection() {
  const common = await getDataServiceLongCashe('get-home-common');
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function TechnologySection() {
  const [technologies, common] = await Promise.all([
    getDataService('get-home-technologies'),
    getDataServiceLongCashe('get-home-common')
  ]);
  
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function TestimonialSection() {
  const [testimonials, common] = await Promise.all([
    getDataService('get-home-testimonials'),
    getDataServiceLongCashe('get-home-common')
  ]);
  
  const homeData = common?.data || null;
  
  return (
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
  );
}

async function BlogsSection() {
  const blogs = await getDataService('get-home-blogs');
  
  return (
    <div className="Blogs">
      <div className="container">
        <div className="Blogs-head">
          <h2>{blogs?.data?.bloghomepage?.title || "Latest Blogs"}</h2>
          <p>{blogs?.data?.bloghomepage?.long_desc || "Stay updated with our latest insights"}</p>
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
  );
}

// Main Home component with progressive loading
export default async function Home() {
  // Fetch critical data first (banner and services)
  // This allows the page to start rendering immediately with critical content
  const criticalData = await Promise.all([
    getDataService('get-home-banners').catch(() => null),
    getDataService('get-home-services').catch(() => null),
    getDataServiceLongCashe('get-home-common').catch(() => null)
  ]);

  const [banners, services, common] = criticalData;
  const homeData = common?.data || null;

  return (
    <>
      <main>
        <section>
          {/* Critical sections load first */}
          <Container fluid className="mtt-100">
            <Row>
              <Col className="px-0 beas_banner">
                <BannerSliderClient bannerSlide={banners?.data?.banners ?? []} />
              </Col>
            </Row>
          </Container>

          {/* Service section - critical */}
          <div className="service mb-0" id="what_why_panel1">
            <div className="container">
              <div className="serv-head">
                <h2>{homeData?.servicehomepage?.title}</h2>
                <p>{homeData?.servicehomepage?.long_desc}</p>
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

          {/* Non-critical sections load progressively */}
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <WhyChooseUsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <PortfolioSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ConsultationSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <TechnologySection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <TestimonialSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <BlogsSection />
          </Suspense>
        </section>
      </main>
    </>
  );
}