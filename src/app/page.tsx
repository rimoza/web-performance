'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Menu, Book, Code, Image, Timer, TextSelect, Zap, Rocket } from 'lucide-react';

// Progress bar component
const ProgressBar = ({ progress }: {
  progress: number;
}) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
    <div 
      className="h-full bg-blue-500 transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const TableOfContents = ({ sections, currentSection, onSectionChange }: 
  {
    sections: { title: string; icon: React.ReactNode }[];
    currentSection: number;
    onSectionChange: (index: number) => void;
  }
) => {
  return (
    <div className="p-4 bg-white backdrop-blur-sm shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
        <Book className="mr-2" size={24} />
        Table of Contents
      </h2>
      <nav>
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <li 
              key={index}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-300
                ${currentSection === index 
                  ? 'bg-blue-100 text-blue-600 transform scale-105 font-medium shadow-md' 
                  : 'hover:bg-gray-100 text-blue-600'}`}
              onClick={() => onSectionChange(index)}
            >
              <div className="flex items-center">
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const CodeBlock = ({ code, language }: 
  {
    code?: string;
    language: string;
  }
) => (
  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4 relative group">
    <div className="absolute top-2 right-2 text-xs text-gray-400">{language}</div>
    <code className="font-mono text-sm">{code}</code>
  </pre>
);

const ContentSection = ({ section }: {
  section: {
    title: string;
    icon: React.ReactNode;
    content: {
      type: string;
      text?: string;
      language?: string;
      items?: string[];
    }[];
  };
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        <div className="flex items-center">
          {section.icon}
          <span className="ml-3">{section.title}</span>
        </div>
      </h1>
      <div className="prose prose-lg max-w-none">
        {section.content.map((block, index) => {
          switch (block.type) {
            case 'text':
              return (
                <p key={index} className="mb-4 leading-relaxed text-gray-700 animate-slideUp">
                  {block.text}
                </p>
              );
            case 'code':
              return (
                <CodeBlock 
                  key={index} 
                  code={block.text} 
                  language={block.language || 'html'} 
                />
              );
            case 'list':
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                  {block.items!.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Introduction: The Importance of Web Performance Optimization",
    icon: <Timer className="text-blue-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Website performance optimization is the process of making web pages load and run faster by improving the efficiency of the front-end code."
      },
      {
        type: "text",
        text: "This process involves a variety of techniques and strategies aimed at reducing page load times, enhancing user experience, and improving overall site performance."
      },
      {
        type: "text",
        text: "In today’s digital world, users expect websites to load quickly and be responsive. Performance isn't just a technical requirement—it's directly tied to user experience and SEO rankings. Slow websites often lead to higher bounce rates and lower engagement, which can significantly impact business success. Optimizing web performance is therefore essential for retaining users and providing a seamless browsing experience."
      },
      {
        type: "text",
        text: "One of the critical factors that affect web performance is how quickly the First Contentful Paint (FCP) and Largest Contentful Paint (LCP) occur. These two metrics are part of Core Web Vitals, a set of performance measurements used by Google to evaluate the user experience on a website."
      },
      {
        title: "Key Web Performance Metrics:",
        type: "list",
        items: [
          "First Contentful Paint (FCP):",
          "FCP measures how long it takes for the first piece of content (text, image, or canvas) to appear on the screen after the user navigates to the page. A fast FCP gives the user immediate feedback that the page is loading.",
          "Why It Matters: Users expect content to load quickly. If it takes too long to render anything on the screen, users may get frustrated and leave.",
          "Largest Contentful Paint (LCP):",
          "LCP measures the time it takes for the largest visible content element (usually an image or a large block of text) to fully render on the screen. LCP is a good indicator of how quickly the user can see the most meaningful content on a page.",
          "Why It Matters: A slow LCP can leave users staring at an incomplete or blank page, which leads to poor user experience and higher abandonment rates.",
        ]
      },
      {
        title: "The Importance of Optimizing These Metrics:",
        type: "list",
        items: [
          "Improved User Experience: Fast page load times reduce frustration and make users more likely to stay on your website.",
          "Better SEO: Google uses Core Web Vitals, including FCP and LCP, as ranking factors. Sites with better performance are ranked higher in search results.",
          "Lower Bounce Rates: A website that loads quickly will retain users, preventing them from leaving before the page has fully loaded.",
        ]
      }
    ]
  },
  {
    title: "Lazy Loading Implementation",
    icon: <Code className="text-green-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Lazy loading is a technique where certain elements (especially images or videos) load only when they appear in the user's view. This reduces initial load time and makes pages more responsive."
      },
      {
        type: "code",
        language: "html",
        text: `<!-- Basic lazy loading example -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image">

<!-- Full example with container -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lazy Loading Example</title>
    <style>
        .image-container {
            max-width: 600px;
            margin: 20px auto;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="image-container">
        <img src="image1.jpg" loading="lazy" alt="Image 1">
        <img src="image2.jpg" loading="lazy" alt="Image 2">
        <img src="image3.jpg" loading="lazy" alt="Image 3">
    </div>
</body>
</html>`
      },
      {
        type: "list",
        items: [
          "Improves initial load times",
          "Saves bandwidth by loading only visible content",
          "Native browser support with loading='lazy'",
          "Better user experience on slower connections"
        ]
      }
    ]
  },
  {
    title: "Code Splitting Techniques",
    icon: <Code className="text-purple-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Code splitting is the practice of dividing your JavaScript files into smaller chunks, loading only the parts that are necessary for a specific page or component."
      },
      {
        type: "code",
        language: "javascript",
        text: `// React code splitting example
import React, { Suspense, lazy } from 'react';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}`
      },
      {
        type: "list",
        items: [
          "Reduces initial bundle size",
          "Improves application startup time",
          "Better caching capabilities",
          "More efficient resource utilization"
        ]
      }
    ]
  },
  {
    title: "Image Optimization",
    icon: <Image className="text-red-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Optimizing images involves resizing, compressing, and properly formatting them to make sure they don't take up more space than necessary."
      },
      {
        type: "code",
        language: "html",
        text: `<!-- Responsive images example -->
<img 
  src="small.jpg" 
  srcset="
    small.jpg 300w,
    medium.jpg 600w,
    large.jpg 900w
  "
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 580px,
         880px"
  alt="Responsive image"
>

<!-- CSS for responsive images -->
<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
}
</style>`
      },
      {
        type: "list",
        items: [
          "Use appropriate image formats (JPEG, PNG, WebP)",
          "Implement responsive images using srcset",
          "Compress images without quality loss",
          "Consider lazy loading for images",
          "Use modern image formats like WebP with fallbacks"
        ]
      }
    ]
  },
  {
    title: "Core Web Vitals & Performance Metrics",
    icon: <Zap className="text-yellow-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. Understanding and optimizing these metrics is crucial for both user experience and SEO performance."
      },
      {
        type: "list",
        items: [
          "Largest Contentful Paint (LCP): Should occur within 2.5 seconds for a good user experience",
          "First Input Delay (FID): Should be less than 100 milliseconds",
          "Cumulative Layout Shift (CLS): Should be less than 0.1",
          "Total Blocking Time (TBT): Should be under 200 milliseconds",
          "Time to Interactive (TTI): Should be under 5 seconds"
        ]
      },
      {
        type: "text",
        text: "Performance metrics are measured in two primary ways:"
      },
      {
        type: "list",
        items: [
          "Lab Testing: Simulated page loads in controlled environments, crucial for testing new features before release",
          "Field Testing (RUM): Real User Monitoring that measures actual user experiences in varying conditions"
        ]
      }
    ]
  },
  {
    title: "Web Font Optimization",
    icon: <TextSelect className="text-pink-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Proper font optimization is essential for both performance and visual consistency. Here are best practices for handling web fonts:"
      },
      {
        type: "code",
        language: "css",
        text: `/* Optimized font loading strategy */
@font-face {
    font-family: 'CustomFont';
    src: url('/fonts/CustomFont.woff2') format('woff2'),
         url('/fonts/CustomFont.woff') format('woff');
    font-display: swap;
    font-weight: 400;
    font-style: normal;
}

/* Preload critical fonts */
<link 
    rel="preload" 
    href="/fonts/CustomFont.woff2" 
    as="font" 
    type="font/woff2" 
    crossorigin
>`
      },
      {
        type: "list",
        items: [
          "Use WOFF2 format for better compression",
          "Implement font-display: swap for better perceived performance",
          "Preload critical fonts",
          "Limit font weights and variants",
          "Consider using system fonts for better performance"
        ]
      }
    ]
  },
  {
    title: "Next.js Performance Optimization Techniques",
    icon: <Rocket className="text-indigo-500" size={24} />,
    content: [
      {
        type: "text",
        text: "Next.js offers powerful built-in features and optimization techniques that can significantly improve your web application's performance. Here's a comprehensive overview of these techniques and their benefits:"
      },
      {
        type: "text",
        text: "1. Server Components"
      },
      {
        type: "list",
        items: [
          "Zero bundle size impact - components are executed on the server and don't add to the JavaScript sent to clients",
          "Instant loading states while data fetching",
          "Automatic code splitting without configuration",
          "Direct database access without API layers",
          "Better security by keeping sensitive data and logic on the server",
          "Improved SEO with server-side rendering"
        ]
      },
      {
        type: "text",
        text: "2. Automatic Image Optimization"
      },
      {
        type: "list",
        items: [
          "Automatic image resizing for different devices",
          "Lazy loading by default for improved initial page load",
          "Automatic conversion to modern formats like WebP and AVIF",
          "Prevents Cumulative Layout Shift (CLS) with proper image dimensions",
          "Built-in blur-up placeholder effect for better user experience",
          "Optimized delivery through Next.js's built-in Image Optimization API"
        ]
      },
      {
        type: "text",
        text: "3. Intelligent Routing and Navigation"
      },
      {
        type: "list",
        items: [
          "Automatic route prefetching for faster subsequent page loads",
          "Route groups for better code organization and loading",
          "Parallel routes for simultaneous loading of multiple sections",
          "Intercepting routes for modal-like experiences",
          "Optional catch-all routes for dynamic handling",
          "Automatic 404 handling without extra configuration"
        ]
      },
      {
        type: "text",
        text: "4. Advanced Data Fetching"
      },
      {
        type: "list",
        items: [
          "Incremental Static Regeneration (ISR) for dynamic content with static benefits",
          "Automatic static optimization where possible",
          "Request memoization to prevent duplicate data fetching",
          "Streaming for progressive page loading",
          "Parallel data fetching for improved performance",
          "Built-in cache handling for optimal data freshness"
        ]
      },
      {
        type: "text",
        text: "5. Script Optimization"
      },
      {
        type: "list",
        items: [
          "Automatic code splitting for optimal loading",
          "Smart script loading strategies (beforeInteractive, afterInteractive, lazyOnload)",
          "Automatic defer loading of non-critical scripts",
          "Built-in support for module/nomodule pattern",
          "Optimized third-party script loading",
          "Automatic inline script optimization"
        ]
      },
      {
        type: "text",
        text: "6. Build Optimization"
      },
      {
        type: "list",
        items: [
          "Automatic bundling and minification",
          "Tree shaking for removing unused code",
          "Efficient chunk splitting for better caching",
          "Optimized production builds with reduced size",
          "Automatic polyfill handling",
          "Smart page revalidation strategies"
        ]
      },
      {
        type: "text",
        text: "7. Edge Runtime Capabilities"
      },
      {
        type: "list",
        items: [
          "Global edge network deployment for faster response times",
          "Reduced server load with edge computing",
          "Automatic region selection for optimal performance",
          "Minimal cold starts with edge functions",
          "Lower latency for dynamic operations",
          "Improved scalability with distributed computing"
        ]
      },
      {
        type: "text",
        text: "8. CSS and Font Optimization"
      },
      {
        type: "list",
        items: [
          "Automatic CSS inlining for critical styles",
          "Route-based CSS loading for reduced initial bundle",
          "Built-in CSS modules support",
          "Optimized font loading with next/font",
          "Zero layout shift font loading",
          "Automatic subset generation for fonts"
        ]
      },
      {
        type: "text",
        text: "9. Middleware Optimization"
      },
      {
        type: "list",
        items: [
          "Request-level performance optimization",
          "Dynamic routing based on user context",
          "Efficient A/B testing implementation",
          "Streamlined authentication checks",
          "Geographic-based content optimization",
          "Request/response manipulation without server overhead"
        ]
      },
      {
        type: "text",
        text: "10. Development Optimization"
      },
      {
        type: "list",
        items: [
          "Fast Refresh for instant feedback during development",
          "Built-in TypeScript support for better code quality",
          "Automatic error reporting and handling",
          "Development-specific performance optimizations",
          "Integrated debugging tools",
          "Built-in performance monitoring"
        ]
      }
    ]
  }
];

const PerformanceGuide = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((currentSection / (sections.length - 1)) * 100);
  }, [currentSection]);

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar progress={progress} />
      
      <div className="flex">
        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 left-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
        >
          <Menu size={24} className='text-blue-600' />
        </button>

        {/* Sidebar */}
        <div className={`
          fixed left-0 top-0 h-full w-72 transform transition-transform duration-500 ease-in-out
          bg-white/80 backdrop-blur-sm shadow-xl z-40 pt-16
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <TableOfContents 
            sections={sections}
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-500 ${showSidebar ? 'ml-72' : 'ml-0'}`}>
          <div className="p-8 pt-16">
            <ContentSection section={sections[currentSection]} />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 max-w-4xl mx-auto">
              <button
                onClick={previousSection}
                disabled={currentSection === 0}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  currentSection === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                }`}
              >
                <ChevronLeft className="mr-2" size={20} />
                Previous
              </button>
              
              <button
                onClick={nextSection}
                disabled={currentSection === sections.length - 1}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  currentSection === sections.length - 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                }`}
              >
                Next
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGuide;