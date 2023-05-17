import React from "react";
import Sistema from "./assets/img/Sistema.png";
import { AppStyle } from "./AppStyle";
import { Header } from "./AppStyle";
import { useState, useEffect } from "react";

function converteParaWatts(dbm) {
  if(dbm === 0) return 0
  const W = 10 ** ((dbm - 30) / 10);
  return W;
}

function converteParaDbm(w) {
  if(w === 0) return 0
  const dbm = 10 * Math.log10(w / 1) + 30;
  return dbm;
}

function elevaNum(num, select) {
  const valor = select.value;
  switch (valor) {
    case "db":
      break;
    case "mW":
      num = num * 10 ** -3;
      num = converteParaDbm(num);
      break;
    case "µW":
      num = num * 10 ** -6;
      num = converteParaDbm(num);
      break;
    case "nW":
      num = num * 10 ** -9;
      num = converteParaDbm(num);
      break;
    case "pW":
      num = num * 10 ** -12;
      num = converteParaDbm(num);
      break;
    default:
      num = "";
  }
  return num;
}

function App() {
  let [pontoA, setPontoA] = useState();
  let [at1, setAt1] = useState();
  let [amp, setAmp] = useState();
  let [at2, setAt2] = useState();
  let [potrui, setPotrui] = useState();
  let [sntx, setSntx] = useState();
  const [numeroPermitido, setNumeroPermitido] = useState(true);
  const select1 = document.querySelector("#operador1");
  const select2 = document.querySelector("#operador2");
  const select3 = document.querySelector("#operador3");
  const select4 = document.querySelector("#operador4");
  const select5 = document.querySelector("#operador5");
  const select6 = document.querySelector("#operador6");

  const SinalPontoA = document.querySelector(".SinalPontoA");
  const SinalPontoB = document.querySelector(".SinalPontoB");
  const SinalPontoC = document.querySelector(".SinalPontoC");
  const SinalPontoD = document.querySelector(".SinalPontoD");

  const NA = document.querySelector(".RuidoPontoA");
  const NB = document.querySelector(".RuidoPontoB");
  const NC = document.querySelector(".RuidoPontoC");
  const ND = document.querySelector(".RuidoPontoD");

  const SNa = document.querySelector(".SNA");
  const SNb = document.querySelector(".SNB");
  const SNc = document.querySelector(".SNC");
  const SNd = document.querySelector(".SND");

  const VerificaNumero = (e) => {   
    
    const c = e.key.charCodeAt()
    if ((c >= 48 && c <= 57) || c == 46 || c == 9 || c == 8 || c == 13 || c == 45 || c == 66 || c == 68){
        setNumeroPermitido(true);
        return true;
    }
    else{
        setNumeroPermitido(false);
        return false;
    } 
} 

  function Limpar(e) {
    e.preventDefault();
    const paragrafoDeAlerta = document.querySelector(".alerta");
    paragrafoDeAlerta.classList.add("hide");    
    const inputs = document.getElementsByClassName("input");
    for (let i = 0; i < 6; i++) {
      inputs[i].value = "";
    }
    const input1 = document.querySelector("#focus");
    try{
    SinalPontoA.innerHTML = "0";
    SinalPontoB.innerHTML= "0";
    SinalPontoC.innerHTML = "0";
    SinalPontoD.innerHTML = "0";
    NA.innerHTML = "0";
    NB.innerHTML = "0";
    NC.innerHTML = "0";
    ND.innerHTML = "0";
    SNa.innerHTML = "0";
    SNb.innerHTML = "0";
    SNc.innerHTML = "0";
    SNd.innerHTML = "0";
    }catch{}
    
    setAmp("");
    setAt1("");
    setAt2("");
    setPontoA("");
    setPotrui("");
    setSntx("");

    input1.focus();
  }

  function CalculaSinais(e) {
    e.preventDefault();
    const paragrafoDeAlerta = document.querySelector(".alerta");
    if(!amp || !at1 || !at2 || !pontoA || !potrui || !sntx){     
      paragrafoDeAlerta.classList.remove("hide");
      return 
    }
    paragrafoDeAlerta.classList.add("hide");    
    pontoA = elevaNum(pontoA, select1);
    at1 = elevaNum(at1, select2);
    amp = elevaNum(amp, select3);
    potrui = elevaNum(potrui, select4);
    at2 = elevaNum(at2, select5);
    sntx = elevaNum(sntx, select6);

    const pontob = pontoA - Number(at1);
    const pontoc = pontob + Number(amp);
    const pontod = pontoc - Number(at2);
    SinalPontoA.innerHTML = parseFloat(pontoA).toFixed(2);
    SinalPontoB.innerHTML = pontob.toFixed(2);
    SinalPontoC.innerHTML = pontoc.toFixed(2);
    SinalPontoD.innerHTML = pontod.toFixed(2);
    SNa.innerHTML = parseFloat(sntx).toFixed(2);
    CalculaRuido(pontob, pontoc, pontod);
  }

  function CalculaRuido(pontob, pontoc, pontod) {
    //Ponto A
    const Ntx = -Number(sntx) + Number(pontoA);
    NA.innerHTML = Ntx.toFixed(2);

    //Ponto B
    const Npontob = Number(Ntx) - Number(at1);
    NB.innerHTML = Npontob.toFixed(2);

    // S/N
    SNb.innerHTML = (pontob - Npontob).toFixed(2);

    //Ponto C
    let Npontoc = Number(Npontob) + Number(amp);
    Npontoc = converteParaWatts(Npontoc) + converteParaWatts(potrui);
    Npontoc = converteParaDbm(Npontoc);
    NC.innerHTML = Npontoc.toFixed(2);

    // S/N
    SNc.innerHTML = (pontoc - Npontoc).toFixed(2);

    //Ponto D
    let Npontod = Npontoc - at2;
    ND.innerHTML = Npontod.toFixed(2);

    // S/N
    SNd.innerHTML = (pontod - Npontod).toFixed(2);
  }

  return (
    <>
      <Header>
        TP P1 - Sistemas de Comunicações - Universidade Santa Cecília
        <div>
          <p>Neemias Vieira | RA: 170550</p>
          <p>Matheus Mota | RA: 185318 </p>
        </div>
      </Header>

      <AppStyle>
        <p>
          O sistema a seguir representa um sistema de telecomunicações que
          contêm um dispositivo que envia o sinal, dois atenuantes ao longo do
          fio, um amplificador de sinal e um receptor, você pode preencher o
          formulário para calcular o valor de saída desse sistema de acordo com
          as entradas fornecidas.
        </p>
        <img src={Sistema} alt="" />
        <div className="EntradaSaida">
          <form action="">
            <div className="divInput">
              <label htmlFor="">Ponto A</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id="focus"
                  className="input"
                  placeholder="Digite um valor"
                  value={pontoA}
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setPontoA(e.target.value) : e.target.value = ""}}
                />
                <select name="" id="operador1">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>

            <div className="divInput">
              <label htmlFor="">Atenuação 1</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id=""
                  className="input"
                  placeholder="Digite um valor"
                  value={at1}         
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setAt1(e.target.value) : e.target.value = ""}}
                  
                />
                <select name="" id="operador2">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>

            <div className="divInput">
              <label htmlFor="">Amplificador</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id=""
                  className="input"
                  placeholder="Digite um valor"
                  value={amp}
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setAmp(e.target.value) : e.target.value = ""}}
                />
                <select name="" id="operador3">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>

            <div className="divInput">
              <label htmlFor="">Potência de ruído do Amplificador</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id=""
                  className="input"
                  placeholder="Digite um valor"
                  value={potrui}
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setPotrui(e.target.value) : e.target.value = ""}}
                />
                <select name="" id="operador4">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>

            <div className="divInput">
              <label htmlFor="">Atenuação 2</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id=""
                  className="input"
                  placeholder="Digite um valor"
                  value={at2}
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setAt2(e.target.value) : e.target.value = ""}}
                />
                <select name="" id="operador5">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>
            <div className="divInput">
              <label htmlFor="">S/N no TX</label>
              <div className="inputESelect">
                <input
                  type="text"
                  name=""
                  id=""
                  className="input"
                  placeholder="Digite um valor"
                  value={sntx}
                  onKeyDown={(e) => (VerificaNumero(e))}       
                  onChange={(e) => { numeroPermitido ? setSntx(e.target.value) : e.target.value = ""}}
                />
                <select name="" id="operador6">
                  <option value="db">db</option>
                  <option value="mW">mW</option>
                  <option value="µW">µW</option>
                  <option value="nW">nW</option>
                  <option value="pW">pW</option>
                </select>
              </div>
            </div>
            <p className="alerta hide">Preencha todos os campos!</p>
            <div className="botoes">            
            <button onClick={(e) => CalculaSinais(e)}>Calcular</button>
            <button onClick={(e) => Limpar(e)}>Limpar</button>
            </div>
          </form>

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
        </div>
      </AppStyle>
    </>
  );
}

export default App;
