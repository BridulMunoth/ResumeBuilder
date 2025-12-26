import { Mail } from 'lucide-react'
import React from 'react'
import Title from './Title'
import BridulImage from '../../assets/Team/Bridul.jpg'
import NileshImage from '../../assets/Team/Nilesh.jpg'
import YgpImage from '../../assets/Team/Ygp.jpg'

const ContactUs = () => {
  return (
    <div id="contact" className="flex flex-col items-center my-10 scroll-mt-12">
      {/* Pill Badge */}
      <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-1.5 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
        <Mail width={14} />
        <span>Contact Us</span>
      </div>

      <Title
        title="Meet Our Team"
        description="The people behind the product, passionate about what they do."
      />

      <div className="mt-12 flex flex-wrap justify-center gap-8 md:flex-nowrap">
        {/* CARD 1 */}
        <div className="w-80 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white shadow-[0_18px_45px_rgba(0,0,0,0.7)] overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/5">
          {/* Image */}
          <div className="relative h-[270px] overflow-hidden">
            <img
              src={BridulImage}
              alt="Bridul R Munoth"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            {/* Dark gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
          </div>

          {/* Content (fixed height so all cards equal) */}
          <div className="flex h-[170px] flex-col items-center justify-between px-5 pb-6 pt-4 text-center">
            <div>
              <p className="text-lg font-semibold tracking-wide">
                Bridul R Munoth
              </p>
              <p className="mt-1 text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] bg-clip-text text-transparent">
                Backend Developer and Integrator
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bridul_jain/#"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
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
                href="https://linkedin.com/in/bridul-munoth-5883bb321"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
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
                href="https://github.com/BridulMunoth"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
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
        <div className="w-80 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white shadow-[0_18px_45px_rgba(0,0,0,0.7)] overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/5">
          <div className="relative h-[270px] overflow-hidden">
            <img
              src={NileshImage}
              alt="Nilesh Madiwal"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
          </div>

          <div className="flex h-[170px] flex-col items-center justify-between px-5 pb-6 pt-4 text-center">
            <div>
              <p className="text-lg font-semibold tracking-wide">
                Nilesh Madiwal
              </p>
              <p className="mt-1 text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] bg-clip-text text-transparent">
                Frontend Developer
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="#"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
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
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
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
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
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
        <div className="w-80 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white shadow-[0_18px_45px_rgba(0,0,0,0.7)] overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/5">
          <div className="relative h-[270px] overflow-hidden">
            <img
              src={YgpImage}
              alt="Yogesh G Poojar"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
          </div>

          <div className="flex h-[170px] flex-col items-center justify-between px-5 pb-6 pt-4 text-center">
            <div>
              <p className="text-lg font-semibold tracking-wide">
                Yogesh G Poojar
              </p>
              <p className="mt-1 text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] bg-clip-text text-transparent">
                Content Marketing
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-xl">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/callmeyogesh1359?igsh=cnhoaTZtbTE0bGh4"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
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
                href="https://www.linkedin.com/in/yogesh-poojar-95b788333?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
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
                className="rounded-full bg-white/5 p-2 hover:bg-white/15 hover:scale-110 transition-transform duration-200"
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
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
