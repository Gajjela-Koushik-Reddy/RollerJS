import {Roller} from './Roller';

describe("Smoke test", ()=> {
  test("The test scaffold runs successfully.", ()=> {
    expect(true).toBe(true);
  });
})

describe("Roller tests", () => {
  let roller: Roller;

  beforeEach(() => {
    roller = new Roller(6); // create a new Roller object before each test
  });

  test("Rolling a valid value updates the last roll and distribution.", () => {
    // roll a valid value
    const value = 3;
    roller.roll(value);

    // check that the last roll was updated correctly
    expect(roller.last()).toBe(value);

    // check that the distribution was updated correctly
    const distribution = roller.distribution();
    expect(distribution.get(value)).toBe(1);
    expect(distribution.get(1)).toBe(0); // all other faces should have 0 rolls
    expect(distribution.get(6)).toBe(0);
  });

  test("Rolling an invalid value doesn't update the last roll or distribution.", () => {
    // roll an invalid value
    const value = 7;
    roller.roll(value);

    // check that the last roll and distribution were not updated
    expect(roller.last()).toBe(0);

    const distribution = roller.distribution();
    expect(distribution.get(value)).toBeUndefined();
    expect(distribution.get(1)).toBe(0); // all other faces should still have 0 rolls
    expect(distribution.get(6)).toBe(0);
  });

  test("Getting the distribution returns a map with correct values.", () => {
    // roll several values to build up the distribution
    roller.roll(1);
    roller.roll(2);
    roller.roll(3);
    roller.roll(2);
    roller.roll(1);
    roller.roll(1);

    // check that the distribution map has the correct values
    const distribution = roller.distribution();
    expect(distribution.get(1)).toBe(3);
    expect(distribution.get(2)).toBe(2);
    expect(distribution.get(3)).toBe(1);
    expect(distribution.get(4)).toBe(0); // all other faces should have 0 rolls
    expect(distribution.get(5)).toBe(0);
    expect(distribution.get(6)).toBe(0);
  });

  test("Rolling with less than 2 faces defaults to a 6-sided die.", () => {
    // create a roller with only 1 face
    const roller = new Roller(1);

    // roll a valid value and check that it defaults to 6
    roller.roll(6);
    expect(roller.last()).toBe(6);

    // check that the distribution map has a key for 6
    const distribution = roller.distribution();
    expect(distribution.get(6)).toBe(1);
  });
});
