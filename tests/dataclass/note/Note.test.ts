import { Note } from "../../../dataclass/note/Note";

describe("Note functionality", () => {
  let note: Note;

  beforeEach(() => {
    note = new Note();
  });

  test("Note is created", () => {
    expect(note).toBeTruthy();
  });

  test("Note has correct worth", () => {
    expect(note.getWorth()).toEqual(100);
  });

  test("Note transitions to InvisibleState when setInvisible() is called", () => {
    note.setInvisible();
    expect(note.isVisible()).toBe(false);
  });

  test("Note transitions to MissedState when setMissed() is called", () => {
    note.setMissed();
    expect(note.requestColors().backgroundColor).toEqual(note.style.backgroundColor);
    expect(note.requestColors().lineColor).toEqual(note.style.lineColor);
  });
});
