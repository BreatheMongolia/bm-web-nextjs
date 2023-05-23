import { MediaDetails } from 'graphql/generated'
import { getTranslated } from './getTranslated'

export const checknull = (image: MediaDetails, name: string) => {
  let res
  if (image) {
    image.sizes?.map(img => {
      if (img.name === name) res = img.sourceUrl
    })
  }
  return res
}

export const getImage = (image: MediaDetails, imageMn: any, featured: any, name: string) => {
  let ft = checknull(featured, name)
  let img = checknull(image, name)
  let imgMn = checknull(imageMn, name)
  if (img && imgMn) {
    return getTranslated(img, imgMn)
  } else if (img && !imgMn) {
    return img
  } else if (imgMn && !img) {
    return imgMn
  } else {
    return ft
  }
}
