import React, { useEffect, useState } from "react";
import { getEventos, updateEvento, deleteEvento } from "../core/apiCore";

function VerEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventosData = await getEventos();
        setEventos(eventosData);
      } catch (error) {
        setAlert({
          type: "error",
          message: "Error obteniendo los eventos: " + error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleModalOpen = (evento) => {
    setEventoSeleccionado(evento);
    setFormData({
      nombre: evento.nombre,
      lugar: evento.lugar,
      fecha: evento.fecha,
      hora: evento.hora,
      descripcion: evento.descripcion,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    nombre: "",
    lugar: "",
    fecha: "",
    hora: "",
    descripcion: "",
  });

  const handleEdit = async (e) => {
    e.preventDefault(); // Asegura que no se recargue la página por defecto al enviar el formulario
    const eventoEditado = {
      ...eventoSeleccionado,
      ...formData,
    };
    try {
      const updatedEvento = await updateEvento(eventoEditado);
      const updatedEventos = eventos.map((evento) =>
        evento.id === updatedEvento.id ? updatedEvento : evento
      );
      setEventos(updatedEventos);
      setShowModal(false);
      setAlert({
        type: "success",
        message: "¡Evento actualizado exitosamente!",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error actualizando el evento: " + error.message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await deleteEvento(id);
        // Filtrar los eventos y mantener solo los que no coinciden con el id eliminado
        const updatedEventos = eventos.filter((evento) => evento.id !== id);
        setEventos(updatedEventos);
        setAlert({
          type: "success",
          message: "¡Evento eliminado exitosamente!",
        });
      } catch (error) {
        setAlert({
          type: "error",
          message: "Error al eliminar el evento: " + error.message,
        });
      }
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
      {loading ? (
        <p>Cargando eventos...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Lugar
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Hora
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr
                  key={evento.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{evento.nombre}</td>
                  <td className="px-6 py-4">{evento.lugar}</td>
                  <td className="px-6 py-4">{evento.fecha}</td>
                  <td className="px-6 py-4">{evento.hora}</td>
                  <td className="px-6 py-4">{evento.descripcion}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleModalOpen(evento)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(evento.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div
              id="default-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
            >
              <div class="relative p-4 w-full max-w-2xl max-h-full ">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-blue-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Terms of Service
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="default-modal"
                      onClick={handleClose}
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div class="p-4 md:p-5 space-y-4">
                    <form onSubmit={handleEdit}>
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nombre:
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nombre del Evento"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lugar:
                      </label>
                      <input
                        type="text"
                        name="lugar"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Lugar del Evento"
                        required
                        value={formData.lugar}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fecha:
                      </label>
                      <input
                        type="date"
                        name="fecha"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Fecha del Evento"
                        required
                        value={formData.fecha}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hora:
                      </label>
                      <input
                        type="time"
                        name="hora"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Hora del Evento"
                        required
                        value={formData.hora}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Descripción:
                      </label>
                      <textarea
                        name="descripcion"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Descripción del Evento"
                        required
                        value={formData.descripcion}
                        onChange={handleChange}
                      ></textarea>
                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 my-2 mx-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 mx-4 rounded"
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default VerEventos;
