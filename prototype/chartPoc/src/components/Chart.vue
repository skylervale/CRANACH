<template>
  <div>
    <div style="text-align: left; border:1px solid; position:absolute; padding: 1rem">
      <div>
        <span>Count of Blocks: {{ coordinates.length }}</span>
      </div>
      <div style="margin-top: 1rem">
        <label for="startFrom">
          Von
          <input id="startFrom" type="number" v-model.lazy.number="startDate">
        </label>
        <label for="endTo">
          Bis
          <input id="endTo" type="number" v-model.lazy.number="endDate">
        </label>
        <button style="margin-left: 1rem" @click="resetZoom">Reset Zoom</button>
      </div>
      <div style="margin-top: 1rem">
        <label for="isPenActive">
          Pan is active: {{ isPenActive }}
          <input id="isPenActive" type="checkbox" v-model="isPenActive">
        </label>
        <label for="isZoomActive">
          Zoom is active: {{ isZoomActive }}
          <input id="isZoomActive" type="checkbox" v-model="isZoomActive">
        </label>
      </div>
      <div style="margin-top: 1rem">
        <button v-for="(category, i) in categories" :key="i" style="margin: 0 .5rem" @click="showCategory(i)">
          <svg :height="10" :width="10">
            <g>
              <rect :height="10" :width="10" :fill="category.color"></rect>
            </g>
          </svg>
          {{ category.name}}
        </button>
      </div>
    </div>
    <SvgPanZoom :zoomEnabled="true" :controlIconsEnabled="false" :fit="false" :center="false"
                :minZoom="1" :maxZoom="4" :zoomScaleSensitivity="0.25"
                @svgpanzoom="registerSvgPanZoom" :beforePan="onBeforePan">
      <svg :height="windowHeight+10" :width="windowWidth+10">
        <g>
          <g>
            <rect v-for="(position, i) in coordinates" :key="i"
                  :x="position.x" :y="position.y" :height="rectSize" :width="rectSize"
                  :fill="getCategoryByType(position.type).color"
                  @mouseover="toggleTooltip(position)" @mouseleave="toggleTooltip(position)"
            ></rect>
          </g>
          <g>
            <text v-for="(year, i) in getYears()" :key="i" :x="getXValueOfItem(year)" :y="windowHeight">{{ year }}</text>
          </g>
          <line x1="0" :y1="windowHeight-20" :x2="windowWidth+10" :y2="windowHeight-20" stroke="black" />
          <g v-for="(position, i) in coordinates" :key="(i+1)" v-show="position.tooltipVisible" style="z-index: 1000">
            <image height="150" width="150" :x="position.x" :y="position.y" :xlink:href="items[position.index].imageUrl" :alt="'Bild:' + items[position.index].title" />
          </g>
        </g>
      </svg>
    </SvgPanZoom>
  </div>
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';

  const initialRectSize = 20;
  export default {
    name: "Chart",
    components: {  SvgPanZoom },
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data: () => ({
      startDate: null,
      endDate: null,
      windowWidth: 1800,
      windowHeight: 850,
      rectSize: initialRectSize,
      yStack: {},
      coordinates: [],
      categories: [
        {
          type: 'painting',
          name: 'Gemälde',
          color: 'rgba(8, 82, 153, .8)',
          isVisible: true
        },
        {
          type: 'drawing',
          name: 'Zeichnungen',
          color: 'rgba(166,32,25,0.8)',
          isVisible: true
        },
        {
          type: 'print',
          name: 'Drucke',
          color: 'rgba(9, 110, 0, 0.8)',
          isVisible: true
        },
        {
          type: 'archive',
          name: 'Archivalien',
          color: 'rgba(219,140,0,0.8)',
          isVisible: true
        },
      ],
      svgPanZoom: null,
      isPenActive: true,
      isZoomActive: true
    }),
    created() {
      this.setDateInterval();
    },
    watch: {
      startDate: {
        handler() {
          this.recalculateCoordinates();
        }
      },
      endDate: {
        handler() {
          this.recalculateCoordinates();
        }
      },
      isZoomActive: {
        handler(val) {
          if(val === true) {
            this.svgPanZoom.enableZoom();
            this.svgPanZoom.enableMouseWheelZoom();
            this.svgPanZoom.enableDblClickZoom()
          } else {
            this.svgPanZoom.disableZoom();
            this.svgPanZoom.disableMouseWheelZoom();
            this.svgPanZoom.disableDblClickZoom()
          }
        }
      },
      isPenActive: {
        handler(val) {
          if(val === true) {
            this.svgPanZoom.enablePan()
          } else {
            this.svgPanZoom.disablePan()
          }
        }
      }
    },
    methods: {
      setDateInterval() {
        this.startDate = this.items.reduce((min, p) => p.startDate < min ? p.startDate : min, this.items[0].startDate);
        this.endDate = this.items.reduce((max, p) => p.endDate > max ? p.endDate : max, this.items[0].endDate);
      },
      getYears() {
        const divider = 5;
        const count = (this.endDate - this.startDate) / divider;
        const res = [];

        for (let i=0; i < count; i++) {
          res.push(this.startDate + i*divider);
        }

        return res;
      },
      calculateCoordinates(){
        for (let i = 0; i < this.items.length; i++) {
          if (!this.getCategoryByType(this.items[i].type).isVisible) continue;
          const timeDiff = this.items[i].endDate - this.items[i].startDate;
          for (let j = 0; j <= timeDiff; j++) {
            const year = this.items[i].startDate + j;
            if (year > this.endDate || year < this.startDate) continue;
            const xValue = this.getXValueOfItem(year);
            const yValue = this.getYValueOfItem(year);
            if (yValue < 25) {
              this.rectSize *= 0.9;
              this.recalculateCoordinates(false);
              return;
            }
            this.coordinates.push({ x: xValue, y: yValue, type: this.items[i].type, index: i, tooltipVisible: false });
          }
        }
      },
      recalculateCoordinates(resetRectSize = true) {
        if (resetRectSize) this.rectSize = initialRectSize;
        this.coordinates = [];
        this.yStack = {};
        this.calculateCoordinates();
      },
      getXValueOfItem(year){
        const pixelPerYear = this.windowWidth / (this.endDate - this.startDate);
        const diff = this.endDate - year;

        return Math.floor(this.windowWidth - pixelPerYear * diff);
      },
      getYValueOfItem(year){
        if (this.yStack[year] === undefined) {
          this.yStack[year] = { y: 50};
        } else {
          this.yStack[year].y += this.rectSize*1.5
        }

        return Math.floor(this.windowHeight - this.yStack[year].y);
      },
      getCategoryByType(type) {
        return this.categories.find(c => c.type === type)
      },
      showCategory(index){
        this.categories[index].isVisible = !this.categories[index].isVisible;
        this.recalculateCoordinates();
      },
      registerSvgPanZoom(svgPanZoom) {
        this.svgPanZoom = svgPanZoom;
      },
      onBeforePan(oldPan, newPan) {
        const sizes = this.svgPanZoom.getSizes();
        const gutterWidth = 50;
        const gutterHeight = 25;

        const rightLimit = (-(sizes.viewBox.width+gutterWidth)  * sizes.realZoom)+sizes.viewBox.width;
        const leftLimit = gutterWidth * sizes.realZoom;
        const bottomLimit = sizes.height - gutterHeight * sizes.realZoom - sizes.viewBox.y * sizes.realZoom;
        const topLimit = sizes.viewBox.height * sizes.realZoom + gutterHeight * sizes.realZoom;

        return {
          x: Math.min(leftLimit, Math.max(rightLimit, newPan.x)),
          y: Math.min(topLimit, Math.max(bottomLimit, newPan.y))
        };

      },
      resetZoom() {
        this.svgPanZoom.reset();
      },
      toggleTooltip(position){
        position.tooltipVisible = !position.tooltipVisible;
      }
    }
  }
</script>

<style scoped>
  svg rect {
    cursor: pointer;
  }
</style>
