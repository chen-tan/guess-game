import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleFiles = require.context('./modules', true, /\.js$/)
const modules = moduleFiles.keys().reduce((modules, path) => {
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = moduleFiles(path)
  modules[moduleName] = value.default
  return modules
}, {})


const store = new Vuex.Store({
  modules
})




export default store