import React from 'react'
import "./Nav.css"
import logo from "./Logo.png"


export default function Nav() {
  return (
    <nav className="navbar">
            <div className="container nav-container">
                <img src={logo} alt="logo" href="#"/>

                <div className="nav-links">
                    <a>
                        Features
                    </a>
                    <a>
                        Developers
                    </a>
                    <a>
                        Company
                    </a>
                    <a>
                        Pricing
                    </a>
                </div>

                <div className='nav-btn'>
                    <div className='nav-btn-item'>Join waitlist</div>
                </div>
            </div>
        </nav>
  );
}
