import { Track } from "../dataclass/track/Track";
import { BeatData } from "../dataclass/track/data/BeatData";
import { LevelData } from "../dataclass/track/data/LevelData";
import { SegmentData } from "../dataclass/track/data/SegmentData";

export class LevelGenerator {
  static create(data: any): Track {
    const levelData = data as LevelData;

    const track = new Track();

    track.setTempo(levelData.track.tempo);

    const divider = Math.ceil(
      levelData.segments.length / levelData.beats.length
    );

    this.fillBars(track, levelData.beats, levelData.segments, divider);

    return track;
  }

  /**
   * Loop through beats to spawn notes
   *
   * @param track    track to add rows of notes to
   * @param beats    array of beats of the track
   * @param segments array of segments of the track
   * @param divider  number of how many segments go into a beat
   */
  private static fillBars(
    track: Track,
    beats: BeatData[],
    segments: SegmentData[],
    divider: number
  ): void {
    if (beats.length <= 0) {
      return;
    }

    let currentSegment = 0;

    beats.forEach(() => {
      const spawnNotes = [0, 0, 0, 0];
      for (let segmentIndex = 0; segmentIndex < divider; segmentIndex++) {
        let voiceVectors = [];
        if (segments[currentSegment] === undefined) break;
        voiceVectors = this.findMostPrevelantVoice(segments[currentSegment]);

        for (let voice = 1; voice <= 12; voice++) {
          if (voiceVectors[voice] >= 0.9) {
            if (voice >= 1 && 3 >= voice) {
              spawnNotes[0] = 1;
            } else if (voice >= 4 && 6 >= voice) {
              spawnNotes[1] = 1;
            } else if (voice >= 7 && 9 >= voice) {
              spawnNotes[2] = 1;
            } else if (voice >= 10 && 12 >= voice) {
              spawnNotes[3] = 1;
            }
          }
        }

        currentSegment++;
      }

      track.addRow(spawnNotes);
    });
  }

  /**
   * Look at a segment of the track.
   * Check all 12 notes and find if a clear note is played in that region.
   *
   * @param segment SegmentData
   *
   * @returns array
   */
  private static findMostPrevelantVoice(segment: SegmentData) {
    return segment.pitches.map((voice, index) =>
      voice >= 0.8 && segment.timbre[index] > 5 ? voice : 0
    );
  }

  // private static percentageChance(percentage: number) {
  //   return Math.random() <= percentage;
  // }
}
