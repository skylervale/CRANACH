<template>
  <v-row>
    <v-col>
      <v-row
        v-for="(category, index) in mutatedCategories"
        :key="`category-${index}`"
        class="mb-3"
      >
        <v-col cols="12" class="py-0"
               :style="`background-color: ${category.color}; border-radius: 5px;`">
          <v-row align="center">
            <v-col cols="6" class="pl-10 py-2">
              <v-row justify="start">
                <strong class="display-1" style="color: white">
                  {{ category.type }}
                </strong>
              </v-row>
            </v-col>
            <v-col cols="6" class="pr-10 py-2">
              <v-row justify="end" align="center">
                <v-chip color="transparent" class="mr-3" large text-color="white">
                  <span class="headline">{{ categories[index].data.length }}</span>
                </v-chip>
                <v-btn icon large @click="changeCategoryState(index)"
                       :style="`color: ${category.color}`" style="background-color: white">
                  <v-icon v-if="categoryStates[index]">fa-chevron-up</v-icon>
                  <v-icon v-else>fa-chevron-down</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-for="(item, itemIndex) in category.data"
          :key="`span-${index}-${itemIndex}`"
          cols="3"
          class="pa-2 mt-2"
        >
          <v-hover v-slot:default="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 10 : 0"
              :id="`production-${item.unique}`"
              class="pa-0"
              :style="`border: 3px solid ${category.color}`"
            >
              <v-img
                :src="item.imageUrl"
                height="250px"
                position="center top"
                class="pa-0"
                :style="`background-color: ${category.color}`"
              />

              <v-card-text class="pa-0">
                <v-list>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-list-item-title v-on="on">{{ item.title }}</v-list-item-title>
                        </template>
                        <span>{{ item.title }}</span>
                      </v-tooltip>
                      <v-list-item-subtitle>
                        <v-divider></v-divider>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-globe-europe
                            </v-icon>
                          </template>
                          <span>Aufbewahrungsort</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">{{ item.location }}</v-list-item-title>
                          </template>
                          <span>{{ item.location }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="pl-1">
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-hand-holding-usd
                            </v-icon>
                          </template>
                          <span>Auftraggeber</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">{{ item.customer }}</v-list-item-title>
                          </template>
                          <span>{{ item.customer }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item three-line >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-mortar-pestle
                            </v-icon>
                          </template>
                          <span>Medium</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">{{ item.medium }}</v-list-item-title>
                          </template>
                          <span>{{ item.medium }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="pl-1">
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-ruler-combined
                            </v-icon>
                          </template>
                          <span>Größe</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">{{ item.dimensions }}</v-list-item-title>
                          </template>
                          <span>{{ item.dimensions }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-calendar-alt
                            </v-icon>
                          </template>
                          <span>Entstehungszeit</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">
                              {{ item.date || 'k.A.' }}
                            </v-list-item-title>
                          </template>
                          <span>{{ item.date || 'k.A.' }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="pl-1">
                      <v-list-item-title>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              :color="category.color"
                              alt="Künstler"
                              v-on="on"
                            >
                              fa-fingerprint
                            </v-icon>
                          </template>
                          <span>Künstler</span>
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-list-item-title v-on="on">{{ item.artist }}</v-list-item-title>
                          </template>
                          <span>{{ item.artist }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-hover>

          <v-row justify="center"  class="pa-3">
            <v-btn
              dark
              :color="category.color"
              :href="item.link" target="_blank"
            >
              Weiterlesen...
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

export default {
  name: 'Gallery',
  data: () => ({
    categoryStates: [false, false, false, false],
    timeout: null,
    scrollOptions: {
      container: 'body',
      easing: 'ease-in',
      offset: -50,
      force: true,
      cancelable: true,
      x: false,
      y: true,
    },
  }),
  props: {
    categories: {
      /*
        [
          {
            type: "KategorieName",
            color,
            data: [
              {
                imageUrl,
                startDate,
                endDate,
                title,
                location,
                customer,
                artist,
                medium,
                dimensions,
                date,
                link,
                type,
              }
            ],
          }
        ]
      */
      type: Array,
      required: true,
    },
  },
  computed: {
    mutatedCategories: {
      get() {
        return this.categories.map((c, i) => {
          const newCat = { ...c };
          if (!this.categoryStates[i]) newCat.data = newCat.data.slice(0, 4);
          return newCat;
        });
      },
    },
  },
  methods: {
    filter(date) {
      return data => new Date(data.startDate).getTime() < date.getTime();
    },
    changeCategoryState(i) {
      this.$set(this.categoryStates, i, !this.categoryStates[i]);
    },
    async scrollTo(production) {
      const categoryIndex = this.categories.reduce((acc, c, i) => {
        if (c.type === production.type) return i;
        return acc;
      }, 0);

      this.$set(this.categoryStates, categoryIndex, true);

      await this.$nextTick();

      VueScrollTo.scrollTo(`#production-${production.unique}`, 1500, this.scrollOptions);
    },
  },
  watch: {
    categories: function watch(val) {
      this.$set(this.categoryStates, val.map(() => false));
    },
  },
};
</script>

<style lang="scss">

</style>
