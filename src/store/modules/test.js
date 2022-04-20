const delay = duration => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}
const state = {
  count: 5
}

const getters = {
  aa: state => state.count * 2
}

const mutations = {
  CHANGE: (state, type) => {
    setTimeout(() => {
      type === 'add' ? state.count++ : state.count--

    })
  },
  MULTI: (state, times) => {
    state.count = state.count * times
  }
}

const actions = {
  asyncChange: async (context, payload) => {
    await delay(2000)
    context.commit('MULTI', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}