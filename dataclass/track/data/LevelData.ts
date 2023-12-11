import { BarData } from "./BarData";
import { BeatData } from "./BeatData";
import { SectionData } from "./SectionData";
import { SegmentData } from "./SegmentData";
import { TatumData } from "./TatumData";
import { TrackData } from "./TrackData";
import { TrackMetaData } from "./TrackMetaData";

export type LevelData = {
  meta: TrackMetaData;
  track: TrackData;
  bars: BarData[];
  beats: BeatData[];
  sections: SectionData[];
  segments: SegmentData[];
  tatums: TatumData[];
};
