<template>
  <v-app>
    <h1>Lista de Cursos</h1>
    <Card></Card>
  </v-app>
</template>

<script>
  import Card from '@/components/Card.vue';

  export default {
    name: 'Home-view',

    components: {
      Card,
    },
  }
</script>
<style>
h1{
  display: flex;
  justify-content: center;
  padding: 25px;
  font-size: 60px;
  font-family: 'Arial Narrow Bold', sans-serif;
}
</style>
