import {SERVICES,ls} from './lib.jsx'
const emps=()=>ls('employees').map(e=>e.name)
export const clientFields=[
{k:'id',l:'Client ID',ro:1},
{k:'name',l:'Client Name',req:1,s:'Client Information'},{k:'company',l:'Company Name',req:1},{k:'person',l:'Contact Person',req:1},
{k:'mobile',l:'Mobile Number',req:1,mob:1},{k:'alt',l:'Alternate Mobile Number',mob:1},{k:'email',l:'Email Address',t:'email',req:1},
{k:'website',l:'Website URL'},{k:'address',l:'Company Address',full:1},{k:'city',l:'City'},{k:'state',l:'State'},{k:'pincode',l:'Pincode'},
{k:'services',l:'Services',t:'multi',o:SERVICES,req:1,full:1,s:'Service Information'},
{k:'type',l:'Client Type',t:'select',o:['New','Existing','Enterprise','Startup'],s:'Business Information'},
{k:'joining',l:'Project Start Date',t:'date',req:1},{k:'duration',l:'Contract Duration',t:'select',o:['1 Month','3 Months','6 Months','12 Months']},
{k:'package',l:'Monthly Package Amount',t:'number',req:1},{k:'payment',l:'Payment Status',t:'select',o:['Paid','Pending','Overdue'],d:'Pending'},
{k:'status',l:'Client Status',t:'select',o:['Active','Inactive'],d:'Active'},
{k:'employee',l:'Assigned Employee',t:'select',o:emps,s:'Additional Information'},
{k:'requirements',l:'Client Requirements',t:'textarea',full:1},{k:'notes',l:'Notes',t:'textarea',full:1}]
export const empFields=[
{k:'id',l:'Employee ID',ro:1},
{k:'name',l:'Employee Name',req:1,s:'Personal Details'},{k:'photo',l:'Profile Photo',t:'file'},
{k:'gender',l:'Gender',t:'select',o:['Male','Female','Other']},{k:'dob',l:'Date of Birth',t:'date'},
{k:'mobile',l:'Mobile Number',req:1,mob:1},{k:'email',l:'Email Address',t:'email',req:1},
{k:'address',l:'Address',full:1},{k:'emergency',l:'Emergency Contact',mob:1},
{k:'designation',l:'Designation',req:1,s:'Professional Details'},{k:'department',l:'Department',req:1},
{k:'joining',l:'Joining Date',t:'date',req:1},{k:'etype',l:'Employment Type',t:'select',o:['Full-time','Part-time','Contract','Intern']},
{k:'manager',l:'Reporting Manager'},{k:'projects',l:'Assigned Projects'},{k:'status',l:'Employee Status',t:'select',o:['Active','Inactive'],d:'Active'},
{k:'basic',l:'Basic Salary',t:'number',req:1,s:'Salary Details'},{k:'allowances',l:'Allowances',t:'number',d:0},{k:'deductions',l:'Deductions',t:'number',d:0},
{k:'net',l:'Net Salary',ro:1}]
export const invFields=[
{k:'id',l:'Invoice ID',ro:1},
{k:'client',l:'Client Name',t:'select',o:()=>ls('clients').map(c=>c.name),req:1},
{k:'date',l:'Invoice Date',t:'date',req:1,d:new Date().toISOString().slice(0,10)},{k:'due',l:'Due Date',t:'date',req:1},
{k:'desc',l:'Service Description',t:'textarea',full:1,req:1},{k:'amount',l:'Amount',t:'number',req:1},{k:'gst',l:'GST %',t:'number',d:18},
{k:'status',l:'Payment Status',t:'select',o:['Paid','Pending','Overdue'],d:'Pending'},{k:'total',l:'Total Amount',ro:1}]
