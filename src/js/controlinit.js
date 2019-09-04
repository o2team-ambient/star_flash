/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

const loadData = {
  '默认': {
    '0': {...window[O2_AMBIENT_CONFIG]}
  }
}
const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.backgroundColor = '#000'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      // this.initTextureGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          'remembered': { ...allLoadData.remembered }
        }
      })
      gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))
      
      gui.add(otherConfig, 'play').name('梦起 / 梦停')
      gui.add(config, 'layoutType', {
        '半遮面': 'curtain',
        '追忆缘': 'random',
        '捕梦网': 'normal',
      }).name('梦型').onFinishChange(val => { 
        this.resetCanvas() 
      })
      gui.add(config, 'widgetNumber', 1, 300, 1).name('梦粒').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'keepTime', 10, 200, 10).name('梦时').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'maxHeight', 10, 1000, 10).name('梦高').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'heightType', {
        '筑梦': 'fixed',
        '随梦': 'random'
      }).name('梦型').onFinishChange(val => {
        this.resetCanvas()
      })

      let guiColorType = gui.add(config, 'colorType', {
        '颜筑': 'fixed',
        '颜随': 'random'
      }).name('颜梦').onFinishChange(val => {
        if (val === 'fixed'){
          guiColorType['guiColor'] = gui.addColor(config, 'pendantColor').name('梦颜').onFinishChange(val => {
            this.resetCanvas()
          })
        } else {
          gui.remove(guiColorType['guiColor'] )
        }
        this.resetCanvas()
      })

      const colorOther = ['lineColor', 'pendantBorderColor', 'pendantShadowColor']
      colorOther.forEach((key, index) => {
        const name = ['梦线', '梦边', '梦影']
        gui.addColor(config, key).name(name[index]).onFinishChange(val => {
          this.resetCanvas()
        })
      })
     
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI () {
      // demo code
      const gui = this.gui
      const textures = this.config.textures
      const texturesFolder = gui.addFolder('纹理')
      textures && Object.keys(textures).forEach((key, idx) => {
        const textureController = texturesFolder.add(textures, key).name(`纹理${idx + 1}`)
        textureController.onFinishChange(val => {
          this.resetCanvas()
        })
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
