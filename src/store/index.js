import Vue from 'vue'
import Vuex from '../my-store'

// 基于localstorage添加一个持久化vuex的插件
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe(state => {
        localStorage.setItem("vuex-state", JSON.stringify(state))
    })
}

Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [myPlugin],
    state: {
        name: "通过getters得到的state数据",
        number: 1,
    },
    getters: {
        getMyName(state) {
            return state.name
        }
    },
    mutations: {
        addNum(state, num) {
            state.number += num;
        }
    },
    actions: {},
    modules: {},
})
