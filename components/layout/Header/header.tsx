import { Navbar } from './navbar'
import { Topbar } from './topbar'

export const Header = () => {
  return (
    <div className="w-full sticky top-0 z-50">
      <Topbar />
      <Navbar />
    </div>
  )
}
