import { motion } from 'framer-motion'
const PageAnimationWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{
        type: 'easeInOut',
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageAnimationWrapper
