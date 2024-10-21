<template>
  <div>
    <h1>Administración</h1>
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

      <v-dialog v-model="dialogConfirmDelete" max-width="600">
        <v-card max-height="600px">
          <v-card-title class="d-flex justify-center">
            <span class="text-h6">¿Estás seguro de que deseas eliminar este curso?</span>
          </v-card-title>
          
          <v-card-actions class="d-flex justify-center"> 
            
            <v-btn color="green darken-1" class="white--text" @click="cancelarEliminar">
              Cancelar
            </v-btn>

           
            <v-btn color="red darken-1" class="white--text mb-6 mt-6"  @click="eliminarCursoConfirmado">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar nuevo curso</span>
        </v-card-title>

        <v-card-text>
        
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="nuevoCurso.nombre"
              :counter="40"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevoCurso.img"
              label="Imagen del curso"
              required
              readonly
            ></v-text-field>

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
          
          <v-btn color="green darken-1" class="white--text mb-6" @click="agregarCurso">
            Agregar
          </v-btn>

          <v-btn color="orange darken-1" class="white--text mb-6" @click="resetFormulario">
            Limpiar formulario
          </v-btn>

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
      dialog: false,  
      valid: false,   
      dialogConfirmDelete: false,  
      cursoIdParaEliminar: null,
      // validación para los campos
      nombreRules: [(v) => !!v || 'El nombre es requerido', (v) => v.length <= 40 || 'Máximo 40 caracteres'],
      cuposRules: [(v) => !!v || 'Los cupos son requeridos'],
      inscritosRules: [(v) => !!v || 'Los inscritos son requeridos'],
      duracionRules: [(v) => !!v || 'La duración es requerida', (v) => v.length <= 10 || 'Máximo 10 caracteres'],
      inscritosVsCuposRule: (v) => v <= this.nuevoCurso.cupos || 'Los inscritos no pueden superar los cupos disponibles',
      fechaRules: [(v) => !!v || 'La fecha es requerida'],
      completadoRules: [(v) => !!v || 'El estado es requerido'],
      costoRules: [(v) => !!v || 'El costo es requerido'],
      numericRule: (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico',
      nuevoCurso: {  
        nombre: '',
        img: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97',
        cupos: '',
        inscritos: '',
        duracion: '',
        fecha_registro: '',
        completado: 'false',  
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
      this.resetFormulario();  
      this.nuevoCurso.fecha_registro = moment().format('DD/MM/YYYY');  
      this.nuevoCurso.completado = false;  
      this.nuevoCurso.img = 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97';
      
      this.$nextTick(() => {
        this.$refs.form.resetValidation();  
      });
    },
    
    cerrarModal() {
      this.dialog = false;
      this.resetFormulario();  // reset form
    },
    
    resetFormulario() {
      this.nuevoCurso = {
        nombre: '',
        img: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97',
        cupos: '',
        inscritos: '',
        duracion: '',
        fecha_registro: moment().format('DD/MM/YYYY'), 
        completado: false,
        costo: '',
        descripcion: ''
      };
    },
    
    agregarCurso() {
      if (this.$refs.form.validate()) {
        const curso = {
          ...this.nuevoCurso,
          cupos: Number(this.nuevoCurso.cupos),
          inscritos: Number(this.nuevoCurso.inscritos),
          costo: Number(this.nuevoCurso.costo),
          completado: Boolean(this.nuevoCurso.completado)  
        };
        this.$store.dispatch('agregarCurso', curso);
        this.cerrarModal();  // se cierra el modal después de agregar
      }
    },
    
    formatDate(date) {
      if (!date) return '';  
      const formattedDate = moment(date, 'DD/MM/YYYY', true);  
      if (formattedDate.isValid()) {
        return formattedDate.format('DD/MM/YYYY');  
      } else {
        return 'Fecha inválida'; 
      }
    },

    confirmarEliminar(cursoId) {
      this.cursoIdParaEliminar = cursoId;
      this.dialogConfirmDelete = true;  
    },
    
    cancelarEliminar() {
      this.dialogConfirmDelete = false;  
    },

    eliminarCursoConfirmado() {
      this.$store.dispatch('eliminarCurso', this.cursoIdParaEliminar);  
      this.dialogConfirmDelete = false;  
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