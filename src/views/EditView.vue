<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="9">
          <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="cursoSeleccionado.nombre"
            :counter="40"
            :rules="nombreRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.img"
            label="URL de la imagen"
            required
            readonly
          ></v-text-field>

          
          <v-text-field
            v-model="cursoSeleccionado.cupos"
            :rules="cuposRules"
            label="Cupos del curso"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.inscritos"
            :rules="inscritosRules"
            label="Inscritos del curso"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.duracion"
            :counter="10"
            :rules="duracionRules"
            label="Duración del curso"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.fecha_registro"
            :counter="10"
            :rules="fechaRules"
            label="Fecha del registro"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.completado"
            :counter="10"
            :rules="completadoRules"
            label="Terminado"
            required
          ></v-text-field>

          <v-text-field
            v-model="cursoSeleccionado.costo"
            :rules="costoRules"
            label="Costo del curso"
            required
          ></v-text-field>

          <v-textarea
            v-model="cursoSeleccionado.descripcion"
            label="Descripción del curso"
            rows="5"
            outlined
            required
          ></v-textarea>

          <router-link :to="{ name:'home' }">
          <v-btn
            color="error"
            class="mr-4"
            @click="editarCurso"
          >
            Editar
          </v-btn>
          </router-link>
        

            <v-btn
              color="warning"
            >
              Cerrar
            </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'edit-view',
    // props: {},
    data: function(){
        return {
          valid: false, // Define la propiedad 'valid' para la validación del formulario
          // Reglas de validación para los campos
          nombreRules: [(v) => !!v || 'El nombre es requerido'],
          cuposRules: [(v) => !!v || 'Los cupos son requeridos'],
          inscritosRules: [(v) => !!v || 'Los inscritos son requeridos'],
          duracionRules: [(v) => !!v || 'La duración es requerida'],
          fechaRules: [(v) => !!v || 'La fecha es requerida'],
          completadoRules: [(v) => !!v || 'El estado es requerido'],
          costoRules: [(v) => !!v || 'El costo es requerido']
        }
    },
    computed: {
      ...mapGetters(['allCursos']),
      cursoSeleccionado() {
        const id = this.$route.params.id;  // Obtener el id de la URL
        return this.allCursos.find(curso => curso.id === parseInt(id));  // Buscar solo el curso que coincida con el id
      }
    },
    methods: {
      ...mapActions(['modificarCurso']),
      editarCurso() {
        // Verificar si cursoSeleccionado tiene los valores correctos antes de enviar
        console.log('Curso actualizado:', this.cursoSeleccionado);
        // Enviar los datos del curso actualizado al store
        this.modificarCurso(this.cursoSeleccionado);
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      }
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // created() {
    //     this.$store.dispatch('fetchCursos');
    // }
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>