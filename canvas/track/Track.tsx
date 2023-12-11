import { useState } from "react";
import { Vector } from "../../dataclass/position/Vector";
import { Track as TrackData } from "../../dataclass/track/Track";
import { Lane as LaneData } from "../../dataclass/track/Lane";
import { Dimension } from "../../dataclass/position/Dimension";
import { useEffect } from "react";
import { Container } from "@pixi/react";
import { useScore } from "../../hooks/useScore";
import Lane from "./lane/Lane";
import { isLight, pixiColorFromRgb } from "../../../helpers/colorHelpers";
import { Color } from "pixi.js";
import { RGBColor } from "colorthief";
import {saveScoreForSong} from "../../../services/ScoreService";
import {useLocation} from "react-router-dom";
import {getSpotifyProfile} from "../../../services/SpotifyService";
import {SpotifyAuthHeader} from "../../../util/AuthHeader";

type ITrackData = {
  data: TrackData;
  colors: RGBColor[];
};

const AMOUNT_OF_LANES = 4;

const Track = ({ data, colors }: ITrackData) => {
  const [lanes, setLanes] = useState<LaneData[]>([]);
  const [spawnIndices, setSpawnIndices] = useState<number[]>([]);
  const { score } = useScore();
  const song = useLocation().state.song;
  const [currentUser] = SpotifyAuthHeader();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    getSpotifyProfile().then((res) => {
      res.json().then((data) => {
        setProfile(data);
        localStorage.setItem("RYTH_SPOTIFY_USER_ID", data.id);
      });
    });
  }, [currentUser]);

  const userId = localStorage.getItem("RYTH_SPOTIFY_USER_ID");

  const initializeLanes = () => {
    // TODO: Move to global config
    const identifier = ["a", "s", "d", "f"];
    const newLanes = [];
    for (let i = 1; i <= AMOUNT_OF_LANES; i++) {
      newLanes.push(
        new LaneData(
          new Vector((300 / AMOUNT_OF_LANES) * (i - 1), 0),
          new Dimension(window.innerHeight - 95, 300 / AMOUNT_OF_LANES),
          identifier[i - 1],
          colors,
          {
            lineColor: new Color(isLight(colors[0]) ? "black" : "white"),
            backgroundColor: new Color(pixiColorFromRgb(colors[i])),
          }
        )
      );
    }

    setLanes(newLanes);
  };

  /**
   * Set spawn indices to spawn notes, increment track cursor.
   */
  const spawnNotes = () => {
    setSpawnIndices(data.findIndicesToSpawn());
    data.incrementCurrent();
  };

  /**
   * Initialize the lanes and beat clock.
   */
  useEffect(() => {
    if (lanes.length === 0) {
      initializeLanes();

      const beat = (60 / data.getTempo()) * 1000;

      const beatInterval = setInterval(() => {
        spawnNotes();
      }, beat);

      return () => clearInterval(beatInterval);
    }
  }, []);

  /**
   * Triggers when song is finished spawning notes
   */
  useEffect(() => {
    if (data.isFinishedSpawning()) {
      // Set timeout for 8 beats after the final note has been spawned
      setTimeout(() => {
        saveScoreForSong(song.id, score, String(userId));
      }, (60 / data.getTempo()) * 1000 * 8);
    }
  }, [data.isFinishedSpawning()]);

  /**
   * Spawn notes if spawnIndices array is not empty
   */
  useEffect(() => {
    if (spawnIndices.length !== 0) {
      spawnIndices.map((i) => lanes[i]?.spawnNote());
      setLanes(lanes);
      setSpawnIndices([]);
    }
  }, [spawnIndices]);

  return (
    <Container>
      {lanes.map((_: any, i: number) => {
        return <Lane key={i} data={lanes[i]} colors={colors} />;
      })}
    </Container>
  );
};

export default Track;
