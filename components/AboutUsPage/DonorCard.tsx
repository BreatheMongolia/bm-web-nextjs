import React, { FC } from 'react'

type Props = {
  donor: any
  className?: string
  index?: any
}

const DonorCard: FC<Props> = ({ donor, className, index }) => {
  const truncate = (input: string) => (input?.length > 120 ? `${input.substring(0, 120)}...` : input)
  const isHorizontal = index === 0 || index === 5

  const cardClasses = [
    'flex-shrink-0',
    'rounded-[20px]',
    'bg-white',
    'shadow-[0_4px_20px_rgba(138,138,138,0.15)]',
    isHorizontal ? 'flex flex-row gap-4 px-4 py-2' : 'flex flex-col',
    className ? `${className} w-full` : 'w-[244px] h-[255px]',
  ].join(' ')

  return (
    <div className={cardClasses}>
      <img
        src={donor.imgSrc}
        alt="donor profile image"
        className={`rounded-full ${isHorizontal ? 'w-[122px] h-[146px] my-auto' : 'w-[75px] h-[75px] mx-auto mt-5'}`}
      />
      <div className={` ${isHorizontal ? 'pt-4' : 'align-center text-center pt-2 px-2'} `}>
        <h4 className="m-auto text-[18px] font-semibold">{donor.name}</h4>
        <p className="text-sm overflow-hidden">{truncate(donor.description)}</p>
      </div>
    </div>
  )
}

export default DonorCard
