import React from 'react'
import { useState } from 'react'
import Hero from './component/Hero.jsx'
import "./Framer.css"
import "./index.css"
import Nav from './component/Nav.jsx'
import dashboard from "./dashboard.png"
import m from "./M.svg"
import box from "./Box.svg"
import box1 from "./Box-1.svg"
import box2 from "./Box-2.svg"
import box3 from "./Box-3.svg"
import box4 from "./Box-4.svg"
import box5 from "./Box-5.svg"
import box6 from "./Box-6.svg"
import box7 from "./Box-7.svg"
import visual from "./Visual.png"
import dashboard2 from "./dashboard2.png"
import dashboard3 from "./dashboard3.png"
import visual2 from "./Visual2.png"
import Testimonial from './ui/testimonial-v2.jsx'
import { GlowingEffectDemo } from './component/GlowingEffectDemo.jsx'
import check from "./Icons.svg"
import Line from "./Line.jsx"
import pattern from "./pattern 1.svg"
import pattern2 from "./pattern 2.svg"
import Footer from './component/Footer.jsx'
import { useNavigate } from "react-router-dom"
import Dashboard from "./Dashboard.jsx"

const boxs = [box, box1, box2, box3, box4, box5, box6, box7]

export default function Framer() {
  const navigate = useNavigate()
  return (
    <>
    <div className="page">
      <Nav/>
      <div className='hero-container'>
     <img src={m} alt="m" id='m'/>
     <div className='hero-text'>
      <h1>Boost your rankings with AI.</h1>
      <p>Elevate your site’s visibility effortlessly with AI, where smart technology meets user-friendly SEO tools.</p>
      <button>Start for free</button>
     </div>
    </div> 
     <div className='hero-img'>
      <div className='blur-container'>
      <div className='blur'></div>
      <div className='blur2'></div>
      </div>
       <div className='img-box'> 
         <img src={dashboard} alt="dashboard" className='img'/>
       </div>
     </div>
    </div>
    <div className='black-fade'></div>
    <div className='page2'>
      <div className='companies'>
        <div className='p1'>Trusted by the world’s most innovative teams</div>
        <div className='bento-grid-custom'>
          {boxs.map((box, index) => (
            <img src={box} alt="box" key={index} />
          ))}
        </div>
      </div>
      <div className='bento-header'>
        Harness the power of AI, making search engine optimization intuitive and effective for all skill levels.
      </div>
     <div className='bento-container'> 
      <div className='bento-box'>
        <div className='seo'>
          <img src={visual} alt="visual"/>
          <div className='seo-text'>
            <h5>SEO goal setting</h5>
            <p>Helps you set and achieve SEO goals with guided assistance.</p>
          </div>
        </div>
        <div className='user-friendly'>
          <img src={dashboard} alt="dashboard2" />
          <div className='user-friendly-grad'></div>
          <div className='uf-text'>
            <h5>User-friendly dashboard</h5>
            <p>Perform complex SEO audits and optimizations with a single click.</p>
          </div>
        </div>
      </div>
      <div className='bento-box2'>
        <div className='user-friendly'>
          <img src={dashboard3} alt="dashboard3" />
          <div className='user-friendly-grad'></div>
          <div className='uf-text'>
            <h5>Visual reports</h5>
            <p>Visual insights into your site’s performance.</p>
          </div>
        </div>
        <div className='seo'>
          <img src={visual2} alt="visual2"/>
          <div className='box2-text'>
            <h5>Smart Keyword Generator</h5>
            <p>Automatic suggestions and the best keywords to target.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className='page3' id="features">
      <div className='features'>
      <h2>Elevate your SEO efforts.</h2>
      <GlowingEffectDemo/>
      </div>
    </div>
  <div className='page4' id="testimonials">
    <Testimonial/>
  </div>
  <div className='page5' id="pricing">
    <div className='pricing'>
      <div className='pricing-header'>
      <h2>Pricing</h2>
      <p>Choose the right plan to meet your SEO needs and start optimizing today.</p>
      </div>
      <div className='pricing-card-container'>
        <div className='pricing-card'>
         <div className='pricing-card-under-container'>
          <div className='pricing-card-header'>
          <h4>Basic</h4>
          <div className='pricing-card-p'>$29/mo</div>
          </div>
          <Line/>
          <div className='pricing-card-body'>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Keyword optimization</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Automated meta tags</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>SEO monitoring</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Monthly reports</div>
            </div>
          </div>
         </div>
         <button className='pricing-card-button'>Join waitlist</button>  
        </div>
        <div className='pricing-card2'>
        <div className='pricing-card-under-container'>
          <div className='pricing-card-header'>
          <h4>Pro</h4>
          <div className='pricing-card-p'>$79/mo</div>
          </div>
          <Line/>
          <div className='pricing-card-body'>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Keyword optimization</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Automated meta tags</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>SEO monitoring</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Monthly reports</div>
            </div>
                   <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Content suggestions</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Link optimization</div>
            </div>
          </div>
         </div>
         <button className='pricing-card-button3'>Join waitlist</button>  
        </div>
        <div className='pricing-card'>
         <div className='pricing-card-under-container'>
          <div className='pricing-card-header'>
          <h4>Business</h4>
          <div className='pricing-card-p'>$149/mo</div>
          </div>
          <Line/>
          <div className='pricing-card-body'>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Keyword optimization</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Automated meta tags</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>SEO monitoring</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Monthly reports</div>
            </div>
                   <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>Content suggestions</div>
            </div>
            <div className='pricing-card-body-text'>
              <img src={check} alt="check"/>
              <div className='pricing-card-body-text-p'>API integration</div>
            </div>
          </div>
         </div>
         <button className='pricing-card-button2'>Join waitlist</button>  
        </div>
      </div>
    </div>
  </div>
  <div className='page6'>
    <div className='CTA'>
      <div className='CTA-under-container'>
      <h2 className='CTA-h2'>AI-driven SEO for everyone.</h2>
      <form>
      <div className='CTA-form'>
        <input type="text" placeholder='Enter your email'/>
        <button className='CTA-button1' >Join waitlist</button>
      </div>
       <button className='CTA-button2'>Join waitlist</button>
      </form>
      <p className='CTA-p'>No credit card required, 7-days free trial</p>
      </div>
      <img src={pattern2} alt="pattern2" className='CTA-pattern2'/>
      <div className='CTA-circle'></div>
    </div>
  </div>
  <div className='page7'>
    <Footer/>
  </div>
    </>
  )
}
