import Widget from "./widget";

class Animate{
  props = {
    width:window.innerWidth,
    height:window.innerHeight,
    fps:30
  }
  data = {}
  constructor (props) {
    const { canvas } = props

    this.canvas = canvas 
    this.ctx = canvas.getContext('2d')
    Object.assign(this.props, props)

    this.init()
  }

  setStyle() {
    const {width, height} = this.props
    const { canvas } = this
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)    
  }

  init () {
    this.setStyle()
    this.widget = new Widget({ctx:this.ctx})
  }

  draw () {
    this.widget.draw()
  }

  update (time) {
    this.widget.update(time)
  }

  startTick (time) {
    this.clearRect()

    this.update(time)
    this.draw()
    requestAnimationFrame(this.startTick.bind(this))
  }
  
  clearRect () {
    const {ctx, props} = this
    const {width, height } = props
    ctx.clearRect(0, 0, width, height)
  }

  play () {
    this.startTick(0)
    let starPos = {x:0, y:0}
    let tween = new TWEEN.Tween(starPos)
    .to({x:100, y:-100})
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(()=>{
      this.clearRect()
      this.widget.update(starPos)
      this.widget.draw()
    })
    .start()
  }

  reset () {

  }
}

export default Animate