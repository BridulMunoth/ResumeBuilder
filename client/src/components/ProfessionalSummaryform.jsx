import { Loader2, Sparkles, Lightbulb } from 'lucide-react'
import React, { useState } from 'react'
import TipsPanel from './TipsPanel'
import { useSelector } from 'react-redux';
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryform = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const generateSummary = async () => {
    setIsGenerating(true)
    try {
      const prompt = `enchance my professional summary "${data}"`
      const response = await api.post(`/api/ai/enhance-pro-sum`, { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enchancedContent }))

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally { setIsGenerating(false) }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'>Add Summary for your resume here</p>
        </div>
        <div className='flex items-center gap-2'>
          <button type='button' onClick={()=>setShowTips(true)} aria-label='Get Tips' title='Get Tips' className='p-2 rounded-full border border-yellow-300 text-yellow-600 hover:bg-yellow-50 shadow-[0_0_10px_rgba(250,204,21,0.5)]'>
            <Lightbulb className='w-4 h-4' />
          </button>
          <button disabled={isGenerating} onClick={generateSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
            {isGenerating ? (<Loader2 className='size-4 animate-spin' />) : (
              <Sparkles className="size-4" />)}
            {isGenerating ? "Enhancing..." : " AI Enchance"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <textarea value={data || ""} onChange={(e) => onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a Compelling professional summary that highlights your key strenghts and career objectives..' />
        <div className='bg-blue-50 p-3 rounded-lg'>
          <p className='text-sm text-blue-800'><strong>Tip:</strong> Keep it concise(3-4 sentences) and focus on your most relevant achivements and skills.</p>
        </div>
      </div>
      <TipsPanel
        open={showTips}
        onClose={()=>setShowTips(false)}
        title='Tips'
        sections={[
          { heading: 'Professional Summary', points: [
            'Keep it 2–4 lines focused on strengths and target role.',
            'Mention years of experience, core skills, and impact.',
            'Align keywords with the job you are applying for.'
          ]}
        ]}
      />
    </div>
  )
}

export default ProfessionalSummaryform
