import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'  // Importa moment.js para el formateo de fechas

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: []
  },
  getters: {
    allCursos: (state) => state.cursos,

    totalAlumnosPermitidos: (state) => {
      // Supongamos que el total es la suma de los cupos de todos los cursos
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0);
    },
    totalAlumnosInscritos: (state) => {
      // Suma la cantidad de inscritos de todos los cursos
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0);
    },
    totalCuposRestantes: (state) => {
      // La cantidad de cupos restantes es la diferencia entre los cupos y los inscritos
      return state.cursos.reduce((total, curso) => total + (curso.cupos - curso.inscritos), 0);
    },
    totalCursosTerminados: (state) => {
      // Contamos la cantidad de cursos donde `completado` es true
      return state.cursos.filter(curso => curso.completado).length;
    },
    totalCursosActivos: (state) => {
      // Cursos activos son aquellos donde `completado` es false
      return state.cursos.filter(curso => !curso.completado).length;
    },
    totalCursos: (state) => {
      // El total de cursos es simplemente la longitud del array de cursos
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
        cursoActualizado.completado = Boolean(cursoActualizado.completado);  // Convertir a booleano
        Vue.set(state.cursos, index, cursoActualizado); 
      }
    },
    ADD_CURSO(state, nuevoCurso) {
      state.cursos.push(nuevoCurso);  // Agregar el nuevo curso al estado
    },
    DELETE_CURSO(state, cursoId) {
      state.cursos = state.cursos.filter(curso => curso.id !== cursoId);  // Elimina el curso por su id
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
      // Convertir el valor de completado a booleano
      cursoActualizado.completado = Boolean(cursoActualizado.completado);
      commit('UPDATE_CURSO', cursoActualizado);
    },
    agregarCurso({ commit, state }, nuevoCurso) {
      // Generar un nuevo id basado en el número de cursos existentes
      const newId = state.cursos.length ? state.cursos[state.cursos.length - 1].id + 1 : 1;
    
      // Convertir el valor de completado a booleano
      const cursoConId = { 
        ...nuevoCurso, 
        id: newId, 
        completado: Boolean(nuevoCurso.completado),  // Convertir a booleano
        fecha_registro: moment(nuevoCurso.fecha_registro, 'DD/MM/YYYY').format('DD/MM/YYYY')  // Asegurarse de que la fecha esté en formato 'DD/MM/YYYY'
      };
      
      // Commit de la mutación para agregar el curso
      commit('ADD_CURSO', cursoConId);
    },
    eliminarCurso({ commit }, cursoId) {
      commit('DELETE_CURSO', cursoId);  // Llama a la mutación para eliminar el curso
    },
  },
  modules: {}
})
