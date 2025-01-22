export type Season = {
  id: string;
  name: string;
  players: string[];
  progress: string;
  results?: { [player: string]: number };
};
