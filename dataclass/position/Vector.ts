export class Vector {
  xPos: number;
  yPos: number;

  /**
   * Create a new Vector
   * if no x or y position is given, default to 0
   *
   * @param number | optional x position
   * @param number | optional y position
   */
  constructor(xPos?: number, yPos?: number) {
    this.xPos = xPos || 0;
    this.yPos = yPos || 0;
  }

  /**
   * Get X Coordinate of Vector
   *
   * @returns number
   */
  getX(): number {
    return this.xPos;
  }

  /**
   * Get Y Coordinate of Vector
   *
   * @returns number
   */
  getY(): number {
    return this.yPos;
  }

  /**
   * Set X Coordinate of Vector
   *
   * @param   number | x coordinate
   * @returns void
   */
  setX(x: number): void {
    this.xPos = x;
  }

  /**
   * Set Y Coordinate of Vector
   *
   * @param   number | y coordinate
   * @returns void
   */
  setY(y: number): void {
    this.yPos = y;
  }

  /**
   * Get position as readable string
   *
   * @returns string
   */
  asString(): string {
    return `x: ${this.xPos}, y: ${this.yPos}`;
  }
}
