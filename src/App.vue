<template>
  <div id="app">
    <!-- <HelloWorld :msg="vuexData"/> -->
    <!-- <HelloWorld :msg="$store.state.name"/> -->
    <HelloWorld :msg="name"/>
    <div>{{$store.state.number}}</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => {
    return {
      // vuexData: "fff"

    }
  },
  mounted() {
    setInterval(()=>{
      console.log(this.$store.state.number)
      this.$store.commit("addNum", 2)
    },2000)
  },
  computed: {
    name() {
      // 注意这里是取的值,而在store中定义的是函数
      return this.$store.getters.getMyName
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
