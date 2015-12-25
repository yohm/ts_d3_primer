/// <reference path="typings/tsd.d.ts" />

interface DataPoint {
  x: number;
  y: number;
};

class LinePlot {
  private _svg: d3.Selection<any>;
  private _width = 800;
  private _height = 600;
  private _padding = {left: 50, right: 30, top: 30, bottom: 30};

  private _pointsGroup: d3.Selection<any>;
  private _xAxisGroup: d3.Selection<any>;
	private _yAxisGroup: d3.Selection<any>;
  private _xScale: d3.scale.Linear<number,number>;
  private _yScale: d3.scale.Linear<number,number>;
  
  constructor(container:string) {
    var selection = d3.select(container);
    this._svg = selection.append('svg')
      .attr({
			  'width': this._padding.left + this._width + this._padding.right,
				'height': this._padding.top + this._height + this._padding.bottom
			});
    
    this._pointsGroup = this._svg.append('g')
      .classed('plot', true)
      .attr({
        'transform' : 'translate(' + this._padding.left + ',' + this._padding.top + ')'
      });
    this._xAxisGroup = this._svg.append('g')
      .classed('axis', true)
      .attr({
        'transform' : 'translate(' + this._padding.left + ',' + (this._height + this._padding.top) + ')'
      });
    this._yAxisGroup = this._svg.append('g')
      .classed('axis', true)
      .attr({
        'transform' : 'translate(' + this._padding.left + ',' + this._padding.top + ')'
      });
  }
  
  public load(dataPoints: DataPoint[]) {
    var minX = d3.min( dataPoints, (d)=>d.x );
    var maxX = d3.max( dataPoints, (d)=>d.x );
    this.createXAxis(minX, maxX);
    var minY = d3.min( dataPoints, (d)=>d.y );
    var maxY = d3.max( dataPoints, (d)=>d.y );
    this.createYAxis(minY, maxY);
    
    var line = d3.svg.line<DataPoint>()
      .x( (d:DataPoint)=>this._xScale(d.x) )
      .y( (d:DataPoint)=>this._yScale(d.y) );
    var dataSelection = this._pointsGroup
      .append('path')
      .datum( dataPoints )
      .attr('d', line);
  };
  
  private createXAxis( minX: number, maxX: number ) {
    this._xScale = d3.scale.linear()
      .domain([minX, maxX])
      .range([0, this._width])
      .nice();
    var axis = d3.svg.axis().scale(this._xScale).orient('bottom');
    this._xAxisGroup.call(axis);
  }
  
  private createYAxis( minY: number, maxY: number ) {
    this._yScale = d3.scale.linear()
      .domain([minY, maxY])
      .range([this._height, 0])
      .nice();
    var axis = d3.svg.axis().scale(this._yScale).orient('left');
    this._yAxisGroup.call(axis);
  }

};
