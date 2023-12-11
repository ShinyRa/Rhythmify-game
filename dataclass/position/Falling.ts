import { Dimension } from "./Dimension";
import { PositionAware } from "./PositionAware";
import { Vector } from "./Vector";

export abstract class Falling extends PositionAware {
  velocity: number;

  /**
   * Set a velocity at which the object is falling
   *
   * @param velocity number
   */
  constructor(position: Vector, dimension: Dimension, velocity: number) {
    super(position, dimension);
    this.velocity = velocity;
  }

  /**
   * Update the falling object
   *
   * @returns new y coordinate
   */
  fall(): number {
    this.position.setY(this.position.getY() + this.velocity);

    return this.position.getY();
  }

  /**
   * Get how fast the object is falling
   *
   * @returns number
   */
  getFallingSpeed(): number {
    return this.velocity;
  }

  /**
   * Set velocity of object that is faling
   *
   * @param velocity number
   */
  setFallingSpeed(velocity: number) {
    this.velocity = velocity;
  }
}
