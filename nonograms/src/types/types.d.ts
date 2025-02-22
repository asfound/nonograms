declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// State Types
export interface State {
  currentTemplateName: string;
  currentTemplateMatrix: number[][];
  playerMatrix: number[][];
  correctCellsCount: number;
  playerCorrectCellsCount: number;
  isGameOver: boolean;
  elapsedTime: number;
  mode: string;
  sound: boolean;
}

export interface GameState {
  getState: () => State;
  updateState: (update: Partial<State>) => void;
}

export interface StateData {
  name: string;
  matrix: number[][];
  cellsCount: number;
  seconds: number;
}

export interface UserPreferences {
  themeMode: "light" | "dark";
  isSoundOn: boolean;
}

// Game Types
export interface Template {
  name: string;
  icon: string;
  size: number;
  matrix: number[][];
}

export interface CellParams {
  rowIndex: number;
  colIndex: number;
  cellState: number;
}

// Timer Types
export interface Timer {
  timerElement: HTMLElement;
  controls: TimerControls;
}

export interface TimerControls {
  resetTimer: () => void;
  setTimer: (currentSeconds: number) => void;
  stopTimer: () => void;
  startTimer: () => void;
  getSeconds: () => number;
}

// EventEmitter Types
export type Listener = () => void;

export interface EventEmitter {
  on: Function;
  off: Function;
  emit: Function;
  once: Function;
}

// Utils
export interface GameResult {
  name: string;
  size: number;
  seconds: number;
}
