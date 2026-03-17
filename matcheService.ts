import apiClient from './apiClient'
export async function getAllMatchesAvailability(){ const res = await apiClient.get('/matches/availability'); return res.data }
export async function getMatchById(id:any){ const res = await apiClient.get(`/matches/${id}`); return res.data }
export async function getMatchAvailability(id:any){ const res = await apiClient.get(`/matches/${id}/availability`); return res.data }
