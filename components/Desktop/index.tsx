import { FC } from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
  minWidth?: number
  children: any
}
const Desktop: FC<Props> = ({ children, ...props }) => {
  const isDesktop = useMediaQuery({ minWidth: props.minWidth || 768 })
  return isDesktop ? children : null
}
export default Desktop
