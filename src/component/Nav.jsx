import React, { useState, useRef } from 'react'
import { Show, SignInButton, useClerk, useUser } from "@clerk/react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from "../ui/dropdown-menu"
import { UserIcon, LogOutIcon } from "lucide-react"
import avatars from "../Avatars.png"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import "./Nav.css"
import logo from "./Logo.svg"

// Register useGSAP hook
gsap.registerPlugin(useGSAP)

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { signOut, openUserProfile } = useClerk()
  const { user } = useUser()
  
  // References for animation
  const containerRef = useRef(null)
  
  // Animations
  useGSAP(() => {
    // Select all the 'a' tags inside the links container
    const links = gsap.utils.toArray('.nav-links a')
    
    // Only run the staggering entrance animation on mobile
    let mm = gsap.matchMedia()

    mm.add("(max-width: 768px)", () => {
      // Entrance Animation (stagger)
      if (menuOpen) {
        gsap.fromTo(links, 
          { y: 30, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "back.out(1.7)",
            overwrite: "auto"
          }
        )
      } else {
        gsap.to(links, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          overwrite: "auto"
        })
      }
    })
    
    return () => mm.revert() // Cleanup matchMedia
  }, { dependencies: [menuOpen], scope: containerRef })

  // Hover animation handlers
  const handleMouseEnter = (e) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    gsap.to(e.target, { 
        y: isMobile ? -3 : 0, 
        color: "#fff", 
        scale: isMobile ? 1.05 : 1,
        duration: 0.2, 
        ease: "power1.out" 
    })
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.target, { 
        y: 0, 
        color: "rgba(255, 255, 255, 0.85)", 
        scale: 1,
        duration: 0.2, 
        ease: "power1.in" 
    })
  }


  return (
    <nav className="navbar" ref={containerRef}>
      <div className="container nav-container">
        <img src={logo} alt="logo" href="#" />

        {/* Nav links */}
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Features</a>
          <a onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Developers</a>
          <a onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Company</a>
          <a onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Pricing</a>
        </div>

        <div className="nav-actions">
          <div className="nav-auth">
            <Show when="signed-out">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard">
                <div className='nav-btn' onClick={() => setMenuOpen(false)}>
                  <div className='nav-btn-item'>Sign in</div>
                </div>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div onClick={() => setMenuOpen(false)}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <img src={avatars} alt="user profiles" className="user-avatar-static" style={{ height: '40px', objectFit: 'contain' }} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2 bg-[#050208]/95 border-white/10 backdrop-blur-xl">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{user?.fullName || user?.username}</p>
                        <p className="text-xs leading-none text-white/50">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={() => openUserProfile()} className="text-white cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Account Detail</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => signOut()} className="text-red-400 cursor-pointer">
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Show>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger${menuOpen ? ' active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
