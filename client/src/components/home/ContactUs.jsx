import { Mail } from 'lucide-react'
import React from 'react'
import Title from './Title'
import BridulImage from '../../assets/Team/Bridul.jpg'

const ContactUs = () => {
  return (
    <div id="contact" className="flex flex-col items-center my-10 scroll-mt-12">
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
        <Mail width={14} />
        <span>Contact Us</span>
      </div>

      <Title
        title="Meet Our Team"
        description="The people behind the product, passionate about what they do."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
        {/* CARD 1 */}
        <div className="max-w-80 bg-black text-white rounded-2xl">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src={BridulImage}
              alt="Bridul R Munoth"
              className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent" />
          </div>
          <div className="px-4 pb-6 text-center">
            <p className="mt-4 text-lg">Bridul R Munoth</p>
            <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">
              Backend Developer and Integrator 
            </p>

            {/* social icons */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="#E1306C" />
                  <path
                    d="M12 8.25A3.76 3.76 0 0 0 8.25 12 3.76 3.76 0 0 0 12 15.75 3.76 3.76 0 0 0 15.75 12 3.76 3.76 0 0 0 12 8.25Zm0 6.12A2.37 2.37 0 0 1 9.63 12 2.37 2.37 0 0 1 12 9.63 2.37 2.37 0 0 1 14.37 12 2.37 2.37 0 0 1 12 14.37Z"
                    fill="white"
                  />
                  <circle cx="16.35" cy="7.65" r="0.9" fill="white" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path
                    d="M7.18 8.75C6.31 8.75 5.62 8.04 5.62 7.19 5.62 6.35 6.31 5.63 7.18 5.63c.87 0 1.55.72 1.55 1.56 0 .85-.68 1.56-1.55 1.56Zm-1.3 2.02h2.6v7.6h-2.6v-7.6Zm4.64 0h2.49v1.04h.04c.35-.66 1.21-1.35 2.49-1.35 2.66 0 3.15 1.74 3.15 4v3.91h-2.6v-3.47c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84v3.53h-2.6v-7.6Z"
                    fill="white"
                  />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11" fill="#181717" />
                  <path
                    d="M12 5.3c-3.69 0-6.69 3-6.69 6.69 0 2.96 1.92 5.47 4.59 6.36.34.06.47-.15.47-.33 0-.16-.01-.71-.01-1.29-1.74.32-2.2-.42-2.34-.81-.08-.21-.42-.86-.72-1.03-.25-.14-.6-.49-.01-.5.56-.01.96.52 1.09.74.64 1.08 1.66.77 2.06.59.06-.46.25-.77.45-.94-1.54-.17-3.16-.77-3.16-3.42 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.88 0 0 .58-.19 1.9.72a6.5 6.5 0 0 1 1.73-.23c.59 0 1.18.08 1.73.23 1.32-.91 1.9-.72 1.9-.72.38.98.14 1.7.07 1.88.45.49.72 1.12.72 1.88 0 2.66-1.63 3.25-3.18 3.42.26.22.48.65.48 1.32 0 .95-.01 1.72-.01 1.95 0 .18.12.39.47.33a6.72 6.72 0 0 0 4.58-6.36C18.69 8.3 15.69 5.3 12 5.3Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="max-w-80 bg-black text-white rounded-2xl">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
              alt="Nilesh Madiwal"
              className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent" />
          </div>
          <div className="px-4 pb-6 text-center">
            <p className="mt-4 text-lg">Nilesh Madiwal</p>
            <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">
              Frontend Developer
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="#E1306C" />
                  <path
                    d="M12 8.25A3.76 3.76 0 0 0 8.25 12 3.76 3.76 0 0 0 12 15.75 3.76 3.76 0 0 0 15.75 12 3.76 3.76 0 0 0 12 8.25Zm0 6.12A2.37 2.37 0 0 1 9.63 12 2.37 2.37 0 0 1 12 9.63 2.37 2.37 0 0 1 14.37 12 2.37 2.37 0 0 1 12 14.37Z"
                    fill="white"
                  />
                  <circle cx="16.35" cy="7.65" r="0.9" fill="white" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path
                    d="M7.18 8.75C6.31 8.75 5.62 8.04 5.62 7.19 5.62 6.35 6.31 5.63 7.18 5.63c.87 0 1.55.72 1.55 1.56 0 .85-.68 1.56-1.55 1.56Zm-1.3 2.02h2.6v7.6h-2.6v-7.6Zm4.64 0h2.49v1.04h.04c.35-.66 1.21-1.35 2.49-1.35 2.66 0 3.15 1.74 3.15 4v3.91h-2.6v-3.47c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84v3.53h-2.6v-7.6Z"
                    fill="white"
                  />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11" fill="#181717" />
                  <path
                    d="M12 5.3c-3.69 0-6.69 3-6.69 6.69 0 2.96 1.92 5.47 4.59 6.36.34.06.47-.15.47-.33 0-.16-.01-.71-.01-1.29-1.74.32-2.2-.42-2.34-.81-.08-.21-.42-.86-.72-1.03-.25-.14-.6-.49-.01-.5.56-.01.96.52 1.09.74.64 1.08 1.66.77 2.06.59.06-.46.25-.77.45-.94-1.54-.17-3.16-.77-3.16-3.42 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.88 0 0 .58-.19 1.9.72a6.5 6.5 0 0 1 1.73-.23c.59 0 1.18.08 1.73.23 1.32-.91 1.9-.72 1.9-.72.38.98.14 1.7.07 1.88.45.49.72 1.12.72 1.88 0 2.66-1.63 3.25-3.18 3.42.26.22.48.65.48 1.32 0 .95-.01 1.72-.01 1.95 0 .18.12.39.47.33a6.72 6.72 0 0 0 4.58-6.36C18.69 8.3 15.69 5.3 12 5.3Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="max-w-80 bg-black text-white rounded-2xl">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
              alt="Yogesh G Poojar"
              className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent" />
          </div>
          <div className="px-4 pb-6 text-center">
            <p className="mt-4 text-lg">Yogesh G Poojar</p>
            <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">
              Content Marketing
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="#E1306C" />
                  <path
                    d="M12 8.25A3.76 3.76 0 0 0 8.25 12 3.76 3.76 0 0 0 12 15.75 3.76 3.76 0 0 0 15.75 12 3.76 3.76 0 0 0 12 8.25Zm0 6.12A2.37 2.37 0 0 1 9.63 12 2.37 2.37 0 0 1 12 9.63 2.37 2.37 0 0 1 14.37 12 2.37 2.37 0 0 1 12 14.37Z"
                    fill="white"
                  />
                  <circle cx="16.35" cy="7.65" r="0.9" fill="white" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path
                    d="M7.18 8.75C6.31 8.75 5.62 8.04 5.62 7.19 5.62 6.35 6.31 5.63 7.18 5.63c.87 0 1.55.72 1.55 1.56 0 .85-.68 1.56-1.55 1.56Zm-1.3 2.02h2.6v7.6h-2.6v-7.6Zm4.64 0h2.49v1.04h.04c.35-.66 1.21-1.35 2.49-1.35 2.66 0 3.15 1.74 3.15 4v3.91h-2.6v-3.47c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84v3.53h-2.6v-7.6Z"
                    fill="white"
                  />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11" fill="#181717" />
                  <path
                    d="M12 5.3c-3.69 0-6.69 3-6.69 6.69 0 2.96 1.92 5.47 4.59 6.36.34.06.47-.15.47-.33 0-.16-.01-.71-.01-1.29-1.74.32-2.2-.42-2.34-.81-.08-.21-.42-.86-.72-1.03-.25-.14-.6-.49-.01-.5.56-.01.96.52 1.09.74.64 1.08 1.66.77 2.06.59.06-.46.25-.77.45-.94-1.54-.17-3.16-.77-3.16-3.42 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.88 0 0 .58-.19 1.9.72a6.5 6.5 0 0 1 1.73-.23c.59 0 1.18.08 1.73.23 1.32-.91 1.9-.72 1.9-.72.38.98.14 1.7.07 1.88.45.49.72 1.12.72 1.88 0 2.66-1.63 3.25-3.18 3.42.26.22.48.65.48 1.32 0 .95-.01 1.72-.01 1.95 0 .18.12.39.47.33a6.72 6.72 0 0 0 4.58-6.36C18.69 8.3 15.69 5.3 12 5.3Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
