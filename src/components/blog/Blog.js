'use client'
import React, { useState, useRef } from 'react'
import BreadCrumb from '../BreadCrumb';
import Image from 'next/image';
import { env } from '@/util/constants/common';
import { useRouter } from 'next/navigation';
import { Clock, MessageCircle, User } from "react-feather";
import Link from 'next/link';

const Blog = ({ blog,commonblog }) => {
    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    const createdAtString = blog?.created_at;
    const created_at = createdAtString ? new Date(createdAtString) : null;
    const day = created_at
    ? String(created_at.getDate()).padStart(2, "0")
    : "";
    const month = created_at ? created_at.getMonth() + 1 : "";
    const year = created_at ? created_at.getFullYear() : "";
  
  
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
  
    }
  
    const fileInputRef = useRef(null);
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      url: '',
      comment: '',
    });
  
    const customCheck = (e) => {
  
      const checked = e.target.checked;
      setIsChecked(checked);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //const token = recaptchaRef.current.getValue();
  
      if (!isChecked) {
        alert('Please checkbox');
        return;
      }
  
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      data.append('blog_id', blog?.id);
  
      setLoading(true); //  start loader
      setStatus('');    // clear previous status
  
      try {
        const res = await fetch(`${env.API_BASE_URL}save-blog-comment`, {
          method: 'POST',
          headers: {
            'X-SECURE-KEY': env.ACCESS_TOKEN
          },
          body: data
        });
  
        const result = await res.json();
        if (res.ok) {
          setStatus('✅ Your comment has been submitted successfully.');
          setErrors({});
          setFormData({
            name: '', email: '', url: '', comment: ''
          });
          // ✅ Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
          setIsChecked(false);
          //recaptchaRef.current.reset();
        } else {
          setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
          setErrors(result.error); // store errors in state
          setIsChecked(false);
        }
      } catch (err) {
        //console.error(err);
        setStatus('❌ Submission failed. Check console.');
      } finally {
        setLoading(false); // ✅ stop loader
        setIsChecked(false);
      }
    };
  
  
    
    return (
      <>
       
        <main>
          <BreadCrumb pagetitle="Blog" pageBanner={`${commonblog?.image}`} />
          <div className='py-5'>
            <section className="space-ptb">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    <div className="blog-detail">
                      <div className="blog-post">
                        <div className="blog-post-title about_texts">
                          <h1>{blog?.title}</h1>
                        </div>
                        <div className="blog-post-footer border-0 justify-content-start pt-0 blog-details-txt">
                          <div className="blog-post-time">
                            <Clock size={16} /> {day} / {month} / {year}
                          </div>
                          <div className="blog-post-author">
                            <span><User size={16} /> {blog?.author_name}</span>
                          </div>
                          <div className="blog-post-comment">
                            <MessageCircle size={16} /> {blog?.blog_contents?.length}
                          </div>
                        </div>
                        <div className="blog-post-image border-20">
                          <Image
                            width={850}
                            height={500}
                            src={`${env.BACKEND_BASE_URL}${blog?.image}`}
                            alt="image"
                            className="img-fluid"
                            loading="lazy"
                          />
                        </div>
                        <div className="blog-post-content mt-4">
                          <div
                            className="mb-0"
                            dangerouslySetInnerHTML={{ __html: blog?.description }}
                          ></div>
                        </div>
                        <div className="blog-post-content mt-4">
                          <div className="mt-4">
  
                            {blog?.blog_contents?.map((item, index) => (
                              <div key={index} className="row media mb-3">
                                <div className="avatar-section">
                                  <Image
                                    src="/assets/images/user.webp"
                                    alt="user"
                                    width={40}
                                    height={40}
                                    priority
                                    fetchPriority="high"
                                    className="img-fluid"
                                  />
                                  <h6 className="mt-0">{item.name}</h6>
                                </div>
                                <div className="media-body ml-3 border p-3 max-95 ccomment-box">
  
                                  <p className="mb-0">{item.comment}</p>
                                </div>
                              </div>
                            ))}
  
                            <div className="mt-4">
                              <h5 className="mb-4">Leave a Reply</h5>
                              <form onSubmit={handleSubmit}>
                                <div className="form-row blog_reply">
                                  <div className="form-group col-lg-6 col-md-12 col-12">
                                    <input
                                      type='text'
                                      name="name"
                                      value={formData.name}
                                      onChange={handleChange}
                                      className='form-control'
                                      placeholder='Your Name'
                                      required
                                    />
                                    {errors.name && (<p className='error_message'>{errors.name[0]}</p>)}
                                  </div>
                                  <div className="form-group col-lg-6 col-md-12 col-12">
                                    <input
                                      type='text'
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      className='form-control'
                                      placeholder='Your Email'
                                      required
                                    />
                                    {errors.email && (<p className='error_message'>{errors.email[0]}</p>)}
                                  </div>
                                  <div className="form-group col-12">
                                    <input
                                      type='text'
                                      name="url"
                                      value={formData.url}
                                      onChange={handleChange}
                                      className='form-control'
                                      placeholder='Your Website'
  
                                    />
                                    {errors.url && (<p className='error_message'>{errors.url[0]}</p>)}
                                  </div>
                                  <div className="form-group col-12">
                                    <textarea
                                      type='text'
                                      rows={10}
                                      name="comment"
                                      value={formData.comment}
                                      onChange={handleChange}
                                      className='form-control blogReply_textArea'
                                      placeholder='Your Message'
                                      required
                                    ></textarea>
                                    {errors.comment && (<p className='error_message'>{errors.comment[0]}</p>)}
                                  </div>
                                  <div className=" form-group col-12">
                                    <div className="custom-control custom-checkbox checkbox-">
                                      <input type="checkbox" className="custom-control-input blog_checkbox" id="customcheck" checked={isChecked} onChange={customCheck} />
                                      <label className="custom-control-label pr-5" htmlFor="customcheck"> I consent to let this website store my information to respond to my inquiry.</label>
                                    </div>
                                  </div>
                                  <div className="col-md-12 pt-3">
                                    <button type="submit" className='btn btn-primary-blue' disabled={loading}>
                                      Send Message
                                    </button>
  
                                  </div>
                                  {loading && <div className="spinner">Loading...</div>}
                                </div>
                                {status && <p>{status}</p>}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 mt-5 mt-lg-0">
                    <div className="blog-sidebar">
                      <h2>Transform business with <br /> Beas Consultancy & Services Pvt. Ltd</h2>
                      <ul className='pb-4'>
                        <li>20 years experience</li>
                        <li>Expert team across diverse industries</li>
                        <li>Customized business solutions</li>
                        <li>Proven track record of client success</li>
                        <li>End-to-end support for every project</li>
                        <li>Data-driven strategies for smarter decisions</li>
                        <li>Cost-effective and scalable solutions</li>
                        <li>Innovative approach with cutting-edge technologies</li>
                       </ul>
                      <div className='d-flex justify-content-center'>
                        {/* <a className="post-job-btn" href="#">Connect with us</a> */}
                        <Link
                          href={`/contact`}
                          className="post-job-btn"
                        >Connect with us</Link>
                      </div>
                    </div>
  
  
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <Container>
            <Row>
              <Col>
                <div className="Blogs">
                  <div className="container">
                    <div className="Blogs-head">
                      <h2>{homeData?.bloghomepage?.title}</h2>
                      <p>{homeData?.bloghomepage?.long_desc}</p>
                    </div>
                    <div className="Blogs-inr">
                      <div className="row">
                        <div className='col-12'>
  
                          <BannerCarousal page="blogs" blogs={homeData?.blogs} />
  
                        </div>
                      </div>
  
  
  
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container> */}
        </main>
      </>
    );
  
  }
  export default Blog