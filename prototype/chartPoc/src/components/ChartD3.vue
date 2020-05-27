<template>
<div>
  <div id="umf-d3-chart"></div>
  <GalleryItem :id="tooltipDivId" :v-if="toolTipData !== {}" class="d3-tooltip" :item="toolTipData" />
</div>
</template>

<script>
  import d3 from '../utils/d3-importer'
  import {event as currentEvent} from 'd3-selection'
  import GalleryItem from "./GalleryItem";

  export default {
    name: "ChartD3",
    components: { GalleryItem },
    props: {
      items: {
        type: Array,
        default: null
      },
      search: {
        type: String,
        default: null
      },
      chartDivId: {
        type: String,
        default: 'umf-d3-chart'
      },
      tooltipDivId: {
        type: String,
        default: 'd3-tooltip-div'
      },
      height: {
        type: Number,
        default: 800
      },
      width: {
        type: Number,
        default: 1800
      },
      minHeight: {
        type: Number,
        default: 200
      },
      minWidth: {
        type: Number,
        default: 200
      },
      margin: {
        type: Object,
        default: () => ({
          left: 20,
          right: 30,
          top: 10,
          bottom: 20
        })
      },
      maxNameLength: {
        type: Number,
        default: 20
      },
      colortype: {
        type: String,
        default: 'r2o'
      },
      axisLabelFontSize: {
        type: String,
        default: '1.25rem'
      },
      showImageSize: {
        type: Number,
        default: 40
      },
      imageHoverSize: {
        type: Number,
        default: 100
      },
      showImageFileSize: {
        type: String,
        default: 's'
      },
      isZoomable: {
        type: Boolean,
        default: true
      },
    },
    data () {
      return {
        x: null,
        y: null,
        xAxis: null,
        yAxis: null,
        gX: null,
        gY: null,
        svg: null,
        scatter2: null,
        zoom: null,
        tooltipDiv: null,
        toolTipData: {}
      }
    },
    mounted() {
      this.setupSvg();
      this.setupDimensions();
      this.updateChart()
    },
    watch: {
      search: function () {
        this.reset()
      },
      width: function () {
        d3.select('#' + this.chartDivId).selectAll('*').remove();
        d3.select('#' + this.tooltipDivId).remove();
        this.setupSvg();
        this.setupDimensions();
        this.updateChart()
      },
      height: function () {
        d3.select('#' + this.chartDivId).selectAll('*').remove();
        d3.select('#' + this.tooltipDivId).remove();
        this.setupSvg();
        this.setupDimensions();
        this.updateChart()
      },
      currentRecipeId: function () {
        this.reset()
      },
      isZoomable: function () {
        this.reset()
      }
    },
    computed: {
      hasData: function () {
        return this.items && this.items.length > 0;

      },
      actualWidth: function () {
        if (this.width) {
          return this.width
        }
        if (document.getElementById(this.chartDivId)) {
          return document.getElementById(this.chartDivId).clientWidth
        }
        return null
      },
      displayWidth: function () {
        if (this.minWidth > this.actualWidth) {
          return this.minWidth - this.margin.left - this.margin.right
        }
        return this.actualWidth - this.margin.left - this.margin.right
      },
      displayHeight: function () {
        if (this.minHeight > this.height) {
          return this.minHeight - this.margin.top - this.margin.bottom
        }
        return this.height - this.margin.top - this.margin.bottom
      },
    },
    methods: {
      reset: function () {
        d3.selectAll('.regions').remove();
        d3.selectAll('.contour').remove();
        d3.selectAll('.dot').remove();
        d3.selectAll('#scatterplot2').remove();
        d3.selectAll('.xaxis').remove();
        d3.selectAll('.yaxis').remove();
        this.updateChart()
      },
      updateChart: function () {
        if (!this.actualWidth || !this.height || !this.hasData) {
          return
        }
        if (this.isZoomable) {
          this.zoom = d3.zoom()
            .scaleExtent([1, 40])
            .translateExtent([[-100, -100], [this.displayWidth + 90, this.displayHeight + 100]])
            .on('zoom', this.zoomed);
          this.svg.call(this.zoom)
        }

        let yStack = {};
        let xMinMax = d3.extent(this.items, function (d) {
          if (yStack[d.startDate] === undefined) {
            yStack[d.startDate] = { count: 1};
          } else {
            yStack[d.startDate].count++
          }
          d.y = yStack[d.startDate].count;
          return d.startDate
        });
        let yMinMax = d3.extent(Object.values(yStack), function (d) {
          return d.count
        });

        this.x = d3.scaleTime().range([0, this.displayWidth]).nice();
        this.x.domain([new Date(xMinMax[0], 1,1), new Date(xMinMax[1],1, 1)]).nice();
        this.y = d3.scaleLinear().range([this.displayHeight, 0]);
        this.y.domain(yMinMax).nice();

        /*************************************
         * X Axis
         * ***********************************/
        this.xAxis = d3.axisBottom(this.x)
          .tickSizeOuter(-this.displayHeight)
          .ticks((xMinMax[1] - xMinMax[0]) / 5);

        this.gX = this.svg.append('g')
          .classed('axis xaxis axis--x', true)
          .attr('transform', 'translate(0,' + this.displayHeight + ')')
          .call(this.xAxis);

        /*************************************
         * Y Axis
         * ***********************************/
        this.yAxis = d3.axisLeft(this.y)
          .tickSizeOuter(-this.displayWidth)
          .ticks(20 * this.displayHeight / this.displayWidth);

        this.gY = this.svg.append('g')
          .classed('axis yaxis axis--y', true)
          .call(this.yAxis);

        this.scatter2 = this.svg.append('g')
          .attr('id', 'scatterplot2')
          .attr('clip-path', 'url(#clip)');

        let node = this.scatter2.selectAll('.dot')
          .data(this.items)
          .enter()
          .append('g')
          .attr('class', 'dot')
          .attr('transform', function (d) {
            return 'translate(' + this.x(new Date(d.startDate, 1, 1)) + ',' + this.y(d.y) + ')'
          }.bind(this));

        let myThis = this;
        let recipeSymbol = d3.symbol().size(100);
        node.append('path')
          .attr('d', recipeSymbol.type(d3.symbolSquare))
          .attr('opacity', 1)
          .style('fill',  function (d) {
            return d.color
          }.bind(this))
          .attr('stroke-width', 1)
          .attr('stroke', 'rgba(0, 0, 0, 0.75)')
          .on('mouseover', function (d) {
            d3.select('.d3r-' + d.id).classed('active', true);
            myThis.toolTipData = d;

            const tooltipHeight = myThis.tooltipDiv.node().getBoundingClientRect().height;
            const sumHeight = tooltipHeight + currentEvent.y;
            let top;

            if (sumHeight < window.screen.height*0.85) {
              top = currentEvent.y;
            } else if (currentEvent.y - tooltipHeight > 0) {
              top = currentEvent.y - tooltipHeight;
            } else {
              top = currentEvent.y - tooltipHeight / 2;
            }

            myThis.tooltipDiv
              .style('left', (currentEvent.x) + 'px')
              .style('top', top + 'px')
              .style('visibility', 'visible');
          })
          .on('mouseout', function (d) {
            d3.select('.d3r-' + d.id).classed('active', false);
            myThis.toolTipData = {};
            myThis.tooltipDiv.style('visibility', 'hidden')
          });
      },
      setupSvg: function () {
        // Our svg size includes the margins
        this.svg = d3.select('#' + this.chartDivId).append('svg')
          .attr('width', this.displayWidth + this.margin.left + this.margin.right)
          .attr('height', this.displayHeight + this.margin.top + this.margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        // Define the div for the tooltip
        this.tooltipDiv = d3.select(`#${this.tooltipDivId}`).style('visibility', 'hidden')
      },
      transition: function (zoomLevel) {
        this.svg.transition()
          .delay(100)
          .duration(750)
          .call(this.zoom.scaleBy, zoomLevel)
      },
      zoomed: function () {
        const transform = currentEvent.transform;
        this.scatter2.selectAll('.dot')
          .attr('transform', function (d) {
            return 'translate(' + transform.applyX(this.x(new Date(d.startDate, 1, 1))) + ',' + transform.applyY(this.y(d.y)) + ')'
          }.bind(this));
        this.gX.call(this.xAxis.scale(transform.rescaleX(this.x)));
        this.gY.call(this.yAxis.scale(transform.rescaleY(this.y)))
      },
      setupDimensions: function () {
        // This transparent background rectangle gives user something to click & drag.
        this.svg.append('rect')
          .attr('width', this.displayWidth)
          .attr('height', this.displayHeight)
          .style('fill', 'transparent');
        this.svg.append('defs').append('svg:clipPath')
          .attr('id', 'clip')
          .append('svg:rect')
          .attr('width', this.displayWidth)
          .attr('height', this.displayHeight)
          .attr('x', 0)
          .attr('y', 0)
      }
    }
  }
</script>

<style>
  .zoom-buttons {
    position: absolute;
    right: 60px;
    top: 80px;
    z-index: 10;
  }
  .axis.xaxis text {
    fill: rgba(0, 0, 0, 0.5);
  }
  .axis.yaxis text {
    fill: rgba(0, 0, 0, 0.5);
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: rgba(0, 0, 0, 0.1);
    shape-rendering: crispEdges;
  }
  .x.axis path {
    display: none;
  }
  .axis-names {
    font-weight: 200;
    fill: rgba(0, 0, 0, 0.8);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .axis-names::selection {
    background: none;
  }
  .stull-text {
    font-weight: 200;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .stull-text::selection {
    background: none;
  }
  .stull-temp-names {
    font-size: .75rem;
    font-weight: 200;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .stull-temp-names::selection {
    background: none;
  }
  .sial-line {
    stroke: #000000;
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .d3-tooltip {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    font: 12px sans-serif;
    pointer-events: none;
    z-index: 999999;
    max-width: 20vw;
  }
  .d3r.active {
    stroke: rgba(0, 0, 0, 1) !important;
    stroke-width: 4px !important;
  }
</style>
