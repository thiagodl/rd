import React from 'react';
import { useState } from "react";
import './App.css';

function Cadastrar() {

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  let insertClient = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name,
        cpf: cpf,
        birthDate: birthDate,
        phone: phone
       })
    };
    //console.log(requestOptions.body);
    fetch('http://localhost:8000/api/clients', requestOptions)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(function() {
      window.location.href = "/";
    });
  };

  return (
    <div >
      <div className="jumbotron p-3">
        <h1 className="display-6 p-3">Inserir Novo Cliente</h1>
          <div className="dados m-3 m-3">
            <hr></hr>
            <form onSubmit={insertClient}>
              <input type="text" className="mb-2" value={name} placeholder="Nome Completo" onChange={(e) => setName(e.target.value)}/><br></br>
              <input type="text" className="mb-2" value={cpf} placeholder="CPF" onChange={(e) => setCpf(e.target.value)}/><br></br>
              <input type="text" className="mb-2" value={birthDate} placeholder="Data de Nascimento" onChange={(e) => setBirthDate(e.target.value)}/><br></br>
              <input type="text" className="mb-2" value={phone} placeholder="Telefone" onChange={(e) => setPhone(e.target.value)}/><br></br>
              <button type="submit" value="Buscar" className="btn-primary btn-sm m-1">Enviar</button>
            </form>
          </div>
      </div>
    </div>
  );

}

export default Cadastrar;