<template>
    <v-container fluid fill-height class="grey lighten-3">
      <v-row justify="center" align="center">
        <v-col class="text-center">
          <v-icon color="yellow darken-3" large class="mb-4" style="font-size: 100px;">
            mdi-emoticon-sad-outline
          </v-icon>
          <h1 class="display-1 yellow--text text--darken-3">404</h1>
          <h4 class="yellow--text text--darken-3">Página no encontrada</h4>
          <router-link to="/">
            <v-btn color="yellow darken-3" class="white--text mt-4">
              Volver al inicio
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
export default {
    name: 'notfound-view',
    // props: {},
    data: function(){
        return {}
    },
    // computed: {},
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