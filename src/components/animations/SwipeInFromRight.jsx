import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'



export default function SwipeInFromRight({ children }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const transition = {
    duration: 2,
    type: "swipeInFromRightAndFade",
    // ease: "easeInOut",
    // mass: 0.4,
    // damping: 8,
  }
  
  const swipeInFromRightAndFade = {
    initial: { x: 2000, y: 460, opacity: 0 },
    visible: { x: 0, opacity: 1, transition },
    hidden: { x: 500, opacity: 0, transition }
  }

  useEffect(() => {
    // if (inView) {
      controls.start("visible")
    // }
  }, [controls])
  
  return (
    <motion.div
      ref={ref}
      variants={swipeInFromRightAndFade}
      animate={controls}
      initial="initial"
    >
      { children }
    </motion.div>
  )
}