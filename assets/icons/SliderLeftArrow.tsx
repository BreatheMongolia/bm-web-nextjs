import React, { FC } from "react"

const SliderLeftArrow: FC = () => {
  return (
    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.56" filter="url(#filter0_b_2123_13466)">
        <circle r="25.5" transform="matrix(-1 0 0 1 25.5 25.5)" fill="#646464" />
      </g>
      <path
        d="M19.7502 27.2498L18.5004 26L28.5004 16L31 18.4996L23.5013 26L31 33.5004L28.5004 36L19.7502 27.2498Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_2123_13466"
          x="-14"
          y="-14"
          width="79"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="7" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2123_13466" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2123_13466" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default SliderLeftArrow
