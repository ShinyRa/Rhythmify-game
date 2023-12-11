export class Dimension {
  height: number;
  width: number;

  /**
   * Create a new dimension
   *
   * @param height number
   * @param width  number
   */
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  /**
   * Get object's height
   *
   * @returns number | height
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * Get object's width
   *
   * @returns number | width
   */
  getWidth(): number {
    return this.width;
  }

  setWidth(value: number) {
    this.width = value;
  }

  setHeight(value: number) {
    this.height = value;
  }


}
