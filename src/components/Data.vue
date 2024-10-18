<template>
    <v-container>
    <!-- Rectángulo morado con la información -->
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="purple" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-account-multiple</v-icon>
            <span>Cantidad total de alumnos permitidos: {{ totalAlumnosPermitidos }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

  <!-- Segundo Rectángulo Celeste Oscuro -->
  <v-row justify="center">
      <v-col cols="12">
        <v-card color="blue darken-3" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-account-check</v-icon>
            <span>Cantidad total de alumnos inscritos: {{ totalAlumnosInscritos }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tercer Rectángulo Naranja Oscuro -->
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="orange darken-3" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-account-plus</v-icon>
            <span>Cantidad total de cupos restantes: {{ totalCuposRestantes }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cuarto Rectángulo Rosa Oscuro -->
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="pink darken-3" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-block-helper</v-icon> <!-- Ícono de bloqueo -->
            <span>Cantidad total de cursos terminados: {{ totalCursosTerminados }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quinto Rectángulo Café Dorado -->
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="brown lighten-1" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-bell-ring</v-icon> <!-- Ícono de campana sonando -->
            <span>Cantidad total de cursos activos: {{ totalCursosActivos }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sexto Rectángulo Naranja Oscuro -->
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="orange lighten-1 mb-6" dark>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-bell-ring</v-icon> <!-- Ícono de campana sonando -->
            <span>Cantidad total de cursos: {{ totalCursos }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'data-component',
    // props: {},
    data: function(){
        return {}
    },
    
    computed: {
        // Obtener datos de Vuex
        ...mapGetters({
        totalAlumnosPermitidos: 'totalAlumnosPermitidos', // Getter para los alumnos permitidos
        totalAlumnosInscritos: 'totalAlumnosInscritos',
        totalCuposRestantes: 'totalCuposRestantes',
        totalCursosTerminados: 'totalCursosTerminados', 
        totalCursosActivos: 'totalCursosActivos', 
        totalCursos: 'totalCursos' 
        })
    }
    //methods: {}
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>