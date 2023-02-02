let Canvas = null
let ctx = null
let WaterMark = null
let waterMarkEl = null

let style = null
let Style = `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    overflow: hidden;
    pointer-events: none;
`

const getDataUrl = ({
    rotate = -20,
    font = '16px 黑体',
    fillStyle = 'rgba(180, 180, 180, .3)',
    textAlign = 'center',
    textBaseline = 'middle',
    text = '水印'
}) => {
    Canvas = Canvas ?? document.createElement('canvas')
    ctx = ctx ?? Canvas.getContext('2d')

    ctx.rotate((rotate * Math.PI) / 180)
    ctx.font = font
    ctx.fillStyle = fillStyle
    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.fillText(text, Canvas.width / 2, Canvas.height / 2)

    return Canvas.toDataURL('image/png', 1)
}

const setWaterMark = (el, binding) => {
    const { parentElement } = el
    const url = getDataUrl(binding.value)
    WaterMark = WaterMark ?? document.createElement('div')

    WaterMark.classList = 'water-mark'
    style = style ?? `${Style}background-image: url(${url});`
    WaterMark.setAttribute('style', style)

    parentElement?.setAttribute('style', 'position: relative;')
    parentElement?.appendChild(WaterMark)
}

const createObserver = (el, binding) => {
    waterMarkEl = waterMarkEl ?? el.parentElement.querySelector('.water-mark')

    const observer = new MutationObserver((mutationsList) => {
        if (mutationsList.length) {
            const { removedNodes, type, target } = mutationsList[0]
            const currStyle = waterMarkEl.getAttribute('style')

            if (type === 'childList' && removedNodes[0] === waterMarkEl) {
                observer.disconnect()
                init(el, binding)
            } else if (
                type === 'attributes' &&
                target === waterMarkEl &&
                currStyle !== style
            ) {
                waterMarkEl.setAttribute('style', style)
            }
        }
    })

    observer.observe(el?.parentElement, {
        attributes: true,
        childList: true,
        subtree: true
    })
}

const init = (el, binding) => {
    setWaterMark(el, binding)
    createObserver(el, binding)
}
const directives = {
    mounted(el, binding) {
        init(el, binding)
    }
}

export default {
    name: 'watermark',
    directives
}
