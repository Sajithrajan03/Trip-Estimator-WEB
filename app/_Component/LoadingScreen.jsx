import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50  bg-opacity-10  backdrop-blur-[2px]">
      <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="4"   animationDuration="2s" />
    </div>
  )
}

export default LoadingScreen