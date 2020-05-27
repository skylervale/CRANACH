<template>
  <v-app>
    <v-app-bar
      ref="header"
      color="transparent"
      elevation="1"
      :height="`${windowHeight * 0.07}px`"
      style="z-index: 1000"
    >
      <v-container class="no-y-padding">
        <v-row justify="center">
          <v-col>
            <v-img
              alt="Chranach Logo"
              class="shrink"
              contain
              src="https://github.com/BenPag/cranach/blob/master/wiki/imgs/Cranach%20Timeline.png?raw=true"
              :height="`${windowHeight * 0.06}px`"
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
    windowHeight: 10,
  }),

  mounted() {
    this.windowHeight = window.innerHeight;
  },
};
</script>

<style lang="scss">
  .container {
    &.container--fluid {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
  }
</style>
