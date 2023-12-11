import { Note } from "../note/Note";
import { Dimension } from "../position/Dimension";
import { PositionAware } from "../position/PositionAware";
import { Vector } from "../position/Vector";
import { Hitbox } from "./HitBox";
import { INoteStyle } from "../note/INoteStyle";
import { colors } from "@mui/material";
import { Color } from "pixi.js";
import { isLight } from "../../../helpers/colorHelpers";
import { RGBColor } from "colorthief";

export class Lane extends PositionAware {
  notes: Note[];
  identifier: string;
  hitbox: Hitbox;
  noteStyle?: INoteStyle;

  constructor(
    position: Vector,
    dimension: Dimension,
    identifier: string,
    colors: RGBColor[],
    noteStyle?: INoteStyle
  ) {
    super(position, dimension);
    this.notes = [];
    this.identifier = identifier;
    this.noteStyle = noteStyle;
    this.hitbox = new Hitbox(
      new Vector(this.position.getX(), window.innerHeight * 0.6),
      new Dimension(100, this.dimension.getWidth()),
      new Color(isLight(colors[0]) ? "#000" : "#fff")
    );
  }

  /**
   * Spawn a note from the top of a lane
   */
  spawnNote(): void {
    this.notes.push(
      new Note(
        new Vector(this.position.getX(), this.position.getY()),
        this.noteStyle
      )
    );
  }

  /**
   * Get all notes that have spawned in this lane
   *
   * @returns Note[] | array of notes
   */
  getNotes(): Note[] {
    return this.notes;
  }

  /**
   * Get the lane's identifying keycode
   *
   * @returns string
   */
  getIdentifier(): string {
    return this.identifier;
  }

  /**
   * Get all visible notes that are in the lane
   *
   * @returns Note[] | array of visible notes
   */
  getVisibleNotes(): Note[] {
    return this.notes.filter((note) => note.isVisible());
  }

  /**
   * Get note that is closest to the bottom of the lane
   *
   * @returns Note or null | Note or if lane is empty nothing
   */
  getBottomNote(): Note | null {
    const visibleNotes = this.getVisibleNotes();
    if (visibleNotes.length > 0) {
      visibleNotes.reverse();
      let lowest = null;
      visibleNotes.map((note) => {
        if (note.getY() <= 700) {
          lowest = note;
        }
      });
      return lowest;
    }

    return null;
  }

  /**
   * Hide note that is closest to the bottom of the lane
   */
  hideBottomNote() {
    this.getBottomNote()?.setInvisible();
  }
}
