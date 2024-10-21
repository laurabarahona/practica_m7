<template>
    <div>
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>

        <v-spacer></v-spacer>
  
        <v-btn icon @click="redirectTo('home')">
          <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <v-btn icon @click="redirectTo('admin')">
          <v-icon color="white">mdi-tools</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item v-for="route in routes" :key="route.name" @click="redirectTo(route.name)" :disabled="currentRoute === route.name">
              <v-list-item-icon>
                <v-icon>{{ route.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ route.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  

<script>
export default {
    name: 'navbar-component',
    // props: {},
    data: function(){
        return {
            drawer: false,
            group: null,
            routes: [
            {
                    icon:'mdi-home',
                    title:'Home',
                    name:'home'
                },
                {
                    icon:'mdi-tools',
                    title:'Administracion',
                    name:'admin'
                }
                
            ]
        }
    },
    computed: {
        currentRoute() {
        return this.$route.name; 
        }
    },
    methods: {
        redirectTo(routeName) {
        if (routeName !== this.currentRoute) {
            this.$router.push({ name: routeName }); 
            this.drawer = false; 
        }
        }
    }
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