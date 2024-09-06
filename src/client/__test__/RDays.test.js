const { getRDays } = require("../scripts/RDays.js");



const now = new Date();
const travelDate = new Date("2024-10-15");

const daysLeft = travelDate.getTime() - now.getTime();
    
const RDays = Math.ceil(daysLeft / (1000 * 3600 * 24));

test('the remaining days from now', () => { 
    expect(getRDays(travelDate)).toBe(RDays);
});



