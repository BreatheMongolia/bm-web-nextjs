import { Navbar } from './navbar'
import { Topbar } from './topbar'
import { Mobilebar } from './mobilebar'

export const Header = ({ projects }) => {
  return (
    <div className="">
      <div className="hidden md:block w-full sticky top-0 z-50">
        <Topbar />
        <Navbar projects={projects}/>
      </div>
      <div className="md:hidden w-full bg-bm-blue sticky top-0 z-50">
        <Mobilebar projects={projects}/>
      </div>
    </div>
  )
}