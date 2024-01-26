import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import currencyPairs from '../../enums/currencyPairs.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    give: '',
    get: '',
    exchangeOperations: [],
    reserves: [
      { id: 11, code: "uah", value: 520465 },
      { id: 12, code: "usd", value: 250000 },
      { id: 13, code: "eur", value: 43000 },
      { id: 14, code: "zlt", value: 128400 },
    ]
  },
  getters: {
    pair(state) {
      return currencyPairs.filter(pair => pair.receive.id === state.get.id && pair.send.id === state.give.id)[0]
    },
    reserv(state) {
      return state.reserves.filter(
        (curr) => curr.id === state.get.id
      )[0];
    },
    dataChart(state) {
      let data = {
        usd: 0,
        uah: 0,
        zlt: 0,
        eur: 0,
      };
      state.exchangeOperations.forEach((el) => {
        data[el.code] = data[el.code] + 1;
      });
      return Object.values(data);
    }
  },
  mutations: {
    SET_GIVE(state, value) {
      state.give = value
    },
    SET_GET(state, value) {
      state.get = value
    },
    ADD_EXCHANGE_OPERATION(state, value) {
      state.exchangeOperations.push(value)
    },
    SET_RESERV(state, value) {
     const reserv = state.reserves.filter(
      (curr) => curr.id === state.get.id
    )[0]
    reserv.value = reserv.value - value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
