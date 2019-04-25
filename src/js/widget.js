
class Widget{
  lineConnectPx = 10
  lineSpacePx = 10
  lineConnectPoint = 5
  timer = 0
  scaleFactorStar = 1.1
  keepTime = 200
  
  props = {
    lineColor: '#fff',
    pendantColor: '#fff',
    pendantBorderColor: '#fff',
    pendantShadowColor: '#fff',
    pendantShadowBlur: 10,
    lineStyle: {
      width: 1,
      y: 0,
      lineHeight: 0
    },
    starStyle: {
      minR: 4,
      maxR: 8, 
    }
  }

  constructor({ctx, props}) {
    this.props = {...this.props, ...props}
    const { x, keepTime, lineHeight } = this.props

    this.ctx = ctx
    this.props.starStyle.x = x
    this.props.lineStyle.x = x
    this.props.lineStyle.lineHeight = lineHeight
    this.keepTime = keepTime || this.keepTime

    this.init()
  }

  init () {
    this.draw()
  }

  update (time) {
    this.draw(time)
  }

  getStarPos({ minR, maxR, x, lineHeight}) {
    let ret =  []
    const pi = 180 / Math.PI
    const DEG = 72
    for (let i = 0; i < 5; i++) {
      const x1 = Math.cos((54 + i * DEG) / pi) * maxR + x
      const y1 = Math.sin((54 + i * DEG) / pi) * maxR + lineHeight
      const x2 = Math.cos((18 + i * DEG) / pi) * minR + x
      const y2 = Math.sin((18 + i * DEG) / pi) * minR + lineHeight
      ret.push({
        x1, y1, x2, y2
      })
    }
    return ret
  }

  drawStar(time, lineHeight) {
    const { 
      ctx, 
      keepTime, 
      scaleFactorStar, 
      props 
    } = this
    
    const { 
      starStyle,
      pendantColor,
      pendantBorderColor,
      pendantShadowBlur, 
      pendantShadowColor,
    } = props

    const dt = time - this.timer
    let particles = []

    ctx.save()

    if (dt > keepTime) {
      ctx.shadowColor = pendantShadowColor
      ctx.shadowBlur = pendantShadowBlur
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      particles = this.getStarPos({ 
        ...starStyle, 
        minR: starStyle.minR * scaleFactorStar, 
        maxR: starStyle.maxR * scaleFactorStar, 
        lineHeight,
      })
    } else {
      particles = this.getStarPos({ 
        lineHeight, 
        ...starStyle
      })
    }

    if (dt > keepTime * 2) {
      this.timer = time
    }

    ctx.beginPath()
    particles.forEach(p => {
      ctx.lineTo(p.x2, p.y2)
      ctx.lineTo(p.x1, p.y1)
    })
    ctx.closePath()
    ctx.strokeStyle = pendantBorderColor
    ctx.fillStyle = pendantColor
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  drawLine () {
    const { ctx, lineConnectPx, lineConnectPoint, lineSpacePx } = this
    const { lineColor, lineStyle} = this.props
    const { x, y, width, lineHeight } = lineStyle

    const longY = y + lineHeight

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, longY)

    let dy = 0

    for (let i = 1; i <= lineConnectPoint; i++){
      dy = longY + Math.pow(i, 1.5) * lineConnectPx / lineConnectPoint
      ctx.moveTo(x, dy)
      ctx.lineTo(x, dy + 2)
    }
    ctx.strokeStyle = lineColor
    ctx.lineWidth = width
    ctx.stroke()

    //line finally height
    return dy + lineConnectPx + lineSpacePx
  }

  draw(time) {
    const lineHeight = this.drawLine()
    this.drawStar(time, lineHeight)
  }

}

export default Widget