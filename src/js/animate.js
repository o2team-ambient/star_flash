import Widget from "./widget";

class Animate{
  props = {
    width:window.innerWidth,
    height:window.innerHeight,
  }
  data = {}
  constructor (props) {
    const { canvas } = props
    console.log(this)
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
    new Widget()
  }

  update () {

  }

  play () {

  }

  reset () {

  }

  remove () {

  }
}

export default Animate