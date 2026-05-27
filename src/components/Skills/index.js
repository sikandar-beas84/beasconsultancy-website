import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import BreadCrumb from '../BreadCrumb';
// import SEO from '../../components/SEO';
import { env } from '../../util/constants/common';

const Skills = ({ skills}) => {

  // const seo = useMemo(() => ({
  //   title: seometadata?.title || 'Skills',
  //   description:
  //     seometadata?.description ||
  //     'Explore the skills and capabilities of Beas Consultancy.',
  //   keywords:
  //     seometadata?.keyword ||
  //     'Skills, Expertise, Technologies, Services',
  //   image: seometadata?.image
  //     ? `${env.BACKEND_BASE_URL}${seometadata.image}`
  //     : `${env.BACKEND_BASE_URL}${skills?.image || ''}`,
  //   url: seometadata?.url
  //     ? `${env.FRONTEND_BASE_URL}${seometadata.url}`
  //     : `${env.FRONTEND_BASE_URL}/skills`,
  //   author:
  //     seometadata?.author ||
  //     'BEAS Consultancy And Services Private Limited'
  // }), [seometadata, skills]);

  return (
    <>
     
      <main>
        <BreadCrumb
          pagetitle="Skills"
          pageBanner={`assets/img/menu-content/${skills?.menu_contents?.banner || ''}`}
        />

        <Container className="py-5">
          <Row>
            <Col>
              <h1 className="inner-page-title">
                {skills?.menu_contents?.title}
              </h1>

              <div
                className="inner-page-text"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: skills?.description || ''
                }}
              />
            </Col>
          </Row>
        </Container>

        <Container className="pb-5">
          <Row>
            {skills?.menu_contents?.contents?.map((item, index) => (
              <Col key={item?.id || index} xs={12} md={6} lg={4}>
                <article className="skill-wrap skill-image175">
                  <header className="sill-wrap-head">
                    <div className="skill-wrap-img">
                    <Image
                      src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.extra_icon}`}
                      alt={item?.extra_title}
                      width={48}
                      height={48}
                      loading="lazy"
                    />

                    </div>
                    <h3 className="skill-wrap-head-text">
                      {item?.extra_title}
                    </h3>
                  </header>

                  <p className="sill-wrap-text">
                    {item?.extra_description}
                  </p>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Skills;

