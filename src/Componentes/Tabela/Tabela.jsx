import React from "react";

const Tabela = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ponto</th>
          <th>Sinal (dbm)</th>
          <th>Ruído (dbm)</th>
          <th>S/N (db)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td className="SinalPontoA">0</td>
          <td className="RuidoPontoA">0</td>
          <td className="SNA">0</td>
        </tr>
        <tr>
          <td>B</td>
          <td className="SinalPontoB">0</td>
          <td className="RuidoPontoB">0</td>
          <td className="SNB">0</td>
        </tr>
        <tr>
          <td>C</td>
          <td className="SinalPontoC">0</td>
          <td className="RuidoPontoC">0</td>
          <td className="SNC">0</td>
        </tr>
        <tr>
          <td>D</td>
          <td className="SinalPontoD">0</td>
          <td className="RuidoPontoD">0</td>
          <td className="SND">0</td>
        </tr>
      </tbody>
    </table>
  );
};

export { Tabela };
