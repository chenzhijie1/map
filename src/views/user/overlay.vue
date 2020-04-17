<template>
  <div class="map-box">
    <ul>
      <li v-for="user in users" :key="user.email"><input v-model="user.contacted" type="checkbox"/><span :class="{deleteLine: user.contacted}">{{user.name}}:{{user.email}}</span> <button @click="deleteUser(user)">x</button></li>
    </ul>
    <form @submit="addUser">
    name: <input v-model="user.name"/>
    email: <input v-model="user.email"/>
    <p><input type="submit" value="添加用户"/></p>
    </form>
    <h2>从页面上直接获取的值：{{this.$store.state.count}}</h2>
    <h2>从getter获取的计算后的值：{{this.$store.getters.getStateCount}}</h2>
    <p>count的值：{{this.$store.state.count}}</p>
    <button @click="addFun">+</button>
    <button @click="reduceFun">-</button>
   <div style="border: 1px solid red;margin-top:50px;">{{count1}}</div>
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
// import { tiandituVetorMap } from "../../Utils/ol/mapServer";
import { MapServer } from "../../Utils/ol/test";
// import { WMSmap } from "../../Utils/ol/mapServer";
import { setMapCenter } from "../../Utils/ol/mapOperate";
import { setMapZoom } from "../../Utils/ol/mapOperate";
// import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js";
import {mapState,mapActions,mapGetters} from 'vuex';
export default {
  name: "users",
  data() {
    return {
      user: {},
      users: [
        {
          name: 'zhoujielun',
          email: 'zhoujielun@gmail.com',
          contacted: false
        },
        {
          name: 'zhouhuajian',
          email: 'zhouhuajian@gmail.com',
          contacted: false
        },
        {
          name: 'youhongming',
          email: 'youhongming@gmail.com',
          contacted: false
        }
      ],

      message: '页面加载于 ' + new Date().toLocaleString(),
      tileWMSSource: "",
      tileLayer: "",
      map: "",
      center: [113.4, 34.56]
    };
  },
  components: {
    Mapview
  },
  computed:{
      ...mapState({
          count1:state=>state.count
      })
  },
  mounted:function() {
    var map = this.$refs.map.map;
    MapServer.tiandituVetorMap(map);
    let url = 'http://localhost:8090/geoserver/cite/wms';
    let params = {
              'LAYERS': 'cite:province', //此处可以是单个图层名称，也可以是图层组名称，或多个图层名称  
              'VERSION': '1.1.0',
              'TILED': false
          };
    MapServer.WMSmap(map,url,params);
    MapServer.hello();
    setMapCenter(map, [112.3, 32.21]);
    setMapZoom(map,4);
    map.on("click", this.mapClick);
  },
  methods: {
    mapClick: function(evt) { 
     var coordinate = evt.coordinate;
     console.log(coordinate)
    },
    addUser: function(e){
      this.users.push({
        name: this.user.name,
        email: this.user.email,
        contacted: false
      });
      this.user = {};
      e.preventDefault();
    },
    deleteUser: function(index){
      this.users.splice(this.users.indexOf(index), 1)
    },
    addFun(){
        // this.$store.commit("add")
        this.$store.dispatch("add")
    },
    reduceFun(){
        //this.$store.commit("reduce")
        this.$store.dispatch("reduce")
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

ul{
  list-style-type: none;
}
ul li{
  list-style-type: none; line-height: 22px;
}
</style>