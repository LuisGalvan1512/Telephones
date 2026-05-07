import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lyricsData, LyricItem } from './lyricsData'

interface Cloud {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

interface FloatingCube {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [clouds, setClouds] = useState<Cloud[]>([])
  const [cubes, setCubes] = useState<FloatingCube[]>([])
  const [isFlash, setIsFlash] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const initialClouds: Cloud[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 250 + 100,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.2 + 0.05
    }))
    setClouds(initialClouds)

    const initialCubes: FloatingCube[] = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: Math.random() * 100 + 60,
      speed: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.25 + 0.15,
      rotation: Math.random() * 360
    }))
    setCubes(initialCubes)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const audio = audioRef.current
    if (!audio) return

    audio.play().catch(e => console.error('Error reproduciendo audio:', e))

    const updateVisuals = () => {
      if (!audio || audio.paused) return

      const time = audio.currentTime
      setCurrentTime(time)

      const idx = lyricsData.findIndex(
        (item: LyricItem) => time >= item.start && time < item.end
      )
      setCurrentWordIndex(idx)

      setClouds(prev =>
        prev.map(cloud => ({
          ...cloud,
          x: (cloud.x + cloud.speed) % 110,
          y: Math.max(0, Math.min(100, cloud.y + Math.sin(time * 0.8 + cloud.id) * 0.03))
        }))
      )

      setCubes(prev =>
        prev.map(cube => ({
          ...cube,
          x: cube.x + cube.speed > 110 ? -10 : cube.x + cube.speed,
          y: cube.y + Math.sin(time * 0.5 + cube.id) * 0.5,
          rotation: (cube.rotation + 0.2) % 360
        }))
      )

      animationRef.current = requestAnimationFrame(updateVisuals)
    }

    updateVisuals()

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentWordIndex(-1)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
    audio.addEventListener('ended', onEnded)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      audio.removeEventListener('ended', onEnded)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const flashInterval = setInterval(() => {
      if (Math.random() < 0.03 && !isFlash) {
        setIsFlash(true)
        setTimeout(() => {
          setIsFlash(false)
        }, 300 + Math.random() * 500)
      }
    }, 100)

    return () => clearInterval(flashInterval)
  }, [isPlaying, isFlash])

  const handleRestart = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    setCurrentWordIndex(-1)
    setIsFlash(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const currentWord = currentWordIndex >= 0 ? lyricsData[currentWordIndex] : null

  return (
    <div className="h-screen w-full relative overflow-hidden font-serif">
      <audio ref={audioRef} src="/Telephones.mp3" preload="auto" />

      {/* Fondo NORMAL - Azul claro (siempre visible) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #797CFF 0%, #99E5FD 100%)',
          zIndex: 0,
          opacity: isFlash ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Fondo OSCURO - Reemplaza al normal durante el flash */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0a30 0%, #0d0530 50%, #1a0a30 100%)',
          zIndex: 0,
          opacity: isFlash ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Patrón Backrooms */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px),
            repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px)
          `,
          zIndex: 3
        }}
      />

      {/* 20+ Nubes - BLANCAS por defecto, OSCURAS durante flash */}
      {clouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.55}px`,
            backgroundColor: isFlash
              ? `rgba(40, 30, 80, ${cloud.opacity * 2})`  // OSCURO durante flash
              : `rgba(255,255,255, ${cloud.opacity})`,  // BLANCO por defecto
            filter: isFlash ? 'blur(15px)' : 'blur(12px)',
            zIndex: 4
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, Math.sin(cloud.id) * 20, 0]
          }}
          transition={{
            duration: 90 / cloud.speed,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Cubos volando */}
      {cubes.map(cube => (
        <motion.div
          key={cube.id}
          className="absolute"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            opacity: cube.opacity,
            zIndex: 4,
            filter: 'blur(3px)',
            transform: `rotate(${cube.rotation}deg)`
          }}
          animate={{
            x: [0, window.innerWidth + 100],
            rotate: [0, 360]
          }}
          transition={{
            duration: 40 / cube.speed,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <img
            src="/icono/PaoPao.png"
            alt="Cube"
            className="w-full h-full object-contain"
            style={{ opacity: 0.85 }}
          />
        </motion.div>
      ))}

      {/* Efecto Niebla PERMANENTE - Toda la pantalla nublada */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 4.5
        }}
      />

      {/* Segunda capa de niebla para más ambiente */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
          filter: 'blur(80px)',
          opacity: 0.5,
          zIndex: 4.6
        }}
        animate={{
          x: [0, 50, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tercera capa de niebla animada */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)',
          filter: 'blur(100px)',
          opacity: 0.4,
          zIndex: 4.7
        }}
        animate={{
          y: [0, 30, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {!isPlaying ? (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <motion.button
              onClick={() => setIsPlaying(true)}
              className="bg-transparent text-white hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.8)] cursor-pointer mb-8"
              style={{ fontSize: '150px' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ▶
            </motion.button>
            <motion.h1
              className="italic font-bold mb-4 text-white"
              style={{ fontSize: 'clamp(80px, 12vw, 350px)' }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(255,255,255,0.6)',
                  '0 0 60px rgba(255,255,255,0.9)',
                  '0 0 30px rgba(255,255,255,0.6)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Telephones
            </motion.h1>
            <p className="text-xl md:text-2xl tracking-widest uppercase opacity-80 text-white mt-8">
              Immersive Experience
            </p>
            <p className="mt-8 text-white text-lg opacity-70">
              Presiona el botón para comenzar
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 absolute inset-0 text-center">
            <div className="max-w-6xl z-20 relative px-4 flex flex-col gap-6 md:gap-8 items-center min-h-[60vh] justify-center">
              <div className="flex flex-col items-center mb-8 md:mb-16 min-h-[250px] md:min-h-[400px] justify-center relative w-full">
                <AnimatePresence mode="wait">
                  {currentWord ? (
                    <motion.div
                      key={currentWordIndex}
                      initial={{ opacity: 0, y: 40, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: -40,
                        scale: 1.15,
                        filter: 'blur(10px)'
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-full flex justify-center py-4"
                    >
                      <h1
                        className="font-bold text-white text-center drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                        style={{
                          fontSize: 'clamp(100px, 18vw, 800px)',
                          textShadow: '0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)'
                        }}
                      >
                        {currentWord.word}
                      </h1>
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      className="text-5xl md:text-8xl text-white"
                    >
                      ♪
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-3 md:gap-5 text-center items-center h-[120px] md:h-[180px] overflow-hidden">
                <AnimatePresence>
                  {[1, 2].map(offset => {
                    const nextWord = lyricsData[currentWordIndex + offset]
                    if (!nextWord) return null
                    return (
                      <motion.p
                        key={currentWordIndex + offset}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: offset === 1 ? 0.6 : 0.3,
                          y: 0,
                          scale: offset === 1 ? 1 : 0.9
                        }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className={`text-white font-medium ${
                          offset === 1
                            ? 'text-7xl md:text-[350px]'
                            : 'text-5xl md:text-[250px]'
                        }`}
                        style={{
                          textShadow: '0 0 20px rgba(255,255,255,0.2)'
                        }}
                      >
                        {nextWord.word}
                      </motion.p>
                    )
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-6 md:mt-10 w-full max-w-6xl px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:mb-5">
                  <div className="text-base md:text-lg opacity-50 font-mono text-white bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30">
                    {Math.floor(currentTime)}s / 215s
                  </div>
                  <button
                    onClick={handleRestart}
                    className="text-base md:text-lg opacity-70 hover:opacity-100 text-white border border-white/60 bg-black/40 px-5 py-2 md:py-3 rounded-full transition-all hover:bg-white/10 backdrop-blur-sm"
                  >
                    ⟲ REINICIAR
                  </button>
                </div>
                <div className="w-full h-4 md:h-3 bg-gray-900/80 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/70 via-white/90 to-white/70"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentTime / 215) * 100}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
