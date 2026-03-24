import * as PIXI from 'pixi.js';

export class Pointer extends PIXI.Container {
  constructor(radius: number) {
    super();
    this.draw(radius);
  }

  private draw(radius: number): void {
    const g = new PIXI.Graphics();
    const pointerHeight = 28;
    const pointerWidth = 16;

    // Pointer triangle pointing downward toward the wheel
    g.beginFill(0xffd700, 1);
    g.lineStyle(2, 0xffa500, 1);
    g.moveTo(0, radius + pointerHeight);        // tip (pointing into wheel)
    g.lineTo(-pointerWidth / 2, radius + 2);   // left base
    g.lineTo(pointerWidth / 2, radius + 2);    // right base
    g.closePath();
    g.endFill();

    // Small circle at base
    g.beginFill(0xffa500, 1);
    g.drawCircle(0, radius + 4, 5);
    g.endFill();

    this.addChild(g);
  }
}
