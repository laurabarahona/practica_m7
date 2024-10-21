import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'  

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: []
  },
  getters: {
    allCursos: (state) => state.cursos,

    totalAlumnosPermitidos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0);
    },
    totalAlumnosInscritos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0);
    },
    totalCuposRestantes: (state) => {
      return state.cursos.reduce((total, curso) => total + (curso.cupos - curso.inscritos), 0);
    },
    totalCursosTerminados: (state) => {
      return state.cursos.filter(curso => curso.completado).length;
    },
    totalCursosActivos: (state) => {
      return state.cursos.filter(curso => !curso.completado).length;
    },
    totalCursos: (state) => {
      return state.cursos.length;
    }
  },
  mutations: {
    SET_CURSOS(state, cursos) {
      state.cursos = cursos;
    },
    UPDATE_CURSO(state, cursoActualizado) {
      const index = state.cursos.findIndex(curso => curso.id === cursoActualizado.id);
      if (index !== -1) {
        cursoActualizado.completado = Boolean(cursoActualizado.completado);  
        Vue.set(state.cursos, index, cursoActualizado); 
      }
    },
    ADD_CURSO(state, nuevoCurso) {
      state.cursos.push(nuevoCurso);  
    },
    DELETE_CURSO(state, cursoId) {
      state.cursos = state.cursos.filter(curso => curso.id !== cursoId);  
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
        console.log('Cursos obtenidos:', cursos);
        commit('SET_CURSOS', cursos);  
      } catch (error) {
        console.error('Hubo un problema al obtener los datos:', error);
      }
    },
    modificarCurso({ commit }, cursoActualizado) {
      cursoActualizado.completado = Boolean(cursoActualizado.completado);
      commit('UPDATE_CURSO', cursoActualizado);
    },
    agregarCurso({ commit, state }, nuevoCurso) {
      const newId = state.cursos.length ? state.cursos[state.cursos.length - 1].id + 1 : 1;
      const cursoConId = { 
        ...nuevoCurso, 
        id: newId, 
        completado: Boolean(nuevoCurso.completado),  
        fecha_registro: moment(nuevoCurso.fecha_registro, 'DD/MM/YYYY').format('DD/MM/YYYY')  
      };
      commit('ADD_CURSO', cursoConId);
    },
    eliminarCurso({ commit }, cursoId) {
      commit('DELETE_CURSO', cursoId);  
    },
  },
  modules: {}
})
