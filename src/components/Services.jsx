import { useState } from "react";
import './service.css';
function Services(){
       const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        {
            question: "What is XTools?",
            answer: "XTools are music plugins which are designed to enhance your music production workflow and provide professional-grade tools for musicians and producers."
        },
        {
            question: "How do I get started?",
            answer: "You can get started by downloading the plugin and following the setup instructions in our documentation."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a free trial for new users to explore our features."
        }
    ];
    return(
<div className="bg-black text-white  px-4 relative overflow-hidden">
  
           {/* SVG BACKGROUND */}
  {/* <svg
    className="absolute inset-0 z-0"
    viewBox="0 0 1440 720"
    fill="none"
  >
    <circle cx="1372.48" cy="618.205" r="308.334" stroke="#FF5722" strokeOpacity=".7" />
    <circle cx="16.942" cy="20.834" r="308.334" stroke="#299253" strokeOpacity=".7" />
  </svg> */}
     <svg
  className="absolute inset-0 z-0 w-full h-full"
  viewBox="10 10 1440 720"
  fill="none"
  preserveAspectRatio="none"
>
  {/* LEFT X - GREEN */}
  <path
    d="M-80 80 L280 360 L-80 640"
    stroke="#9CFF00"
    strokeWidth="2"
    strokeOpacity="0.65"
  />

  <path
    d="M80 80 L440 360 L80 640"
    stroke="#9CFF00"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* CENTER X - CYAN */}
                

  <path
    d="M470 40 L840 360 L470 680"
    stroke="#00C2CB"
    strokeWidth="1.5"
    strokeOpacity="0.3"
  />

  {/* RIGHT X - ORANGE */}
  <path
    d="M1160 80 L1520 360 L1160 640"
    stroke="#FF5722"
    strokeWidth="2"
    strokeOpacity="0.7"
  />

  <path
    d="M1000 80 L1360 360 L1000 640"
    stroke="#FF5722"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* Subtle horizontal line */}
  <path
    d="M0 680 H1440"
    stroke="#28834C"
    strokeWidth="1"
    strokeOpacity="0.35"
  />
</svg>

               {/* FAQS */}
              
             <div className="max-w-xl mx-auto flex flex-col items-center justify-center px-0 sm:px-4 md:px-0 py-16 sm:py-20 relative z-10">
                <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
                <h1 className="text-3xl font-semibold text-center">Looking for answer?</h1>
                <p className="text-sm text-slate-500 mt-2 pb-8 text-center">
                    We are a Music Plugin company dedicated to providing high-quality audio tools for musicians and producers.
                </p>
                {faqs.map((faq, index) => (
                    <div className="border-b border-slate-200 py-4 cursor-pointer w-full" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">
                                {faq.question}
                            </h3>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row items-center bg-black gap-4 lg:gap-12 pb-10">
                <img className="w-200 max-w-2xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/card-image-1.png" alt="" />
                <div className="space-y-8 sm:space-y-10 px-0 sm:px-4 md:px-0 w-full max-w-xl">
                    <div className="flex items-start justify-center gap-4 sm:gap-6 max-w-md w-full">
                        <div className="p-4 sm:p-6 aspect-square bg-violet-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-violet-700">Real-Time Analytics</h3>
                            <p className="text-sm text-slate-600">Track your music production progress in real-time with detailed analytics and insights.</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-center gap-4 sm:gap-6 max-w-md w-full">
                        <div className="p-4 sm:p-6 aspect-square bg-green-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.832 22.75C6.415 21 6.999 17.5 6.999 14a7 7 0 0 1 .396-2.333m2.695 13.999c.245-.77.525-1.54.665-2.333m-.255-15.4A7 7 0 0 1 21 14v2.333" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-green-700">Security </h3>
                            <p className="text-sm text-slate-600">End-to-end encryption, 2FA, compliance with GDPR standards.</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-center gap-4 sm:gap-6 max-w-md w-full">
                        <div className="p-4 sm:p-6 aspect-square bg-orange-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-red-700">Plugin Integration</h3>
                            <p className="text-sm text-slate-600">Seamlessly integrate with popular DAWs and audio software for enhanced workflow.</p>
                        </div>
                    </div>
                </div>
            </div>
</div>
    )       

}
export default Services;