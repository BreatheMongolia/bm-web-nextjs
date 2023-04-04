import { Navbar } from './navbar'
import { Topbar } from './topbar'

export const Header = () => {
  return (
    <div className="w-full">
      <Topbar />
      <Navbar />
    </div>
  )
}
