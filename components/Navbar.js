import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="h-16 bg-red-700 flex justify-between px-3 items-center text-white">
    <div className="logo font-bold text-2xl flex-grow text-center">
      <Link href="/">Free URL Shortener</Link>
    </div>
    <ul className="flex gap-4 items-center"></ul>
  </nav>
  )
}

export default Navbar