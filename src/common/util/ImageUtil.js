

/**
 * 统一处理图片url。
 * @param url 原图片路径
 * @param origin 是否使用原图，一般在查看图片详情的时候使用
 * @param width 如果origin=false 裁剪的宽度
 * @param height 如果origin=false 裁剪的高度
 * @returns 处理后的图片路径
 */
export function handleImageUrl(url, origin = false, width = 200, height = 200) {

  if (url) {
    if (origin) {
      return url;
    } else {
      return url + "?imageProcess=resize&imageResizeM=fill&imageResizeW=" + width + "&imageResizeH=" + height
    }
  } else {
    return require('../../assets/img/default.png')
  }
}
