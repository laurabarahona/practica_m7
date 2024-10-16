<template>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Curso
          </th>
          <th class="text-left">
            Cupos
          </th>
          <th class="text-left">
            Inscritos
          </th>
          <th class="text-left">
            Duración
          </th>
          <th class="text-left">
            Costo
          </th>
          <th class="text-left">
            Terminado
          </th>
          <th class="text-left">
            Fecha
          </th>
          <th class="text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="curso in allCursos"
          :key="curso.id"
        >
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.duracion }}</td>
          <td>${{ curso.costo }}</td>
          <td>{{ curso.completado ? 'Sí' : 'No' }}</td>
          <td>{{ curso.fecha_registro }}</td>
          <td>
            <v-icon color="orange" class="mr-2">mdi-pencil</v-icon>
            <v-icon color="red">mdi-delete</v-icon>
          </td>   
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'admin-view',
    // props: {},
    data: function(){
        return {}
    },
    computed: {
        ...mapGetters(['allCursos'])
    },
    methods: {
        ...mapActions(['fetchCursos'])
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    mounted() {
    this.fetchCursos();
    },
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>