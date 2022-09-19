import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'



export default function SwipeOutToLeft({ children }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const transition = {
    duration: 2,
    type: "swipeOutToLeftAndFade",
    // ease: "easeInOut",
    // mass: 0.4,
    // damping: 8,
  }
  
  const swipeOutToLeftAndFade = {
    initial: { x: 0, y: 460, opacity: 1 },
    visible: { x: -1500, opacity: 1, transition },
    // hidden: { x: 0, opacity: 0, transition }
  }

  useEffect(() => {
    // if (inView) {
        controls.start("visible")
    // }
  }, [controls])
  
  return (
    <motion.div
      ref={ref}
      variants={swipeOutToLeftAndFade}
      animate={controls}
      initial="initial"
    >
      { children }
    </motion.div>
  )
}