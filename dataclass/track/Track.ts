export class Track {
  rows: number[][];
  tempo: number;
  current: number;
  finished: boolean;

  constructor() {
    this.rows = [];
    this.current = 0;
    this.tempo = 0;
    this.finished = false;
  }

  /**
   * Set the tempo of the track.
   *
   * @param tempo
   */
  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  /**
   * Get the tempo of the track.
   *
   * @returns number
   */
  getTempo() {
    return this.tempo;
  }

  /**
   * Add a new row of notes to the track
   *
   * @param row
   */
  addRow(row: any[]) {
    this.rows.push(row);
  }

  /**
   * Get current row of the track
   *
   * @returns number[] | current row
   */
  getCurrentRow(): number[] {
    return this.rows[this.current];
  }

  /**
   * Increment the track's spawn cursor
   *
   * @returns void
   */
  incrementCurrent(): void {
    if (!this.isFinishedSpawning()) {
      this.current += 1;
    }
  }

  /**
   * Check if current index equals the last row in the track.
   *
   * @returns boolean
   */
  isFinishedSpawning(): boolean {
    return this.rows.length === this.current + 1;
  }

  /**
   * Returns all indices where a note should spawn in lanes
   *
   * @returns number[] | array of indices to spawn notes
   */
  findIndicesToSpawn = (): number[] => {
    if (this.isFinishedSpawning()) {
      return [];
    }

    const indices: number[] = [];

    this.getCurrentRow().forEach((note, index) =>
      note === 1 ? indices.push(index) : null
    );

    return indices;
  };
}
