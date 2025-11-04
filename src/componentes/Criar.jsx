import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Criar() {
  const [values, setValues] = useState({ nome: '', genero: '', ano: '' });
  const navigate = useNavigate();
  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, values).then(() => navigate('/')).catch(console.log);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="border bg-white shadow p-5 rounded w-50">
        <h1>Criar Filme</h1>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Nome" onChange={e => setValues({ ...values, nome: e.target.value })} />
          <input className="form-control mb-2" placeholder="Gênero" onChange={e => setValues({ ...values, genero: e.target.value })} />
          <input className="form-control mb-3" placeholder="Ano" onChange={e => setValues({ ...values, ano: e.target.value })} />
          <button className="btn btn-success">Criar</button>
          <Link to="/" className="btn btn-primary ms-2">Cancelar</Link>
        </form>
      </div>
    </div>
  );
}

export default Criar;