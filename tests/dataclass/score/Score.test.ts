import { Score } from "../../../dataclass/score/Score";

describe("Test score functionality", () => {
  let score: Score;

  beforeAll(() => {
    score = new Score();
  });

  test("Score has been created succesfully", () => {
    expect(score).toBeTruthy();
  });

  test("Combo increases successfully", () => {
    expect(score.combo).toEqual(0);
    score.incrementCombo();
    expect(score.combo).toEqual(1);
  });

  test("Combo resets successfully", () => {
    score.resetCombo();
    expect(score.combo).toEqual(0);
  });

  test("Combo readable string is correct", () => {
    score.incrementCombo();
    expect(score.readableCombo()).toBe("1x");
  });

  test("Score increases successfully", () => {
    expect(score.score).toEqual(0);
    score.incrementCombo();
    score.scoreSong(50, 100);
    expect(score.score).toEqual(450);
  });

  test("Score readable string is correct", () => {
    score.score = 0;
    expect(score.score).toEqual(0);
    score.incrementCombo();
    score.scoreSong(50, 100);
    expect(score.readableScore()).toBe("450");
  });
});
