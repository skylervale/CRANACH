<template>
  <v-app>
    <v-app-bar color="transparent" elevation="1">
      <v-img
        alt="Chranach Logo"
        class="shrink mr-2"
        contain
        src="https://github.com/BenPag/cranach/blob/master/wiki/imgs/Cranach%20Timeline.png?raw=true"
        height="50"
      />
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
    this.$store.dispatch('fetchProductions');
  },
};
</script>
