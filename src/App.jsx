import React from "react";
import Sistema from "./assets/img/Sistema.png";
import { AppStyle } from "./AppStyle";
import { Header } from "./AppStyle";
import { useState } from "react";
import { Tabela } from "./Componentes/Tabela/Tabela";
import { Input } from "./Componentes/Input/Input";

function converteParaWatts(dbm, valorEmW) {
  //Verifica se o valor que está recebendo é DBM ou W pois sem verificar não seria possível usar 1mW já que é igual a 0db.
  if (valorEmW && dbm === 0) return 0.001;
  if (!valorEmW && dbm === 0) return 0;
  const W = 10 ** ((dbm - 30) / 10);
  return W;
}

function converteParaDbm(w) {
  if (w === 0) return 0;
  const dbm = 10 * Math.log10(w / 1) + 30;
  return dbm;
}

function elevaNum(num, select) {
  //Essa função pega o valor e sua respectiva unidade, transforma o número e converte para dbm.
  num = Number(num);
  const valor = select.value;
  switch (valor) {
    case "db":
      break;
    case "W":
      num = converteParaDbm(num);
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
  //#region Variáveis do App
  //Define os states interligados aos inputs
  let [pontoA, setPontoA] = useState("");
  let [at1, setAt1] = useState("");
  let [amp, setAmp] = useState("");
  let [at2, setAt2] = useState("");
  let [potrui, setPotrui] = useState("");
  let [sntx, setSntx] = useState("");

  //Define as variáveis que serão responsáveis por alterar a tabela.
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

  //#endregion

  function Limpar(e) {
    e.preventDefault();
    const paragrafoDeAlerta = document.querySelector(".alerta");
    const input1 = document.querySelector("#focus");
    const inputs = document.getElementsByClassName("input");

    paragrafoDeAlerta.classList.add("hide");
    for (let i = 0; i < 6; i++) {
      inputs[i].value = "";
    }
    try {
      SinalPontoA.innerHTML = "0";
      SinalPontoB.innerHTML = "0";
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
    } catch {}
    setAmp("");
    setAt1("");
    setAt2("");
    setPontoA("");
    setPotrui("");
    setSntx("");
    input1.focus();
  }

  function CalculaSinais(e) {
    e.preventDefault(); //Impede o carregamento padrão da página sem necessidade
    //Define os selects e a mensagem de alerta
    const paragrafoDeAlerta = document.querySelector(".alerta");
    const select1 = document.querySelector("#operador1");
    const select2 = document.querySelector("#operador2");
    const select3 = document.querySelector("#operador3");
    const select4 = document.querySelector("#operador4");
    const select5 = document.querySelector("#operador5");
    const select6 = document.querySelector("#operador6");
    const V = {
      //Valores para calculos,
      //esse objeto permite que o programa posteriormente reescreva valores em cima para novos calculos,
      //sem precisar atualizar a página.
      pontoA: elevaNum(pontoA, select1),
      at1: elevaNum(at1, select2),
      amp: elevaNum(amp, select3),
      potrui: elevaNum(potrui, select4),
      at2: elevaNum(at2, select5),
      sntx: elevaNum(sntx, select6),
    };

    //Verifica se todos os campos foram preenchidos.
    if (!amp || !at1 || !at2 || !pontoA || !potrui || !sntx) {
      paragrafoDeAlerta.classList.remove("hide");
      return;
    }
    paragrafoDeAlerta.classList.add("hide");

    //Calcula os sinais
    const pontob = V.pontoA - Number(V.at1);
    const pontoc = pontob + Number(V.amp);
    const pontod = pontoc - Number(V.at2);

    //Exibe os valores na tabela
    SinalPontoA.innerHTML = parseFloat(V.pontoA).toFixed(3);
    SinalPontoB.innerHTML = pontob.toFixed(3);
    SinalPontoC.innerHTML = pontoc.toFixed(3);
    SinalPontoD.innerHTML = pontod.toFixed(3);
    SNa.innerHTML = parseFloat(V.sntx).toFixed(3);

    //Passa para a função de calcular os ruidos passando como parâmetros o que já foi calculado

    CalculaRuido(pontob, pontoc, pontod, V);

    //Garante que se algo for digitado errado (letras), a tabela não venha com nenhum NaN
    const ValidaDados = Number(SNd.innerHTML);

    if (isNaN(ValidaDados)) Limpar(e);
  }

  function CalculaRuido(pontob, pontoc, pontod, V) {
    //Ponto A
    const Ntx = -Number(V.sntx) + Number(V.pontoA);
    NA.innerHTML = Ntx.toFixed(3);
    //Ponto B
    const Npontob = Number(Ntx) - Number(V.at1);
    NB.innerHTML = Npontob.toFixed(3);
    // S/N
    SNb.innerHTML = (pontob - Npontob).toFixed(3);
    //Ponto C
    let Npontoc = Number(Npontob) + Number(V.amp);    

    //Verifica se o valor que vai ser convertido da potência do ruído é em W ou db
    const select4 = document.querySelector("#operador4");
    if (select4.value === "db"){
    Npontoc = converteParaWatts(Npontoc) + converteParaWatts(V.potrui, false);
    }else{
      if (Number(potrui) === 0) Npontoc = converteParaWatts(Npontoc) + converteParaWatts(V.potrui, false);
      else Npontoc = converteParaWatts(Npontoc) + converteParaWatts(V.potrui, true);
    }
    Npontoc = converteParaDbm(Npontoc);
    console.log(Npontoc)
    NC.innerHTML = Npontoc.toFixed(8);
    // S/N
    SNc.innerHTML = (pontoc - Npontoc).toFixed(3);
    //Ponto D
    const Npontod = Npontoc - V.at2;
    ND.innerHTML = Npontod.toFixed(3);
    // S/N
    SNd.innerHTML = (pontod - Npontod).toFixed(3);
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
            <Input
              name="Ponto A"
              variavel={pontoA}
              setstate={setPontoA}
              operador="operador1"
              id="focus"
            />
            <Input
              name="Atenuação 1"
              variavel={at1}
              setstate={setAt1}
              operador="operador2"
              id="input2"
            />
            <Input
              name="Amplificador"
              variavel={amp}
              setstate={setAmp}
              operador="operador3"
              id="input3"
            />
            <Input
              name="Potência de ruído no Amplificador"
              variavel={potrui}
              setstate={setPotrui}
              operador="operador4"
              id="input4"
            />
            <Input
              name="Atenuação 2"
              variavel={at2}
              setstate={setAt2}
              operador="operador5"
              id="input5"
            />
            <Input
              name="S/N no TX"
              variavel={sntx}
              setstate={setSntx}
              operador="operador6"
              id="input6"
            />
            <p className="alerta hide">Preencha todos os campos!</p>
            <div className="botoes">
              <button onClick={(e) => Limpar(e)}>Limpar</button>
              <button onClick={(e) => CalculaSinais(e)}>Calcular</button>
            </div>
          </form>
          <Tabela />
        </div>
      </AppStyle>
    </>
  );
}

export default App;
