/// <reference path="typings/tsd.d.ts" />

interface DataPoint {
  x: number;
  y1: number;
  y2: number;
  y3: number;
};

class MultiSeriesLinePlot {
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
    var minY = d3.min( dataPoints, (d)=>{return d3.min([d.y1,d.y2,d.y3]);} );
    var maxY = d3.max( dataPoints, (d)=>{return d3.max([d.y1,d.y2,d.y3]);} );
    this.createYAxis(minY, maxY);

    var color = d3.scale.category10();  // categorical colorを返すfunction。color(0) というようにindexを渡すとそれぞれの色を返す
    var line = d3.svg.line<[number,number]>()
      .x( (point)=>this._xScale(point[0]) )
      .y( (point)=>this._yScale(point[1]) );

    var keys = ['y1','y2','y3'];
    var series_groups = this._pointsGroup.selectAll('.series')
      .data(keys)
      .enter().append('g').classed('.series',true);
    series_groups
      .append('path')
      .datum( (key)=>{  // override datum with the data points
        return dataPoints.map( (d)=>{ return [d.x, d[key] ]; });
      })
      .attr('d', line)   // line(datum) が実行され、その結果が格納される。
      .style('stroke', (d,i)=>color(i) );
    series_groups        // 判例のテキストを追加する
      .append('text')
      .datum( (key) => {  // y1,y2,y3 というデータを上書きする
        var last = dataPoints[dataPoints.length-1];
        return {key: key, last_x: last.x, last_y: last[key] };
      })
      .attr('transform', (d)=>{
        return "translate("+this._xScale(d.last_x)+","+this._yScale(d.last_y)+")";
      })
      .attr('x', 3)
      .attr('dy', ".35em")
      .text((d)=> d.key);
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
