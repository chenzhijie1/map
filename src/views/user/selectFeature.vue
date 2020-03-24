<template>
<div class="map-box">
  <div id="map" class="map">
      <form class="form-inline">
      <label>Action type &nbsp;</label>
        <select id="type" class="form-control">
          <option value="click" selected>Click</option>
          <option value="singleclick">Single-click</option>
          <option value="pointermove">Hover</option>
          <option value="altclick">Alt+Click</option>
          <option value="none">None</option>
        </select>
      <span id="status">&nbsp;0 selected features</span>
    </form>
  </div>
    
    </div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

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

var vector = new VectorLayer({
  source: new VectorSource({
    url: 'https://openlayers.org/en/v6.2.1/examples/data/geojson/countries.geojson',
    format: new GeoJSON()
  })
});

var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var select = null; // ref to currently selected interaction

// select interaction working on "singleclick"
var selectSingleClick = new Select();

// select interaction working on "click"
var selectClick = new Select({
  condition: click
});

// select interaction working on "pointermove"
var selectPointerMove = new Select({
  condition: pointerMove
});

var selectAltClick = new Select({
  condition: function(mapBrowserEvent) {
    return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
  }
});

var selectElement = document.getElementById('type');

var changeInteraction = function() {
  if (select !== null) {
    map.removeInteraction(select);
  }
  var value = selectElement.value;
  if (value == 'singleclick') {
    select = selectSingleClick;
  } else if (value == 'click') {
    select = selectClick;
  } else if (value == 'pointermove') {
    select = selectPointerMove;
  } else if (value == 'altclick') {
    select = selectAltClick;
  } else {
    select = null;
  }
  if (select !== null) {
    map.addInteraction(select);
    select.on('select', function(e) {
      document.getElementById('status').innerHTML = '&nbsp;' +
          e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' + e.selected.length +
          ' and deselected ' + e.deselected.length + ' features)';
    });
  }
};


/**
 * onchange callback on the select element.
 */
selectElement.onchange = changeInteraction;
changeInteraction();
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
