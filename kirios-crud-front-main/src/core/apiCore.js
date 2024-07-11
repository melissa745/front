import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const apiCore = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export const registerEvento = async (eventoData) => {
  try {
    const response = await apiCore.post("eventos/", eventoData);
    return response.data;
  } catch (error) {
    throw new Error("Error registrando el evento: " + error.message);
  }
};

export const getEventos = async () => {
  try {
    const response = await apiCore.get("eventos/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo los eventos: " + error.message);
  }
}

export const updateEvento = async (evento) => {
  try {
    const response = await apiCore.put(`eventos/${evento.id}/`, evento);
    return response.data;
  } catch (error) {
    throw new Error("Error actualizando el evento: " + error.message);
  }
};


export const deleteEvento = async (id) => {
  try {
    const response = await apiCore.delete(`eventos/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error("Error eliminando el evento: " + error.message);
  }
};