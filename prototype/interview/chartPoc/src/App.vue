<template>
  <div id="app" style="margin-top: 1rem">
      <Chart :items="items"/>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import works from './assets/works'

export default {
  name: 'App',
  components: {
    Chart
  },
  data: () => ({
    items: [],
    locations: [
      'Deutschland',
      'Großbritannien',
      'Finnland',
      'Schweiz',
    ],
    customers: [
      'Martin Luther',
      'Friedrich der Weise',
      'Gunnar Heydenreich',
      'Christian Noss',
    ],
  }),
  created() {
     this.items = [...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works, ...works].map(w => this.createProduction(w))
      .sort((a, b) => (a.type > b.type) ? 1 : -1);
  },
  methods: {
    createProduction(data) {
      return {
        primaryImageUrl: data.primaryImage,
        imageUrl: data.primaryImageSmall,
        startDate: data.objectBeginDate,
        endDate: data.objectEndDate,
        title: data.title,
        location: this.getRandomLocation(),
        customer: this.getRandomCustomer(),
        artist: data.artistDisplayName,
        medium: data.medium,
        dimensions: data.dimensions,
        date: data.objectDate,
        link: data.objectURL,
        type: this.getType(data),
      };
    },
    getRandomLocation() {
      const randomIndex = Math.floor(Math.random() * (this.locations.length));
      return this.locations[randomIndex];
    },
    getRandomCustomer() {
      const randomIndex = Math.floor(Math.random() * (this.customers.length));
      return this.customers[randomIndex];
    },
    getType(data) {
      const objectName = data.objectName.toLowerCase();
      if (objectName.includes('painting')) return 'painting';
      if (objectName.includes('print')) return 'print';
      if (objectName.includes('drawing')) return 'drawing';
      return 'archive';
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
