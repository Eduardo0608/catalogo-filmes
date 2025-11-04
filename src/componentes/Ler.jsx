import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Ler() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  useEffect(() => {
    axios.get(API + id).then(res => setData(res.data)).catch(console.log);
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="border bg-white shadow p-5 rounded w-50">
        <h2>{data.nome}</h2>
        <p><b>Gênero:</b> {data.genero}</p>
        <p><b>Ano:</b> {data.ano}</p>
        <Link to="/alterar" className="btn btn-success me-2">Alterar</Link>
        <Link to="/apagar" className="btn btn-danger me-2">Apagar</Link>
        <Link to="/" className="btn btn-primary">Cancelar</Link>
      </div>
    </div>
  );
}

export default Ler;