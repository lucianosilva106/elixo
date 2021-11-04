import React from 'react';
import { useState, useEffect } from 'react';
import firebase from "../../firebaseConnection";
//import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function AdmAvaliacao() {

    const [pergunta1, setPergunta1] = useState('');
    const [resposta1, setResposta1] = useState(0);
    const [resposta2, setResposta2] = useState(0);
    const [resposta3, setResposta3] = useState(0);
    const [resposta4, setResposta4] = useState(0);
 
    useEffect(() => {
        function loadAvaliacoes(id){
            firebase.firestore().collection('avaliacoes').doc(id)
            .onSnapshot((doc) => {
                setPergunta1(doc.data().pergunta1);
                setResposta1(doc.data().resposta1);
                setResposta2(doc.data().resposta2);
                setResposta3(doc.data().resposta3);
                setResposta4(doc.data().resposta4);
                })
            }
        loadAvaliacoes('0rF3cVgRBbFFQY5LSWD5');
    }, [])        
 
    const data = [
        {pergunta: 'Ruim', resposta: resposta1},
        {pergunta: 'Razoável', resposta: resposta2},
        {pergunta: 'Boa', resposta: resposta3},
        {pergunta: 'Otima', resposta: resposta4}
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="pergunta">{`${payload[0].value}`}</p>
                </div>
            );
        }
    
        return null;
    };
   
    
    return (
        <div align="center">
            <h2>Resultado das avaliações do site</h2>
            <h3>{pergunta1}</h3>
            <BarChart width={900} height={500} data={data}>
                <Bar dataKey="resposta" fill="green" stroke="green" barSize={100}/>
                <XAxis dataKey="pergunta" stroke="green"/>
                <YAxis stroke="green"/>
                <Tooltip content={<CustomTooltip />}/>
            </BarChart>
        </div>

    );
}
    
export default AdmAvaliacao;