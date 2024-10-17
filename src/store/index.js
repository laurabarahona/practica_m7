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
    UPDATE_CURSO(state, cursoActualizado) {
      const index = state.cursos.findIndex(curso => curso.id === cursoActualizado.id);
      if (index !== -1) {
        Vue.set(state.cursos, index, cursoActualizado); 
      }
    },
    ADD_CURSO(state, nuevoCurso) {
      state.cursos.push(nuevoCurso);  // Agregar el nuevo curso al estado
    },
  },
  actions: {
    async fetchCursos({ commit }) {
      try {
        const response = await fetch('/cursos.json'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error('Error al cargar los cursos');
        }
        const cursos = await response.json();
        console.log('Cursos obtenidos:', cursos);
        commit('SET_CURSOS', cursos);  // Guardamos los cursos en el estado
      } catch (error) {
        console.error('Hubo un problema al obtener los datos:', error);
      }
    },
    // Acción para despachar la mutación de actualizar un curso
    modificarCurso({ commit }, cursoActualizado) {
      commit('UPDATE_CURSO', cursoActualizado);
    },
    agregarCurso({ commit, state }, nuevoCurso) {
      // Generar un nuevo id basado en el número de cursos existentes
      const newId = state.cursos.length ? state.cursos[state.cursos.length - 1].id + 1 : 1;
      const cursoConId = { ...nuevoCurso, id: newId };  // Asigna el nuevo id
      commit('ADD_CURSO', cursoConId);
    }
  },
  modules: {}
})
