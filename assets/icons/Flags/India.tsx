import React, { FC } from 'react'

const IndiaFlag: FC = () => {
  return (
    <svg
      width="105"
      height="70"
      viewBox="0 0 105 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="flag"
    >
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="105" height="70">
        <rect x="0.5" y="0.5" width="104" height="69" rx="3.5" fill="#C4C4C4" stroke="#D8D8D8" />
      </mask>
      <g mask="url(#mask0)">
        <rect x="0.5" y="0.5" width="104" height="69" rx="3.5" fill="url(#pattern0)" stroke="#D8D8D8" />
      </g>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="scale(0.00392157 0.00588235)" />
        </pattern>
        <image
          id="image0"
          width="255"
          height="170"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

export default IndiaFlag
