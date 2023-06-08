import Link from 'next/link'

type MenuItemProps = {
  title: string | JSX.Element
  href: string
  isActive: boolean
  target?: string
}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <Link
      className={`hover:text-bm-blue font-semibold ${props.isActive && ' text-bm-blue'}`}
      href={props.href}
      target={props.target}
    >
      {props.title}
    </Link>
  )
}
