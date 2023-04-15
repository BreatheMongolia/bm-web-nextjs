import { Footer } from './Footer/footer'
import { Header } from './Header/header'

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFF]">
      <Header />
      <main className="grow bg-inherit"> {children} </main>
      <Footer />
    </div>
  )
}
