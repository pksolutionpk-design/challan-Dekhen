// SAMPLE DATA ONLY - not real challans
const sample = {
  'ABC-123': [
    {psid:'SAMPLE-1001-2026',violation:'Over speeding',amount:1500,date:'2026-10-21 09:14',location:'Shahrah-e-Faisal, Karachi',status:'unpaid'},
    {psid:'SAMPLE-1002-2026',violation:'Signal violation',amount:1000,date:'2026-09-02 18:40',location:'Teen Talwar, Clifton',status:'paid'},
    {psid:'SAMPLE-1003-2026',violation:'Seat belt not fastened',amount:500,date:'2026-08-11 12:05',location:'University Road',status:'unpaid'}],
};
module.exports = { name:'mock', async lookup(plate){ return { sample:true, plate, challans: sample[plate] || [] }; } };
