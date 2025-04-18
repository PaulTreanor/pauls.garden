'use client';

import { useEffect, useRef } from 'react';

export default function GainsReport() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      // Try to resize the iframe based on its content
      const resizeIframe = () => {
        try {
          // Set to a very tall height initially to ensure we capture full content
          iframe.style.height = '6000px';
          
          // Wait a bit for content to load
          setTimeout(() => {
            try {
              const iframeBody = iframe.contentWindow?.document.body;
              if (iframeBody) {
                // Get the actual height of the iframe's content
                const height = iframeBody.scrollHeight;
                iframe.style.height = `${height + 100}px`; // Add more padding
              }
            } catch (e) {
              console.log('Could not access iframe content - likely due to cross-origin restrictions');
            }
          }, 1000);
        } catch (e) {
          console.error('Error resizing iframe:', e);
        }
      };
      
      resizeIframe();
      
      // Add window resize listener to readjust iframe height
      window.addEventListener('resize', resizeIframe);
      return () => window.removeEventListener('resize', resizeIframe);
    };
    
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      return () => iframe.removeEventListener('load', handleIframeLoad);
    }
  }, []);
  
  return (
    <div className="container max-w-full mx-auto p-0">
      <h1 className="text-3xl font-bold text-[#3a5a40] mb-4 px-4 pt-4">GainsReport (my experimental workout log)</h1>
      <div className="iframe-container w-full">
        <iframe
          ref={iframeRef}
          src="https://gainsreport.vercel.app/"
          title="GainsReport (my workout log)"
          className="w-full border-0"
          style={{ 
            minHeight: '6000px', 
            overflow: 'visible',
            marginTop: '0px', // Ensure no negative space at top
            display: 'block',
            position: 'relative'
          }}
          scrolling="no"
          allow="fullscreen"
          frameBorder="0"
        />
      </div>
    </div>
  );
}