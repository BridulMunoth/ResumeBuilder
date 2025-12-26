import React from 'react'
import { Zap } from "lucide-react";
import Title from './Title';

const Features = () => {
    const [isHover, setIsHover] = React.useState(false);
    return (
        <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
                <Zap width={14} />
                <span>Professional Resume Builder</span>
            </div>

            <Title title='Stand Out from the Crowd' description='Create a professional resume that gets you noticed by recruiters with our easy-to-use builder and expert templates.' />

            <div>
                <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
                    <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                    <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                        <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                            <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600"><path d="M12 3v18" /><path d="M18 9l-6-6-6 6" /><path d="M6 21h12" /></svg>
                                <div className="space-y-2">
                                    <h3 className="text-base font-semibold text-slate-700">Easy-to-Use Editor</h3>
                                    <p className="text-sm text-slate-600 max-w-xs">Intuitive drag-and-drop interface to build your perfect resume in minutes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                <div className="space-y-2">
                                    <h3 className="text-base font-semibold text-slate-700">ATS-Friendly Templates</h3>
                                    <p className="text-sm text-slate-600 max-w-xs">Professionally designed templates optimized for Applicant Tracking Systems.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                                <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                <div className="space-y-2">
                                    <h3 className="text-base font-semibold text-slate-700">Multiple Export Formats</h3>
                                    <p className="text-sm text-slate-600 max-w-xs">Download your resume in PDF, DOCX, or TXT formats with one click.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            </div>
        </div>
    )
}

export default Features
