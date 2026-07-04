import React from 'react';
import ActionCard from '../components/ActionCard';
import { Users, MapPin, Briefcase, Wrench } from 'lucide-react';

const Home = () => {
  return (
    <div className="content-panel" style={{ backgroundColor: 'transparent', padding: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ActionCard 
          title="Funcionários" 
          subtitle="Gerenciar funcionários" 
          icon={Users} 
          to="/funcionarios" 
        />
        <ActionCard 
          title="Cidades" 
          subtitle="Gerenciar cidades" 
          icon={MapPin} 
          to="/cidades" 
        />
        <ActionCard 
          title="Serviços" 
          subtitle="Gerenciar serviços" 
          icon={Briefcase} 
          to="/servicos" 
        />
        <ActionCard 
          title="Equipamentos" 
          subtitle="Gerenciar equipamentos" 
          icon={Wrench} 
          to="/equipamentos" 
        />
      </div>
    </div>
  );
};

export default Home;