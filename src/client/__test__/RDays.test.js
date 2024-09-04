const { getRDays } = require("../scripts/RDays.js");


const date = new Date("2024-09-15");

test('the remaining days from now', () => {
    expect(getRDays(date)).toBe(11);
});