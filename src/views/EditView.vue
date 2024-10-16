<template>
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

    <v-file-input
      v-model="cursoSeleccionado.img"
      label="URL de la imagen"
      accept="image/*"
      required
    ></v-file-input>

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

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Editar
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Cerrar
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'edit-view',
    // props: {},
    data: function(){
        return {
        }
    },
    computed: {
        ...mapGetters(['allCursos']),
        cursoSeleccionado() {
            const id = this.$route.params.id; // Obtener el id de la URL
            return this.allCursos.find(curso => curso.id === parseInt(id)) || {};
        },
    },
    //methods: {}
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    created() {
        this.$store.dispatch('fetchCursos');
    }
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>