import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const startWorker = (id: string) => API.post(`/worker/start/${id}`);
export const stopWorker = (id: string) => API.post(`/worker/stop/${id}`);

// Zalo Auth
export const initZaloLogin = (agentId: string) => API.post(`/account/init-login/${agentId}`);
export const getZaloStatus = (agentId: string) => API.get(`/account/status/${agentId}`);
export const getZaloQr = (agentId: string) => API.get(`/account/qr/${agentId}`);
