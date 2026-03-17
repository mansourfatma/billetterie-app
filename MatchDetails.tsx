import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMatchById, getMatchAvailability } from '../api/matcheService'
export default function MatchDetails(){
  const { id } = useParams(); const [match,setMatch]=useState<any|null>(null); const [avail,setAvail]=useState<any|null>(null)
  useEffect(()=>{ (async ()=>{ if(!id) return; try{ const m = await getMatchById(id); setMatch(m.data || m); const a = await getMatchAvailability(id); setAvail(a.data || a) }catch(e){ console.error(e) } })() },[id])
  if(!match) return <div className="p-6">Chargement...</div>
  return (<div className="container mx-auto p-6"><h2 className="text-2xl font-bold">{match.homeTeam.name} vs {match.awayTeam.name}</h2><div className="mt-4 grid md:grid-cols-3 gap-4"><div className="bg-white p-4 rounded shadow"><p>Date: {new Date(match.date).toLocaleString()}</p><p>Stade: {match.stadium.name} ({match.stadium.city})</p></div><div className="bg-white p-4 rounded shadow md:col-span-2"><h3 className="font-semibold">Disponibilités</h3>{avail ? (<div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">{Object.entries(avail.data?.categories||avail.categories||{}).map(([k,v]:any)=>(<div key={k} className="p-3 border rounded bg-gray-50"><div className="flex justify-between"><div className="font-bold">{k}</div><div>{v.availableSeats}/{v.totalSeats} dispo</div></div><div className="mt-2">Prix: {v.price}€</div></div>))}</div>) : <div>Chargement disponibilités...</div>}</div></div></div>)
}
