
const state = {
  a: 1
}

const mutations = {
  CHANGE: state => {
    state.a++
  }
}

export default {
  namespaced: true,
  state,
  mutations
}