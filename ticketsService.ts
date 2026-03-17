import apiClient from './apiClient'
export async function addTickets(payload:any){ const res = await apiClient.post('/tickets', payload); return res.data }
export async function getPending(){ const res = await apiClient.get('/tickets/pending'); return res.data }
export async function payPending(){ const res = await apiClient.post('/tickets/pay-pending'); return res.data }
