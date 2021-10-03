import React from "react"
export function ShowPrecentage({ className, precentage }: { className?: string, precentage: number }) {

  return (
    <div className={`text-center-main ${className ? className : ""}`}>
      <h1 className="text-2xl font-bold md:text-4xl">Issues completed: {precentage * 100}%</h1>
    </div>
  )
}