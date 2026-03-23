'use client'
import React, { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ArrowUp, Briefcase, Flag, User, Calendar, MapPin, Award } from 'react-feather';
import { env } from '@/util/constants/common';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';
import CountryCodeDropdown from '../Contact/CountryCodeDropdown';
import BreadCrumb from '../BreadCrumb';

const SingleCarrerPage = ({ career, menucareer, careerId }) => {
  console.log("career",career)
  const router = useRouter();

  // Add check for career data
  if (router.isFallback || !career) {
    return <div>Loading...</div>;
  }

  const fileInputRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    resume: '',
    countrycode: '+91'  // default India
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // ✅ Allow only numbers and special characters for phone field
    if (name === "phone") {
      const regex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;

      if (!regex.test(value)) {
        // ❌ Invalid input — do not update formData
        setErrors((prev) => ({
          ...prev,
          phone: ["Only numbers and special characters are allowed."],
        }));
        return;
      } else {
        // ✅ Valid input
        setErrors((prev) => ({
          ...prev,
          phone: null,
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please verify the captcha');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('recaptcha_token', captchaToken);
    data.append('job_id', careerId);

    setLoading(true); // ✅ start loader
    setStatus('');    // clear previous status

    try {
      const res = await fetch(`${env.API_BASE_URL}apply-job`, {
        method: 'POST',
        headers: {
          'X-SECURE-KEY': env.ACCESS_TOKEN
        },
        body: data
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('✅ Your job application has been submitted successfully.');
        setErrors({});
        setFormData({
          name: '', email: '', phone: '', resume: null,
          countrycode: '+91'
        });
        // ✅ Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        // Reset captcha if needed
        setCaptchaToken(null);
      } else {
        setStatus(``);
        setErrors(result.error); // store errors in state
      }
    } catch (err) {
      setStatus('❌ Submission failed.');
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  // Helper function to get skills array
  const getSkillsArray = (skills) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') return skills.split(',').filter(s => s.trim());
    return [];
  };

  return (
    <>
      <main>
        <BreadCrumb
          pagetitle={career?.find((e) => e.id === careerId)?.role}
          pageslug='Career'
          pageBanner={`assets/img/menu-content/${menucareer?.menu_contents?.banner}`}
        />

        <Container className='py-5'>
          <Row>
            <Col>
              <h1 className='inner-page-title'>Join BEAS — Drive Growth through Quality</h1>
              <div className='inner-page-text' dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
            </Col>
          </Row>
        </Container>

        <section className="section-abuts section-services">
          <Container className="my-3">
            <Row>
              <Col className="ser_frmArea">
                <Row>
                  <Col xs={12}>
                    <div className="job-details-block">
                      <div className="job-details-inner-block">
                        <p className="job-details-title">Job Details</p>

                        <ul className="job-details-list-box">
                          <li>
                            <span><Award size={16} strokeWidth={2} /> Years Of Experience: </span> {career?.find((e) => e.id === careerId)?.experience || 'N/A'}
                          </li>
                          <li>
                            <span><MapPin size={16} strokeWidth={2} /> Location: </span> {career?.find((e) => e.id === careerId)?.location || 'N/A'}
                          </li>
                          <li>
                            <span><Briefcase size={16} strokeWidth={2} /> Level: </span> {career?.find((e) => e.id === careerId)?.level || 'N/A'}
                          </li>
                          <li>
                            <span><Calendar size={16} strokeWidth={2} /> Duration: </span> {career?.find((e) => e.id === careerId)?.duration || 'N/A'}
                          </li>
                          <li>
                            <span><User size={16} strokeWidth={2} /> Vacancy: </span> {career?.find((e) => e.id === careerId)?.vacancy || 'N/A'}
                          </li>
                          <li>
                            <span><Flag size={16} strokeWidth={2} /> Type: </span> Full Time
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <hr />

                  {/* Key Responsibilities */}
                  <Col xs={12} lg={6}>
                    {career?.find((e) => e.id === careerId)?.key_responsibilities &&
                      getSkillsArray(career.find((e) => e.id === careerId)?.key_responsibilities).length > 0 && (
                        <div className="job-details-inner-block">
                          <p className="job-details-title">Key Responsibilities</p>
                          <div className="skill-tags">
                            <ul>
                              {getSkillsArray(career.find((e) => e.id === careerId)?.key_responsibilities).map((skill, index) => (
                                <li key={index}>{skill.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                  </Col>

                  {/* Required Skills */}
                  <Col xs={12} lg={6}>
                    {career?.find((e) => e.id === careerId)?.required_skills &&
                      getSkillsArray(career.find((e) => e.id === careerId)?.required_skills).length > 0 && (
                        <div className="job-details-inner-block">
                          <p className="job-details-title">Required Skills</p>
                          <div className="skill-tags">
                            <ul>
                              {getSkillsArray(career.find((e) => e.id === careerId)?.required_skills).map((skill, index) => (
                                <li key={index}>{skill.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                  </Col>

                  {/* Apply For Job FORM */}
                  <Col xs={12} className='bblue-bg'>
                    <div className="job-details-block-card">
                      <p className="job-details-title">Apply For Job</p>

                      <form className="was-validate mt-4" onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} lg={3}>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control mb-1"
                              placeholder="Name"
                              required
                            />
                            {errors?.name && (
                              <p className="error_message">{errors.name[0]}</p>
                            )}
                          </Col>

                          <Col xs={12} lg={3}>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="form-control mb-1"
                              placeholder="Email"
                              required
                            />
                            {errors?.email && (
                              <p className="error_message">{errors.email[0]}</p>
                            )}
                          </Col>

                          <Col xs={12} lg={4}>
                            <div className="d-flex gap-2">
                              <CountryCodeDropdown
                                name="countrycode"
                                value={formData.countrycode}
                                onChange={handleChange}
                              />

                              <div className="w-100">
                                <input
                                  type="text"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="form-control mb-1"
                                  placeholder="Mobile Number"
                                  required
                                />
                              </div>
                            </div>
                            {errors?.phone && (
                              <p className="error_message">{errors.phone[0]}</p>
                            )}
                          </Col>

                          <Col xs={12} lg={2}>
                            <div className="upload-btn-wrapper">
                              <button className="btn2" type="button">
                                Upload CV <ArrowUp />
                              </button>
                              <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                                ref={fileInputRef}
                                accept=".doc,.docx,.pdf,.ppt,.pptx"
                                className="form-control mb-1"
                                required
                              />
                            </div>
                            {errors?.resume && (
                              <p className="error_message">{errors.resume[0]}</p>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} className="my-3">
                            <ReCAPTCHA
                              sitekey={`${env.SITE_KEY}`}
                              onChange={setCaptchaToken}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} lg={3}>
                            <button
                              type="submit"
                              className='red-btn w-100 mt-3 post-job-btn'
                              disabled={loading}
                            >
                              {loading ? (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                  <span className="loader"></span>
                                  Submitting...
                                </span>
                              ) : (
                                'Submit'
                              )}
                            </button>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} className="mt-3">
                            {status && <p>{status}</p>}
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          <div className="shp1">
            <img src="../assets/images/ser-bg.png" alt="" />
          </div>
          <div className="shp2">
            <img src="../assets/images/ser-bg2.png" alt="" />
          </div>
        </section>
      </main>
    </>
  )
}

export default SingleCarrerPage