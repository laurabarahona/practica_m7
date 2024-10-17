<template>
  <v-container>
    <v-row justify="space-around">
      <v-col v-for="curso in cursos" :key="curso.id" cols="12" md="6" lg="4">
        <v-card width="400" class="card-fixed-size">
          <v-img
            height="200px"
            :src="curso.img"
          >
            <v-app-bar
              flat
              color="rgba(0, 0, 0, 0)"
            >
              <v-spacer></v-spacer>
              <v-btn color="white" icon></v-btn>
            </v-app-bar>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold text-h6 black--text text-center ml-8 mb-2">
              {{ curso.nombre }}
            </div>
            <div>Información</div>

            <v-timeline align-top dense>
              <v-timeline-item :color="'deep-purple lighten-1'" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Costo:</strong> ${{ curso.costo }}
                  </div>
                  <div><strong>Duración:</strong> {{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item :color="'green lighten-1'" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Cupos:</strong> {{ curso.cupos }}
                  </div>
                  <div><strong>Completado:</strong> {{ curso.completado ? 'Sí' : 'No' }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item :color="'deep-purple lighten-1'" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Fecha de registro:</strong>
                  </div>
                  <div>{{ curso.fecha_registro }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item :color="'green lighten-1'" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Descripción:</strong>
                  </div>
                  <div>{{ curso.descripcion }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'card-component',
    props: {
      cursos: {
        type: Array,
        required: true
      }
    },
    data: () => ({
    }),
    //computed: {},
    // methods: {},
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    .v-card {
  transition: transform 0.3s ease;
}
    .v-card:hover {
    transform: scale(1.05);
}
.card-fixed-size {
    height: 640px;
}
</style>