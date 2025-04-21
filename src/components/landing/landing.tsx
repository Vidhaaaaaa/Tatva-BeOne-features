import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import Patient from  './spline_obj/spline_patient.tsx'

const Landing: React.FC = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (testimonialRef.current) {
        testimonialRef.current.scrollLeft += 300;
        if (testimonialRef.current.scrollLeft >= testimonialRef.current.scrollWidth - testimonialRef.current.clientWidth) {
          testimonialRef.current.scrollLeft = 0;
        }
      }
    }, 3000);

    const handleScroll = () => {
      if (numbersRef.current) {
        const rect = numbersRef.current.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top <= window.innerHeight;
        if (isInView && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(scrollInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const animateNumber = (target: number, element: HTMLHeadingElement) => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      element.textContent = start + '+';
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    if (isVisible) {
      const numberElements = numbersRef.current?.getElementsByTagName('h2');
      if (numberElements) {
        animateNumber(54, numberElements[0]);
        animateNumber(48000, numberElements[1]);
        animateNumber(6000, numberElements[2]);
      }
    }
  }, [isVisible]);

  return (
    <>
      <nav className="navigation">
        <div className="flex items-center">
          <Link to="/home" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">
            <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="h-10" />
            <span className="text-xl font-bold text-purple-600 ml-2">Tatva</span>
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/" className="menu-item">Home</Link>
          </li>
          <li>
            <Link to="/pricing" className="menu-item">Pricing</Link>
          </li>
          <li>
            <Link to="/support" className="menu-item">Support</Link>
          </li>
          <li>
            <Link to="/login" className="menu-item">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="landing-container">
        {/* TatvaCare Section */}
        <section className="tatvacare">
          <div className='intro_content'>
            <h1>Let's make every day better!</h1>
            <p>TatvaCare is a digital system that empowers both healthcare professionals and individuals with chronic conditions to create healthy habits leading to positive health outcomes.</p>
            <div className="buttons">
              <button>For Individuals</button>
              <button>For Healthcare Professionals</button>
            </div>
          </div>
          <div className='intro_spline'>
            <Patient/>
          </div>
        </section>

        {/* Bridge Content */}
        <section className='bridge-content'>
          <div className="part-1">We empower healthcare providers by streamlining their practice through digital solutions</div>
          <div className="part-2">We offer patients tailored care programs to enhance their well-being, improving care quality on one side and elevating life quality on the other.</div>
        </section>

        {/* For Individuals and Professionals Section */}
        <section className="services">
          <div className="service-card">
            <h2>FOR INDIVIDUALS</h2>
            <h3>CHRONIC CARE MANAGEMENT</h3>
            <p>Your very own AI-powered care companion that helps you take control of your chronic health conditions, one step at a time. Engage with a 24/7 wellness chatbot for personalized tips on fitness, stress, productivity, and sleep management.</p>
            <p>Explore our outcome-based personalized care plans delivered through the MyTatva app, a DTX application designed to blend wellness into your busy routine.</p>
            <button>Read More</button>
          </div>
          <div className="service-card">
            <h2>FOR HEALTHCARE PROFESSIONALS</h2>
            <h3>PATIENT CARE AND PRACTICE MANAGEMENT</h3>
            <p>An all-in-one platform that smartly manages your practice, allowing you to deliver exceptional patient care effortlessly. Utilize blockchain-based hubs for secure reward systems and anonymous feedback to enhance patient engagement.</p>
            <p>Digitize your practice with TatvaPractice, an ABDM-certified platform that boosts patient connect and loyalty through thriving HCP communities.</p>
            <div className="void_service"></div>
            <button>Read More</button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits">
          <div className="benefit-card">
            <div className="benefit-header">
              <h2>For Individuals</h2>
              <p>You deserve the best possible quality of care and support. We are together with you on this journey.</p>
            </div>
            <div>
              <ul className='benefit-list'>
                <li><span className="material-symbols-outlined">check</span>Intelligent App for lifestyle modifications</li>
                <li><span className="material-symbols-outlined">check</span>Outcome based Personalised Care Programs</li>
                <li><span className="material-symbols-outlined">check</span>Dedicated Coaching</li>
                <li><span className="material-symbols-outlined">check</span>Relay adherence insights to your treating doctor</li>
                <li><span className="material-symbols-outlined">check</span>Book lab tests, order medicines and devices</li>
              </ul>
            </div>
            <div className="void_benefits"></div>
            <button>Go to Tatva BeOne</button>
          </div>
          <div className="benefit-card">
            <div className='benefit-header'>
              <h2>For Healthcare Professionals</h2>
              <p>Minimise administrative workload and focus on what’s really important: patient care and the growth of your practice.</p>
            </div>
            <div className='benefit-list'>
              <ul>
                <li><span className="material-symbols-outlined">check</span>ABDM Certified</li>
                <li><span className="material-symbols-outlined">check</span>Highest level of Data Security</li>
                <li><span className="material-symbols-outlined">check</span>Boost patient connect and loyalty</li>
                <li><span className="material-symbols-outlined">check</span>Thriving HCP Community</li>
                <li><span className="material-symbols-outlined">check</span>Value Added Services for Clinic Promotions</li>
              </ul>
            </div>
            <div className="void_benefits"></div>
            <button>Go to Hub</button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>TESTIMONIALS</h2>
          <h1>WHAT OUR CUSTOMERS SAY</h1>
          <div className="testimonial-cards" ref={testimonialRef}>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>The AI chatbot on the Tatva app has been a lifesaver for me! As a busy professional in Bangalore, the personalized tips for stress management and sleep have seamlessly fit into my routine, boosting my productivity.</p>
              <h3>Ravi Patel</h3>
              <p>Bangalore, Karnataka</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>I love the gamified rewards system with blockchain tokens! It's fun to earn points for my yoga sessions at my university in Delhi. The anonymous peer support hub has also helped me connect with others without judgment.</p>
              <h3>Neha Sharma</h3>
              <p>Delhi, India</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>The personalized schedules on Tatva have transformed my wellness journey at our care home in Chennai. The app's integration into my daily life has improved my health outcomes, and I feel more balanced.</p>
              <h3>Anil Kumar</h3>
              <p>Chennai, Tamil Nadu</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>As a student in Hyderabad, the anonymous feedback feature allowed me to share my wellness concerns with the university safely. The blockchain-based rewards for fitness activities have made staying healthy exciting!</p>
              <h3>Priya Reddy</h3>
              <p>Hyderabad, Telangana</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>Working in a corporate setting in Mumbai, the Tatva app's AI chatbot and rewards system have made wellness engaging. The anonymous feedback has helped our HR team improve our programs, leading to better mental health support. </p>
              <h3>Sanjay Mehta</h3>
              <p>Mumbai, Maharashtra</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>The Tatva app's university hub in Pune has been a game-changer for my mental health. The blockchain rewards for meditation sessions motivate me, and the anonymous forums provide a safe space to vent.</p>
              <h3>Aisha Khan</h3>
              <p>Pune, Maharashtra</p>
            </div>
            <div className="card">
              <div className='image-container'><img src="/placeholder_user.jpg"/></div>
              <p>As a caregiver in Kolkata, the personalized wellness tips from the AI chatbot have helped me manage my stress while supporting residents. The anonymous feedback feature has also improved our care home's wellness programs.</p>
              <h3>Dipak Ghosh</h3>
              <p>Kolkata, West Bengal</p>
            </div>
          </div>
        </section>

        {/* Numbers Speak Section */}
        <section className="numbers-speak" ref={numbersRef}>
          <h1>NUMBERS SPEAK</h1>
          <div className="numbers-cards">
            <div className="number-card">
              <h2>0+</h2>
              <p>Countries</p>
              <p>Connecting practitioners across the globe for authentic yoga experiences.</p>
            </div>
            <div className="number-card">
              <h2>0+</h2>
              <p>Participants</p>
              <p>Thriving community embracing holistic wellness and personal transformation.</p>
            </div>
            <div className="number-card">
              <h2>0+</h2>
              <p>Classes</p>
              <p>Diverse offerings catering to all levels and wellness objectives.</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <div className='flex-col items-center'>
            <div className="flex items-center">
              <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="footer_logo" />
              <span className="text-5xl font-bold text-white-600 ml-2">Tatva</span>
            </div>
            <div className='my-5 footer_detail flex items-center w-2xs'>We deliver a comprehensive tech-driven platform that addresses the diverse needs of patients and healthcare providers, fostering seamless interactions to enhance overall health and well-being outcomes.</div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Blog</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>News Room</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Offices</h4>
            <h6>Manipal University Jaipur,</h6>
            <p>Dehmi Kalan,</p>
            <p>Off Jaipur-Ajmer Expressway,</p>
            <p>Jaipur</p>
            <p>Rajasthan 303007.</p>
          </div>
          <div className="footer-section">
            <div className="contact_container">
              <h4>Contact Us</h4>
              <p>+91 99740 42363 (Monday - Saturday | 9am to 8pm)</p>
              <p>support@tatvacare.in</p>
            </div>
            <div className="follow_container">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <span><img src='/instagram.svg'/></span>
                <span><img src='/linkedin.svg'/></span>
                <span><img src='/medium.svg'/></span>
                <span><img src='/twitter.svg'/></span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Landing;