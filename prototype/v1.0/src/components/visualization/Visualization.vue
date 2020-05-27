<template>
  <v-row>
    <v-col class="pa-0">
      <v-row ref="graph" align="center">
        <v-col class="pa-0 px-10">
          <highcharts
            :options="scatterOptions"
            ref="scatterChart"
            style="cursor: crosshair"
          ></highcharts>

          <highcharts
            :options="lineOptions"
            ref="lineChart"
            style="cursor: crosshair"
          ></highcharts>

          <ImageRangeSlider
            ref="breadcrumb"
            :height="windowHeight * 0.15"
            :images="breadcrumbItems"
            :minDate="absoluteMin"
            :maxDate="absoluteMax"
            :frequencies="frequencies"
            frequencyColor="rgb(250, 250, 250)"
            primaryColor="#424242"
            handleColor="#999999"
            @rangeChanged="updateRange"
          ></ImageRangeSlider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { Chart } from 'highcharts-vue';

import ImageRangeSlider from '@/components/visualization/ImageRangeSlider.vue';
import yearUtils from '@/utils/year.utils';
import cranachElderEvents from '@/utils/cranach.elder.events.json';
import cranachYoungerEvents from '@/utils/cranach.younger.events.json';
import lutherEvents from '@/utils/luther.events.json';
import historyEvents from '@/utils/history.events.json';

