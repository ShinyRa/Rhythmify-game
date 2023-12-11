import { Dimension } from "./Dimension";
import { Vector } from "./Vector";

export abstract class PositionAware {
  position: Vector;
  dimension: Dimension;

  /**
   * Set a position for PositionAware object
   *
   * @param position Vector
   * @param dimension
   */
  constructor(position: Vector, dimension: Dimension) {
    this.position = position;
    this.dimension = dimension;
  }

  /**
   * Get X Coordinate of Object
   *
   * @returns number
   */
  getX(): number {
    return this.position.getX();
  }

  /**
   * Get Y Coordinate of Object
   *
   * @returns number
   */
  getY(): number {
    return this.position.getY();
  }

  /**
   * Set X Coordinate of Object
   *
   * @param   number | x coordinate
   * @returns void
   */
  setX(x: number): void {
    this.position.setX(x);
  }

  /**
   * Set Y Coordinate of Object
   *
   * @param   number | y coordinate
   * @returns void
   */
  setY(y: number): void {
    this.position.setY(y);
  }

  /**
   * Return if this object intersects the other object
   *
   * @param obj | position aware object
   * @returns boolean
   */
  intersects(obj: PositionAware): boolean {
    return (
      this.getX() + this.dimension.getWidth() > obj.getX() &&
      this.getX() < obj.getX() + obj.dimension.getWidth() &&
      this.getY() + this.dimension.getHeight() > obj.getY() &&
      this.getY() < obj.getY() + obj.dimension.getHeight()
    );
  }

  /**
   * Checks to see how much of the falling Note is inside the hitbox
   *
   * @param obj | position aware object
   * @returns number
   */
  getYOfNoteInsideHitbox(obj: PositionAware): number {
    const hitbox = obj.getY() + obj.dimension.getHeight();
    const note = this.getY() + this.dimension.getHeight();
    const noteHit = hitbox - note;

    /**
      * Check to see if note is between 601 and 701 to give it a minus 600 to get a number between 1-100
      * else give it a +100 since it goes into the negatives
      */
    if (note > obj.getY() + 1 && note < hitbox + 1) {
      return note - obj.getY();
    } else {
      return noteHit + 100;
    }
  }
}
