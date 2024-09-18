import React from 'react';
import Estudiantes from './components/Estudiantes';
import Cursos from './components/Cursos';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Estudiantes y Cursos</h1>
      <Estudiantes />
      <Cursos />
    </div>
  );
}

export default App;
