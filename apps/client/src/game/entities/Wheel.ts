import * as PIXI from 'pixi.js';
import { REWARD_TABLE } from '../config/rewards';

const SEGMENT_COUNT = REWARD_TABLE.length;
const SEGMENT_ANGLE = (Math.PI * 2) / SEGMENT_COUNT;

export class Wheel extends PIXI.Container {
  private wheelGraphics: PIXI.Graphics;
  private labelsContainer: PIXI.Container;

  constructor(radius: number) {
    super();
    this.wheelGraphics = new PIXI.Graphics();
    this.labelsContainer = new PIXI.Container();

    this.addChild(this.wheelGraphics);
    this.addChild(this.labelsContainer);

    this.draw(radius);
  }

  private draw(radius: number): void {
    const g = this.wheelGraphics;
    g.clear();

    // Draw outer ring
    g.lineStyle(4, 0xffd700, 1);
    g.drawCircle(0, 0, radius + 4);
    g.endFill();

    // Draw segments
    REWARD_TABLE.forEach((reward, i) => {
      const startAngle = i * SEGMENT_ANGLE - Math.PI / 2;
      const endAngle = startAngle + SEGMENT_ANGLE;

      // Segment fill
      g.beginFill(Number(reward.color.replace('#', '0x')), 1);
      g.lineStyle(2, 0xffffff, 0.6);
      g.moveTo(0, 0);
      g.arc(0, 0, radius, startAngle, endAngle);
      g.closePath();
      g.endFill();

      // Draw label
      this.drawLabel(reward.label, radius, startAngle, endAngle);
    });

    // Center circle
    g.beginFill(0x1a1a2e, 1);
    g.lineStyle(3, 0xffd700, 1);
    g.drawCircle(0, 0, radius * 0.12);
    g.endFill();
  }

  private drawLabel(text: string, radius: number, startAngle: number, endAngle: number): void {
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.65;

    const label = new PIXI.Text(text, {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: 13,
      fontWeight: 'bold',
      fill: 0xffffff,
      align: 'center',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowDistance: 1,
      dropShadowBlur: 2,
    });

    label.anchor.set(0.5);
    label.x = Math.cos(midAngle) * labelRadius;
    label.y = Math.sin(midAngle) * labelRadius;
    label.rotation = midAngle + Math.PI / 2;

    this.labelsContainer.addChild(label);
  }
}
