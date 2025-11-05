import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Apagar() {
  const [id, setId] = useState("");
  const [filme, setFilme] = useState(null);
  const [naoAchou, setNaoAchou] = useState(false);
  const navigate = useNavigate();

  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  const handleBuscar = () => {
    if (!id) return;
    axios
      .get(API + id)
      .then((res) => {
        setFilme(res.data);
        setNaoAchou(false);
      })
      .catch(() => {
        setFilme(null);
        setNaoAchou(true);
      });
  };

  const handleDelete = () => {
    const confirm = window.confirm("Tem certeza que deseja apagar este filme?");
    if (confirm) {
      axios
        .delete(API + id)
        .then(() => navigate("/"))
        .catch(console.log);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      <div className="border bg-white shadow p-5 rounded w-50">
        <h1>Apagar Filme</h1>

        {!filme && !naoAchou && (
          <>
            <div className="mb-3">
              <label>Digite o ID do filme:</label>
              <input
                className="form-control"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <button onClick={handleBuscar} className="btn btn-danger me-2">
              Buscar
            </button>
            <Link to="/" className="btn btn-primary">
              Cancelar
            </Link>
          </>
        )}

        {filme && (
          <div className="mt-4">
            <h4>Confirmar exclusão:</h4>
            <p><b>Nome:</b> {filme.nome}</p>
            <p><b>Gênero:</b> {filme.genero}</p>
            <p><b>Ano:</b> {filme.ano}</p>
            <button onClick={handleDelete} className="btn btn-danger me-2">
              Apagar
            </button>
            <Link to="/" className="btn btn-primary">
              Cancelar
            </Link>
          </div>
        )}
      </div>

      {naoAchou && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <div className="bg-white p-5 rounded shadow text-center">
            <h4>Filme não encontrado</h4>
            <p className="text-muted">Verifique o ID digitado.</p>
            <Link to="/" className="btn btn-primary mt-3">
              Início
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Apagar;