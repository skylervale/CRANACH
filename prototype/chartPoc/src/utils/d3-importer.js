import { extent } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select, selectAll } from 'd3-selection'
import { line, curveLinear, symbol, symbolCircle, symbolStar, symbolDiamond, symbolSquare } from 'd3-shape'
import {zoom} from 'd3-zoom'


const d3 = {
  extent: extent,
  axisBottom: axisBottom,
  axisLeft: axisLeft,
  scaleTime: scaleTime,
  scaleLinear: scaleLinear,
  select: select,
  selectAll: selectAll,
  line: line,
  curveLinear: curveLinear,
  symbol: symbol,
  symbolCircle: symbolCircle,
  symbolStar: symbolStar,
  symbolDiamond: symbolDiamond,
  symbolSquare: symbolSquare,
  zoom: zoom
};

export default d3
