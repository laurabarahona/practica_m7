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
                <v-icon color="red">mdi-delete</v-icon>
              </td>   
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
              rows="5"
              outlined
              required
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <!-- Botón verde "Agregar" -->
          <v-btn color="green darken-1" class="white--text" @click="agregarCurso">
            Agregar
          </v-btn>

          <!-- Botón naranjo "Limpiar formulario" -->
          <v-btn color="orange darken-1" class="white--text" @click="resetFormulario">
            Limpiar formulario
          </v-btn>

          <!-- Botón rojo "Cancelar" -->
          <v-btn color="red" class="white--text" @click="cerrarModal">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'admin-view',
    //props: {}
    data() {
      return {
        dialog: false, // Controla si el modal está abierto o cerrado
        valid: false,  // Controla la validación del formulario
        // Reglas de validación para los campos
        nombreRules: [(v) => !!v || 'El nombre es requerido', (v) => v.length <= 40 || 'Máximo 40 caracteres'],
        cuposRules: [(v) => !!v || 'Los cupos son requeridos'],
        inscritosRules: [(v) => !!v || 'Los inscritos son requeridos'],
        duracionRules: [(v) => !!v || 'La duración es requerida', (v) => v.length <= 10 || 'Máximo 10 caracteres'],
        inscritosVsCuposRule: (v) => v <= this.nuevoCurso.cupos || 'Los inscritos no pueden superar los cupos disponibles',
        fechaRules: [(v) => !!v || 'La fecha es requerida'],
        completadoRules: [(v) => !!v || 'El estado es requerido'],
        costoRules: [(v) => !!v || 'El costo es requerido'],
        numericRule: (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico',  // Solo números
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
      ...mapActions(['agregarCurso']),
      abrirModal() {
        this.dialog = true;  // Abre el modal
        this.nuevoCurso.fecha_registro = this.formatDate(new Date());  // Asigna la fecha actual al abrir el modal
        this.nuevoCurso.completado = 'false';  // Asigna el estado por defecto como 'false'
      },
      cerrarModal() {
        this.dialog = false;  // Cierra el modal
        this.resetFormulario();  // Resetea el formulario cuando se cierra
      },
      resetFormulario() {
        // Limpia el formulario
        this.nuevoCurso = {
          nombre: '',
          img: '',
          cupos: '',
          inscritos: '',
          duracion: '',
          fecha_registro: this.formatDate(new Date()),  // Fecha actual por defecto
          completado: 'false',  // Estado por defecto
          costo: '',
          descripcion: ''
        };
      },
      agregarCurso() {
        if (this.$refs.form.validate()) {
          // Llama a la acción de Vuex para agregar el curso
          this.$store.dispatch('agregarCurso', this.nuevoCurso);
          this.cerrarModal();  // Cierra el modal después de agregar
        }
      },
      formatDate(date) {
        if (!(date instanceof Date)) {
          date = new Date(date);  // Asegura que la fecha sea una instancia válida de Date
        }
        const day = String(date.getDate()).padStart(2, '0');  // Agrega ceros si es necesario
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Los meses empiezan desde 0
        const year = String(date.getFullYear()).substr(-2);  // Dos últimos dígitos del año
        return `${day}/${month}/${year}`;
      }
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
  //   mounted() {
  //   if (this.allCursos.length === 0) {
  //     this.fetchCursos();  // Solo llama a fetchCursos si los cursos aún no están cargados
  //   }
  // }
    // -- End Lifecycle Methods
}
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