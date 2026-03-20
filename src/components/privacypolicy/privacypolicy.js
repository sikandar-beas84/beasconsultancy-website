"use client"
import React from 'react'
import BreadCrumb from '../BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation';

const PrivacyPolicy = ({ privacypolicy }) => {

    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
  
    console.log("privacypolicy",privacypolicy)
   
    return (
      <>
       
        <main>
          <BreadCrumb pagetitle={privacypolicy?.title} pageBanner={privacypolicy?.image} />
          <Container className='py-5'>
            <Row>
              <Col>
              {privacypolicy ? (
                <>
                <h1 className='inner-page-title'>{privacypolicy?.short_desc}</h1>
              <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: privacypolicy?.long_desc }} />
              </>
              ) : (
                <p>Privacy Policy not found.</p>
              )}
              </Col>
  
            </Row>
          </Container>
  
        </main>
      </>
    )
  }
  export default PrivacyPolicy;