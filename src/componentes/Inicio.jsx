import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Inicio() {
  const [data, setData] = useState([]);
  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pagina-inicio container-fluid py-4">
      <div className="cabecalho mb-4">
        <h1 className="titulo">CATÁLOGO DE FILMES</h1>
        <nav className="menu d-flex justify-content-center">
          <Link to="/" className="menu-item">INÍCIO</Link>
          <Link to="/criar" className="menu-item">CRIAR</Link>
          <Link to="/alterar" className="menu-item">ALTERAR</Link>
          <Link to="/apagar" className="menu-item">APAGAR</Link>
        </nav>
      </div>

      <div className="lista-filmes mx-auto" style={{ maxWidth: 900 }}>
        {data && data.length > 0 ? (
          data.map((filme) => (
            <Link
              to={`/ler/${filme.id}`}
              key={filme.id}
              className="filme-row text-decoration-none"
            >
              <div className="row align-items-center p-3 bg-white border rounded mb-3 filme-card">
                <div className="col-auto">
                  <div className="badge-id">Id: {filme.id}</div>
                </div>
                <div className="col">
                  <strong>Nome: </strong>
                  <span className="nome-filme">{filme.nome}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="alert alert-secondary text-center">Nenhum filme cadastrado ainda.</div>
        )}
      </div>
    </div>
  );
}

export default Inicio;