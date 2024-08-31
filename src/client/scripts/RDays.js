const getRDays = (date) => {

    const now = new Date();
    
    const travelDate = new Date(date);
    
    const daysLeft = travelDate.getTime() - now.getTime();
    
    const RDays = Math.ceil(daysLeft / (1000 * 3600 * 24));
    
    return RDays;
}

module.exports = {getRDays};