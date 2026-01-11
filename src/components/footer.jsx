import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm ">
  <div className="max-w-7xl mx-auto px-3 py-3 flex flex-col md:flex-row items-center justify-center gap-1">
    
    {/* Left side */}
    <div className="flex items-center gap-2">
      <span>© 2026</span>
      <span className="font-medium text-gray-300">
        getHired<span className="text-xs align-super ml-0.5">™</span>
      </span>
    </div>

    {/* Right side links */}
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
      <a href="#" className="hover:text-white">Terms</a>
      <a href="#" className="hover:text-white">Privacy</a>
      <a href="#" className="hover:text-white">Security</a>
      <a href="#" className="hover:text-white">Status</a>
      <a href="#" className="hover:text-white">Community</a>
      <a href="#" className="hover:text-white">Docs</a>
      <a href="#" className="hover:text-white">Contact</a>
    </div>

  </div>
</footer>
  )
}

export default Footer