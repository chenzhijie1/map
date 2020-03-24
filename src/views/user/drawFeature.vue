<template>
<div class="map-box">
  <div id="map" class="map">
      <form class="form-inline">
      <label>Geometry type &nbsp;</label>
      <select id="type">
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
        <option value="None">None</option>
      </select>
    </form>
  </div>
    
    </div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Draw from 'ol/interaction/Draw';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';

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


var raster = new TileLayer({
  source: new OSM()
});

var source = new VectorSource({wrapX: false});

var vector = new VectorLayer({
  source: source
});

var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value
    });
    map.addInteraction(draw);
  }
}


/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();
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
