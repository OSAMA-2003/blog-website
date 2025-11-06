"use client"

import { LogOut } from "lucide-react"
import React from "react"

const LogoutButton = () => {
  return (
    <div className="relative inline-block overflow-hidden">
      <button className="group flex items-center justify-start w-[35px] h-[35px] rounded-full bg-red-500 shadow-md overflow-hidden transition-all duration-300 hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]">
        
        {/* Icon */}
        <div className="flex items-center text-white justify-center w-full transition-all duration-300 md:group-hover:w-[30%] md:group-hover:pl-5">
          <LogOut className="w-4  h-4 font-bold"/>
        </div>

        {/* Text */}
        <div className="absolute right-0 w-0 opacity-0 text-white font-semibold text-base transition-all duration-300 md:group-hover:opacity-100 md:group-hover:w-[70%] md:group-hover:pr-2">
          Logout
        </div>
      </button>
    </div>
  )
}

export default LogoutButton
