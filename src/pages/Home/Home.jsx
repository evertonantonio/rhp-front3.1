import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoreContext from "components/Store/Context";
import "./Home.css";
import logoHeader from "image/logoHeader.svg";
import add from "image/add.svg";
import addtwo from "image/addtwo.svg";
import dr from "image/dr.svg";
import logonav from "image/logonav.svg";


const PagesHome = () => {
  const { setToken } = useContext(StoreContext);

  const SubDate = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return ano + "-" + mes + "-" + dia;
   
  };

/*
  "data": "12/08/2000",
        "local": "reuniaoteste",
        "quantidade": 4,
        "nome":"eu",
        "emal":"yurikk",
        "horarioInicio": "19:55",
        "horarioFinal": "16:00",
        "criadorDoEvento":"Yuri"
        "inscritos":" "
       */

  const Modeloreuniao = {
    id: 0,
    nome: "",
    data: "",
    local:" ",
   horarioInicio: "",
    horarioFinal: "",
    quantidade: "",
    email:"",
    criadorDoEvento:"",
    
  };
  const [reuniao, setReuniao] = useState([]);
  const [objReuniao, setObjReuniao] = useState(Modeloreuniao);
  const [EsconderDiv, setEsconderDiv] = useState(true);
  

  const handleClickData = () => {
    setEsconderDiv(false);
    alert(" Data Marcada com Sucesso , Adicione agora as informações da Reuniao !")
  };

  const aoDigitar = (e) => {
   
    console.log(e.target);
    setObjReuniao({ ...objReuniao, [e.target.name]: e.target.value });
    
  };

  const Cadastrar = () => {
    fetch("http://localhost:8080/evento/cadastrar", {
      method: "post",
      body: JSON.stringify(objReuniao),
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json",
      },
    })
      
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
        
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem)
     } else {

        setReuniao([...reuniao, retorno_convertido]);
        alert  ('Reuniao cadastrada com sucesso! ,  IdReuniao = '+ retorno_convertido.id)
       
        limparFormulario()

      }
      

  })

  };


  const limparFormulario = () => {
    setObjReuniao(Modeloreuniao);
  };

  return (

    <>
    <section className="nav">
      <img src={logonav} className="logonav"></img>
      <p className="ag">Agendamento Online</p>
      <button className="btnSair" type="button" onClick={() => setToken(null)}>
        Sair
      </button>
    </section>
    
    <div className="pages-home">

     <div className="divagenda">
      <img src={dr} className="dra"></img> 
      <p className="pdra">Dra. Meredith Gray</p>
      <p className="plocal">Rua Almirantes Neto, 230. Recife, Pernambuco</p>
    </div> 
      <br></br>
      <hr></hr>
      
      <p className="pesp">Reunião por:</p> <p>Dra. Meredith Gray</p>
      

      <hr></hr>

      <p className="pesp">Selecione:</p>
      <br></br>

      <p className="pdata">Data:</p>
        <input
            type="date"
            className="input"
            value={reuniao.data}
            onChange={aoDigitar}
            name="data"
            min={SubDate()}
        ></input>
        <button
            className="Add"
            onClick={handleClickData}
            onAuxClick={limparFormulario}
            value="Cadastrar"
          >
            Agendar Data
          </button>
      <hr></hr>

      <p className="pesp">Horário</p>

      <div className="divhorario">
      <p>Horário de Início:</p>
        <input
          type="time"
          className="input"
          value={reuniao.horarioInicio}
          onChange={aoDigitar}
          name="horarioInicio"
        ></input>
       
        <p>Horário de Término:</p>
        <input
          type="time"
          className="input"
          value={reuniao.horarioFinal}
          onChange={aoDigitar}
          name="horarioFinal"
        ></input>
      </div>
      <hr></hr>

      <p className="pesp">Nome da reunião:</p>
      <input
          type="text"
          className="input"
          value={reuniao.local}
          onChange={aoDigitar}
          name="local"
        ></input>


      <hr></hr>

      <p className="pesp">Quantidade de pessoas:</p>
      <input
          type="number"
          className="input"
          value={reuniao.quantidade}
          onChange={aoDigitar}
          min="2"
          name="quantidade"
        ></input>

        <br></br>
        <br></br>
        <br></br>

        <button
         type="button"
          className="btnadd"
          onClick={Cadastrar}
          onAuxClick={limparFormulario}
          value="Cadastrar"
        >
          Adicionar
        </button>
        

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      
      
      <Link to={"/AdmTabela"}><button  type="button" class="btnlink">Gerenciar Reuniões</button></Link>
    </div>
    </>
  );
};

export default PagesHome;















