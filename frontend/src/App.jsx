import React, { useState } from 'react'; 
import Menu from './components/Menu'; 
import Inicio from './pages/Inicio'; 
import Equipamentos from './pages/Equipamentos'; 
 
function App() { 
    const [pagina, setPagina] = useState('inicio'); 
 
    return ( 
        <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: '0 auto' 
}}> 
            <Menu setPagina={setPagina} /> 
            <hr /> 
             
            {pagina === 'inicio' && <Inicio />} 
            {pagina === 'equipamentos' && <Equipamentos />} 
{pagina === 'cidades' && <p> FAÇAM ESSA PÁGINA BASEADO NO QUE FIZEMOS 
EM AULA E COMO ESTÁ INICIADO EM EQUIPAMENTOS</p>} 
{pagina === 'funcionarios' && <p> FAÇAM ESSA PÁGINA BASEADO NO QUE 
FIZEMOS EM AULA E COMO ESTÁ INICIADO EM EQUIPAMENTOS </p>} 
{pagina === 'servicos' && <p> FAÇAM ESSA PÁGINA BASEADO NO QUE FIZEMOS 
EM AULA E COMO ESTÁ INICIADO EM EQUIPAMENTOS </p>} 
</div> 
); 
} 
export default App;