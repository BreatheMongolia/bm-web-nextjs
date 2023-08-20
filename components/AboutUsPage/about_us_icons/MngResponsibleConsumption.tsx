import React, { FC } from 'react'

const MngResponsibleConsumption: FC = () => {
  return (
    <svg
      width={130}
      height={130}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="goal_image_spacing"
    >
      <path fill="url(#prefix__pattern0)" d="M0 0h130v130H0z" />
      <defs>
        <pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
          <use xlinkHref="#prefix__image0" transform="matrix(.00402 0 0 .00402 -.002 0)" />
        </pattern>
        <image
          id="prefix__image0"
          width={250}
          height={249}
          xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QBIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACAAIAOEJJTQQlAAAAAAAQ/OEfici3yXgvNGI0B1h36//sABFEdWNreQABAAQAAAA8AAD/4QPyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QjQzNUU2REFFNDkxMUU3ODcxNDlBODY4NDA0RTcwNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QjQzNUU2Q0FFNDkxMUU3ODcxNDlBODY4NDA0RTcwNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbGx1c3RyYXRvciBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU2RTY5RDg5OEFCRTYxMUExRDZF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Zc7tORPXwM343B7rVJF0hwktOmZmVk73V9xZzZLK0BkZ8Wt8fM5U/QwSCqut3acRVvFZrDdLdyEiKcIwwOqtSUulLJU3KpOez9WOPvkefZaPeuO7bZTidK86KtZ1iRsTTk+urai51tTW1L91RUyOkkd+0Tnl5eC+YTzOmkdK7ipd4mNja1reCFusDMIAgCAIAgCAIAgCAIAgCAubbcquz10VdQzmCqgOWyN+oI7we8FbILEleRssTslNUsTZW6H8DoDRXFy26gbHSXRzLfc+nrOxDKf2XHof2T9Ve8Ox2Kw3TJ2XfQrFzCpIe1Hvb9STMjxU+RJVAEAQGsan1zZtIxZuFV9sR6tPF68jv4e4eZXBcxGCm32jt/hzOmtSmsfltMrbbxQ3e3R19HUxzUb27hKDyx35z0XTDPHMzaRruNMkT43aXt3nIdwqzX3GsqycmomfLn3uJXyueTaTOd4qXyNmmNrfAt1rMzZNIa3umjKx0lG9slLKczUsjjsk8x913mPipHDsUmou7O9PA4rdKO03tcfE6B0pxEsmrGsZT1DYK0j1qSchsmfLucPcr1RxWtcb2HZL4FXtYfNX7zc08TcVJnEEAQBAa5qfWVq0lR9vcagB5H2cDeckh8m/59Fw3L8NNuqV3y5nRWqS2HaYmnN2sdY12srkaqq+yp48iCmBy2IHv83HvKoGJYlJefqdw5IW6nTjqx6W8fE11Rx2BAEAQBAEAQBAEAQBAEAQBAEBQgOGDzCA2Cx641Bp1gjoLnK2EdIZcSR/AHp8F31cVs1uxHJuOOehXm7zTc6TjvfYmAVFvt85HVzd7CfqQpaPpRO3vNRTgfgcXuuU9pePd3I+ytNC0+L5Hu/DCzXpRL7saGKYHF/kprl14saqurXM9PbRxH9GlYGH+Y5P1UfNj92b3svgdkOE1o/dz+JpUj3yyPkke6SRxy573EuJ8yeah3vc52px3tTSXMFxrKWmnpYKueGnn/tYo5XNZJ72g4K2snka1zWuXJTB0Ubna3t3lstRtCAICneD3jmD3grxq6QbjY+KOp7Gxscdw9Kgb0irB2nIdwd7X1UxWxy3X7OrNPMj5sMrTe7l8DcqPj/Utb/xljhefGGoLfoQfxUtF0qX3o/qcD8BT3JD3l/pAt2O7KwP3dxfUjH0as3dKm+7F9f+jBuA/wCUn0NZu/GjUlya5lKae3sPLMLNz/m7/IKOsdJbMn5WTTrhwaCPv7zQampnrah9RVTPnnecullJc4nzJUFJJJI7U52akpGxrG6GHksTMIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCApuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggG4IBuCAbggMmtxqCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCA//Z"
        />
      </defs>
    </svg>
  )
}
export default MngResponsibleConsumption
