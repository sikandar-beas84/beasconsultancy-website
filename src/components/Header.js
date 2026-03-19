"use client"
import React, { useState } from "react";
import { useEffect, useRef, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row, Nav, NavDropdown, Form, Navbar } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { Mail, Phone } from "react-feather";
import { env } from '@/util/constants/common';
import Image from 'next/image';
import Link from "next/link";

const Header = ({ homeData, loading }) => {

  if (loading) {
    // SKELETON HEADER
    return (
      <>
        {/* Blue top section */}
        <section className="blue-bg p-10">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <p className="main-focus-text mb-0 text-info">AI-Driven Development • Faster Execution • Smarter Results</p>
              </Col>
              <Col xs={12} md={6} className="d-none d-md-block">
                <ul className="d-flex justify-content-md-end gap-4 m-0 p-0">
                  <li>
                    <a className="text-white d-flex align-items-center gap-2 text-decoration-none">
                      <Mail size={16} /> beas@beas.co.in
                    </a>
                  </li>
                  <li>
                    <a className="text-white d-flex align-items-center gap-2 text-decoration-none">
                      <Phone size={16} /> +91-9433068494
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Navbar section */}
        <Navbar expand="lg" className="bg-white p-4">
          <Container>
            <Navbar.Brand href="/">
              <Image
                src="/assets/images/homage_logo.webp"
                alt="Logo"
                width={234}
                height={35}
                priority
                fetchPriority="high"
                className="img-fluid"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mx-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Link href="#" className="nav-link">
                  HOME
                </Link>
                <NavDropdown
                  title="services"
                  id="navbarScrollingDropdown"
                >
                  <Link href="#" className="nav-link">
                    Loading..
                  </Link>
                </NavDropdown>
                <NavDropdown
                  title="Industries"
                  id="navbarScrollingDropdown"
                >
                  <Link href="#" className="nav-link">
                    Loading..
                  </Link>
                </NavDropdown>
                <Link href="#" className="nav-link">
                  SKILLS
                </Link>
                <Link href="#" className="nav-link">
                  CASE STUDIES
                </Link>
                <Link href="#" className="nav-link">
                  CAREER
                </Link>
                <Link href="#" className="nav-link">
                  ABOUT US
                </Link>
                <Link href="#" className="nav-link">
                  CONTACT US
                </Link>
                <Link href="#" className="nav-link">
                  BLOGS
                </Link>
              </Nav>
              <Form className="d-flex">
                <div className="glow">
                  <Button variant="outline-primary">Get Quote</Button>
                </div>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }

  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  const emblemRef = useRef(null);

  useEffect(() => {
    if (!emblemRef.current) return;

    const element = emblemRef.current;
    const text = element.innerText;
    element.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const span = document.createElement("span");
      span.textContent = letter;

      const r = (360 / text.length) * i;
      const x = (Math.PI / text.length).toFixed(0) * i;
      const y = (Math.PI / text.length).toFixed(0) * i;

      span.style.transform = `rotate(${r}deg) translate3d(${x}px, ${y}px, 0)`;

      element.appendChild(span);
    }
  }, []);



  const [showService, setServiceShow] = useState(false);
  const [showIndustry, setIndustryShow] = useState(false);
  const [open, setOpen] = useState(false);

  const finalServices = useMemo(() => {
    const children = homeData?.services?.children;

    if (!Array.isArray(children)) return [];

    const expanded = children.flatMap(item => {
      if (item.slug === "application-solutioning") {
        return item.children?.map(child => ({
          slug: child.slug,
          name: child.name,
        })) || [];
      }

      return [{
        slug: item.slug,
        name: item.name,
      }];
    });

    const bottomSlugs = ["ui-ux", "professional-services"];

    return expanded.sort((a, b) => {
      const aLast = bottomSlugs.includes(a.slug);
      const bLast = bottomSlugs.includes(b.slug);

      if (aLast && !bLast) return 1;
      if (!aLast && bLast) return -1;
      return 0;
    });
  }, [homeData]);

  //////////////////////////////////////////

  return (
    <>

      <section className="blue-bg p-10">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <p className="main-focus-text mb-0">AI-Driven Development • Faster Execution • Smarter Results</p>
            </Col>
            <Col xs={12} md={6} className="d-none d-md-block">
              <ul className="d-flex justify-content-md-end gap-4 m-0 p-0">
                <li>
                  <a href={`mailto:${homeData?.contactus?.email}`} className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Mail size={16} /> {homeData?.contactus?.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${homeData?.contactus?.mobile}`} className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Phone size={16} /> {homeData?.contactus?.mobile}
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <Navbar expand="lg" className="bg-white p-4">
        <Container>
          <Link href="/">

            {homeData?.logo?.image && (
              <Image
                src={`${env.BACKEND_BASE_URL}${homeData.logo.image}`}
                alt="Logo"
                width={234}
                height={35}
                priority
                fetchPriority="high"
                className="img-fluid"
              />
            )}
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {homeData?.menus
                ?.sort((a, b) => a.order - b.order)
                ?.map((item) => {

                  // Industries
                  if (item.slug === "industries") {
                    return (
                      <NavDropdown
                        title="Industries"
                        id="navbarScrollingDropdown"
                        key={item.slug}
                        show={showIndustry}
                        onMouseEnter={() => setIndustryShow(true)}
                        onMouseLeave={() => setIndustryShow(false)}
                      >
                        {homeData?.industries?.children?.map((child) => (
                          <Link
                            key={child.slug}
                            href={`/industries/${child.slug}`}
                            className="dropdown-item"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </NavDropdown>
                    );
                  }

                  // Services
                  if (item.slug === "services") {
                    return (
                      <NavDropdown
                        title="Services"
                        id="services-menu"
                        key={item.slug}
                        show={showService}
                        onMouseEnter={() => setServiceShow(true)}
                        onMouseLeave={() => setServiceShow(false)}
                      >
                        {finalServices?.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="dropdown-item"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </NavDropdown>
                    );
                  }

                  // Case Study
                  if (item.slug === "casestudy") {
                    return (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}/${casestudy.slug}`}
                        className="nav-link"
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  // Default
                  return (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="nav-link"
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </Nav>
            <Form className="d-flex">
              <div className="glow">
                <Button variant="outline-primary" onClick={() => router.push('/contact')}>Get Quote</Button>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>












      {/* <div className="wpp-iicon">
  <div className="emblem" ref={emblemRef}>Connect With Us*</div>

  <Image
    src="/assets/images/whatsapp.png"
    alt="WhatsApp"
    width={40}
    height={40}
    className="img-fluid"
    onClick={() => {
      window.open(
        "https://wa.me/9433068494/?text=Hi%20BEAS%20CONSULTANCY%20AND%20SERVICES%20PVT.%20LTD.",
        "_blank"
      );
    }}
  />
</div> */}


      <div className="wpp-iicon" >
        <div className="emblem">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="
        M 100, 100
        m -64, 0
        a 64,64 0 1,1 128,0
        a 64,64 0 1,1 -128,0
      "
              />
            </defs>

            {/* White background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="#fff"
            />

            <text
              fontSize="18"
              fill="#000"
              fontWeight="bold"
              textLength="402"
            >
              <textPath href="#circlePath">
                CONNECT WITH US * CONNECT WITH US *
              </textPath>
            </text>
          </svg>

        </div>

        <Image
          src="/assets/images/whatsapp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="wp-icon"
          onClick={() =>
            window.open(
              "https://wa.me/9433068494/?text=Hi%20BEAS%20CONSULTANCY%20AND%20SERVICES%20PVT.%20LTD.",
              "_blank"
            )
          }
          style={{ cursor: "pointer" }}
        />
      </div>







    </>
  );
}
export default React.memo(Header);