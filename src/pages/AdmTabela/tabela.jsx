import React from "react";
import {Table} from "react-bootstrap"



export default function Tabela({vetor, selecionar,botao}){
    
    return(
// cabeçalho da tabela



<Table striped bordered hover>
<thead>
<tr>
<th>Id</th>
<th>Nome da Reunião</th>
<th>Data</th>
<th>Quantidade de pessoas</th>
<th>Termino da reuniao</th>
<th>Inicio da reuniao</th>
<th>Selecionar</th>
</tr>
</thead>

<tbody>
   {
    vetor.map((obj, indice)=>(
        
        <tr key={indice}>

        <td>{indice+1}</td>
        <td>{obj.local}</td>
        <td>{obj.data}</td>
        <td>{obj.quantidade}</td>
        <td>{obj.horarioInicio}</td>
        <td>{obj.horarioFinal}</td>
        <td><button  onClick={()=> {selecionar(indice)}}className="btn btn-success" >Selecionar</button></td>
       
            </tr>

            

    ))
   }
</tbody>



</Table>


    )
}
