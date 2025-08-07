import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useGlobalLoading } from '../Hooks/useGlobalLoading'
import gsap from 'gsap'

export default function GlobalLoader() {
  const { progress: realProgress, active } = useProgress()
  const { axiosLoading } = useGlobalLoading()

  const [minTimePassed, setMinTimePassed] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  const progressRef = useRef()
  const loaderRef = useRef()

  const allLoading = active || axiosLoading

  // Animate progress bar
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${realProgress}%`,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [realProgress])

  // Ensure minimum display time
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mark done when both asset & axios loading are false
  useEffect(() => {
    if (!allLoading) setIsDone(true)
  }, [allLoading])

  // Fade out
  useEffect(() => {
    if (isDone && minTimePassed) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setHidden(true),
      })
    }
  }, [isDone, minTimePassed])

  if (hidden) return null

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        color: '#fff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 200, height: 8, background: '#222', marginBottom: 10 }}>
        <div
          ref={progressRef}
          style={{
            width: '0%',
            height: '100%',
            background: '#915eff',
          }}
        />
      </div>
      <p style={{ fontSize: 14 }}>{Math.round(realProgress)}% loading...</p>
    </div>
  )
}
