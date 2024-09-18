import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fecha_nacimiento: ''
  });

  // Obtener todos los estudiantes
  useEffect(() => {
    axios.get('http://localhost:4000/estudiantes')
      .then(response => setEstudiantes(response.data))
      .catch(error => console.log(error));
  }, []);

  // Manejar el envío del formulario para crear un estudiante
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/estudiantes', nuevoEstudiante)
      .then(response => {
        setEstudiantes([...estudiantes, response.data]);
        setNuevoEstudiante({ nombre: '', apellido: '', correo: '', fecha_nacimiento: '' });
      })
      .catch(error => console.log(error));
  };

  // Manejar la eliminación de un estudiante
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/estudiantes/${id}`)
      .then(() => {
        setEstudiantes(estudiantes.filter(est => est.id_estudiante !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Gestión de Estudiantes</h2>
      
      {/* Formulario para agregar un estudiante */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nuevoEstudiante.nombre} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })} required />
        <input type="text" placeholder="Apellido" value={nuevoEstudiante.apellido} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, apellido: e.target.value })} required />
        <input type="email" placeholder="Correo" value={nuevoEstudiante.correo} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, correo: e.target.value })} required />
        <input type="date" placeholder="Fecha de nacimiento" value={nuevoEstudiante.fecha_nacimiento} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, fecha_nacimiento: e.target.value })} required />
        <button type="submit">Agregar Estudiante</button>
      </form>

      {/* Listado de estudiantes */}
      <ul>
        {estudiantes.map(est => (
          <li key={est.id_estudiante}>
            {est.nombre} {est.apellido} ({est.correo}) 
            <button onClick={() => handleDelete(est.id_estudiante)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estudiantes;
