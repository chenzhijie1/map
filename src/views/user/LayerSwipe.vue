<template>
<div class="map-box">
  <div id="map" class="map">
      <input id="swipe" type="range" style="width: 100%">
  </div>
    
    </div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import {getRenderPixel} from 'ol/render';

export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },

  components: {},
  methods: {
    init() {


var osm = new TileLayer({
  source: new OSM()
});

var key = 'Get your own API key at https://www.maptiler.com/cloud/';
var attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

var aerial = new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
    maxZoom: 20
  })
});

var map = new Map({
  layers: [osm, aerial],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var swipe = document.getElementById('swipe');

aerial.on('prerender', function(event) {
  var ctx = event.context;
  var mapSize = map.getSize();
  var width = mapSize[0] * (swipe.value / 100);
  var tl = getRenderPixel(event, [width, 0]);
  var tr = getRenderPixel(event, [mapSize[0], 0]);
  var bl = getRenderPixel(event, [width, mapSize[1]]);
  var br = getRenderPixel(event, mapSize);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl[0], tl[1]);
  ctx.lineTo(bl[0], bl[1]);
  ctx.lineTo(br[0], br[1]);
  ctx.lineTo(tr[0], tr[1]);
  ctx.closePath();
  ctx.clip();
});

aerial.on('postrender', function(event) {
  var ctx = event.context;
  ctx.restore();
});

swipe.addEventListener('input', function() {
  map.render();
}, false);
  }
}
}
</script>
<style>
#map {
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  font-size: 13px;
}
.map-box{
  height: 100%;
  width: 100%;
}
</style>
