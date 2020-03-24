<template>
   <div id="map" class="map">
      
  </div>
</template>
 
<script>
import Control from 'ol/control/Control';
import {CLASS_CONTROL, CLASS_UNSELECTABLE, CLASS_UNSUPPORTED} from 'ol/css';
import {listen} from 'ol/events';
import EventType from 'ol/events/EventType';
import {defaults as defaultControls, OverviewMap} from 'ol/control.js'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';

class MyControl extends Control {
 
  constructor(opt_options) {
 
    const options = opt_options ? opt_options : {};
 
    super({
      element: document.createElement('div'),
      target: options.target
    });
 
    this.cssClassName_ = options.className !== undefined ? options.className :
      'ol-full-screen';
 
    const label = options.label !== undefined ? options.label : '\u00f7';
    this.labelNode_ = typeof label === 'string' ?
      document.createTextNode(label) : label;
 
    this.button_ = document.createElement('button');
    const tipLabel = options.tipLabel ? options.tipLabel : '点我';
 
    this.button_.setAttribute('type', 'button');
    this.button_.title = tipLabel;
    this.button_.appendChild(this.labelNode_);
    listen(this.button_, EventType.CLICK,
      this.handleClick_, this);
    const element = this.element;
    const cssClasses = this.cssClassName_ + ' ' + CLASS_UNSELECTABLE +
    ' ' + CLASS_CONTROL;
    element.className = cssClasses;
    element.appendChild(this.button_);
 
  }
 
  handleClick_(event) {
    event.preventDefault();
    alert('Your control is online!');
  }
}
export default {

  data () {
    return {
     
    }
  },
  computed: {
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap () {
     let map = new Map({
  controls: defaultControls().extend([
    new MyControl()
  ]),
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
    },
  },
  mounted () {
    this.initMap()
    
  },
  created () {
  }
}
</script>
 
<style scoped>
 
</style>