/**
 * 说明：封装所有的地图服务，返回图层名称，单一图层则返回图层名称，多个图层返回对象
 */
// import TileLayer from 'ol/layer/Tile.js';
import {
  Tile as TileLayer,
  Vector as VectorLayer
} from 'ol/layer.js';
import {
  XYZ,
  TileWMS,
  Vector as VectorSource,
  Cluster
} from 'ol/source.js';
import {
  Heatmap as HeatmapLayer
} from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import ImageWMS from 'ol/source/ImageWMS';
import WMSLayer from "ol/layer/Image";
import MVT from 'ol/format/MVT.js';
import {
  createXYZ
} from 'ol/tilegrid';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  Icon
} from 'ol/style.js';
import {
  get as projGet
} from 'ol/proj';
// import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
// import axios from "axios"
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
/**
 * 说明：加载天地图矢量服务
 * @param {*} map     必填，对象，地图对象
 */
const MapServer = {
  name: 'Mr Zhang',
  hello() {
    console.log('My name is' + this.name)
  },
  tiandituVetorMap(map) {
    /**
     * 加载天地图的矢量图层
     */
    var TiandiMap_vec = new TileLayer({
      name: '天地图矢量图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
        wrapX: false,
        //设置crossOrigin 
      }),
    });
    /**
     * 添加天地图适量的标注信息
     */
    var TiandiMap_cva = new TileLayer({
      name: '天地图矢量注记图层',
      source: new XYZ({
        // 设置crossOrigin
        // crossOrigin: 'anonymous',
        url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
        wrapX: false,

      }),
    });
    // 添加到地图上
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    // 返回图层名称
    return {
      TiandiMap_vec,
      TiandiMap_cva
    }

  },
  /**
   * 说明：加载天地图影像服务
   * @param {*} map       必填，对象，地图对象
   */
  tiandituImgMap(map) {
    var TiandiMap_img = new TileLayer({
      name: "天地图影像图层",
      source: new XYZ({
        url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
        wrapX: false,
      })
    });
    var TiandiMap_cia = new TileLayer({
      name: "天地图影像注记图层",
      source: new XYZ({
        url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
        wrapX: false,

      })
    });
    // 添加到地图上
    map.addLayer(TiandiMap_img);
    map.addLayer(TiandiMap_cia);
    // 返回图层名称
    return {
      TiandiMap_img,
      TiandiMap_cia
    }
  },
  geoServeWMS(map, url, params) {
    var maplayer = new WMSLayer({
      source: new ImageWMS({
        url: url,
        params: params,
        ratio: 1.5,
        serverType: 'geoserver' //服务器类型                  
      })
    })
    map.addLayer(maplayer)
    return maplayer;
  },
  WMSmap(map, url, params) {
    var maplayer = new WMSLayer({
      source: new ImageWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
          'LAYERS': 'cite:province', //此处可以是单个图层名称，也可以是图层组名称，或多个图层名称  
          'VERSION': '1.1.0',
          'TILED': false
        },
        ratio: 1.5,
        serverType: 'geoserver' //服务器类型                  
      })
    })
    map.addLayer(maplayer)
    return maplayer;
  }

}

export {
  MapServer
};
