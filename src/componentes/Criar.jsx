import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Criar() {
  const [values, setValues] = useState({ nome: "", genero: "", ano: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const API = "https://690a1f4b1a446bb9cc216ff6.mockapi.io/filmes/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.nome || !values.genero || !values.ano) {
      setErro("Preencha todos os campos antes de criar o filme!");
      return;
    }

    setErro("");
    axios
      .post(API, values)
      .then(() => navigate("/"))
      .catch(() => setErro("Erro ao criar o filme. Tente novamente."));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="border bg-white shadow p-5 rounded w-50">
        <h1>Criar Filme</h1>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Nome:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Digite o nome"
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
              type="text"
              placeholder="Digite o gênero"
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
              type="text"
              placeholder="Digite o ano"
              value={values.ano}
              onChange={(e) => setValues({ ...values, ano: e.target.value })}
            />
          </div>

          <button className="btn btn-success me-2" type="submit">
            Criar
          </button>
          <Link to="/" className="btn btn-primary">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Criar;