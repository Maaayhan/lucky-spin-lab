import * as PIXI from 'pixi.js';

export class Pointer extends PIXI.Container {
  constructor(radius: number) {
    super();
    this.draw(radius);
  }

  private draw(radius: number): void {
    const g = new PIXI.Graphics();
    const pointerHeight = 26;
    const pointerWidth = 16;

    // Tip points DOWN into the wheel rim (at -radius), base sits above rim
    g.beginFill(0xffd700, 1);
    g.lineStyle(2, 0xe6900a, 1);
    g.moveTo(0, -radius + 4);                       // tip — just inside rim
    g.lineTo(-pointerWidth / 2, -(radius + pointerHeight)); // top-left base
    g.lineTo(pointerWidth / 2, -(radius + pointerHeight));  // top-right base
    g.closePath();
    g.endFill();

    // Circle cap at the base
    g.beginFill(0xffa500, 1);
    g.lineStyle(0);
    g.drawCircle(0, -(radius + pointerHeight), 6);
    g.endFill();

    this.addChild(g);
  }
}
