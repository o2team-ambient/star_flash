import Easing from './tween.easing'

class Widget{
  props = {
    startStyle:{ minR: 60, maxR:100, x:100, y:100},
    // toQueue:[{x:100, y:200, duration:1000}],
    toQueue: [
      { style: { minR: 60 * 0.5, maxR: 100 * 0.5}, duration: 1000 }
    ],

    curTime: 0,
    curQueueIndex:0
  }

  constructor({ ctx }) {
    this.ctx = ctx
    this.particles = []
    const { startStyle } = this.props
    this.getStarPos(startStyle)
  }

  getStarPos({ minR, maxR, x, y}) {
    this.particles = []
    const pi = 180 / Math.PI
    const DEG = 72
    for (let i = 0; i < 5; i++) {
      const x1 = Math.cos((54 + i * DEG) / pi) * maxR + x
      const y1 = Math.sin((54 + i * DEG) / pi) * maxR + y
      const x2 = Math.cos((18 + i * DEG) / pi) * minR + x
      const y2 = Math.sin((18 + i * DEG) / pi) * minR + y
      this.particles.push({
        x1, y1, x2, y2
      })
    }
  }

  update (time) {
    let { curTime, toQueue, startStyle, curQueueIndex} = this.props
    if (!curTime) this.props.curTime = time
    time = time - curTime

    const _target = toQueue[curQueueIndex]
    // if (time > toQueue[curQueueIndex].duration){
    //   ++curQueueIndex >= toQueue.length ? 0 : curQueueIndex
    // }

    if (time > _target.duration) {
      return true
    }

    const factor = Easing.Back.Out(time / _target.duration)
    let newStyle = {}
    for (let property in _target.style){
      newStyle[property] = startStyle[property] + factor * (_target.style[property] - startStyle[property])
    }
    this.getStarPos({ ...startStyle, ...newStyle})
  }

  draw() {
    const { ctx } = this

    ctx.beginPath()
    this.particles.forEach(p => {
      ctx.lineTo(p.x2, p.y2)
      ctx.lineTo(p.x1, p.y1)
    })
    ctx.closePath()
    ctx.strokeStyle = '#f00'
    ctx.fillStyle = '#f00'
    ctx.fill()
    ctx.stroke()
  }
}

export default Widget