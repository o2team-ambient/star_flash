import utils from './utils/util'

class Pendant {
  ctx = null
  props = {
    width:0,
    height:0,
    imgSrc:'',
    color:'',
    pos:[],
    shapeType:'star',
    scale:''
  }

  shapeData = {
    point: 10
  }
  
  constructor(props) {
    Object.assign(this.props, props)
    
    
    this.create()
  }

  load (){}
  dispose (){}
  create (){
    console.log('create pandant')
  }
  update (){}
  drawShape (){}
  remove (){}
  play (){}
  stop (){}
  reset (){}
}

export default Pendant