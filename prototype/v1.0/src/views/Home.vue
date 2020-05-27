<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="py-0 right-padding">
        <Visualization
          ref="visualization"
          :categories="categories"
          :breadcrumbItems="images"
          :absoluteMin="new Date('1472-10-04')"
          :absoluteMax="new Date('1608-01-01')"
          @addFilter="addFilter"
          @removeFilter="removeFilter"
          @itemClicked="itemClicked"
          @categoriesChanged="(arr) => { $refs.gallery.setSwitches(arr); }"
          @rangeChanged="updateMinMax"
        />
      </v-col>

      <v-col cols="1" class="pa-0">
        <SideGallery
          ref="gallery"
          :categories="filteredCategories"
          :absoluteMin="new Date('1472-10-04')"
          :absoluteMax="new Date('1608-01-01')"
          :min="min"
          :max="max"
          @reset="$refs.visualization.reset()"
          @categoriesChanged="(arr) => { $refs.visualization.setSwitches(arr); }"
          @searchChanged="(text) => { $refs.visualization.setSearch(text); }"
          @rangeChanged="updateChartRange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Visualization from '@/components/visualization/Visualization.vue';
import SideGallery from '@/components/gallery/SideGallery.vue';
import works from '@/works.json';
import events from '@/utils/history.events.json';
// import items from '@/data_structures/paintings.json';
// import items from '@/data_structures/graphics.real.json';
// import items from '@/data_structures/graphics.virtual.json';

