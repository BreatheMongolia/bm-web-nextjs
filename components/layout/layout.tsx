import { useTranslation } from 'next-i18next'
import { Footer } from './Footer/footer'
import { Header } from './Header/header'

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFF] overflow-x-hidden">
      <Header />
      <main className="grow bg-inherit pb-10"> {children} </main>
      <Footer />
    </div>
  )
}
