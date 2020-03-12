<template>
  <div class="map-box">
    <Mapview
      class="map"
      ref="map"
      zoom="6"
      :center="center"
      :isShowBaseMap="false"
      :isScaleLine="true"
    ></Mapview>
    <div id="mapDiv"></div>
  </div>
</template>

<script>
//点击地图，通过GetFeatureInfo实现要素信息查询
import Mapview from "../../components/map/index";
import { tiandituVetorMap } from "../../Utils/ol/mapServer";
import { WMSmap } from "../../Utils/ol/mapServer";
import { setMapCenter } from "../../Utils/ol/mapOperate";
import { setMapZoom } from "../../Utils/ol/mapOperate";
// import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js";

export default {
  name: "TestOL",
  data() {
    return {
      tileWMSSource: "",
      tileLayer: "",
      map: "",
      center: [113.4, 34.56]
    };
  },
  components: {
    Mapview
  },
  mounted:function() {
    var map = this.$refs.map.map;
    tiandituVetorMap(map);
    WMSmap(map);
    setMapCenter(map, [112.3, 32.21]);
    setMapZoom(map,4);
    this.map.on("click", this.mapClick);
  },
  methods: {
    mapClick: function(evt) {
      this.tileWMSSource = new TileWMS({
                url: 'http://localhost:8090/geoserver/cite/wms',
                params: {
                    'LAYERS': 'cite:province',
                    'TILED': true,
                    // 'STYLES':'wfds_style_GB2312'
                },
                serverType: 'geoserver',
                projection: "EPSG:4326"
            });
            this.tileLayer = new TileLayer({
                source: this.tileWMSSource,
            })
      var viewResolution = this.map.getView().getResolution();
      var url = this.tileLayer
        .getSource()
        .getGetFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:4326", {
          INFO_FORMAT: "application/json"
        });
      axios({
        type: "GET",
        url: url,
        success: function(res) {
          console.log(res);
        }
      });
    }
  }
};
</script>

<style scoped>
#mapDiv {
  width: 100%;
  height: 100%;
  border: 1px solid #ff0000;
}
</style>