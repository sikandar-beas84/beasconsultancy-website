import { useState, useRef } from 'react';
import { env } from '@/util/constants/common';
import ReCAPTCHA from 'react-google-recaptcha';
import CountryCodeDropdown from './Contact/CountryCodeDropdown';

function SlideQueryComponent({modalshow=false}) {

    const fileInputRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState(null);

    const [show, setShow] = useState(modalshow);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        countrycode: '+91'  // default India
      });

    const handleClose = () => { 
        setShow(false);
        setStatus('');
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            countrycode: '+91'
        });
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

        if (!captchaToken) {
          alert('Please verify the captcha');
          return;
        }

        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        data.append('recaptcha_token', captchaToken);
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
            setTimeout(() => {
                handleClose();
                setStatus('');
            }, 2000);
          } else {
            setStatus(``);
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
           
            <div className={`sliding-form ${show ? "active" : ""}`}>
                <button className="close-btn-submit-frm" onClick={handleClose}><span>×</span></button>
                <h3>Interested? Feel free to connect</h3>
                <form className="was-validate contact-frm" onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Name'
                        required
                    />
                    {errors?.name && (<p className='error_message'>{errors.name[0]}</p>)}
                    
                    <input
                        type='text'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Email'
                        required
                    />
                    {errors?.email && (<p className='error_message'>{errors.email[0]}</p>)}
                    <div className="d-flex gap-2">
                    <CountryCodeDropdown
                    name="countrycode"
                    value={formData.countrycode}
                    onChange={handleChange}
                    
                    />

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Mobile No"
                            required
                        />
                    </div>
                    {/* <input
                        type='text'
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}a
                        className='form-control'
                        placeholder='Mobile Number'
                        required
                    /> */}
                    {errors?.phone && (<p className='error_message'>{errors.phone[0]}</p>)}
                    <input
                        type='text'
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className='form-control h-50'
                        placeholder='Message'
                        required
                    />
                    {errors?.message && (<p className='error_message'>{errors.message[0]}</p>)}
                    <div className='col-12 rreaptcha'>
                        <ReCAPTCHA
                          sitekey={`${env.SITE_KEY}`}
                          onChange={setCaptchaToken}
                        />
                      </div>
                    <div className="d-flex sliding-form-btn">
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
                    </div>
                    
                    {status && <p>{status}</p>}
                </form>
            </div>
        </>
    );
}

export default SlideQueryComponent;