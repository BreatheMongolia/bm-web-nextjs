import { Page_NewsGeneralFields_Banner } from 'graphql/generated'

type BannerProps = {
  imageUrl: {
    en: string
    mn?: string
  }
  bottomText?: {
    left?: string
    right?: string
  }
}
export const PageImageBanner = ({ imageUrl, bottomText }: BannerProps) => {
  return (
    // linear-gradient(90deg, #3a62c8 -3.32%, #61b1ee 82.05%)
    <div className="w-full bg-bm-blue bg-gradient-to-r from-bm-blue to-[#61b1ee] hidden sm:block">
      <div>
        <img src={imageUrl.en} alt="" />
      </div>
      {bottomText && (
        <div
          className="text-white text-center uppercase tracking-[1px] flex justify-evenly container mx-auto py-1.5 text-xsm leading-6 font-bold"
          style={{ lineHeight: '24px' }}
        >
          <div>{bottomText.left}</div>
          <div>{bottomText.right}</div>
        </div>
      )}
    </div>
  )
}
