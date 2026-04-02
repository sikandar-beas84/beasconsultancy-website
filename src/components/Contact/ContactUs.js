"use client"
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from 'react-bootstrap';

import BreadCrumb from '../BreadCrumb';
import CountryCodeDropdown from './CountryCodeDropdown.js';

import { env } from '../../util/constants/common';

// Load reCAPTCHA only on client
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false
});

const ContactUs = ({ contactus, faqs }) => {
  // Add safety defaults
  const safeContactus = contactus || {};
  const safeFaqs = faqs || [];

  const fileInputRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    file: null,
    countrycode: '+91'
  });

  // ---- Form Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'phone') {
      const regex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;
      if (!regex.test(value)) {
        setErrors(prev => ({
          ...prev,
          phone: ['Only numbers and special characters are allowed.']
        }));
        return;
      } else {
        setErrors(prev => ({ ...prev, phone: null }));
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // ---- Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please verify the captcha');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    data.append('recaptcha_token', captchaToken);

    setLoading(true);
    setStatus('');
    
    try {
      const res = await fetch(`${env.API_BASE_URL}save-customer-enquiry`, {
        method: 'POST',
        headers: {
          'X-SECURE-KEY': env.ACCESS_TOKEN
        },
        body: data
      });
      const result = await res.json();

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        setErrors({});
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          subject: '', 
          message: '', 
          file: null,
          countrycode: '+91'
        });
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        // Reset captcha
        setCaptchaToken(null);
      } else {
        setStatus('');
        setErrors(result.error || {});
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('❌ Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---- FAQ helpers with safety checks
  const faqHeading = safeFaqs?.find(item => item?.type === 'faq-heading');
  
  // Get first non-heading FAQ for default active key
  const firstNonHeadingIndex = safeFaqs?.findIndex(
    (item) => item?.type !== "faq-heading"
  );
  
  // Safe banner URL with fallback
  const bannerUrl = safeContactus?.banner || '/assets/images/default-banner.jpg';

  return (
    <>
      <main>
        <BreadCrumb pagetitle="Contact Us" pageBanner={bannerUrl} />

        {/* ===== Contact Form ===== */}
        <section className="section-padding">
          <Container>
            <Row>
              <Col lg={8} md={12} className="">
                <div className='contact_form_wrap_box'>
                  <div className='contact_form_heading position-relative'>
                    <h2>Let's Connect</h2>
                  </div>
                  <div className='contact_form_box'>
                    <form className="was-validate contact-frm" onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="form-control mb-3"
                            required
                          />
                          {errors?.name && (<p className='error_message'>{errors.name[0]}</p>)}
                        </Col>

                        <Col md={6}>
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-control mb-3"
                            required
                          />
                          {errors?.email && (<p className='error_message'>{errors.email[0]}</p>)}
                        </Col>

                        <Col md={6} className="d-flex gap-2">
                          <CountryCodeDropdown
                            name="countrycode"
                            value={formData.countrycode}
                            onChange={handleChange}
                          />
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="form-control mb-3"
                            required
                          />
                          {errors?.phone && (<p className='error_message'>{errors.phone[0]}</p>)}
                        </Col>

                        <Col md={6}>
                          <input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            className="form-control mb-3"
                            required
                          />
                          {errors?.subject && (<p className='error_message'>{errors.subject[0]}</p>)}
                        </Col>

                        <Col md={12}>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            rows={8}
                            className="form-control mb-3 h-75"
                            required
                          />
                          {errors?.message && (<p className='error_message'>{errors.message[0]}</p>)}
                        </Col>

                        <Col md={12}>
                          <ReCAPTCHA
                            sitekey={env.SITE_KEY}
                            onChange={setCaptchaToken}
                          />
                        </Col>

                        <Col md={4}>
                          <div className='contact_form_btn'>
                            <button
                              type="submit"
                              className="red-btn w-100 mt-3 post-job-btn"
                              disabled={loading}
                            >
                              {loading ? 'Submitting…' : 'Submit'}
                            </button>
                          </div>
                        </Col>

                        {status && <p className="mt-3">{status}</p>}
                      </Row>
                    </form>
                  </div>
                </div>
              </Col>

              {/* ===== Contact Info ===== */}
              <Col lg={4}>
                <div className="contact_right_box">
                  <div className='contact_form_add_heading'>
                    {[
                      { 
                        icon: 'add2.png', 
                        title: 'Address', 
                        text: safeContactus?.address || 'Address not available' 
                      },
                      { 
                        icon: 'add3.png', 
                        title: 'Email', 
                        text: safeContactus?.email || 'Email not available' 
                      },
                      { 
                        icon: 'add1.png', 
                        title: 'Mobile', 
                        text: `${safeContactus?.phone || ''} ${safeContactus?.mobile || ''}`.trim() || 'Phone not available' 
                      }
                    ]?.map((item, index) => (
                      <div key={index} className="form_add">
                        <div className='map_location_icon'>
                          <Image
                            src={`/assets/images/${item.icon}`}
                            alt={item.title}
                            width={40}
                            height={40}
                            loading="lazy"
                          />
                        </div>
                        <div className='map_location_icon_cont'>
                          <h1>{item.title}</h1>
                          <h3 dangerouslySetInnerHTML={{ __html: item.text }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ===== FAQ ===== */}
        {safeFaqs && safeFaqs.length > 0 && (
          <section className="section-abuts section-contact contactUsAccordian">
            <Container>
              <div className="row">
                <div className="col-lg-12">
                  <div className="ser_rea">
                    <div className="about_texts contact-bg">
                      <div className="serv-head">
                        {faqHeading && (
                          <>
                            <h2>{faqHeading?.title || 'Frequently Asked Questions'}</h2>
                            <p>{faqHeading?.long_desc || 'Find answers to common questions'}</p>
                          </>
                        )}
                      </div>
                      
                      {(() => {
                        let counter = 0;
                        const nonHeadingFaqs = safeFaqs.filter(item => item?.type !== "faq-heading");
                        
                        if (nonHeadingFaqs.length === 0) {
                          return <p>No FAQs available.</p>;
                        }
                        
                        const firstAccordionIndex = safeFaqs?.findIndex(
                          (item) => item?.type !== "faq-heading"
                        );

                        return (
                          <Accordion defaultActiveKey={firstAccordionIndex?.toString()} flush>
                            {safeFaqs?.map((item, index) => {
                              if (item?.type !== "faq-heading") {
                                counter++;
                                return (
                                  <Accordion.Item eventKey={index?.toString()} key={index}>
                                    <Accordion.Header>
                                      {`${counter}. ${item?.title || 'Question'}`}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <p>{item?.short_desc || 'No answer available'}</p>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                );
                              }
                              return null;
                            })}
                          </Accordion>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            <div className="shp1">
              <img src="/assets/images/ser-bg.png" alt="shape" />
            </div>
            <div className="shp2">
              <img src="/assets/images/ser-bg2.png" alt="shape" />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ContactUs;