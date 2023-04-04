import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const [t, i18n] = useTranslation()

  return (
    <div className="bg-bm-blue text-white py-5">
      <div className="container flex text-xs">
        <div>Logos</div>
        <div></div>
      </div>
    </div>
  )
}
