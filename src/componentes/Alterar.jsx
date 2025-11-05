import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Alterar() {
  const [id, setId] = useState("");
  const [values, setValues] = useState({ nome: "", genero: "", ano: "" });
  const [encontrado, setEncontrado] = useState(false);
  const [naoAchou, setNaoAchou] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  const handleBuscar = () => {
    if (!id) {
      setErro("Digite um ID válido antes de procurar.");
      return;
    }

    setErro("");
    axios
      .get(API + id)
      .then((res) => {
        setValues(res.data);
        setEncontrado(true);
        setNaoAchou(false);
      })
      .catch(() => {
        setEncontrado(false);
        setNaoAchou(true);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!values.nome || !values.genero || !values.ano) {
      setErro("Preencha todos os campos antes de salvar!");
      return;
    }

    setErro("");
    axios
      .put(API + id, values)
      .then(() => navigate("/"))
      .catch(() => setErro("Erro ao atualizar o filme. Tente novamente."));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      <div className="border bg-white shadow p-5 rounded w-50 position-relative">
        <h1>Alterar Filme</h1>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <div>
          {!encontrado && (
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
                Procurar
              </button>
              <Link to="/" className="btn btn-primary">
                Cancelar
              </Link>
            </>
          )}

          {encontrado && (
            <form onSubmit={handleUpdate} className="mt-4">
              <div className="mb-2">
                <label>Nome:</label>
                <input
                  className="form-control"
                  value={values.nome}
                  onChange={(e) =>
                    setValues({ ...values, nome: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label>Gênero:</label>
                <input
                  className="form-control"
                  value={values.genero}
                  onChange={(e) =>
                    setValues({ ...values, genero: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label>Ano:</label>
                <input
                  className="form-control"
                  value={values.ano}
                  onChange={(e) =>
                    setValues({ ...values, ano: e.target.value })
                  }
                />
              </div>

              <button className="btn btn-success me-2">Salvar Alterações</button>
              <Link to="/" className="btn btn-primary">
                Cancelar
              </Link>
            </form>
          )}
        </div>
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

export default Alterar;