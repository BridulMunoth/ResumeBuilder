import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ProfessionalImageTemplate from './templates/ProfessionalImageTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import CreativeImageTemplate from './templates/CreativeImageTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import ExecutiveImageTemplate from './templates/ExecutiveImageTemplate'
import TechnicalTemplate from './templates/TechnicalTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {

    const renderTemplate = ()=>{
        switch(template) {
            case "modern":
                return <ModernTemplate data={data}  accentColor={accentColor}/>
            case "minimal":
                return <MinimalTemplate data={data}  accentColor={accentColor}/>
            case "minimal-image":
                return <MinimalImageTemplate data={data}  accentColor={accentColor}/>
            case "professional":
                return <ProfessionalTemplate data={data}  accentColor={accentColor}/>
            case "professional-image":
                return <ProfessionalImageTemplate data={data}  accentColor={accentColor}/>
            case "creative":
                return <CreativeTemplate data={data}  accentColor={accentColor}/>
            case "creative-image":
                return <CreativeImageTemplate data={data}  accentColor={accentColor}/>
            case "executive":
                return <ExecutiveTemplate data={data}  accentColor={accentColor}/>
            case "executive-image":
                return <ExecutiveImageTemplate data={data}  accentColor={accentColor}/>
            case "technical":
                return <TechnicalTemplate data={data}  accentColor={accentColor}/>

            default:
                return <ClassicTemplate data={data}  accentColor={accentColor}/>;
        }
    }
     return (
    <div className='w-full bg-gray-100'>
      <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none" + classes}>
        {renderTemplate()}
      </div>

      <style jsx>
        {`
        @page{
        size: letter;
        margin: 0; 
        }
        @media print {
        html, body {
        widh: 8.5in;
        height: 11in;
        overflow: hidden;
        }
        body *{
        visibility: hidden;
        }
        #resume-preview, #resume-preview *{
        visibility: visible;
        } 
        #resume-preview{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        margin: 0;
        paddomg: 0;
        box-shadow: none !important;
        border: none !important;
        }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview
