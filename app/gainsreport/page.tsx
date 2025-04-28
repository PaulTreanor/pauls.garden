// 'use client';

// import { useEffect, useRef } from 'react';

// export default function GainsReport() {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
  
//   useEffect(() => {
//     const handleIframeLoad = () => {
//       const iframe = iframeRef.current;
//       if (!iframe) return;
      
//       const resizeIframe = () => {
//         try {
//           iframe.style.height = '4000px';

//           setTimeout(() => {
//             try {
//               const iframeBody = iframe.contentWindow?.document.body;
//               if (iframeBody) {
//                 const height = iframeBody.scrollHeight;
//                 iframe.style.height = `${height + 100}px`;
//               }
//             } catch (e) {
//               console.log('Could not access iframe content - likely due to cross-origin restrictions');
//             }
//           }, 1000);
//         } catch (e) {
//           console.error('Error resizing iframe:', e);
//         }
//       };
      
//       resizeIframe();
      
//       window.addEventListener('resize', resizeIframe);
//       return () => window.removeEventListener('resize', resizeIframe);
//     };
    
//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.addEventListener('load', handleIframeLoad);
//       return () => iframe.removeEventListener('load', handleIframeLoad);
//     }
//   }, []);
  
//   return (
//     <div className="container max-w-full mx-auto p-0">
//       <h1 className="text-3xl font-bold text-[#3a5a40] mb-4 pt-4">GainsReport (experimental workout log)</h1>
//       <p className='text-md text-[#3a5a40] mb-4'>I track my workouts in a markdown file which this webapp reads in.</p>

//       <p className='text-md text-[#3a5a40] mb-4'>Very much a work in progress... 🚧</p>
//       <div className="iframe-container w-full">
//         <iframe
//           ref={iframeRef}
//           src="https://gainsreport.vercel.app/"
//           title="GainsReport (my workout log)"
//           className="w-full border-0"
//           style={{ 
//             minHeight: '6000px', 
//             overflow: 'visible',
//             marginTop: '0px', 
//             display: 'block',
//             position: 'relative'
//           }}
//           allow="fullscreen"
//         />
//       </div>
//     </div>
//   );
// }