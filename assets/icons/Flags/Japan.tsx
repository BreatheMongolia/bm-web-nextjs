import React, { FC } from 'react'

const JapanFlag: FC = () => {
  return (
    <svg className="flag" width="105" height="70" viewBox="0 0 105 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="105" height="70">
        <rect x="0.5" y="0.5" width="104" height="69" rx="3.5" fill="#C4C4C4" stroke="#D8D8D8" />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M4 0.5H101C102.933 0.5 104.5 2.067 104.5 4V66C104.5 67.933 102.933 69.5 101 69.5H4C2.067 69.5 0.5 67.933 0.5 66V4C0.5 2.067 2.067 0.5 4 0.5Z"
          fill="white"
          stroke="#D8D8D8"
        />
        <path
          d="M52.5 56C64.098 56 73.5 46.598 73.5 35C73.5 23.402 64.098 14 52.5 14C40.902 14 31.5 23.402 31.5 35C31.5 46.598 40.902 56 52.5 56Z"
          fill="#BC002D"
        />
      </g>
    </svg>
  )
}

export default JapanFlag
