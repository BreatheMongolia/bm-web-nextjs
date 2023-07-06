import { FC } from "react"
import { useMediaQuery } from "react-responsive"

type Props = {
  maxWidth?: number
  children: any
}
const Mobile: FC<Props> = ({ children, ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: props.maxWidth || 767 })
  return isMobile ? children : null
}
export default Mobile
