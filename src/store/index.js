import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: []
  },
  getters: {
    allCursos: (state) => state.cursos
  },
  mutations: {
    SET_CURSOS(state, cursos) {
      state.cursos = cursos;  
    }
  },
  actions: {
    async fetchCursos({ commit }) {
      try {
        const response = await fetch('/cursos.json');
        if (!response.ok) {
          throw new Error('Error al cargar los cursos');
        }
        const cursos = await response.json();
        //llamar a una mutación para pasarle cursos
        commit('SET_CURSOS', cursos);  
      } catch (error) {
        console.error('Hubo un problema al obtener los datos:', error);
      }
    }
  },
  modules: {
  }
})
