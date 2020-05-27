import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productionIds: [
      27814,
      459253,
      392024,
      337497,
      383708,
      436043,
      358260,
      336242,
      336245,
      336244,
      336246,
      384173,
      390717,
      361827,
      371380,
      434162,
      434165,
      434205,
      434207,
      434170,
      434110,
      434123,
      434112,
      434119,
      404502,
      397470,
      432286,
      432292,
      432302,
      432296,
      432303,
      432298,
      432301,
      623797,
      623817,
      623823,
      625281,
      625311,
      625309,
      625298,
      625287,
      625291,
      622930,
      624974,
      625019,
      625020,
      622987,
      622986,
      625361,
      625319,
      625317,
      436045,
      334800,
      452112,
      452111,
      339116,
      625661,
      436047,
      436046,
      338135,
      341296,
      45683,
      446602,
      334655,
      437081,
      436941,
      435759,
      435664,
      453980,
      438467,
      437232,
      39654,
      436337,
      436742,
      435615,
      436910,
      437284,
      437061,
      436445,
      435838,
    ],
    productions: [],
  },
  mutations: {
    addProduction(state, production) {
      state.productions.push(production);
    },
  },
  actions: {
    async fetchProductions({ commit, state }) {
      const allPromises = state.productionIds.map(async (id) => {
        const production = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        return commit('addProduction', production.data);
      });

      await Promise.all(allPromises);
    },
  },
  modules: {
  },
});
