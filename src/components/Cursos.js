import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre_curso: '',
    descripcion: '',
    creditos: ''
  });

  // Obtener todos los cursos
  useEffect(() => {
    axios.get('http://localhost:4000/cursos')
      .then(response => setCursos(response.data))
      .catch(error => console.log(error));
  }, []);

  // Manejar el envío del formulario para crear un curso
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/cursos', nuevoCurso)
      .then(response => {
        setCursos([...cursos, response.data]);
        setNuevoCurso({ nombre_curso: '', descripcion: '', creditos: '' });
      })
      .catch(error => console.log(error));
  };

  // Manejar la eliminación de un curso
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/cursos/${id}`)
      .then(() => {
        setCursos(cursos.filter(curso => curso.id_curso !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Gestión de Cursos</h2>
      
      {/* Formulario para agregar un curso */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del curso" value={nuevoCurso.nombre_curso} onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre_curso: e.target.value })} required />
        <input type="text" placeholder="Descripción" value={nuevoCurso.descripcion} onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })} required />
        <input type="number" placeholder="Créditos" value={nuevoCurso.creditos} onChange={(e) => setNuevoCurso({ ...nuevoCurso, creditos: e.target.value })} required />
        <button type="submit">Agregar Curso</button>
      </form>

      {/* Listado de cursos */}
      <ul>
        {cursos.map(curso => (
          <li key={curso.id_curso}>
            {curso.nombre_curso} ({curso.descripcion}) 
            <button onClick={() => handleDelete(curso.id_curso)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cursos;
