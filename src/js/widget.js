
class Widget{
  lineConnectPx = 10
  lineSpacePx = 10
  lineConnectPoint = 5
  timer = 0
  scaleFactorStar = 1.1
  
  props = {
    lineColor: '#fff',
    pendantColor: '#fff',
    pendantBorderColor: '#fff',
    pendantShadowColor: '#fff',
    pendantShadowBlur: 10,
    lineStyle: {
      width: 1,
      y: 0
    }
  }

  constructor({ ctx, props}) {
    this.props = {...this.props, ...props}
    
    const { 
      x, 
      keepTime,
      lineStyle,
      lineHeight
    } = this.props

    this.ctx = ctx
    this.initStarStyle = { 
      minR: 4, 
      maxR: 8, 
      x
    }
    this.initLineStyle = {
      x, 
      lineHeight,
      ...lineStyle
    }

    this.keepTime = keepTime || 200

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
      initStarStyle, 
      scaleFactorStar, 
      props 
    } = this
    
    const { 
      pendantColor,
      pendantborderColor,
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
        ...initStarStyle, 
        minR: initStarStyle.minR * scaleFactorStar, 
        maxR: initStarStyle.maxR * scaleFactorStar, 
        lineHeight,
      })
    } else {
      particles = this.getStarPos({ 
        lineHeight, 
        ...initStarStyle
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
    ctx.strokeStyle = pendantborderColor
    ctx.fillStyle = pendantColor
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  drawLine () {
    const { ctx, initLineStyle, lineConnectPx, lineConnectPoint, lineSpacePx } = this
    const { lineColor } = this.props
    const { 
      x, 
      y, 
      width, 
      lineHeight
    } = initLineStyle

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