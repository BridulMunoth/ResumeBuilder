import { Check, Layout, X, Image as ImageIcon } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const[isOpen, setIsOpen] = useState(false)

  const templates =[
    {
      id: "classic",
      name: "Classic",
      preview: "Traditional format with clear sections",
      hasImage: false
    },
     {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with strategic colors",
      hasImage: false
    },
     {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean, content-focused",
      hasImage: false
    },
     {
      id: "minimal-image",
      name: "Minimal-Image",
      preview: "Minimal with profile image",
      hasImage: true
    },
    {
      id: "professional",
      name: "Professional",
      preview: "Corporate layout with sidebar",
      hasImage: false
    },
    {
      id: "professional-image",
      name: "Professional-Image",
      preview: "Professional with profile image",
      hasImage: true
    },
    {
      id: "creative",
      name: "Creative",
      preview: "Bold design for creatives",
      hasImage: false
    },
    {
      id: "creative-image",
      name: "Creative-Image",
      preview: "Creative with prominent image",
      hasImage: true
    },
    {
      id: "executive",
      name: "Executive",
      preview: "Sophisticated senior-level layout",
      hasImage: false
    },
    {
      id: "executive-image",
      name: "Executive-Image",
      preview: "Executive with profile image",
      hasImage: true
    },
    {
      id: "technical",
      name: "Technical",
      preview: "Tech-focused with skills emphasis",
      hasImage: false
    }
  ]

  return (
    <>
      <style>{`
        .template-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .template-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .template-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 10px;
        }
        .template-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
        .template-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #f1f5f9;
        }
      `}</style>
      
      <button 
        onClick={()=> setIsOpen(true)} 
        className='flex items-center gap-1 text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'
      >
        <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
      </button>
      
      {isOpen && (
        <div 
          className='fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200' 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className='bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-200'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-5 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm'>
              <h2 className='text-2xl font-bold text-gray-900'>Select Template</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                aria-label="Close"
              >
                <X size={20} className='text-gray-500' />
              </button>
            </div>

            {/* Templates Grid - Scrollable */}
            <div className='overflow-y-auto overflow-x-hidden flex-1 p-5 template-scrollbar'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {templates.map((template)=>(
                  <div 
                    key={template.id} 
                    onClick={()=> {onChange(template.id); setIsOpen(false)}} 
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all group transform hover:scale-105 ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200" 
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className='size-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white'>
                          <Check className="w-4 h-4 text-white"/>
                        </div>
                      </div>
                    )}
                    
                    {template.hasImage && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-blue-100 p-1.5 rounded-md shadow-sm">
                          <ImageIcon size={14} className="text-blue-600" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <h4 className={`font-semibold text-sm ${selectedTemplate === template.id ? 'text-blue-900' : 'text-gray-900'}`}>
                        {template.name}
                      </h4>
                      <p className={`text-xs leading-tight ${selectedTemplate === template.id ? 'text-blue-700' : 'text-gray-500'}`}>
                        {template.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className='p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm'>
              <p className='text-sm text-gray-600 text-center font-medium'>
                Selected: <span className='text-blue-600 font-semibold'>{templates.find(t => t.id === selectedTemplate)?.name || 'None'}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TemplateSelector
