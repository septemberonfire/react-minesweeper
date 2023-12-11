export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
  empty: 0,
  bomb: 9,
  hidden: 10,
  mark: 2,
  weakMark: 12,
};

export const emptyFieldGenerator = (
  size: number,
  state: Cell = CellState.empty
): Field => new Array(size).fill(null).map(() => new Array(size).fill(state));

export const fieldGenerator = (size: number, propability: number): Field => {
  if (propability < 0 || propability > 1) {
    throw new Error("Propability must be between 0 and 1");
  }

  let unprocessedCells = size * size;
  let restCellsWithBombs = unprocessedCells * propability;

  const result: Field = emptyFieldGenerator(size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (restCellsWithBombs === 0) {
        return result;
      }
      if (restCellsWithBombs / unprocessedCells > Math.random()) {
        result[i][j] = CellState.bomb
        restCellsWithBombs--
      }
      unprocessedCells--
    }
  }

  return result;
};
