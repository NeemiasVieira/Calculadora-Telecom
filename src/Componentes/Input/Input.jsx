import React from "react";
import { useState } from "react";

const Input = (props) => {
  const VerificaNumero = (e) => {
    const c = e.key.charCodeAt();
    if (
      (c >= 48 && c <= 57) ||
      c === 46 ||
      c === 9 ||
      c === 8 ||
      c === 13 ||
      c === 45 ||
      c === 66 ||
      c === 68
    ) {
      setNumeroPermitido(true);
    } else {
      setNumeroPermitido(false);
    }
  };

  const [numeroPermitido, setNumeroPermitido] = useState(true);

  return (
    <div className="divInput">
      <label htmlFor="">{props.name}</label>
      <div className="inputESelect">
        <input
          type="text"
          name=""
          id={props.id}
          className="input"
          placeholder="Digite um valor"
          value={props.variavel}
          onKeyDown={(e) => VerificaNumero(e)}
          onChange={(e) => {
            numeroPermitido
              ? props.setstate(e.target.value)
              : (e.target.value = "");
          }}
        />
        <select name="" id={props.operador}>
          <option value="db">db</option>
          <option value="W">W</option>
          <option value="mW">mW</option>
          <option value="µW">µW</option>
          <option value="nW">nW</option>
          <option value="pW">pW</option>
        </select>
      </div>
    </div>
  );
};

export { Input };
