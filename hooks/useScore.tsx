import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Score } from "../dataclass/score/Score";

interface ScoreContextProps {
  score: Score;
  updateScore: Dispatch<SetStateAction<Score>>;
}

const ScoreContext = React.createContext({} as ScoreContextProps);

interface ScoreProps {
  children?: ReactNode;
}

export const ScoreProvider = ({ children }: ScoreProps) => {
  const [score, setScore] = useState<Score>(new Score());

  return (
    <ScoreContext.Provider value={{ score, updateScore: setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const { score, updateScore } = useContext(ScoreContext);
  return { score, updateScore };
};
