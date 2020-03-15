import Vue from 'vue'
import Vuex from 'vuex'

// 
import leftMenu from './modules/leftMenu'
// 
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        leftMenu
    },
    state:{
        count:1
    },
    mutations:{
        change(state,num){
            return state+=num
        },
        add(state){
            state.count = state.count+1;
        },
        reduce(state){
            state.count = state.count-1;
        }
    },
    getters:{
        getStateCount:function(state){
            return state.count+1;
        }
    },
    actions:{//注册actions类似vue里面的methods
        add(context){
            context.commit("add")
        },
        reduce(context){
            context.commit("reduce")
        }
    }
})

export default store