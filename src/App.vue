<template>
  <v-app>
    <Navbar></Navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  methods: {
    ...mapActions(['fetchCursos']),
  },
  components: {
    Navbar
  },
  created() {
    if (this.$store.state.cursos.length === 0) {
      this.fetchCursos();  // se cargan lso cursos al inicio
    }
  }
}
</script>
