import { Navbar } from './navbar'
import { Topbar } from './topbar'
import { Mobilebar } from './mobilebar'

export const Header = () => {
  return (
    <div className="">
      <div className="hidden md:block w-full sticky top-0 z-50">
        <Topbar />
        <Navbar />
      </div>
      <div className="md:hidden w-full bg-bm-blue sticky top-0 z-50">
        <Mobilebar />
      </div>
    </div>
  )
}