export default {
  name: 'home',
  components: {
    Visualization,
    // Gallery,
    SideGallery,
  },

  data: () => ({
    minMaxTimeout: null,
    min: new Date('1472-10-04'),
    max: new Date('1608-01-01'),
    imageTest: [
      'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lucas_Cranach_d._%C3%84._-_David_and_Bathsheba_-_WGA05718.jpg',
      'https://thomas-michel-contemporary-art.de/wp-content/uploads/2015/12/cranach-agnes-von-hayn-1543-1.jpg',
      'https://mobil.rundschau-online.de/image/26678446/4x3/620/465/a1f24253b27bac367b259947cee465f8/lZ/cranach-madonna.jpg',
      'https://www.dw.com/image/37343060_303.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/The_Procuress_by_Lucas_Cranach_the_Elder%2C_Tbilisi_Museum_of_Fine_Arts.jpg',
      'https://www.christies.com/img/LotImages/2018/NYR/2018_NYR_15654_0007_000(lucas_cranach_i_portrait_of_john_frederick_i_elector_of_saxony_half-le).jpg',
      'https://www.spsg.de/fileadmin/user_upload/Bilder_Veranstaltungen_Header/Cranach_Eva_Detail.jpg',
      'https://lh6.ggpht.com/4BYaE-ItJdRZYSDI1CJVfjqoeMBPpeJyHhGcpBqnOo-Xs6G0KSKT_ZbBLX9N=s1200',
      'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-977-1016-Old-Masters-Lucas-Cranach-the-Elder-follower-of-MARTYRDOM-OF-SAINT-CATHER.jpg',
      'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-1132-1210-Old-Masters-and-19th-Century-Art-Lucas-Cranach-the-Elder-studio-of-Saint-Anne-in-a-Mountain-.jpg',
    ],
    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lucas_Cranach_d._%C3%84._-_David_and_Bathsheba_-_WGA05718.jpg',
        start: new Date('1472-10-04'),
        end: new Date(-15456196915200),
        focus: {
          x: 10,
          y: 335,
        },
        size: {
          x: 230,
          y: 433,
        },
      },
      {
        src: 'https://thomas-michel-contemporary-art.de/wp-content/uploads/2015/12/cranach-agnes-von-hayn-1543-1.jpg',
        start: new Date(-15456196915200),
        end: new Date(-15325785100800),
        focus: {
          x: 100,
          y: 75,
        },
        size: {
          x: 267.5,
          y: 300,
        },
      },
      {
        src: 'https://mobil.rundschau-online.de/image/26678446/4x3/620/465/a1f24253b27bac367b259947cee465f8/lZ/cranach-madonna.jpg',
        start: new Date(-15325785100800),
        end: new Date(-15195373286400),
        focus: {
          x: 155,
          y: 50,
        },
        size: {
          x: 310,
          y: 232,
        },
      },
      {
        src: 'https://www.dw.com/image/37343060_303.jpg',
        start: new Date(-15195373286400),
        end: new Date(-14673726028800),
        focus: {
          x: 150,
          y: 110,
        },
        size: {
          x: 350,
          y: 197,
        },
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/The_Procuress_by_Lucas_Cranach_the_Elder%2C_Tbilisi_Museum_of_Fine_Arts.jpg',
        start: new Date(-14673726028800),
        end: new Date(-14595478940160),
        focus: {
          x: 175,
          y: 100,
        },
        size: {
          x: 300,
          y: 456,
        },
      },
      {
        src: 'https://www.christies.com/img/LotImages/2018/NYR/2018_NYR_15654_0007_000(lucas_cranach_i_portrait_of_john_frederick_i_elector_of_saxony_half-le).jpg',
        start: new Date(-14595478940160),
        end: new Date(-14412902400000),
        focus: {
          x: 125,
          y: 75,
        },
        size: {
          x: 254,
          y: 400,
        },
      },
      {
        src: 'https://www.spsg.de/fileadmin/user_upload/Bilder_Veranstaltungen_Header/Cranach_Eva_Detail.jpg',
        start: new Date(-14412902400000),
        end: new Date(-14021666956800),
        focus: {
          x: 100,
          y: 50,
        },
        size: {
          x: 243.5,
          y: 84.5,
        },
      },
      {
        src: 'https://media.wsimag.com/attachments/f1c5ddf8834dbc7fcc2f7426d779b0973380da7f/store/fill/1090/613/1b2cc39b17d2de04ada5d303fec80fe0023e55b7a0e2346e1e60e658d44d/Lucas-Cranach-the-Elder-Law-and-Grace-1529-Narodni-galerie-v-Praze-slash-Nationalgalerie-Prag.jpg',
        start: new Date(-14021666956800),
        end: new Date(-13369607884800),
        focus: {
          x: 250,
          y: 225,
        },
        size: {
          x: 545,
          y: 307,
        },
      },
      {
        src: 'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-977-1016-Old-Masters-Lucas-Cranach-the-Elder-follower-of-MARTYRDOM-OF-SAINT-CATHER.jpg',
        start: new Date(-13369607884800),
        end: new Date(-13304401977600),
        focus: {
          x: 100,
          y: 25,
        },
        size: {
          x: 297,
          y: 375,
        },
      },
      {
        src: 'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-1132-1210-Old-Masters-and-19th-Century-Art-Lucas-Cranach-the-Elder-studio-of-Saint-Anne-in-a-Mountain-.jpg',
        start: new Date(-13304401977600),
        end: new Date('1553-10-16'),
        focus: {
          x: 140,
          y: 150,
        },
        size: {
          x: 296,
          y: 375,
        },
      },
    ],
    setProductionTimeout: null,
    categories: [
      {
        type: 'Gemälde',
        color: '#4274ad',
        data: [],
      },
      {
        type: 'Zeichnungen',
        color: '#b8504a',
        data: [],
      },
      {
        type: 'Drucke',
        color: '#488a3f',
        data: [],
      },
      {
        type: 'Archivalien',
        color: '#e2a14a',
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

            return [
              ...acc,
              {
                type: current.type,
                color: current.color,
                data: filteredData,
              },
            ];
          }, []);
        }

        return this.categories;
      },
    },
  },

  methods: {
    updateMinMax({ from, to }) {
      clearTimeout(this.minMaxTimeout);
      this.minMaxTimeout = setTimeout(() => {
        this.min = from;
        this.max = to;
      }, 500);
    },
    updateChartRange({ from, to }) {
      this.$refs.visualization.updateRange({ from, to });
      this.min = from;
      this.to = to;
    },
    getImages() {
      const newEvents = events.map((e, i) => {
        const imageEvent = { ...e };
        imageEvent.start = new Date(e.start);
        if (!e.end) imageEvent.end = new Date(events[i + 1].start);
        else imageEvent.end = new Date(e.end);
        const randomIndex = Math.floor(Math.random() * Math.floor(this.imageTest.length));
        imageEvent.src = this.imageTest[randomIndex];
        return imageEvent;
      });
      return newEvents;
    },
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
    addProductions(prods) {
      if (this.setProductionTimeout) clearTimeout(this.setProductionTimeout);

      this.setProductionTimeout = setTimeout(() => {
        const productions = prods.map(p => this.createProduction(p));
        const newCategories = this.categories.map((c) => {
          const cat = { ...c };
          cat.data = [];
          return cat;
        });

        let counter = 0;
        productions.forEach((production) => {
          const multi = 1;
          switch (production.type) {
            case 'painting': {
              production.type = this.categories[0].type;
              for (let i = 0; i < multi; i += 1) {
                const pro = { ...production, unique: counter };
                counter += 1;
                newCategories[0].data.push(pro);
              }

              break;
            }
            case 'drawing': {
              production.type = this.categories[1].type;
              for (let i = 0; i < multi; i += 1) {
                const pro = { ...production, unique: counter };
                counter += 1;
                newCategories[1].data.push(pro);
              }
              break;
            }
            case 'print': {
              production.type = this.categories[2].type;
              for (let i = 0; i < multi; i += 1) {
                const pro = { ...production, unique: counter };
                counter += 1;
                newCategories[2].data.push(pro);
              }
              break;
            }
            default: {
              production.type = this.categories[3].type;
              for (let i = 0; i < multi; i += 1) {
                const pro = { ...production, unique: counter };
                counter += 1;
                newCategories[3].data.push(pro);
              }
              break;
            }
          }
        });

        this.categories = newCategories;
      }, 1000);
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
    itemClicked(production) {
      this.$refs.gallery.scrollTo(production);
    },
  },

  mounted() {
    this.addProductions(works);
    // this.$store.dispatch('fetchProductions');
  },

};
</script>

<style lang="scss">

  .side-spacing {
    padding-left: 5vw;
    padding-right: 5vw;
  }

  .right-padding {
    padding-right: 83px;
  }
</style>
