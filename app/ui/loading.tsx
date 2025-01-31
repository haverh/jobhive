'use client'
import { useEffect } from 'react'

export default function Loading() {
  useEffect(() => {
    async function getLoader() {
      const { spiral } = await import('ldrs')
      spiral.register()
    }
    getLoader()
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-full">
      <l-spiral color="coral"></l-spiral>
    </div>
  )
}