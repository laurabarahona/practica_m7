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
    },
    ACTUALIZAR_CURSO(state, cursoEditado) {
      const index = state.cursos.findIndex(curso => curso.id === cursoEditado.id);
      if (index !== -1) {
        // Actualizar el curso en el array de cursos
        Vue.set(state.cursos, index, cursoEditado);
      }
    },
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
    },
    editarCurso({ commit }, cursoEditado) {
      // Aquí puedes realizar cualquier acción adicional, como enviar datos a un servidor
      commit('ACTUALIZAR_CURSO', cursoEditado);
    },
  },
  modules: {
  }
})
