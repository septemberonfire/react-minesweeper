import { emptyFieldGenerator, CellState, fieldGenerator } from "./Field";

const { empty, bomb, hidden } = CellState;

describe("Field Generator", () => {
  describe("emptyFieldGenerator tests", () => {
    it("2x2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });

    it("3x3", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });

    it("3x3 with hidden state", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe("Simple cases", () => {
    it("Wrong dencity", () => {
      const errorText = "Propability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    it("Smallest possible field without mine", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]])
    });
    it("Big field without mine", () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty,],
      ])
    });

    it("Smallest possible field with mine", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it("2x2 field with mines", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });

    it("2x2 field with 50% mines", () => {
      expect(fieldGenerator(2, 0.5)).toStrictEqual([
        [bomb, bomb],
        [empty, empty],
      ]);
    });

    it("4x4 field with 50% mines", () => {
      expect(fieldGenerator(4, 0.5)).toStrictEqual([
        [bomb, bomb, bomb, bomb],
        [bomb, bomb, bomb, bomb],
        [empty, empty, empty, empty],
        [empty, empty, empty, empty],
      ]);
    });

    it("2x2 field with 50% mines", () => {
      const field = fieldGenerator(2, 0.5)
      const flatField = field.flat()

      console.table(field)
      console.table(flatField)

      const cellsWithBombs = flatField.filter((cell) => cell === bomb)
      const emptyCells = flatField.filter((cell) => cell === empty)

      expect(cellsWithBombs).toHaveLength(2)
      expect(emptyCells).toHaveLength(2)
    });
  });
});
