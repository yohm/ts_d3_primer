/// <reference path="typings/tsd.d.ts" />
/// <reference path="scatter_plot.ts" />

class BrushedScatterPlot extends ScatterPlot {
  private _brush: d3.svg.Brush<any>;
  
  constructor(container:string) {
    super(container);
  }
  
  public load(dataPoints: DataPoint[]) {
    super.load( dataPoints );
    this.createBrush();
  };
  
  private createBrush() {
    this._brush = d3.svg.brush()  // constructs brush generator
      .x( this._xScale )  // データからxの値にマップする関数（すなわちスケール）をセットする
      .y( this._yScale )
      .extent([[1.5,2.5], [4.2,5.1]]); // extentの初期値

    this._brush
      .on("brush", () => {
        var extent = this._brush.extent();
        console.log(extent);
        // データ点のselectionを取得
        var points = this._pointsGroup.selectAll('.point');
        // 選択された点に.selectedクラスをつける。
        points.classed('selected', (d:DataPoint):boolean=> {
          var x_selected = (d.x > extent[0][0] && d.x < extent[1][0]);
          var y_selected = (d.y > extent[0][1] && d.y < extent[1][1]);
          return x_selected && y_selected;
        });
      });

    // 配下にbrushを描画する。実際には二つのrect要素と、辺と頂点に対応するg要素が作られる
    // 選択領域のスタイルは .brush rect.extent というクラスで指定できる
    // このクラスのstrokeとfill-opacityをセットするとよい
    this._pointsGroup.append('g')    // brushを保持するg要素を作成。
      .classed('brush', true)
      .call( this._brush )
      .call( this._brush.event );    // brushstart, brush, brushendのcallbackを呼ぶ。定型句
  }
};
