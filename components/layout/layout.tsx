import VideoDialog from 'components/Cards/NewsCards/VideoDialog'
import GiveButterDialog from 'components/generic/GiveButter/GiveButterDialog'
import { Footer } from './Footer/footer'
import { Header } from './Header/header'
import { motion } from 'framer-motion'
import GiveButterFloatingButton from 'components/generic/GiveButter/GiveButterFloatingButton'
import { Suspense } from 'react'
import LoadingPage from 'components/generic/LoadingPage'

export const Layout = ({ children }: { children: any }) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="flex flex-col h-full bg-[#FAFAFF] overflow-x-hidden">
        <Header />
        <motion.div initial={{ opacity: 0, y: '-10px' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <main className="grow bg-inherit pb-10"> {children} </main>
          <VideoDialog />
          <GiveButterDialog />
        </motion.div>
        <Footer />
        {/* Floating button */}
        <GiveButterFloatingButton />
      </div>
    </Suspense>
  )
}
