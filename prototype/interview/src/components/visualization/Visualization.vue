<template>
  <v-row>
    <v-col class="pa-0">
      <v-row
        ref="navigation"
        :class="`side-spacing nav py-2 ma-0 elevation-${ (navSpacerActive) ? 5 : 0 }`"
        :style="`${ (navSpacerActive) ? 'top: 0; position: fixed;' : '' }`"
      >
        <v-col cols="3" class="pa-0" ref="search">
          <v-row justify="start">
            <v-text-field
              hide-details
              clearable
              @click:clear="removeSearch"
              @keydown="searchKeyTest"
              v-model="searchText"
            ></v-text-field>

            <v-btn icon x-large @click="addSearch">
              <v-icon>fa-search</v-icon>
            </v-btn>
          </v-row>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="6" class="pa-0" ref="filter">
          <v-row justify="start">
            <v-col cols="2" class="pa-0">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    x-large
                    v-on="on"
                  >
                    <v-icon>fa-filter</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item
                      v-for="(category, index) in categories"
                      :key="`category-slider-${index}`"
                    >
                      <v-list-item-action>
                        <v-switch
                          v-model="switches[index]"
                          :color="category.color">
                        </v-switch>
                      </v-list-item-action>
                      <v-list-item-title>{{category.type}}</v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menu = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-col>

            <v-col cols="2" class="pa-0 pr-1">
              <v-text-field
                hide-details
                outlined
                ref="left"
                label="Von:"
                v-model="textFieldValueMin"
              ></v-text-field>
            </v-col>

            <v-col cols="2" class="pa-0 pl-1">
              <v-text-field
                hide-details
                outlined
                ref="right"
                label="Bis:"
                v-model="textFieldValueMax"
              ></v-text-field>
            </v-col>

            <v-col cols="5" class="pa-0">
              <v-row justify="center" align="center">
                <v-btn icon x-large @click="zoomIn">
                  <v-icon>fa-search-plus</v-icon>
                </v-btn>

                <v-btn
                  icon
                  x-large
                  @click="resetZoom"
                  :disabled="resetZoomDisabled"
                  class="ml-5 mr-4"
                >
                  <v-icon>fa-undo-alt</v-icon>
                </v-btn>

                <v-btn
                  icon
                  x-large
                  @click="zoomOut"
                  :disabled="resetZoomDisabled"
                >
                  <v-icon>fa-search-minus</v-icon>
                </v-btn>
              </v-row>
            </v-col>

          </v-row>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="1" class="pa-0">
          <v-row justify="end">
            <v-dialog
              v-model="info"
              width="1000"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  x-large
                  v-on="on"
                >
                  <v-icon>fa-info</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
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
          </v-row>
        </v-col>
      </v-row>

      <v-row
        ref="nav_spacer"
        :style="navSpacerStyle"
      >
      </v-row>

      <v-row ref="graph" align="center">
        <v-col cols="1" class="pa-0">
          <v-row justify="center">
            <v-btn icon x-large @click="scrollLeft" :disabled="scrollLeftDisabled">
              <v-icon>fa-angle-left</v-icon>
            </v-btn>
          </v-row>
        </v-col>

        <v-col cols="10" class="pa-0">
          <highcharts :options="chartOptions" ref="chart" style="cursor: crosshair"></highcharts>
        </v-col>

        <v-col cols="1" class="pa-0">
          <v-row justify="center">
            <v-btn icon x-large @click="scrollRight" :disabled="scrollRightDisabled">
              <v-icon>fa-angle-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { Chart } from 'highcharts-vue';
import yearUtils from '@/utils/year.utils';
import eventUtils from '@/utils/event.utils';

