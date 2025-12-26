import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets/'
import { useSelector } from "react-redux"; import api from '../configs/api';
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResumes] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () => {
    // setAllResumes(dummyResumeData)
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      console.log({ title, resumeText, token })
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResumes(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      console.log(error.response?.status, error.response?.data)
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, {
        resumeId: editResumeId,
        resumeData: { title }
      }, {
        headers: { Authorization: token }
      })

      setAllResumes(
        allResumes.map(resume =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      )

      setTitle('')
      setEditResumeId('')
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token }
        })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>

        <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-blue-500'>
          Welcome, {user.fullname}
        </p>

        <div className='flex gap-4'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}  // ✅ FIX: proper state setter
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing Resume</p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '60' }}>

                <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>{resume.title}</p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor }}>
                  Updated On {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={e => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            )
          })}
        </div>

        {/* --- Create Resume Modal --- */}
        {showCreateResume && (
          <div
            onClick={() => { setShowCreateResume(false); setTitle(''); }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <form
              onSubmit={createResume}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <div className="relative bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-9 rounded-full bg-emerald-50 border border-emerald-100">
                      <PlusIcon className="size-4 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Create a Resume
                      </h2>
                      <p className="text-xs text-slate-500">
                        Give your resume a title. You can change it later anytime.
                      </p>
                    </div>
                  </div>

                  <XIcon
                    className="size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    onClick={() => { setShowCreateResume(false); setTitle(''); }}
                  />
                </div>

                {/* Input */}
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Resume title
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Full Stack Developer – 2025"
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder:text-slate-400"
                    required
                  />
                </label>

                <div className="flex items-center justify-between mb-4 text-[11px] text-slate-400">
                  <span>Use role + year so it’s easy to identify later.</span>
                  <span>{title.length}/60</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => { setShowCreateResume(false); setTitle(''); }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-medium
                       text-slate-600 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm tracking-wide
                       bg-gradient-to-r from-emerald-500 to-green-500
                       hover:from-emerald-600 hover:to-green-600
                       text-white shadow-[0_6px_18px_rgba(16,185,129,0.35)]
                       flex items-center justify-center gap-2 transition-all
                       active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="size-5" />
                    <span>Create Resume</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}





        {/* --- Upload Resume Modal --- */}
        {showUploadResume && (
          <div
            onClick={() => { setShowUploadResume(false); setTitle(''); setResumes(null); }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <form
              onSubmit={uploadResume}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <div className="relative bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-9 rounded-full bg-emerald-50 border border-emerald-100">
                      <UploadCloudIcon className="size-4 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Upload Resume
                      </h2>
                      <p className="text-xs text-slate-500">
                        Upload a PDF resume and we’ll extract the content for you.
                      </p>
                    </div>
                  </div>

                  <XIcon
                    className="size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    onClick={() => { setShowUploadResume(false); setTitle(''); setResumes(null); }}
                  />
                </div>

                {/* Title input */}
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Resume title
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Frontend Engineer – Product Based"
                    className="mt-1 w-full px-4 py-2.5 mb-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder:text-slate-400"
                    required
                  />
                </label>

                <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400">
                  <span>You can connect multiple resumes with different titles.</span>
                  <span>{title.length}/60</span>
                </div>

                {/* File area */}
                <div className="mb-4">
                  <label htmlFor="resume-input" className="block text-xs font-medium text-slate-600">
                    Select Resume File
                    <div className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed 
                            border-slate-300 bg-slate-50 px-4 py-8
                            text-slate-400 hover:border-emerald-500 hover:text-emerald-600
                            cursor-pointer transition-colors">
                      {resume ? (
                        <p className="text-sm font-medium text-emerald-600 truncate max-w-[230px]">
                          {resume.name}
                        </p>
                      ) : (
                        <>
                          <UploadCloud className="size-12 stroke-1" />
                          <p className="text-xs">Click to browse or drop PDF here</p>
                          <p className="text-[11px] text-slate-400">Only .pdf files are supported</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResumes(e.target.files[0])}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => { setShowUploadResume(false); setTitle(''); setResumes(null); }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-medium
                       text-slate-600 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || !resume}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm tracking-wide
                     bg-gradient-to-r from-emerald-500 to-green-500
                     hover:from-emerald-600 hover:to-green-600
                     text-white shadow-[0_6px_18px_rgba(16,185,129,0.35)]
                     flex items-center justify-center gap-2 transition-all
                     active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <LoaderCircleIcon className="size-5 animate-spin" />
                    ) : (
                      <UploadCloudIcon className="size-5" />
                    )}
                    <span>{isLoading ? 'Uploading...' : 'Upload Resume'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}





        {/* --- Edit Title Modal --- */}
        {editResumeId && (
          <div
            onClick={() => { setEditResumeId(''); setTitle(''); }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <form
              onSubmit={editTitle}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <div className="relative bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-9 rounded-full bg-emerald-50 border border-emerald-100">
                      <FilePenLineIcon className="size-4 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Edit Resume Title
                      </h2>
                      <p className="text-xs text-slate-500">
                        Give this resume a clear, short and descriptive name.
                      </p>
                    </div>
                  </div>

                  <XIcon
                    className="size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    onClick={() => { setEditResumeId(''); setTitle(''); }}
                  />
                </div>

                {/* Input */}
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  New title
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Frontend Developer Resume 2025"
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder:text-slate-400"
                    required
                  />
                </label>

                {/* Tip + character count */}
                <div className="flex items-center justify-between mb-4 text-[11px] text-slate-400">
                  <span>Tip: include role & year to quickly recognise this resume.</span>
                  <span>{title.length}/60</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => { setEditResumeId(''); setTitle(''); }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-medium
                       text-slate-600 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm tracking-wide
             bg-gradient-to-r from-emerald-500 to-green-500
             hover:from-emerald-600 hover:to-green-600
             text-white border border-transparent
             shadow-[0_6px_18px_rgba(16,185,129,0.35)]
             flex items-center justify-center gap-2 transition-all
             active:scale-[0.99]
             focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}



      </div>
    </div>
  )
}

export default Dashboard
