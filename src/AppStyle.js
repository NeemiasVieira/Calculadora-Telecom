import styled from "styled-components";
import "@fontsource/montserrat";

export const AppStyle = styled.main`
*{
  font-family: "Montserrat";
}
display: flex;
justify-content: center;
align-items: center;
flex-flow: column wrap;

button{
  background: #f03;
  color: whitesmoke;
  border: solid black 1px;
  font-size: 1em;
  font-weight: 900;
  width: 125px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 300ms;
}

button:hover{
    transform: scale(1.1);
  }


img{
  width: 60vw;
  max-width: 600px;
}

p{
  margin-top: 30px;
  width: 70vw;
  max-width: 900px;
}

.EntradaSaida{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  gap: 30px;

}

  .divInput{
    color: whitesmoke;
    height: auto;
    gap: 5px;
    width: 235px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    border-radius: 10px;
  }

  .inputESelect{
    height: 30px;

    input{
      height: 7px;
      margin: 0;
      text-align: center;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      border: none;
      background: #f4f4f4;
      font-size: .8em;
    }
    select{
      height: 24px;
      margin: 0;
      background: #f4f4f4;
      margin-top: 0px;
      font-size: .8em;
    }
  }



  form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    width: 350px;
    background: #222;
    border-radius: 10px;
    padding: 20px 0;
    gap: 5px;
  }

  label{
    font-size: .8em;
  }

  table{
    text-align: center;
    font-size: 1em;
    th{
      width: 100px;
      font-size: .8em;
    }
    td{
      border: solid #000 1px;
    }
  }

  @media screen and (max-width: 480px){

    p{
      width: 90vw;
      font-size: 14px;
    }

    img{
      width: 90vw;
     
    }

    .EntradaSaida{
      flex-flow: column wrap;
    }
    .divInput{
      width: 80vw;
      gap: 5px;
    }

    .inputESelect{
      input{
        font-size: 16px;
      }
      select{
        font-size: 16px;
      }
    }

    table{
      padding: 5px 15px;
    }

    label{
      font-size: 16px;
    }



  }

`

export const Header = styled.header`
  font-family: "Montserrat";
  background-color: #d22;
  text-align: center;
  font-size: 1em;
  font-weight: 900;
  color: whitesmoke;
  padding: 10px;

  div{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  p{
    font-size: .8em;
    margin: 0;
    font-weight: 500;
  }
`

