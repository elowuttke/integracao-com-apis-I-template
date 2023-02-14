import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`;

function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const headers = {
    headers: {
      Authorization: "eloisa-wuttke-conway",
    },
  };

  const recebeUsuarioPorId = (id) => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        headers
      )
      .then((resposta) => {
        setUsuario(resposta.data);
        setEmail(resposta.data.email);
      })
      .catch((erro) => {
        alert(erro.response.data.message);
      });
  };

  const editaUsuario = () => {
    const novoUsuario = {
      name: nome,
      email: email,
    };
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        novoUsuario,
        headers
      )
      .then((resposta) => {
        console.log(resposta);
        recebeUsuarioPorId(usuario.id);
        setEditar(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const removeUsuario = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        headers
      )
      .then(() => {
        props.recebeUsuarios();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    recebeUsuarioPorId(usuario.id);
  }, []);

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={editaUsuario}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => removeUsuario(usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
