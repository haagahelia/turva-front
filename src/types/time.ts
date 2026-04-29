export interface TimeState {
  sessionStart: number | null;
  activeTime: number;

  startSession: () => void;
  stopSession: () => void;
  updateSession: () => void;
  reset: () => void;
}