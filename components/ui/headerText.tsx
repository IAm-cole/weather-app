import Navbar from '@/app/ClientNav'
import { Cloud } from 'lucide-react'
import React from 'react'

const HeaderText = ({paragraphText} :{paragraphText : string}) => {
  return (
     <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Weather Now
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {paragraphText}
           
          </p>
          <Navbar />
        </div>
  )
}

export default HeaderText