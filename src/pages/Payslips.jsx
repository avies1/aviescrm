import {useState} from 'react'
import {Eye,Download,Printer} from 'lucide-react'
import {useLS,Card,Logo,Modal,Empty,btn,btn2,inp,inr,MONTHS,savePdf,useToast} from '../lib.jsx'
const rowsOf=p=>[['Employee',p.name+' ('+p.eid+')'],['Designation',p.desig],['Department',p.dept],['Salary Month',MONTHS[p.m]+' '+p.y],['Basic Salary',inr(p.basic)],['HRA',inr(p.hra)],['Allowances',inr(p.allow)],['Bonus',inr(p.bonus)],['Total Earnings',inr(p.earn)],['PF',inr(p.pf)],['Professional Tax',inr(p.pt)],['Deductions',inr(p.ded)],['Total Deductions',inr(p.tded)],['NET SALARY',inr(p.net)]]
const pdf=p=>savePdf('PAYSLIP','AVIES - Salary Slip for '+MONTHS[p.m]+' '+p.y,rowsOf(p),`Payslip_${p.name.replace(/ /g,'_')}_${MONTHS[p.m]}_${p.y}.pdf`)
export default function Payslips(){
const [emps]=useLS('employees'),[ps,setPs]=useLS('payslips'),toast=useToast(),now=new Date()
const [emp,setEmp]=useState(''),[m,setM]=useState(now.getMonth()),[y,setY]=useState(now.getFullYear()),[bonus,setBonus]=useState(0),[q,setQ]=useState(''),[fm,setFm]=useState(''),[fy,setFy]=useState(''),[v,setV]=useState(null)
const gen=()=>{const e=emps.find(x=>x.id===emp)||emps[0];if(!e)return toast('Add an employee first')
if(ps.some(p=>p.eid===e.id&&p.m===m&&p.y===y))return toast('Payslip already exists for this month')
const basic=+e.basic,hra=Math.round(basic*.4),allow=+e.allowances,b=+bonus,pf=Math.round(basic*.12),pt=200,ded=+e.deductions,earn=basic+hra+allow+b,tded=ded+pf+pt
const p={id:'PS'+Date.now(),eid:e.id,name:e.name,desig:e.designation,dept:e.department,m,y,basic,hra,allow,bonus:b,ded,pf,pt,earn,tded,net:earn-tded}
setPs([p,...ps]);toast('Payslip generated');setV(p)}
const list=ps.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())&&(fm===''||p.m===+fm)&&(!fy||p.y===+fy))
return <div className="space-y-4"><h1 className="text-2xl font-bold">Payslips</h1>
<Card className="flex flex-wrap gap-3 items-end"><select className={inp+' !w-auto'} value={emp||emps[0]?.id} onChange={x=>setEmp(x.target.value)}>{emps.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
<select className={inp+' !w-auto'} value={m} onChange={x=>setM(+x.target.value)}>{MONTHS.map((n,i)=><option key={n} value={i}>{n}</option>)}</select>
<select className={inp+' !w-auto'} value={y} onChange={x=>setY(+x.target.value)}>{[y-1,y,y+1].map(n=><option key={n}>{n}</option>)}</select>
<input type="number" className={inp+' !w-32'} placeholder="Bonus" value={bonus} onChange={x=>setBonus(x.target.value)}/><button className={btn} onClick={gen}>Generate Payslip</button></Card>
<Card><div className="flex flex-wrap gap-3 mb-4"><input className={inp+' flex-1 min-w-[200px]'} placeholder="Search by employee name..." value={q} onChange={x=>setQ(x.target.value)}/>
<select className={inp+' !w-auto'} value={fm} onChange={x=>setFm(x.target.value)}><option value="">All Months</option>{MONTHS.map((n,i)=><option key={n} value={i}>{n}</option>)}</select>
<select className={inp+' !w-auto'} value={fy} onChange={x=>setFy(x.target.value)}><option value="">All Years</option>{[...new Set(ps.map(p=>p.y))].map(n=><option key={n}>{n}</option>)}</select></div>
<div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-soft text-left">{['Employee','ID','Month','Earnings','Deductions','Net Salary','Actions'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead>
<tbody>{list.map(p=><tr key={p.id} className="border-t"><td className="p-3">{p.name}</td><td className="p-3">{p.eid}</td><td className="p-3">{MONTHS[p.m]} {p.y}</td><td className="p-3">{inr(p.earn)}</td><td className="p-3">{inr(p.tded)}</td><td className="p-3 font-semibold">{inr(p.net)}</td>
<td className="p-3"><div className="flex gap-2 text-azure"><button title="View" onClick={()=>setV(p)}><Eye size={16}/></button><button title="PDF" onClick={()=>pdf(p)}><Download size={16}/></button></div></td></tr>)}</tbody></table>{!list.length&&<Empty t="No payslips generated yet"/>}</div></Card>
{v&&<Modal wide title="Payslip" onClose={()=>setV(null)}><div id="slip" className="border rounded-lg p-5"><div className="flex justify-between items-center border-b-2 border-azure pb-3 mb-3"><Logo size={44}/><div className="text-right"><div className="font-bold text-azure">AVIES</div><div className="text-xs">Payslip - {MONTHS[v.m]} {v.y}</div></div></div>
{rowsOf(v).map(([a,b],i)=><div key={a} className={'flex justify-between py-1.5 px-2 text-sm '+(i%2?'bg-soft':'')+(a==='NET SALARY'?' font-bold text-azure':'')}><span>{a}</span><span>{b}</span></div>)}</div>
<div className="flex justify-end gap-2 mt-4"><button className={btn2} onClick={()=>pdf(v)}><Download size={16}/>PDF</button><button className={btn} onClick={()=>window.print()}><Printer size={16}/>Print</button></div></Modal>}</div>}
