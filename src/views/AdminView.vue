<template>
  <div>
    <h1>Administración</h1>
    <!-- Botón para agregar curso -->
    <v-row justify="center">
      <v-btn color="primary" class="mb-6 mt-4" @click="abrirModal">Agregar Curso</v-btn>
    </v-row>
    <v-container>
      <v-simple-table class="mt-6">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Curso</th>
              <th class="text-left">Cupos</th>
              <th class="text-left">Inscritos</th>
              <th class="text-left">Duración</th>
              <th class="text-left">Costo</th>
              <th class="text-left">Terminado</th>
              <th class="text-left">Fecha</th>
              <th class="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="curso in allCursos" :key="curso.id">
              <td>{{ curso.nombre }}</td>
              <td>{{ curso.cupos }}</td>
              <td>{{ curso.inscritos }}</td>
              <td>{{ curso.duracion }}</td>
              <td>${{ curso.costo }}</td>
              <td>{{ curso.completado ? 'Sí' : 'No' }}</td>
              <td>{{ formatDate(curso.fecha_registro) }}</td>
              <td>
                <router-link :to="{ name:'edit', params: { id:curso.id } }">
                  <v-icon color="orange" class="mr-2">mdi-pencil</v-icon>
                </router-link>
                <v-icon color="red" @click="confirmarEliminar(curso.id)">mdi-delete</v-icon>
              </td>   
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Dialogo de confirmación para eliminar curso -->
      <v-dialog v-model="dialogConfirmDelete" max-width="600">
        <v-card max-height="600px">
          <v-card-title class="d-flex justify-center">
            <span class="text-h6">¿Estás seguro de que deseas eliminar este curso?</span>
          </v-card-title>
          
          <v-card-actions class="d-flex justify-center"> <!-- Centra los botones -->
            <!-- Botón Cancelar (Verde) -->
            <v-btn color="green darken-1" class="white--text" @click="cancelarEliminar">
              Cancelar
            </v-btn>

            <!-- Botón Eliminar (Rojo) -->
            <v-btn color="red darken-1" class="white--text mb-6 mt-6"  @click="eliminarCursoConfirmado">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- Modal para agregar un curso -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar nuevo curso</span>
        </v-card-title>

        <v-card-text>
          <!-- Formulario vacío para agregar un nuevo curso -->
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="nuevoCurso.nombre"
              :counter="40"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-file-input
              v-model="nuevoCurso.img"
              label="Imagen del curso"
              accept="image/*"
              prepend-icon="mdi-camera"
              required
            ></v-file-input>

            <v-text-field
              v-model="nuevoCurso.cupos"
              :rules="[cuposRules, numericRule]"
              label="Cupos del curso"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.inscritos"
              :rules="[inscritosRules, inscritosVsCuposRule, numericRule]"
              label="Inscritos del curso"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.duracion"
              :counter="10"
              :rules="duracionRules"
              label="Duración del curso"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.fecha_registro"
              label="Fecha del registro"
              required
              readonly
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.completado"
              label="Terminado"
              required
              readonly
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.costo"
              :rules="[costoRules, numericRule]"
              label="Costo del curso"
              required
            ></v-text-field>

            <v-textarea
              v-model="nuevoCurso.descripcion"
              label="Descripción del curso"
              rows="3"
              outlined
              required
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <!-- Botón verde "Agregar" -->
          <v-btn color="green darken-1" class="white--text mb-6" @click="agregarCurso">
            Agregar
          </v-btn>

          <!-- Botón naranjo "Limpiar formulario" -->
          <v-btn color="orange darken-1" class="white--text mb-6" @click="resetFormulario">
            Limpiar formulario
          </v-btn>

          <!-- Botón rojo "Cancelar" -->
          <v-btn color="red" class="white--text mb-6" @click="cerrarModal">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <Data></Data>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Data from '@/components/Data.vue';
