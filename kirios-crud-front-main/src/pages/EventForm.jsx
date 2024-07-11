import React, { useEffect, useState } from "react";
import { registerEvento } from "../core/apiCore";

function EventForm() {
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventoData = {
      nombre: formData.get("nombre"),
      lugar: formData.get("lugar"),
      fecha: formData.get("fecha"),
      hora: formData.get("hora"),
      descripcion: formData.get("descripcion"),
    };

    try {
      const newEvent = await registerEvento(eventoData);
      setAlert({
        type: "success",
        message: "Evento registrado con éxito",
      });
      console.log(newEvent);
      //limpiar los campos
        event.target.reset();
    } catch (error) {
      alert("Error registrando el evento: " + error.message);
      setAlert({
        type: "error",
        message: "Error registrando el evento: " + error.message,
      });
    }
  };

  useEffect(() => {
    let timeout;
    if (alert) {
      timeout = setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {alert && (
        <div
        className={`absolute top-0 left-0 right-0 z-50 p-4 mb-4 text-sm text-white rounded-lg ${
          alert.type === "success" ? "text-green-500" : "text-red-500"
        } dark:bg-gray-800`}
        role="alert"
      >
        <span className="font-medium">{alert.message}</span>
      </div>
      )}
      <form
        className="max-w-sm mx-auto w-4/5 bg-gray-900 p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre del Evento
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre del Evento"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="lugar"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lugar del Evento
          </label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Lugar del Evento"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fecha"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha del Evento
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="hora"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Hora del Evento
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripción del Evento
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Descripción del Evento"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Evento
        </button>
      </form>
    </div>
  );
}

export default EventForm;
