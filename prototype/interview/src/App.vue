<template>
  <v-app>
    <v-app-bar ref="header" color="transparent" elevation="1">
      <v-container>
        <v-row justify="center">
          <v-col>
            <v-img
              alt="Chranach Logo"
              class="shrink"
              contain
              src="https://github.com/BenPag/cranach/blob/master/wiki/imgs/Cranach%20Timeline.png?raw=true"
              height="50"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  mounted() {
    // this.$store.dispatch('fetchProductions');
  },
};
</script>
