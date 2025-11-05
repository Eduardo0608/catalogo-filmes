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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="border bg-white shadow p-5 rounded w-50">
        <h1>Apagar Filme</h1>

        {!filme && (
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

            <button onClick={handleBuscar} className="btn btn-success me-2">
              Buscar
            </button>
            <Link to="/" className="btn btn-primary">
              Cancelar
            </Link>

            {naoAchou && (
              <div
                className="mt-4 p-4 rounded text-white text-center"
                style={{
                  backgroundColor: "#dc3545",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              >
                <h5>Filme não encontrado!</h5>
                <p>Verifique o ID digitado ou volte para o início.</p>
                <Link to="/" className="btn btn-light mt-2 fw-bold">
                  Início
                </Link>
              </div>
            )}
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
    </div>
  );
}

export default Apagar;