export default {
  name: 'Visualization',

  components: {
    highcharts: Chart,
  },

  data: () => ({
    navSpacerActive: false,
    zoomTimeout: null,
    searchFilter: () => true,
    searchText: '',
    menu: false,
    info: false,
    switches: [true, true, true, true],
    filteredCategories: [],
    min: new Date('1472-01-01'),
    max: new Date('1553-01-01'),
    infoSub: `
      Hier ein paar Hinweise, damit du so schnell wie möglich an die Informationen deiner Begierde gelangst:
    `,
    tips: [
      {
        title: 'Überblick',
        text: `Der obere Abschnitt dieser Webseite beschreibt einen Zeitstrahl. 
          Hier befinden sich alle entstandenen Werke im Zeitraum von 1472 bis 1553, 
          sowie die wichtigsten Ereignisse aus Cranachs Leben. Nutze diesen für einen ersten Überblick. 
          Die Gallerie im unteren Abschnitt bietet weitere Informationen zu den einzelnen Werken und ist 
          nach der Art dieser Werke kategorisiert. Um deine Suche zu vereinfachen bieten wir dir einige 
          Navigations- und Filtermöglichkeiten.`,
      },
      {
        title: 'Navigation',
        text: `Der Zeitstrahl kann mithilfe der darüber und daneben gelegenen Elemente navigiert werden. 
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
      type: Array,
      required: true,
    },
  },

  computed: {
    navSpacerStyle: {
      get() {
        const height = (this.$refs.navigation) ? this.$refs.navigation.clientHeight : 0;

        return (this.navSpacerActive)
          ? `visibility: visible; height: ${height}px`
          : 'visibility: hidden';
      },
    },
    scrollLeftDisabled: {
      get() {
        return this.min.getTime() <= new Date('1472-01-01').getTime();
      },
    },
    scrollRightDisabled: {
      get() {
        return this.max.getTime() >= new Date('1553-01-01').getTime();
      },
    },
    resetZoomDisabled: {
      get() {
        return this.scrollLeftDisabled && this.scrollRightDisabled;
      },
    },
    textFieldValueMin: {
      get() {
        return this.min.getFullYear();
      },
      set(value) {
        const date = new Date(value);
        const dateTime = date.getTime();
        const xMin = new Date('1471-01-01').getTime();
        const xMax = new Date(this.max).getTime();
        if (dateTime >= xMin && dateTime <= xMax) this.setZoom(date, this.max);
      },
    },
    textFieldValueMax: {
      get() {
        return this.max.getFullYear();
      },
      set(value) {
        const date = new Date(value);
        const dateTime = date.getTime();
        const xMin = new Date(this.min).getTime();
        const xMax = new Date('1554-01-01').getTime();
        if (dateTime >= xMin && dateTime <= xMax) this.setZoom(this.min, date);
      },
    },
    series: {
      get() {
        const newSeries = this.categories.map(category => ({
          color: category.color,
          name: category.type,
          type: 'scatter',
          data: this.createAllSeriesItemsFrom(category),
        }));

        newSeries.push(this.getEvents());

        yearUtils.resetYearAmount();

        return newSeries;
      },
    },
    chartOptions: {
      get() {
        return {
          chart: {
            height: '50%',
            zoomType: 'x',
            backgroundColor: 'rgb(250,250,250)',
            resetZoomButton: {
              theme: {
                display: 'none',
              },
            },
          },
          title: {
            text: '',
          },
          yAxis: {
            visible: false,
          },
          xAxis: {
            type: 'datetime',
            events: {
              afterSetExtremes: event => this.setRange(event),
            },
          },
          tooltip: {
            useHTML: true,
            headerFormat: '<span class="title d-block">{series.name}</span><table>',
            pointFormat: `
              <tr>
                <td><img src="{point.image}" alt="Bild: {point.title}" height=125 width=125 /></td>
                <td class="spacing-left">
                  <span class="body-1 py-1 d-block"><b>{point.title}</b></span>
                  <span class="body-1 py-1 d-block">
                    <i aria-hidden="true" class="v-icon notranslate fa fa-mortar-pestle theme--light" style="color: {series.color}; caret-color: {series.color};">
                    </i> {point.medium}
                  </span>
                  <span class="body-1 py-1 d-block">
                    <i aria-hidden="true" class="v-icon notranslate fa fa-globe-europe theme--light" style="color: {series.color}; caret-color: {series.color};">
                    </i> {point.location}
                  </span>
                  <span class="body-1 py-1 d-block">
                    <i aria-hidden="true" class="v-icon notranslate fa fa-hand-holding-usd theme--light" style="color: {series.color}; caret-color: {series.color};">
                    </i> {point.customer}
                  </span>
                </td>
              </tr>`,
            footerFormat: '</table>',
          },
          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                states: {
                  hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)',
                  },
                },
                symbol: 'square',
                stacking: 'normal',
              },
              states: {
                hover: {
                  marker: {
                    enabled: false,
                  },
                },
              },
              events: {
                click: (event) => {
                  this.$emit('itemClicked', event.point);
                },
              },
            },
            series: {
              turboThreshold: 0,
              events: {
                legendItemClick: (event) => {
                  this.changeSwitchFor(event.target.name);
                },
              },
              stickyTracking: false,
              cursor: 'pointer',
            },
          },
          series: this.series,
        };
      },
    },
  },

  methods: {
    getEvents() {
      const currentMax = yearUtils.getHighestValue(this.min, this.max);
      const y = currentMax * 1.05;
      const events = eventUtils.getEvents();

      return {
        type: 'line',
        color: 'rgba(0,0,0,1)',
        name: 'Cranach der Ältere',
        tooltip: {
          headerFormat: '<span class="body-1"><b>{series.name}</b> {point.key:%d.%m.%Y}</span><br/>',
          pointFormat: '<span class="body-2">{point.title}</span>',
        },
        marker: {
          enabled: true,
          radius: 5,
        },
        data: events.map(e => ({
          x: new Date(e.x),
          title: e.title,
          y,
        })),
      };
    },
    addCategorieFilter(name) {
      const index = this.filteredCategories.indexOf(name);

      if (index <= -1) {
        this.filteredCategories.push(name);
        this.notifyCategorieFilter();
      }
    },
    removeCategorieFilter(name) {
      const index = this.filteredCategories.indexOf(name);

      if (index > -1) {
        this.filteredCategories.splice(index, 1);
        this.notifyCategorieFilter();
      }
    },
    notifyCategorieFilter() {
      if (this.filteredCategories.length > 0) {
        this.$emit('addFilter', this.filterCategory(this.filteredCategories));
      } else {
        this.$emit('removeFilter', this.filterCategory(this.filteredCategories));
      }
    },
    createAllSeriesItemsFrom(category) {
      if (this.filteredCategories.includes(category.type)) return [];

      const seriesItems = category.data.reduce((acc, current) => {
        const items = this.createItemsFrom(current, category.type);
        return [...acc, ...items];
      }, []);

      return seriesItems.sort((a, b) => a.x.getTime() - b.x.getTime());
    },
    createItemsFrom(data, type) {
      if (!this.searchFilter(data)) return [];

      const range = data.endDate - data.startDate + 1;

      return Array(range).fill(0).map((_, i) => {
        const year = data.startDate + i;

        yearUtils.increaseYearAmountFor(year);

        return {
          x: new Date(`${year}-01-01`),
          y: yearUtils.getYearAmountFor(year),
          image: data.imageUrl,
          title: data.title,
          location: data.location,
          customer: data.customer,
          medium: data.medium,
          dimensions: data.dimensions,
          date: data.date,
          start: data.startDate,
          end: data.endDate,
          artist: data.artist,
          unique: data.unique,
          type,
        };
      });
    },
    setRange(event) {
      const newStart = new Date(event.min);
      const newEnd = new Date(event.max);

      if (this.min !== newStart && this.max !== newEnd) {
        this.min = newStart;
        this.max = newEnd;

        if (this.zoomTimeout) clearTimeout(this.zoomTimeout);

        this.zoomTimeout = setTimeout(() => {
          this.$emit('addFilter', this.filterDateRange(newStart, newEnd), true);
        }, 1000);
      }
    },
    scrollLeft() {
      let step = 10;
      const spaceRight = this.min.getFullYear() - 1471;
      if (spaceRight < step) step = spaceRight;

      if (step !== 0) {
        const minYear = this.min.getFullYear();
        const minMonth = this.min.getMonth();
        const minDay = this.min.getDate();
        const newMin = new Date(minYear - step, minMonth, minDay);

        const maxYear = this.max.getFullYear();
        const maxMonth = this.max.getMonth();
        const maxDay = this.max.getDate();
        const newMax = new Date(maxYear - step, maxMonth, maxDay);

        this.setZoom(newMin, newMax);
      }
    },
    scrollRight() {
      let step = 10;
      const spaceRight = 1554 - this.max.getFullYear();
      if (spaceRight < step) step = spaceRight;

      if (step !== 0) {
        const minYear = this.min.getFullYear();
        const minMonth = this.min.getMonth();
        const minDay = this.min.getDate();
        const newMin = new Date(minYear + step, minMonth, minDay);

        const maxYear = this.max.getFullYear();
        const maxMonth = this.max.getMonth();
        const maxDay = this.max.getDate();
        const newMax = new Date(maxYear + step, maxMonth, maxDay);

        this.setZoom(newMin, newMax);
      }
    },
    zoomIn() {
      const minYear = this.min.getFullYear();
      const minMonth = this.min.getMonth();
      const minDay = this.min.getDate();
      const newMin = new Date(minYear + 5, minMonth, minDay);

      const maxYear = this.max.getFullYear();
      const maxMonth = this.max.getMonth();
      const maxDay = this.max.getDate();
      const newMax = new Date(maxYear - 5, maxMonth, maxDay);

      if (newMin.getTime() < newMax.getTime()) {
        this.setZoom(newMin, newMax);
      }
    },
    zoomOut() {
      const minYear = this.min.getFullYear();
      const minMonth = this.min.getMonth();
      const minDay = this.min.getDate();
      const newMin = new Date(minYear - 5, minMonth, minDay);

      const maxYear = this.max.getFullYear();
      const maxMonth = this.max.getMonth();
      const maxDay = this.max.getDate();
      const newMax = new Date(maxYear + 5, maxMonth, maxDay);

      if (newMin.getTime() >= new Date('1471-01-01').getTime()
        && newMax.getTime() <= new Date('1554-01-01').getTime()) {
        this.setZoom(newMin, newMax);
      } else {
        this.setZoom(new Date('1471-01-01'), new Date('1554-01-01'));
      }
    },
    setZoom(min, max) {
      this.$refs.chart.chart.xAxis[0]
        .setExtremes(min.getTime(), max.getTime());
      this.$refs.chart.chart.redraw();
    },
    resetZoom() {
      this.$refs.chart.chart.zoomOut();
    },
    changeSwitchFor(categoryName) {
      this.categories.forEach((el, i) => {
        if (el.type === categoryName) {
          this.$set(this.switches, i, !this.switches[i]);
        }
      });
    },
    searchKeyTest(e) {
      if (e.key === 'Enter') this.addSearch();
    },
    addSearch() {
      if (!this.searchText) this.removeSearch();
      else {
        this.searchFilter = this.searchFor(this.searchText);
        this.$emit('addFilter', this.searchFor(this.searchText), true);
      }
    },
    removeSearch() {
      this.searchFilter = () => true;
      this.$emit('removeFilter', this.searchFor(''));
    },
    filterDateRange(from, to) {
      return function dateRange(data) {
        const fromDateTime = new Date(from).getFullYear() + 1;
        const toDateTime = new Date(to).getFullYear();

        const productStart = data.startDate;
        const productEnd = data.endDate;

        return (productStart >= fromDateTime && productStart <= toDateTime)
          || (productEnd >= fromDateTime && productEnd <= toDateTime)
          || (productStart <= fromDateTime && productEnd >= toDateTime);
      };
    },
    filterCategory(names) {
      return function dateRange(data) {
        return !names.includes(data.type);
      };
    },
    searchFor(keyword) {
      return function search(data) {
        return data.title.toLowerCase().includes(keyword.toLowerCase())
          || data.location.toLowerCase().includes(keyword.toLowerCase())
          || data.customer.toLowerCase().includes(keyword.toLowerCase())
          || data.artist.toLowerCase().includes(keyword.toLowerCase())
          || data.medium.toLowerCase().includes(keyword.toLowerCase())
          || data.dimensions.toLowerCase().includes(keyword.toLowerCase())
          || data.type.toLowerCase().includes(keyword.toLowerCase());
      };
    },

    handleScroll() {
      console.log(this.navSpacerActive);
      if (this.navSpacerActive) {
        if (this.$refs.nav_spacer
          && this.$refs.nav_spacer.getBoundingClientRect().top >= 0) {
          this.navSpacerActive = false;
        }
      } else if (this.$refs.navigation
        && this.$refs.navigation.getBoundingClientRect().top <= 0) {
        this.navSpacerActive = true;
      }
    },
  },

  watch: {
    switches: function watch(vals) {
      this.categories.forEach((c, i) => {
        if (vals[i]) this.removeCategorieFilter(c.type);
        else this.addCategorieFilter(c.type);
        this.$refs.chart.chart.series[i].setVisible(vals[i]);
      });
    },
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>
  .spacing-left {
    padding-left: 10px;
  }

  .nav {
    z-index: 100;
    background-color: rgb(250,250,250);
    width: 100%;
  }
</style>
