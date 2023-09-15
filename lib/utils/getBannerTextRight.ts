export const getBannerTextRight = (bannerTextRight, name) => {
  var text: string = ''
  if (bannerTextRight) {
    for (let i = 0; i < bannerTextRight.length; i++) {
      text += bannerTextRight[i][name]
      text += bannerTextRight?.length - 1 !== i ? '・' : ''
    }
  }
  return text
}
