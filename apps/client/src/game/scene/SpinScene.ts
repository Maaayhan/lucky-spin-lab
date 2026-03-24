import * as PIXI from 'pixi.js';
import { Wheel } from '../entities/Wheel';
import { Pointer } from '../entities/Pointer';
import { spinToSegment } from '../animation/spinController';

export interface SpinSceneOptions {
  width: number;
  height: number;
  onSpinComplete: () => void;
}

export class SpinScene {
  app: PIXI.Application;
  private wheel: Wheel;
  private wheelContainer: PIXI.Container;
  private glowFilter: PIXI.Graphics | null = null;

  private readonly RADIUS = 180;

  constructor(canvas: HTMLCanvasElement, options: SpinSceneOptions) {
    this.app = new PIXI.Application({
      view: canvas,
      width: options.width,
      height: options.height,
      backgroundColor: 0x0d0d1a,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    this.wheelContainer = new PIXI.Container();
    this.wheelContainer.x = options.width / 2;
    this.wheelContainer.y = options.height / 2;
    this.app.stage.addChild(this.wheelContainer);

    // Wheel
    this.wheel = new Wheel(this.RADIUS);
    this.wheelContainer.addChild(this.wheel);

    // Pointer added to stage (NOT wheelContainer) so it stays fixed while wheel spins
    const pointer = new Pointer(this.RADIUS);
    pointer.x = options.width / 2;
    pointer.y = options.height / 2;
    this.app.stage.addChild(pointer);

    // Background glow circle
    this.drawGlowBackground();
  }

  private drawGlowBackground(): void {
    const glow = new PIXI.Graphics();
    glow.beginFill(0x1a1a3e, 0.5);
    glow.drawCircle(0, 0, this.RADIUS + 30);
    glow.endFill();
    this.wheelContainer.addChildAt(glow, 0);
  }

  /**
   * Animate the wheel to land on the given reward segment index.
   */
  spinToSegment(segmentIndex: number, onComplete: () => void): void {
    spinToSegment({
      targetSegmentIndex: segmentIndex,
      durationMs: 4000,
      onUpdate: (rotation) => {
        this.wheel.rotation = rotation;
      },
      onComplete: () => {
        onComplete();
      },
    });
  }

  /**
   * Flash/pulse the wheel to indicate a win.
   */
  playWinEffect(): void {
    let frame = 0;
    const originalScale = this.wheel.scale.x;
    const interval = setInterval(() => {
      frame++;
      const scale = originalScale + Math.sin(frame * 0.4) * 0.04;
      this.wheel.scale.set(scale);
      if (frame > 20) {
        clearInterval(interval);
        this.wheel.scale.set(originalScale);
      }
    }, 16);
  }

  destroy(): void {
    this.app.destroy(false);
  }
}
