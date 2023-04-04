import { Footer } from './footer'
import { Header } from './Header/header'

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="grow"> {children} </main>
      <Footer />
    </div>
  )
}
