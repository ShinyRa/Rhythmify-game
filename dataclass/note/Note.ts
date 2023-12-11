import {Color} from "pixi.js";
import {INoteStyle} from "./INoteStyle";
import {Vector} from "../position/Vector";
import {Falling} from "../position/Falling";
import {Dimension} from "../position/Dimension";

interface NoteState {
    handleColors(): INoteStyle;
    handleAnimation(): void;
}

/**
 * Define the VisibleState class that implements the NoteState interface
 */
export class VisibleState implements NoteState {
  private note: Note;

  constructor(note: Note) {
    this.note = note;
  }

  handleColors(): INoteStyle {
    // Return the color of the Note
    return {
      backgroundColor: this.note.style.backgroundColor,
      lineColor: this.note.style.lineColor,
    };
  }

  handleAnimation(): void {
    return;
  }
}

/**
 * Define the InvisibleState class that implements the NoteState interface
 */
export class InvisibleState implements NoteState {
  private note: Note;

  constructor(note: Note | null) {
    this.note = note || new Note();
  }

  // Set the color of the invisible Note to transparent
  handleColors(): INoteStyle {
    return {
      backgroundColor: new Color("transparent"),
      lineColor: new Color("transparent"),
    };
  }

  handleAnimation(): void {
    return;
  }
}

/**
 * Define the MissedState class that implements the NoteState interface
 */
export class MissedState implements NoteState {
  private note: Note;

  constructor(note: Note | null) {
    this.note = note || new Note();
  }

  // Return the colors of the Note
  handleColors(): INoteStyle {
    return {
      backgroundColor: this.note.style.backgroundColor,
      lineColor: this.note.style.lineColor,
    };
  }

  // Set the width and height to smaller values to recreate a 'fading' animation
  handleAnimation(): void {
    this.note.dimension.setWidth(this.note.dimension.getWidth() - 2);
    this.note.dimension.setHeight(this.note.dimension.getHeight() - 4);

    // If the note's width is 0, transition to the InvisibleState
    if (this.note.dimension.getWidth() <= 0) {
      this.note.transitionTo(new InvisibleState(this.note));
    }
  }
}

export class Note extends Falling {
  worth: number;
  style: INoteStyle;
  state: NoteState;

  /**
     * Create a new dataclass for a Note
     */
  constructor(position?: Vector, style?: INoteStyle) {
    const NOTE_HEIGHT = 100;
    const NOTE_WIDTH = 35;

    super(position || new Vector(), new Dimension(NOTE_HEIGHT, NOTE_WIDTH), 2);
    this.worth = 100;
    this.style = style || {
      lineColor: new Color("black"),
      backgroundColor: new Color("white"),
    };

    // Initial state is set to VisibleState
    this.state = new VisibleState(this);
  }

  /**
     * Method to transition to another state
     * @param state
     */
  transitionTo(state: NoteState): void {
    this.state = state;
  }

  /**
     * Delegate requestColors to the current state
     */
  requestColors(): INoteStyle {
    return this.state.handleColors();
  }

  /**
     * Delegate requestAnimate to the current state
     */
  requestAnimate(): void {
    this.state.handleAnimation();
  }

  /**
     * Get default score of note
     *
     * @returns number
     */
  getWorth() {
    return this.worth;
  }

  /**
     * Get background color of note
     *
     * @returns Color
     */
  getBackgroundColor(): Color {
    return this.style.backgroundColor;
  }

  /**
     * Get outline color of note
     *
     * @returns Color
     */
  getOutlineColor(): Color {
    return this.style.lineColor;
  }

  /**
     * Set the style of the note
     *
     * @param object | object containing styling properties
     */
  setStyle(style: INoteStyle): void {
    this.style = style;
  }

  /**
     * Get x coordinate
     *
     * @returns number
     */
  getX(): number {
    return super.getX();
  }

  /**
     * Get y coordinate
     *
     * @returns number
     */
  getY(): number {
    return super.getY();
  }

  /**
     * Set x coordinate
     *
     * @param number | x coordinate
     */
  setX(x: number): void {
    super.setX(x);
  }

  /**
     * Set y coordinate
     *
     * @param number | y coordinate
     */
  setY(y: number): void {
    super.setY(y);
  }

  /**
     * Set new position for Note
     *
     * @param Vector | new vector position
     */
  setPosition(vector: Vector): void {
    this.position = vector;
  }

  /**
     * Is the note visible
     *
     * @returns boolean
     */
  isVisible(): boolean {
    //return this.visible && this.getY() < 1001;
    return this.state instanceof VisibleState && this.getY() < 1001;
  }

  /**
     * Set note visibility
     *
     * @returns void
     */
  setInvisible(): void {
    //this.visible = false;
    this.transitionTo(new InvisibleState(this));
  }

  /**
     * Set NoteState to MissedState
     * @returns void
     */
  setMissed(): void {
    this.transitionTo(new MissedState(this));
  }

  /**
     * Checks if a Note is of screen
     * @returns boolean
     */
  isOfScreen(): boolean {
    return this.getY() > 1001;
  }
}