export default {
  name: 'Visualization',

  components: {
    highcharts: Chart,
    ImageRangeSlider,
  },

  data: () => ({
    scatterMarkerRadius: 5,
    lineMarkerRadius: 7,
    rangeUpdateTimeout: null,
    frequencies: [],
    scatterActive: false,
    lineActive: false,
    windowHeight: 100,
    navSpacerActive: false,
    zoomTimeout: null,
    searchFilter: () => true,
    searchText: '',
    menu: false,
    info: false,
    switches: [true, true, true, true],
    filteredCategories: [],
    min: new Date('1472-10-04'),
    max: new Date('1608-12-31'),
  }),

  props: {
    categories: {
      type: Array,
      required: true,
    },
    breadcrumbItems: {
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
        return this.min.getTime() <= this.absoluteMin.getTime();
      },
    },
    scrollRightDisabled: {
      get() {
        return this.max.getTime() >= this.absoluteMax.getTime();
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
        const xMin = this.absoluteMin.getTime();
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
        const xMax = this.absoluteMax.getTime();
        if (dateTime >= xMin && dateTime <= xMax) this.setZoom(this.min, date);
      },
    },
    scatterSeries: {
      get() {
        yearUtils.resetYearAmount();

        const newSeries = this.categories.map(category => ({
          color: category.color,
          name: category.type,
          type: 'scatter',
          data: this.createAllSeriesItemsFrom(category),
        }));

        this.setFrequencies();

        return newSeries;
      },
    },
    lineSeries: {
      get() {
        const yCranachE = 6;
        const yLuther = 4;
        const yCranachY = 2;
        const yHistory = 0;

        return [
          {
            type: 'line',
            color: 'rgba(0,0,0,1)',
            name: 'Cranach der Ältere',
            stickyTracking: false,
            tooltip: {
              headerFormat: '<span class="body-1"><b>{series.name}</b> {point.key:%d.%m.%Y}</span><br/>',
              pointFormat: '<span class="body-2">{point.title}</span>',
            },
            marker: {
              enabled: true,
              symbol: 'diamond',
            },
            data: cranachElderEvents.map(e => ({
              x: new Date(e.x),
              title: e.title,
              y: yCranachE,
            })),
          },
          {
            type: 'line',
            color: 'rgba(126,0,126,1)',
            name: 'Martin Luther',
            stickyTracking: false,
            tooltip: {
              headerFormat: '<span class="body-1"><b>{series.name}</b> {point.key:%d.%m.%Y}</span><br/>',
              pointFormat: '<span class="body-2">{point.title}</span>',
            },
            marker: {
              enabled: true,
              symbol: 'diamond',
            },
            data: lutherEvents.map(e => ({
              x: new Date(e.x),
              title: e.title,
              y: yLuther,
            })),
          },
          {
            type: 'line',
            color: 'rgba(0,126,126,1)',
            name: 'Cranach der Jüngere',
            stickyTracking: false,
            tooltip: {
              headerFormat: '<span class="body-1"><b>{series.name}</b> {point.key:%d.%m.%Y}</span><br/>',
              pointFormat: '<span class="body-2">{point.title}</span>',
            },
            marker: {
              enabled: true,
              symbol: 'diamond',
            },
            data: cranachYoungerEvents.map(e => ({
              x: new Date(e.x),
              title: e.title,
              y: yCranachY,
            })),
          },
          {
            type: 'line',
            color: 'rgba(126,126,126,1)',
            name: 'Historische Ereignisse',
            stickyTracking: false,
            tooltip: {
              headerFormat: '<span class="body-1"><b>{series.name}</b> {point.key:%d.%m.%Y}</span><br/>',
              pointFormat: '<span class="body-2">{point.title}</span>',
            },
            marker: {
              enabled: true,
              symbol: 'diamond',
            },
            data: historyEvents.map(e => ({
              x: new Date(e.x),
              title: e.title,
              y: yHistory,
            })),
          },
        ];
      },
    },
    scatterOptions: {
      get() {
        return {
          legend: {
            verticalAlign: 'top',
            itemStyle: {
              fontSize: '12px',
              fontFamily: 'Roboto, sans-serif',
            },
          },
          chart: {
            height: `${this.windowHeight * 0.63}px`,
            zoomType: 'x',
            backgroundColor: 'rgb(250,250,250)',
            animation: false,
            resetZoomButton: {
              theme: {
                display: 'none',
              },
            },
            events: {
              selection: () => { this.changeScatterActive(true); },
              load: () => { this.$emit('loaded'); },
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
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Roboto, sans-serif',
              },
            },
            max: this.absoluteMax.valueOf(),
            min: this.absoluteMin.valueOf(),
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
                radius: this.scatterMarkerRadius,
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
          series: this.scatterSeries,
        };
      },
    },

    lineOptions: {
      get() {
        return {
          legend: {
            verticalAlign: 'bottom',
            itemStyle: {
              fontSize: '12px',
              fontFamily: 'Roboto, sans-serif',
            },
          },
          chart: {
            height: `${this.windowHeight * 0.15}px`,
            zoomType: 'x',
            backgroundColor: 'rgb(250,250,250)',
            animation: false,
            resetZoomButton: {
              theme: {
                display: 'none',
              },
            },
            events: {
              selection: () => { this.changeLineActive(true); },
            },
          },
          title: {
            text: '',
          },
          yAxis: {
            visible: false,
          },
          xAxis: {
            visible: false,
            max: this.absoluteMax.valueOf(),
            min: this.absoluteMin.valueOf(),
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
            line: {
              animation: false,
              marker: {
                lineWidth: 1,
                radius: this.lineMarkerRadius,
              },
              lineWidth: 2,
              connectNulls: true,
            },
            series: {
              turboThreshold: 0,
              cursor: 'pointer',
              stickyTracking: false,
            },
          },
          series: this.lineSeries,
        };
      },
    },
  },

  methods: {
    updateRange({ from, to }) {
      clearTimeout(this.rangeUpdateTimeout);
      this.rangeUpdateTimeout = setTimeout(() => {
        this.setZoom(from, to);
      }, 500);
    },
    setFrequencies() {
      this.frequencies.splice(0, this.frequencies.length);
      for (let i = this.absoluteMin.getFullYear(); i <= this.absoluteMax.getFullYear(); i += 1) {
        this.frequencies.push({ x: i, y: yearUtils.getYearAmountFor(i) });
      }
    },
    changeScatterActive(bool) {
      this.scatterActive = bool;
    },
    changeLineActive(bool) {
      this.lineActive = bool;
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

        clearTimeout(this.zoomTimeout);

        this.zoomTimeout = setTimeout(() => {
          this.$emit('rangeChanged', { from: newStart, to: newEnd });
          this.$emit('addFilter', this.filterDateRange(newStart, newEnd), true);
          this.$refs.breadcrumb.setRange(newStart, newEnd);
        }, 100);

        if (this.scatterActive) {
          this.changeScatterActive(false);
          this.zoomLine(this.min, this.max);
        }

        if (this.lineActive) {
          this.changeLineActive(false);
          this.zoomScatter(this.min, this.max);
        }
      }
    },
    scrollLeft() {
      let step = 10;
      const spaceRight = this.min.getFullYear() - this.absoluteMin.getFullYear();
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
      const spaceRight = this.absoluteMax.getFullYear() - this.max.getFullYear();
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

      if (newMin.getTime() >= this.absoluteMin.getTime()
        && newMax.getTime() <= this.absoluteMax.getTime()) {
        this.setZoom(newMin, newMax);
      } else {
        this.setZoom(this.absoluteMin, this.absoluteMax);
      }
    },
    setZoom(min, max) {
      this.zoomScatter(min, max);
      this.zoomLine(min, max);
    },
    zoomScatter(min, max) {
      this.$refs.scatterChart.chart.xAxis[0]
        .setExtremes(min.getTime(), max.getTime());

      this.$refs.scatterChart.chart.redraw();
    },
    zoomLine(min, max) {
      this.$refs.lineChart.chart.xAxis[0]
        .setExtremes(min.getTime(), max.getTime());

      this.$refs.lineChart.chart.redraw();
    },
    resetZoom() {
      this.$refs.scatterChart.chart.zoomOut();
      this.$refs.lineChart.chart.zoomOut();
    },
    reset() {
      this.resetZoom();

      const newSwitches = [];
      this.switches.forEach(() => {
        newSwitches.push(true);
      });
      this.setSwitches(newSwitches);
    },
    changeSwitchFor(categoryName) {
      const newSwitches = [];
      this.categories.forEach((el, i) => {
        if (el.type === categoryName) {
          newSwitches.push(!this.switches[i]);
        } else newSwitches.push(this.switches[i]);
      });

      this.setSwitches(newSwitches);
    },
    setSwitches(newValues) {
      newValues.forEach((el, i) => {
        this.$set(this.switches, i, el);
      });

      this.$emit('categoriesChanged', this.switches);
    },
    searchKey(e) {
      if (e.key === 'Enter') this.addSearch();
    },
    addSearch() {
      if (!this.searchText) this.removeSearch();
      else {
        this.searchFilter = this.searchFor(this.searchText);
        this.$emit('addFilter', this.searchFor(this.searchText), true);
      }
    },
    setSearch(text) {
      this.searchText = text;
      this.addSearch();
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
        this.$refs.scatterChart.chart.series[i].setVisible(vals[i]);
      });
    },
  },

  mounted() {
    this.windowHeight = window.innerHeight;
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

  .highcharts-credits {
    visibility: hidden;
    height: 0%;
  }
</style>
