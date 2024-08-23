import React, { Children } from 'react'

export default function Button({children, onclick}) {
    const handleClclick = async ()=>{
        // 
        onclick();
    }
  return (
    <button onClick={handleClclick}>
        {children}
    </button>
  )
}
