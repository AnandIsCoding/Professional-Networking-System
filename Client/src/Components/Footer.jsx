import React from 'react'

function Footer() {
  return (
    <footer className=" fixed bottom-0 w-full  bg-zinc-100 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
  {/* Left: SVG Logo */}
  <div className="flex items-center mb-2 md:mb-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
      className="w-6 h-6 mr-2 fill-blue-600"
    >
      <g>
        <path d="M34,17C34,7.6,26.4,0,17,0S0,7.6,0,17s7.6,17,17,17S34,26.4,34,17z" />
        <path
          fill="#fff"
          d="M10.1 14.6H6.9v10.7h3.2V14.6zM8.5 9.3C7.4 9.3 6.5 10.2 6.5 11.3s.9 2 2 2 2-.9 2-2-.9-2-2-2zm9.8 5.3c-1.7 0-2.5.9-2.9 1.5V14.6h-3.2c.1.9 0 10.7 0 10.7h3.2v-6c0-.3 0-.6.1-.8.3-.6.9-1.3 1.9-1.3 1.3 0 1.9 1 1.9 2.5v5.6h3.2v-6c0-3.2-1.7-4.6-3.2-4.6z"
        />
      </g>
    </svg>
    <span className="font-semibold text-gray-700">LinkedIn</span>
  </div>

  {/* Center: Copyright */}
  <p className="text-center">&copy; {new Date().getFullYear()} Anand • LinkedIn Clone • All rights reserved.</p>
</footer>

  )
}

export default Footer
