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
            :disabled="cursoSeleccionado.completado === true" 
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

          <v-select
            v-model="cursoSeleccionado.completado"
            :items="terminadoOptions"
            label="Terminado"
            required
          ></v-select>

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

          <v-card-actions class="d-flex justify-center mb-6">
            <v-btn
              :disabled="!valid"
              color="error"
              class="mr-4"
              @click="editarCurso"
            >
              Editar
            </v-btn>

            <router-link :to="{ name: 'admin' }">
              <v-btn
                color="warning"
              >
                Cerrar
              </v-btn>
            </router-link>
          </v-card-actions>
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
    data: function() {
        return {
          valid: false, 
          nombreRules: [(v) => !!v || 'El nombre es requerido'],
          cuposRules: [
            (v) => !!v || 'Los cupos son requeridos',
            (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico'
          ],
          inscritosRules: [
            (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico',
            (v) => {
              if (this.cursoSeleccionado.completado === true) {
                return v === 0 || 'Si el curso está terminado, los inscritos deben ser 0';  
              } 
              return v <= this.cursoSeleccionado.cupos || 'Los inscritos no pueden ser mayores que los cupos'; 
            }
          ],
          duracionRules: [(v) => !!v || 'La duración es requerida'],
          fechaRules: [(v) => !!v || 'La fecha es requerida'],
          terminadoOptions: [
            { text: 'Sí', value: true },  
            { text: 'No', value: false }  
          ],
          completadoRules: [(v) => !!v || 'El estado es requerido'],
          costoRules: [
            (v) => !!v || 'El costo es requerido',
            (v) => /^\d+$/.test(v) || 'Debe ser un valor numérico'
          ]
        }
    },
    computed: {
      ...mapGetters(['allCursos']),
      cursoSeleccionado() {
        const id = this.$route.params.id;  
        return this.allCursos.find(curso => curso.id === parseInt(id));  // busca el curso que coincida con el id
      }
    },
    methods: {
      ...mapActions(['modificarCurso']),
            editarCurso() {
        if (this.$refs.form.validate()) {
          const cursoActualizado = {
            ...this.cursoSeleccionado,
            cupos: Number(this.cursoSeleccionado.cupos),
            inscritos: Number(this.cursoSeleccionado.inscritos),
            costo: Number(this.cursoSeleccionado.costo)
          };
          
          this.modificarCurso(cursoActualizado);
          this.$router.push({ name: 'admin' });
        }
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      }
    },
    watch: {
      'cursoSeleccionado.completado': function(newValue) {
        if (newValue === true) {
          this.cursoSeleccionado.inscritos = 0;  //condicion
        }
      }
    }
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