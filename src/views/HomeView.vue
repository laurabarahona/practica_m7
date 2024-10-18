<template>
  <v-app>
    <h1>Lista de Cursos</h1>
    <Card :cursos="allCursos"></Card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'Home-view',
  components: {
    Card,
  },
  // props: {}
  data: function(){
        return {}
    },
  computed: {
    ...mapGetters(['allCursos']), // se traen los cursos desde el store
      cursos() {
      console.log(this.allCursos);  
      return this.allCursos;
    }
  },
  methods: {
    ...mapActions(['fetchCursos']),
  },
   // watch: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // created() {
    //     this.$store.dispatch('fetchCursos');
    // }
    // -- End Lifecycle Methods
}
</script>

<style>
h1 {
  display: flex;
  justify-content: center;
  padding: 25px;
  font-size: 60px;
  font-family: 'Arial Narrow Bold', sans-serif;
}
</style>
