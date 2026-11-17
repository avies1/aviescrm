import {useParams,useNavigate} from 'react-router-dom'
import {useLS,uid,Card,RecordForm,useToast} from '../lib.jsx'
import {clientFields} from '../config.js'
export default function NewClient(){
const {id}=useParams(),[rows,setRows]=useLS('clients'),nav=useNavigate(),toast=useToast(),cur=rows.find(r=>r.id===id)
const save=v=>{if(cur)setRows(rows.map(r=>r.id===id?{...r,...v}:r));else setRows([{...v,id:uid('CL',rows)},...rows]);toast(cur?'Client updated successfully':'Client saved successfully');nav('/clients')}
return <div className="space-y-4"><h1 className="text-2xl font-bold">{cur?'Edit Client '+id:'New Client'}</h1><Card><RecordForm key={id||'new'} fields={clientFields} value={cur} onSubmit={save} onCancel={()=>nav('/clients')} saveLabel="Save Client"/></Card></div>}
