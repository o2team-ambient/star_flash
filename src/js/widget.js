import Pendant from "./pendant";

class Widget{
  props = {}
  constructor (props) {
    console.log(this)
    this.init()
  }

  init () {
    this.pendant = new Pendant() 
  }

  update () {

  }

  play () {
    console.log('play')
  }

  reset () {

  }

  remove () {

  }
}

export default Widget