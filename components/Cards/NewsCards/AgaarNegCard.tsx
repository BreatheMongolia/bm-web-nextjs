import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  news: {
    id: string
    title: { en: string; mn: string }
    keywords: string[]
  }
  className?: string
}
export const AgaarNegCard = ({ news, className }: Props) => {
  const { i18n } = useTranslation()

  const title = i18n.language === 'mn' ? news.title.mn : news.title.en
  const url = `https://agaarneg.mn/news/${news.id}`
  return (
    <Link href={url} target="_blank">
      <div className={`w-full bg-white rounded shadow-md overflow-hidden group ${className}`}>
        <div className="w-full bg-[#00aeef] group-hover:bg-sky-600 transition-all">
          <Image src={'/images/agaar-neg/cloud.png'} alt="AgaarNeg Image" width={610} height={228} />
        </div>
        <div className="border-b-2 border-gray-300 mb-3 mx-5 text-xs">
          {news.keywords.map((x, idx) => {
            return (
              <span key={idx} className="block w-full">
                - {x}
              </span>
            )
          })}
        </div>
        <div className="mx-5 pb-4 font-semibold text-gray-700 text-md leading-5">
          <p className="line-clamp-3  min-h-[60px]">{title}</p>
        </div>
      </div>
    </Link>
  )
}
