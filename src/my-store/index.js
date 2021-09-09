// 这里先定义一个Vue,会在Store中用到
let Vue
class Store {
    constructor(options = {}) {
        // 因为放在data中的才支持响应式,所以把state放在Vue的data中
        this.myState = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        })
        this.getters = {}
        Object.keys(options.getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return options.getters[key](this.state)
                }
            })
        })
        
        // 对外只暴露commit函数,两个参数,一个是mutations中定义的函数名,一个是后续参数;
        // 这里用到了发布订阅模式,按属性名进行发布订阅
        // 定义一个对象收集所有传入的 mutations
        let mutations = {}
        Object.keys(options.mutations).forEach(key => {
            mutations[key] = (payload) => {
                options.mutations[key](this.state, payload)
            }
        })
        this.commit = (key, payload) => {
            mutations[key](payload)
        }

        // 收集 actions,跟上面代码逻辑类似
        let actions = {}
        Object.keys(options.actions).forEach(key => {
            actions[key] = payload => {
                options.actions[key](this, payload)
            }
        })
        this.dispatch = (key, payload) => {
            actions[key](payload)
        }
    }
    // 定义get,返回响应式的state数据
    get state() {
        return this.myState.state
    }

}

const install = (_Vue) => {
    console.log("install my vuex")
    Vue = _Vue
    // 通过mixin中定义beforeCreate，将$store加入到每一个组件实例中
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                // 2. 子组件去取父级组件的$store属性
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    install,
    Store
}