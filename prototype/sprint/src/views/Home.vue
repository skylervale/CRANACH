<template>
  <v-container fluid class="side-spacing">
    <Visualization :categories="categories" @addFilter="addFilter" @removeFilter="removeFilter" />

    <v-divider></v-divider>

    <Gallery :categories="filteredCategories" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Visualization from '@/components/visualization/Visualization.vue';
import Gallery from '@/components/gallery/Gallery.vue';

export default {
  name: 'home',
  components: {
    Visualization,
    Gallery,
  },

  data: () => ({
    categories: [
      {
        type: 'Gemälde',
        color: 'rgba(8, 82, 153, .8)',
        // color: 'rgba(119, 152, 191, .5)',
        data: [],
      },
      {
        type: 'Zeichnungen',
        color: 'rgba(166,32,25,0.8)',
        // color: 'rgba(223, 83, 83, .5)',
        data: [],
      },
      {
        type: 'Drucke',
        color: 'rgba(9, 110, 0, 0.8)',
        // color: 'rgba(83, 223, 83, .5)',
        data: [],
      },
      {
        type: 'Archivalien',
        color: 'rgba(219,140,0,0.8)',
        // color: 'rgba(223, 83, 250, .5)',
        data: [],
      },
    ],
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
    filters: [],
  }),

  computed: {
    filteredCategories: {
      get() {
        if (this.filters.length > 0) {
          return this.categories.reduce((acc, current) => {
            const filteredData = current.data.reduce((dataAcc, currentData) => {
              if (this.matchesAllFilters(currentData)) return [...dataAcc, currentData];
              return dataAcc;
            }, []);

            if (filteredData.length > 0) {
              return [
                ...acc,
                {
                  type: current.type,
                  color: current.color,
                  data: filteredData,
                },
              ];
            }
            return acc;
          }, []);
        }

        return this.categories;
      },
    },
  },

  methods: {
    getRandomLocation() {
      const randomIndex = Math.floor(Math.random() * (this.locations.length));
      return this.locations[randomIndex];
    },
    getRandomCustomer() {
      const randomIndex = Math.floor(Math.random() * (this.customers.length));
      return this.customers[randomIndex];
    },
    addProduction(production) {
      switch (production.type) {
        case 'painting': {
          production.type = this.categories[0].type;
          this.categories[0].data.push(production);
          break;
        }
        case 'drawing': {
          production.type = this.categories[1].type;
          this.categories[1].data.push(production);
          break;
        }
        case 'print': {
          production.type = this.categories[2].type;
          this.categories[2].data.push(production);
          break;
        }
        default: {
          production.type = this.categories[3].type;
          this.categories[3].data.push(production);
          break;
        }
      }
    },
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
    getType(data) {
      const objectName = data.objectName.toLowerCase();
      if (objectName.includes('painting')) return 'painting';
      if (objectName.includes('print')) return 'print';
      if (objectName.includes('drawing')) return 'drawing';
      return 'archive';
    },
    addFilter(filter, remove) {
      if (remove && this.filters.length > 0) this.removeFilter(filter);
      this.filters.push(filter);
    },
    removeFilter(filter) {
      const index = this.getFilterIndex(filter);
      if (index > -1) this.filters.splice(index, 1);
    },
    getFilterIndex(filter) {
      return this.filters.reduce((acc, elem, index) => {
        if (acc === -1 && elem.name === filter.name) return index;
        return acc;
      }, -1);
    },
    matchesAllFilters(data) {
      return this.filters.every(f => f(data));
    },
  },

  mounted() {
    this.$store.state.productions.forEach((data) => {
      this.addProduction(this.createProduction(data));
    });

    this.$store.watch(
      state => state.productions,
      (newProductions) => {
        this.addProduction(this.createProduction(newProductions[newProductions.length - 1]));
      },
      { deep: true },
    );
  },

};
</script>

<style lang="scss">

  .side-spacing {
    padding-left: 5vw;
    padding-right: 5vw;
  }

</style>