import moment from 'moment';
export default {
    name: 'admin-view',
    //props: {}
    components: {
      Data
    },
    data() {
    return {
      dialog: false,  // Controla si el modal está abierto o cerrado
      valid: false,   // Controla la validación del formulario
      dialogConfirmDelete: false,  // Controla el diálogo de confirmación
      cursoIdParaEliminar: null,
      // Reglas de validación para los campos
      nombreRules: [(v) => !!v || 'El nombre es requerido', (v) => v.length <= 40 || 'Máximo 40 caracteres'],
      cuposRules: [(v) => !!v || 'Los cupos son requeridos'],
      inscritosRules: [(v) => !!v || 'Los inscritos son requeridos'],
      duracionRules: [(v) => !!v || 'La duración es requerida', (v) => v.length <= 10 || 'Máximo 10 caracteres'],
      inscritosVsCuposRule: (v) => v <= this.nuevoCurso.cupos || 'Los inscritos no pueden superar los cupos disponibles',
      fechaRules: [(v) => !!v || 'La fecha es requerida'],
      completadoRules: [(v) => !!v || 'El estado es requerido'],
      costoRules: [(v) => !!v || 'El costo es requerido'],
      numericRule: (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico',
      nuevoCurso: {  // Objeto para un nuevo curso
        nombre: '',
        img: '',
        cupos: '',
        inscritos: '',
        duracion: '',
        fecha_registro: '',
        completado: 'false',  // Valor por defecto "false"
        costo: '',
        descripcion: ''
      }
    };
  },
    computed: {
        ...mapGetters(['allCursos'])
  },
  methods: {
    ...mapActions(['agregarCurso', 'eliminarCurso']),
    
    abrirModal() {
      this.dialog = true;
      // Usa moment.js para asignar la fecha actual formateada por defecto
      this.nuevoCurso.fecha_registro = moment().format('DD/MM/YYYY');
      this.nuevoCurso.completado = false;  // Estado por defecto como "false"
    },
    
    cerrarModal() {
      this.dialog = false;
      this.resetFormulario();  // Resetea el formulario cuando se cierra
    },
    
    resetFormulario() {
      // Limpia el formulario y asigna la fecha actual con moment
      this.nuevoCurso = {
        nombre: '',
        img: '',
        cupos: '',
        inscritos: '',
        duracion: '',
        fecha_registro: moment().format('DD/MM/YYYY'),  // Fecha actual por defecto usando moment
        completado: false,
        costo: '',
        descripcion: ''
      };
    },
    
    agregarCurso() {
      if (this.$refs.form.validate()) {
        // Convertir cupos, inscritos y costo a números antes de enviarlos a Vuex
        const curso = {
          ...this.nuevoCurso,
          cupos: Number(this.nuevoCurso.cupos),
          inscritos: Number(this.nuevoCurso.inscritos),
          costo: Number(this.nuevoCurso.costo),
          completado: Boolean(this.nuevoCurso.completado)  // Asegurarse de que 'completado' sea booleano
        };
        // Llama a la acción de Vuex para agregar el curso
        this.$store.dispatch('agregarCurso', curso);
        this.cerrarModal();  // Cierra el modal después de agregar
      }
    },
    
    formatDate(date) {
      if (!date) return '';  // Si no hay fecha, devolver una cadena vacía
      const formattedDate = moment(date, 'DD/MM/YYYY', true);  // Intentar formatear la fecha en 'DD/MM/YYYY'
      if (formattedDate.isValid()) {
        return formattedDate.format('DD/MM/YYYY');  // Si la fecha es válida, formatearla en el formato deseado
      } else {
        return 'Fecha inválida';  // Si no es válida, devuelve un mensaje o valor predeterminado
      }
    },

    confirmarEliminar(cursoId) {
      this.cursoIdParaEliminar = cursoId;
      this.dialogConfirmDelete = true;  // Abre el diálogo de confirmación
    },
    
    cancelarEliminar() {
      this.dialogConfirmDelete = false;  // Cierra el diálogo sin eliminar
    },

    eliminarCursoConfirmado() {
      this.$store.dispatch('eliminarCurso', this.cursoIdParaEliminar);  // Corregido para usar dispatch
      this.dialogConfirmDelete = false;  // Cierra el diálogo después de eliminar
    }
  },
    // watch: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // created() {
    //     this.$store.dispatch('fetchCursos');
    // }
    // -- End Lifecycle Methods
};
</script>

<style scoped>
    h1 {
      display: flex;
      justify-content: center;
      padding: 25px;
      font-size: 60px;
      font-family: 'Arial Narrow Bold', sans-serif;
    }
</style>