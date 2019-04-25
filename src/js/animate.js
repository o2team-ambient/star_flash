import Widget from "./widget";

class Animate{
  props = {
    width:window.innerWidth,
    height:window.innerHeight,
    maxHeight: 100,
    widgetNumber: 21,
    layoutType: 'curtain', //random, certain or normal
    heightType: '', // fixed or ''
  }
  data = {}
  constructor ({canvas, props}) {
    Object.assign(this.props, props)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.init()
  }

  setStyle() {
    const {width, height} = this.props
    const { canvas } = this
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    canvas.style.background = '#000'
  }

  init () {
    this.setStyle()
    this.createWidget()
  }

  checkSplit(x1, x2){
    return Math.abs(x1 - x2) > 10
  }

  layoutWidget () {
    const { 
      width, 
      maxHeight, 
      widgetNumber, 
      layoutType,
      heightType
    } = this.props

    let arr = []

    for (let i = 1; i <= widgetNumber; i++) {
      const dx = width / (widgetNumber + 1)
      let keepTime = ~~(200 + 100 * (0.5 - Math.random()))
      let lineHeight = heightType === 'fixed' ? maxHeight : ~~(Math.random() * maxHeight)
      let x

      if(layoutType === 'random'){
        let isSplit = false, limit = 100
        do {
          x = ~~(Math.random() * width)
          --limit
          isSplit = arr.every((item) => {
            return this.checkSplit(x, item.x)
          })
        }
        while (!isSplit && i && limit)

      } else if (layoutType === 'curtain') {
        const midNumber = (widgetNumber + 1) / 2
        const dh = ~~(maxHeight / midNumber )
        x = dx * i
        lineHeight = dh * Math.abs(~~(midNumber) - i)
      } else {
        x = dx * i
      }

      const color = this.randomRGB()
      let colorStyle = {
        pendantColor: color,
      }

      arr.push({
        x, 
        lineHeight, 
        keepTime,
        ...colorStyle
      })
    }

    return arr
  }

  randomRGB () {
    const arr = []
    let i = 3
    while(i--){
      arr.push(~~(255 * Math.random()))
    }
    return `rgb(${arr.join(',')})`
  }
  
  createWidget () {
    const { ctx } = this
    this.widgets = this.layoutWidget().map(props => {
      return new Widget({ctx, props})
    })
  }

  startTick (time) {
    this.clearRect()
    this.widgets.forEach((widget)=>{
      widget.update(time)
    })
    requestAnimationFrame(this.startTick.bind(this))
  }
  
  clearRect () {
    const {ctx, props} = this
    const {width, height } = props
    ctx.clearRect(0, 0, width, height)
  }

  play () {
    this.startTick(0)
  }

  reset () {

  }
}

export default Animate