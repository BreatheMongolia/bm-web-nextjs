import React, { FC } from 'react'

const SliderRightArrow: FC = () => {
  return (
    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.56" filter="url(#filter0_b_2123_13469)">
        <circle cx="25.5" cy="25.5" r="25.5" fill="#646464" />
      </g>
      <path
        d="M31.2498 27.2498L32.4996 26L22.4996 16L20 18.4996L27.4987 26L20 33.5004L22.4996 36L31.2498 27.2498Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_2123_13469"
          x="-14"
          y="-14"
          width="79"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="7" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2123_13469" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2123_13469" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default SliderRightArrow
