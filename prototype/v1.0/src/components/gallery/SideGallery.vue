<template>
  <v-row class="ma-0">
    <v-col class="pa-0">
      <v-row
        v-for="(category, index) in categories"
        :key="`gallery-${index}`"
        class="side-gallery ma-0"
        :style="`
          height: 100%;
          width: calc(100% - ${galleryWidth}px);
          background-color: rgb(250, 250, 250);
          right: ${galleryVisible(index) ? `${galleryWidth}px` : '-100%'};
        `"
      >
        <v-col
          :id="`scrollColumn-${index}`"
          class="pa-0 overflow-y-auto"
          :style="`
            height: 100%;
            width: 100%;
            background-color: #424242;
          `"
          dark
        >
          <v-row
            align="center"
            class="ma-0"
            :style="`
              height: 73px;
              background-color: ${category.color};
              border-bottom: 1px solid rgb(250, 250, 250);
              border-left: 1px solid rgb(250, 250, 250);
              position: sticky;
              top: 0;
              z-index: 1;
            `"
          >
            <v-col class="pl-10 py-2">
              <v-row justify="start">
                <strong class="display-1" style="color: white">
                  {{ category.type }}
                </strong>
              </v-row>
            </v-col>

            <v-col class="pr-10 py-2">
              <v-row justify="end">
                <v-icon
                  dark
                  large
                  @click="activateCategory(index)"
                >
                  fa-times
                </v-icon>
              </v-row>
            </v-col>
          </v-row>

          <v-row
            class="ma-0"
            :style="`
              min-height: 100%;
              border-bottom: 4px solid ${category.color};
              border-left: 1px solid rgb(250, 250, 250);
            `"
          >
            <v-col
              v-for="(item, itemIndex) in category.data"
              :key="`span-${index}-${itemIndex}`"
              cols="3"
              sm="5"
              md="4"
              lg="3"
              xl="2"
              class="pa-3 mt-2"
            >
              <v-lazy
                v-model="loaded[index]"
                :id="`production-${item.unique}`"
                :options="{
                  threshold: 0.5,
                }"
                min-height="200"
                transition="fade-transition"
              >
                <v-hover v-slot:default="{ hover }" open-delay="100">
                  <v-card
                    :style="getCardBorder(`production-${item.unique}`, category)"
                    :elevation="hover ? 20 : 5"
                    class="pa-0"
                    @click="activeProduction = `production-${item.unique}`"
                  >
                    <v-img
                      :src="item.imageUrl"
                      height="250px"
                      position="center top"
                      class="pa-0"
                      :style="`background-color: ${category.color}`"
                    />

                    <v-card-text class="pa-0">
                      <v-list dense>
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-list-item-title v-on="on">
                                  {{ item.title }}
                                </v-list-item-title>
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
                                    :color="getCardIconColor(index)"
                                    alt="Aufbewahrungsort"
                                    v-on="on"
                                    medium
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
                                  <v-list-item-title v-on="on">
                                    {{ item.location }}
                                  </v-list-item-title>
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
                                    :color="getCardIconColor(index)"
                                    alt="Auftraggeber"
                                    v-on="on"
                                    medium
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
                                  <v-list-item-title v-on="on">
                                    {{ item.customer }}
                                  </v-list-item-title>
                                </template>
                                <span>{{ item.customer }}</span>
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
                                    :color="getCardIconColor(index)"
                                    alt="Medium"
                                    v-on="on"
                                    medium
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
                                  <v-list-item-title v-on="on">
                                    {{ item.medium }}
                                  </v-list-item-title>
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
                                    :color="getCardIconColor(index)"
                                    alt="Größe"
                                    v-on="on"
                                    medium
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
                                  <v-list-item-title v-on="on">
                                    {{ item.dimensions }}
                                  </v-list-item-title>
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
                                    :color="getCardIconColor(index)"
                                    alt="Entstehungszeit"
                                    v-on="on"
                                    medium
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
                                    :color="getCardIconColor(index)"
                                    alt="Künstler"
                                    v-on="on"
                                    medium
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
                                  <v-list-item-title v-on="on">
                                    {{ item.artist }}
                                  </v-list-item-title>
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
              </v-lazy>

              <v-row justify="center"  class="pa-3">
                <v-btn
                  dark
                  :color="category.color"
                  :href="item.link"
                  target="_blank"
                >
                  Weiterlesen...
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-dialog
        v-model="info"
        width="70%"
        dark
      >
        <v-card>
          <v-card-title
            class="headline"
            primary-title
          >
            Information:
          </v-card-title>

          <v-card-text>
            <v-row><span class="py-5"><b>{{infoSub}}</b></span></v-row>
            <v-row v-for="(tip, index) in tips" :key="`tip-${index}`">
              <v-col>
                <v-row>
                  <span><b>{{tip.title}}</b></span>
                </v-row>

                <v-row>
                  <span>{{tip.text}}</span>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="info = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row
        class="ma-0 side-options"
        :style="`
            height: 100%;
            width: 300px;
            right: ${showSearch ? `${galleryWidth}px` : `-${300 - galleryWidth}px`};
            border-left: 1px solid rgb(250, 250, 250);
          `"
        >
        <v-col
          class="pa-0"
        >
          <v-list
            dark
            class="pa-0"
            height="100%"
            style="right: 0px"
          >
            <v-row
              align="center"
              class="ma-0"
              :style="`
                height: 73px;
                background-color: #333333;
                border-bottom: 1px solid rgb(250, 250, 250);
                position: sticky;
                top: 0;
                z-index: 1;
              `"
            >
              <v-col class="pl-10 py-2">
                <v-row justify="start">
                  <strong class="display-1" style="color: white">
                    Suche
                  </strong>
                </v-row>
              </v-col>
            </v-row>

            <v-subheader>Volltext:</v-subheader>

            <v-list-item>
              <v-text-field
                class="mr-2"
                hide-details
                clearable
                dense
                dark
                ref="textSearch"
                @click:clear="removeSearch('textSearchText')"
                @keydown="searchKey"
                v-model="textSearchText"
              ></v-text-field>

              <v-icon
                dark
                medium
              >
                fa-align-left
              </v-icon>
            </v-list-item>

            <v-subheader>Titel:</v-subheader>

            <v-list-item>
              <v-text-field
                class="mr-2"
                hide-details
                clearable
                dense
                dark
                ref="titleSearch"
                @click:clear="removeSearch('titleSearchText')"
                v-model="titleSearchText"
              ></v-text-field>

              <v-icon
                dark
                medium
              >
                fa-heading
              </v-icon>
            </v-list-item>

            <v-subheader>Standort:</v-subheader>

            <v-list-item>
              <v-text-field
                class="mr-2"
                hide-details
                clearable
                dense
                dark
                ref="locationSearch"
                @click:clear="removeSearch('locationSearchText ')"
                v-model="locationSearchText"
              ></v-text-field>

              <v-icon
                dark
                medium
              >
                fa-map-marker-alt
              </v-icon>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row
        class="ma-0 side-options"
        :style="`
          height: 100%;
          width: 300px;
          right: ${showFilter ? `${galleryWidth}px` : `-${300 - galleryWidth}px`};
          border-left: 1px solid rgb(250, 250, 250);
        `"
      >
        <v-col
          class="pa-0"
        >

          <v-list
            dark
            class="pa-0"
            height="100%"
            style="right: 0px"
          >
            <v-row
              align="center"
              class="ma-0"
              :style="`
                height: 73px;
                background-color: #333333;
                border-bottom: 1px solid rgb(250, 250, 250);
                position: sticky;
                top: 0;
                z-index: 1;
              `"
            >
              <v-col class="pl-10 py-2">
                <v-row justify="start">
                  <strong class="display-1" style="color: white">
                    Filter
                  </strong>
                </v-row>
              </v-col>
            </v-row>

            <v-subheader>Zeitspanne:</v-subheader>

            <v-list-item>
              <v-text-field
                hide-details
                dense
                dark
                ref="from"
                label="Von:"
                class="mr-2"
                type="number"
                v-model="textFieldValueMin"
                :rules="[fromRule]"
              ></v-text-field>

              <v-text-field
                hide-details
                dense
                dark
                ref="to"
                label="Bis:"
                class="ml-2"
                type="number"
                v-model="textFieldValueMax"
                :rules="[toRule]"
              ></v-text-field>
            </v-list-item>

            <v-subheader>Kategorien:</v-subheader>

            <v-list-item
              v-for="(category, index) in categories"
              :key="`category-slider-${index}`"
            >
              <v-list-item-action>
                <v-switch
                  v-model="switches[index]"
                  :color="category.color"
                  :key="`switch-${index}`"
                  @change="changedSwitch"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{category.type}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-navigation-drawer
          v-model="drawer"
          :expand-on-hover="false"
          mini-variant
          right
          absolute
          permanent
          stateless
          :mini-variant-width="galleryWidth"
          style="z-index: 500"
          height="100%"
          class="side-navigation"
          dark
        >
          <v-list class="pa-0" dense flat dark>
            <v-list-item
              :class="`filter item ${showSearch ? 'active' : ''}`"
              style="height: 73px;"
              @click="toggleSearch"
            >
              <v-list-item-content class="l-content">
                <v-badge
                  color="red"
                  overlap
                  bordered
                  :value="searchBadgeNumber"
                >
                  <template v-slot:badge>
                    <span>{{ searchBadgeNumber }}</span>
                  </template>

                  <v-icon
                    medium
                    :style="`color: white; backround-color: white;`"
                  >
                    fa-search
                  </v-icon>
                </v-badge>

                <v-list-item-title color="white">
                  Suche
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :class="`filter item ${showFilter ? 'active' : ''}`"
              style="height: 73px;"
              @click="toggleFilter"
            >
              <v-list-item-content class="l-content">
                <v-badge
                  color="red"
                  overlap
                  bordered
                  :value="filterBadgeNumber"
                >
                  <template v-slot:badge>
                    <span>{{ filterBadgeNumber }}</span>
                  </template>

                  <v-icon
                    medium
                    :style="`color: white; backround-color: white;`"
                  >
                    fa-filter
                  </v-icon>
                </v-badge>

                <v-list-item-title color="white">
                  Filter
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :class="`filter item`"
              style="height: 73px;"
              @click="reset"
            >
              <v-list-item-content>
                <v-icon
                  medium
                  :style="`color: white; backround-color: white;`"
                >
                  fa-undo-alt
                </v-icon>

                <v-list-item-title color="white">
                  Reset
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(category, index) in categories"
              :key="`side-category-${index}`"
              :class="`${getItemClass(index)} item`"
              style="height: 73px;"
              @click="activateCategory(index)"
            >
              <v-list-item-content>
                <v-icon
                  medium
                  v-if="activeCategory === index"
                  :style="`color: white; backround-color: ${category.color};`"
                >
                  fa-caret-square-right
                </v-icon>

                <v-icon
                  medium
                  v-else
                  :style="`color: white; backround-color: ${category.color};`"
                >
                  fa-caret-square-left
                </v-icon>

                <v-list-item-title color="white">
                  {{ category.data.length }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :class="`filter item`"
              style="height: 73px;"
              @click="info = !info"
            >
              <v-list-item-content>
                <v-icon
                  medium
                  :style="`color: white; backround-color: white;`"
                >
                  fa-info
                </v-icon>

                <v-list-item-title color="white">
                  Info
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

export default {
  name: 'SideGallery',
  data: () => ({
    activeProduction: null,
    searchTimeout: null,
    updatedOutside: false,
    switches: [true, true, true, true],
    textSearchText: '',
    titleSearchText: '',
    locationSearchText: '',
    showFilter: false,
    showSearch: false,
    info: false,
    galleryWidth: 75,
    drawer: true,
    loaded: [false, false, false, false],
    activeCategory: null,
    timeout: null,
    infoSub: `
      Hier ein paar Hinweise, damit du so schnell wie möglich an die Informationen deiner Begierde gelangst:
    `,
    tips: [
      {
        title: 'Überblick',
        text: `Der obere Abschnitt dieser Webseite beschreibt einen Zeitstrahl. 
          Hier befinden sich alle entstandenen Werke im Zeitraum von 1472 bis 1608, 
          sowie die wichtigsten Ereignisse aus Cranachs Leben. Nutze diesen für einen ersten Überblick. 
          Die Gallerie im unteren Abschnitt bietet weitere Informationen zu den einzelnen Werken und ist 
          nach der Art dieser Werke kategorisiert. Um deine Suche zu vereinfachen bieten wir dir einige 
          Navigations- und Filtermöglichkeiten.`,
      },
      {
        title: 'Navigation',
        text: `Der Zeitstrahl kann mithilfe der daneben gelegenen Elemente navigiert werden. 
          Hierzu zählen die Angabe einer gewünschten Zeitspanne, das horizontale Scrollen mittels 
          dafür vorgesehener Buttons und das Vergrößern des Sichtfeldes, um die Ansicht der Werke zu optimieren. 
          Zusätzlich kann über eine Ziehbewegung der Maus mit gedrückter linker Taste ein Bereich des 
          Zeitstrahls gezielt ausgewählt werden.`,
      },
      {
        title: 'Filter',
        text: `Werke sind über Suchbegriffe eingrenzbar. Zusätzlich können die einzelnen Kategorien dynamisch 
          entfernt, aber auch wieder hinzugefügt werden. Dies kann über den Filter-Button oder die Legende geschehen.`,
      },
      {
        title: 'Weitere Informationen',
        text: `Benötigst du tiefgreifenderes Wissen bezüglich eines Kunstwerks, 
          so gelangst du über einen Klick auf den Datenpunkt zu der entsprechenden Gallerie-Karte. Hier wird dir zudem 
          eine Weiterleitung zu unseren Partnern angeboten, welche weitere spannende Informationen für dich bereit halten.`,
      },
    ],
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
    absoluteMin: {
      type: Date,
      default: () => new Date('1472-10-04'),
    },
    absoluteMax: {
      type: Date,
      default: () => new Date('1608-12-31'),
    },
    min: {
      type: Date,
      default: () => new Date('1472-10-04'),
    },
    max: {
      type: Date,
      default: () => new Date('1608-12-31'),
    },
  },
  computed: {
    searchBadgeNumber: {
      get() {
        let count = 0;
        if (this.textSearchText) count += 1;
        if (this.titleSearchText) count += 1;
        if (this.locationSearchText) count += 1;
        return count;
      },
    },
    filterBadgeNumber: {
      get() {
        let count = 0;
        if (this.min.getFullYear() !== this.absoluteMin.getFullYear()
          || this.max.getFullYear() !== this.absoluteMax.getFullYear()) count += 1;

        this.switches.forEach((val) => {
          if (!val) count += 1;
        });

        return count;
      },
    },
    textFieldValueMin: {
      get() {
        return this.min.getFullYear();
      },
      set(value) {
        const date = new Date(value);
        if (this.fromRule(value) === true) {
          this.$emit('rangeChanged', { from: date, to: this.max });
        }
      },
    },
    textFieldValueMax: {
      get() {
        return this.max.getFullYear();
      },
      set(value) {
        const date = new Date(value);
        if (this.toRule(value) === true) {
          this.$emit('rangeChanged', { from: this.min, to: date });
        }
      },
    },
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.showFilter = false;
      }
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
      if (this.showFilter && this.showSearch) {
        this.showSearch = false;
      }
    },
    fromRule(val) {
      return (val >= this.absoluteMin.getFullYear()
        && val <= this.absoluteMax.getFullYear()
        && val < this.max.getFullYear()) || 'Invalides Jahr.';
    },
    toRule(val) {
      return (val >= this.absoluteMin.getFullYear()
        && val <= this.absoluteMax.getFullYear()
        && val > this.min.getFullYear()) || 'Invalides Jahr.';
    },
    setSwitches(arr) {
      this.updatedOutside = true;
      arr.forEach((v, i) => {
        this.$set(this.switches, i, v);
      });
    },
    reset() {
      this.$emit('reset');
      this.removeSearch('textSearchText');
      this.removeSearch('titleSearchText');
      this.removeSearch('locationSearchText');
    },
    getCardIconColor(index) {
      if (index >= 0) return this.categories[index].color;
      return '#424242';
    },
    getItemClass(index) {
      if (this.categories[index].type === 'Gemälde') return 'painting-item';
      if (this.categories[index].type === 'Zeichnungen') return 'drawing-item';
      if (this.categories[index].type === 'Drucke') return 'print-item';
      return 'archive-item';
    },
    getScrollOptions() {
      return {
        container: `#scrollColumn-${this.activeCategory}`,
        easing: 'ease-in',
        offset: -85,
        force: true,
        cancelable: true,
        x: false,
        y: true,
      };
    },
    activateCategory(index) {
      if (this.activeCategory === index) this.activeCategory = null;
      else this.activeCategory = index;
      this.activeProduction = null;
    },
    galleryVisible(index) {
      return typeof this.activeCategory === 'number' && this.activeCategory === index;
    },
    async scrollTo(production) {
      let wait = false;
      const categoryIndex = this.categories.reduce((acc, c, i) => {
        if (c.type === production.type) return i;
        return acc;
      }, 0);

      if (!this.loaded[categoryIndex]) wait = true;

      this.activeCategory = categoryIndex;

      await this.$nextTick();

      setTimeout(() => {
        this.activeProduction = `production-${production.unique}`;
        VueScrollTo.scrollTo(`#production-${production.unique}`, 1, this.getScrollOptions());
      }, wait ? 200 : 0);
    },
    addSearch() {
      this.$emit('searchChanged', this.textSearchText);
    },
    removeSearch(searchKeyName) {
      this[searchKeyName] = '';
      this.addSearch();
    },
    searchKey() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.addSearch();
      }, 500);
    },
    changedSwitch() {
      this.$emit('categoriesChanged', this.switches);
    },
    getCardBorder(id, category) {
      return (this.activeProduction === id)
        ? `border: 3px solid ${category.color}`
        : 'border: 3px solid rgb(250, 250, 250)';
    },
  },
  watch: {},
};
</script>

<style lang="scss">
  .button-row {
    right: 0px;
    position: absolute;
    top: 25%;
    transform: translate(0, -50%);
    width: 20px;
    z-index: 150;
  }

  .side-gallery {
    position: absolute;
    transition: all 0.5s linear;
    z-index: 200;
    top: 0;
  }

  .side-options {
    position: absolute;
    transition: all 0.2s linear;
    z-index: 400;
    top: 0;
  }

  .v-navigation-drawer__border {
    background-color: rgb(250, 250, 250) !important;
    width: 2px !important;
  }

  .rounded {
    border-radius: 5px;
  }

  .painting-item {
    background: #4274ad;
  }

  .drawing-item {
    background: #b8504a;
  }

  .print-item {
    background: #488a3f;
  }

  .archive-item {
    background: #e2a14a;
  }

  .item {
    border-bottom: 1px solid rgb(250,250,250);
    align-items: center !important;
    text-align: center !important;
  }

  .filter {
    background: #333333;

    &.active {
      background: #555555;
    }

    &:active {
      background: #555555;
    }
  }

  .front {
    z-index: 1000;
  }

  .v-chip__content {
    font-size: 12px;
  }

  .l-content {
    overflow: visible !important;
  }
</style>
