import React from 'react'
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
import bell from "./bell-ringing 1.svg"
import chartline from "./chart-line 1.svg"
import cursor from "./cursor-click 1.svg"
import files from "./files 1.svg"
import gauge from "./gauge 1.svg"
import list from "./list-checks 1.svg"
import magic from "./magic-wand 1.svg"
import sparkle from "./sparkle 1.svg"
import target from "./target 2.svg"

const boxs = [box, box1, box2, box3, box4, box5, box6, box7]
const features = [
  {
    logo: gauge,
    title: "User-friendly dashboard",
    body: "Perform complex SEO audits and optimizations with a single click."
  },
  {
    logo: chartline,
    title: "Visual reports",
    body: "Visual insights into your site’s performance."
  },
  {
    logo: sparkle,
    title: "Smart Keyword Generator",
    body: "Automatic suggestions and the best keywords to target."
  },
   {
    logo: list,
    title: "Content evaluation",
    body: "Simple corrections for immediate improvemens."
  },
  {
    logo: target,
    title: "SEO goal setting",
    body: "Helps you set and achieve SEO goals with guided assistance."
  },
  {
    logo: bell,
    title: "Automated alerts",
    body: "Automatic notifications about your SEO health, including quick fixes."
  },
   {
    logo: magic,
    title: "Link Optimization Wizard",
    body: "Guides you through the process of creating and managing links."
  },
  {
    logo: cursor,
    title: "One-click optimization",
    body: "Perform complex SEO audits and optimizations with a single click."
  },
  {
    logo: files,
    title: "Competitor reports",
    body: "Provides insights into competitors’ keyword strategies and ranking."
  }
];
export default function Framer() {
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
        <div className='grid'>
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
          <img src={dashboard2} alt="dashboard2" />
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
    <div className='page3'>
      <div className='features'>
      <h2>Elevate your SEO efforts.</h2>
      <div className="features-container">
  {features.map((feature, index) => (
    <div className="feature-card" key={index}>
      <div className="feature-card-group">
      <img src={feature.logo} alt={feature.title} />
      <h5>{feature.title}</h5>
      </div>
      <p>{feature.body}</p>
    </div>
  ))}
</div>
      </div>
    </div>
    </>
  )
}
