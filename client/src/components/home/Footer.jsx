import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <>
      <footer className="mt-40 bg-gradient-to-b from-white via-green-50 to-green-100/60 border-t">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">
          <div className="flex flex-col items-center text-center">
            <img src="/logo.jpg" alt="logo" className="h-14 w-auto rounded-md shadow-sm" />

            <h3 className="mt-5 text-2xl md:text-3xl font-semibold text-slate-800">
              Build a standout resume in minutes
            </h3>
            <p className="mt-2 max-w-2xl text-slate-600">
              ATS-friendly templates, elegant typography and clean layout tuned for hiring managers.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="px-3 py-1.5 text-xs rounded-full bg-green-600/10 text-green-700 ring-1 ring-green-600/20">
                Fast & Easy
              </span>
              <span className="px-3 py-1.5 text-xs rounded-full bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20">
                ATS Friendly
              </span>
              <span className="px-3 py-1.5 text-xs rounded-full bg-teal-600/10 text-teal-700 ring-1 ring-teal-600/20">
                Instant PDF
              </span>
            </div>

            <button
              onClick={() => navigate('/app')}
              className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm ring-1 ring-green-600/30 transition-all"
            >
              Start Building
            </button>

            <div className="mt-10 grid grid-cols-3 gap-6 text-slate-700">
              <div className="px-4">
                <p className="text-2xl font-bold text-slate-900">5+</p>
                <p className="text-xs">Templates</p>
              </div>
              <div className="px-4">
                <p className="text-2xl font-bold text-slate-900">1-Click</p>
                <p className="text-xs">Download</p>
              </div>
              <div className="px-4">
                <p className="text-2xl font-bold text-slate-900">Zero</p>
                <p className="text-xs">Clutter</p>
              </div>
            </div>

            <hr className="mt-12 w-full border-green-200/60" />
            <p className="mt-6 text-[13px] text-gray-500">© 2025 NextBestYou Resume Builder</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  )
}

export default Footer
