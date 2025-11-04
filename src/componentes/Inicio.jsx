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
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="mb-4 text-primary fw-bold">Catálogo de Filmes</h1>

      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/criar" className="btn btn-success">
            Novo Filme
          </Link>
        </div>

        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((filme, i) => (
                <tr key={i}>
                  <td>{filme.id}</td>
                  <td>{filme.nome}</td>
                  <td>
                    <Link
                      to={`/ler/${filme.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Ler
                    </Link>
                    <Link
                      to="/alterar"
                      className="btn btn-sm btn-warning me-2"
                    >
                      Alterar
                    </Link>
                    <Link
                      to="/apagar"
                      className="btn btn-sm btn-danger"
                    >
                      Apagar
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-muted">
                  Nenhum filme cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inicio;