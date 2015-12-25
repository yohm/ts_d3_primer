/// <reference path="typings/tsd.d.ts" />

interface DataPoint {
  x: number;
  y: number;
};

class LinePlot {
  private _svg: d3.Selection<any>;
  private _width = 800;
  private _height = 600;
  private _paddingLeft = 50;
	private _paddingRight = 30;
	private _paddingBottom = 30;
	private _paddingTop = 30;

  private _pointsGroup: d3.Selection<any>;
  private _xAxisGroup: d3.Selection<any>;
	private _yAxisGroup: d3.Selection<any>;
  private _xScale: d3.scale.Linear<number,number>;
  private _yScale: d3.scale.Linear<number,number>;
  
  constructor(container:string) {
    var selection = d3.select(container);
    this._svg = selection.append('svg')
      .attr({
			  'width': this._paddingLeft + this._width + this._paddingRight,
				'height': this._paddingTop + this._height + this._paddingBottom
			});
    
    this._pointsGroup = this._svg.append('g')
      .classed('plot', true)
      .attr({
        'transform' : 'translate(' + this._paddingLeft + ',' + this._paddingTop + ')'
      });
    this._xAxisGroup = this._svg.append('g')
      .classed('axis', true)
      .attr({
        'transform' : 'translate(' + this._paddingLeft + ',' + (this._height + this._paddingTop) + ')'
      });
    this._yAxisGroup = this._svg.append('g')
      .classed('axis', true)
      .attr({
        'transform' : 'translate(' + this._paddingLeft + ',' + this._paddingTop + ')'
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