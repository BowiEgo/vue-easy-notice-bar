export const getElWid = (dom) => {
  return dom.getBoundingClientRect().width
  || window.getComputedStyle(
    dom, null
  ).width.replace('px', '')
}

export const getElHei = (dom) => {
  return dom.getBoundingClientRect().height
  || window.getComputedStyle(
    dom, null
  ).height.replace('px', '')
}
