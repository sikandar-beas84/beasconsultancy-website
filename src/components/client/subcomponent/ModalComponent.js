'use client'
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { env } from '@/util/constants/common';

function ModalComponent({modalshow=false}) {

    const fileInputRef = useRef(null);
    const [show, setShow] = useState(modalshow);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

    const handleClose = () => { 
        setShow(false);
        setStatus('');
        formData.name='';
        formData.email='';
        formData.phone='';
        formData.message='';
    }

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
          [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        data.append('subject', 'Enquiry Form Modal');
        setLoading(true); // ✅ start loader
        setStatus('');    // clear previous status
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
            setFormData({ name: '', email: '', phone: '', message: '' });
            // ✅ Reset file input
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
            handleClose();
            setStatus('');
          } else {
            setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
            setErrors(result.error);
          }
        } catch (err) {
          //console.error(err);
          setStatus('❌ Submission failed.');
        } finally {
          setLoading(false); // ✅ stop loader
        }
      };


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-xl"
                centered
                className='contact-modal'
            >
                <Modal.Header closeButton className='mmodal-header'>
                    {/* <Modal.Title></Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} lg={5} className='bgg-bright'>
                            <div className='tech-bg'>
                                <div class="tech-lines"></div>  
                                <div className='content-wrapper'>
 
                                    <div className='year-awar'>
                                        <Image
                                            src="/assets/images/awards.png"
                                            alt="awards"
                                            width={250}
                                            height={250}
                                            className="img-fluid"
                                        />
                                    </div>
                                    
                                    <div className='award-section pt-4 pop-up-award'>
                                        <ul>
                                            <li>
                                                <Image
                                                    src="/assets/images/a1.png"
                                                    alt="awards"
                                                    width={150}
                                                    height={80}
                                                    className="img-fluid"
                                                />
                                            </li>
                                            <li>
                                                <Image
                                                    src="/assets/images/a2.png"
                                                    alt="awards"
                                                    width={150}
                                                    height={80}
                                                    className="img-fluid"
                                                />
                                            </li>
                                            <li>
                                                <Image
                                                    src="/assets/images/a3.png"
                                                    alt="awards"
                                                    width={150}
                                                    height={80}
                                                    className="img-fluid"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <p className='ccompany-name'>AI-First Software Innovation Company</p>
                                </div>
                            </div>
                            </Col>
                            <Col xs={12} lg={7} className='bgg-light-blue'>
                                <div class="about_texts mt-3"><h1>Your Journey to Growth Begins Here</h1></div>
                                <p>Looking to build smarter, faster, and more modern digital solutions? Our AI-powered development team helps you turn ideas into real, practical results. From automation to intelligent apps, we make technology work for your business. Ready to grow with AI? Contact us now and let’s get started.
                                </p>
                                <div className='modal-ffoter'>
                                    <ul>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            Confidentiality Assured</li>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            Zero Spam Commitment</li>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            100% Quick Response
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <form className="was-validate contact-frm" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className='form-control mb-3'
                                                        placeholder='Name'
                                                        required
                                                    />
                                                    {errors.name && (<p className='error_message'>{errors.name[0]}</p>)}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className='form-control mb-3'
                                                        placeholder='Email'
                                                        required
                                                    />
                                                    {errors.email && (<p className='error_message'>{errors.email[0]}</p>)}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className='form-control'
                                                        placeholder='Mobile Number'
                                                        required
                                                    />
                                                    {errors.phone && (<p className='error_message'>{errors.phone[0]}</p>)}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        className='form-control'
                                                        placeholder='Message'
                                                        required
                                                    />
                                                    {errors.message && (<p className='error_message'>{errors.message[0]}</p>)}
                                                </div>
                                            </div>
                                            <div className="col-lg-8"></div>
                                            <div className="col-lg-4">
                                                <div className="contact_form_btn">

                                                    <button type="submit" className='red-btn w-100 mt-3 post-job-btn' >
                                                        {loading ? 'Submitting...' : 'Submit'}
                                                    </button>
                                                </div>
                                            </div>
                                            {loading && <div className="spinner">Loading...</div>}
                                            {status && <p>{status}</p>}
                                        </div>
                                    </form>


                                </div>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalComponent;