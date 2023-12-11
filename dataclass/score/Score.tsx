export class Score {
  combo:any;
  score:any;

  constructor() {
    this.score = 0;
    this.combo = 0;
  }

  /**
   * Increment the combo by one
   *
   * @returns void
   */
  incrementCombo(): void {
    this.combo += 1;
  }

  /**
   * Reset the combo
   *
   * @returns void
   */
  resetCombo(): void {
    this.combo = 0;
  }

  /**
   * Get the combo value as readable string
   *
   * @returns string
   */
  readableCombo(): string {
    return `${this.combo}x`;
  }

  /**
   * Formula for how the score will be calculated
   *
   * Score += Base * ((1 + combo/100 )^2) * precision/100 * 3
   *
   * combo will be how many times you accurately hit a note
   *
   * precisionScore will be the amount of the height on the y Coordinate inside the hit box
   *
   * @param precisionScore
   * @param noteWorth
   * @returns string
   */
  scoreSong(precisionScore: number | undefined, noteWorth: number | undefined): number {
    // @ts-ignore
    this.score += noteWorth * ((1 + this.combo/100)^2) * precisionScore/100 * 3;

    return Math.round(this.score);
  }

  /**
   * Get the score value as readable string
   *
   * @returns string
   */
  readableScore(): string {
    return `${this.score}`;
  }
}
