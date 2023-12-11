import { Note } from "../../../dataclass/note/Note";
import { Vector } from "../../../dataclass/position/Vector";

describe("Note position functionality", () => {
  let first_note: Note;
  let second_note: Note;

  beforeEach(() => {
    // Notes are 100 pixels in height
    // and 30 pixels in width
    first_note = new Note(new Vector(0, 0));
    second_note = new Note(new Vector(0, 0));
  });

  test("Note intersects with other note", () => {
    expect(first_note.intersects(second_note)).toBe(true);
  });

  test("Note intersects with other note different x coordinate", () => {
    second_note.setX(20);
    expect(first_note.intersects(second_note)).toBe(true);
    second_note.setX(40);
    expect(first_note.intersects(second_note)).not.toBe(true);
  });

  test("Note intersects with other note different y coordinate", () => {
    second_note.setY(50);
    expect(first_note.intersects(second_note)).toBe(true);
    second_note.setY(120);
    expect(first_note.intersects(second_note)).not.toBe(true);
  });

  test("Note transitions to MissedState when intersecting with another note", () => {
    expect(first_note.requestColors().backgroundColor).toEqual(first_note.style.backgroundColor);
    expect(first_note.requestColors().lineColor).toEqual(first_note.style.lineColor);

    second_note.setMissed();

    expect(first_note.requestColors().backgroundColor).toEqual(first_note.style.backgroundColor);
    expect(first_note.requestColors().lineColor).toEqual(first_note.style.lineColor);
  });
});
