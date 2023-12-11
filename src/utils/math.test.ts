import { add } from "./math";

describe('check module added', () => {
  it('Check add function', () => {
    expect(add(1,2)).toBe(3)
    expect(add(2,2)).toBe(4)
    expect(add(5,5)).toBe(10)
  })
})