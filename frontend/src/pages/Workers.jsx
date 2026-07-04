import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';
import { PlusCircle, List, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
import api from '../api';

const Workers = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState({ nome: '', cargo: '', cpf: '', setor: '' });
  const [searchCpf, setSearchCpf] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchWorkers = async () => {
    try {
      const response = await api.get('/workers');
      setWorkers(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Erro ao buscar funcionários');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workers', formData);
      setMessage('Funcionário criado com sucesso!');
      setFormData({ nome: '', cargo: '', cpf: '', setor: '' });
    } catch (error) {
      setMessage(error.response?.data?.mensagem || 'Erro ao criar');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/workers/${searchCpf}`);
      setWorkers([response.data]);
      setMessage('');
    } catch (error) {
      setMessage('Funcionário não encontrado');
      setWorkers([]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/workers/${formData.cpf}`, {
        nome: formData.nome,
        cargo: formData.cargo,
        setor: formData.setor
      });
      setMessage('Funcionário atualizado com sucesso!');
    } catch (error) {
      setMessage(error.response?.data?.mensagem || 'Erro ao atualizar');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/workers/${searchCpf}`);
      setMessage('Funcionário deletado com sucesso!');
      setWorkers([]);
    } catch (error) {
      setMessage('Erro ao deletar');
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'create':
        return (
          <form onSubmit={handleCreate}>
            <div className="form-header">
              <h2>Criar Funcionário</h2>
              <h3>Preencha os dados abaixo</h3>
            </div>
            <div className="form-group">
              <label>Nome</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Cargo</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Setor</label>
              <input type="text" name="setor" value={formData.setor} onChange={handleInputChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Salvar</button>
            </div>
          </form>
        );
      case 'list':
        return (
          <div>
            <div className="form-header">
              <h2>Lista de Funcionários</h2>
            </div>
            <button type="button" onClick={fetchWorkers} className="btn btn-primary">Buscar Todos</button>
            <div className="data-list">
              {workers.map(w => (
                <div key={w.cpf} className="data-item">
                  <div>
                    <strong>{w.name_worker || w.nome}</strong> - {w.cargo}
                    <p style={{ fontSize: '12px', color: '#666' }}>CPF: {w.cpf} | Setor: {w.sector || w.setor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'search':
        return (
          <div>
            <div className="form-header">
              <h2>Buscar Funcionário</h2>
            </div>
            <form onSubmit={handleSearch} className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Digite o CPF" value={searchCpf} onChange={e => setSearchCpf(e.target.value)} required />
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
            <div className="data-list">
              {workers.map(w => (
                <div key={w.cpf} className="data-item">
                  <div>
                    <strong>{w.name_worker || w.nome}</strong> - {w.cargo}
                    <p style={{ fontSize: '12px', color: '#666' }}>CPF: {w.cpf} | Setor: {w.sector || w.setor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'update':
        return (
          <form onSubmit={handleUpdate}>
            <div className="form-header">
              <h2>Atualizar Funcionário</h2>
              <h3>Preencha o CPF e os novos dados</h3>
            </div>
            <div className="form-group">
              <label>CPF (Para identificar)</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Novo Nome</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Novo Cargo</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Novo Setor</label>
              <input type="text" name="setor" value={formData.setor} onChange={handleInputChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Atualizar</button>
            </div>
          </form>
        );
      case 'delete':
        return (
          <form onSubmit={handleDelete}>
            <div className="form-header">
              <h2>Deletar Funcionário</h2>
            </div>
            <div className="form-group">
              <label>CPF do Funcionário</label>
              <input type="text" value={searchCpf} onChange={e => setSearchCpf(e.target.value)} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-danger">Deletar</button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      {/* Menu de Ações (Esquerda no painel de conteúdo) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '0 0 250px' }}>
        <ActionCard title="Voltar para Início" icon={ArrowLeft} to="/" />
        <ActionCard title="Buscar Todos" icon={List} active={activeTab === 'list'} onClick={() => { setActiveTab('list'); setMessage(''); setWorkers([]); }} />
        <ActionCard title="Criar" icon={PlusCircle} active={activeTab === 'create'} onClick={() => { setActiveTab('create'); setMessage(''); }} />
        <ActionCard title="Buscar por CPF" icon={Search} active={activeTab === 'search'} onClick={() => { setActiveTab('search'); setMessage(''); setWorkers([]); }} />
        <ActionCard title="Atualizar" icon={Edit} active={activeTab === 'update'} onClick={() => { setActiveTab('update'); setMessage(''); }} />
        <ActionCard title="Deletar" icon={Trash2} active={activeTab === 'delete'} onClick={() => { setActiveTab('delete'); setMessage(''); }} />
      </div>

      {/* Formulário / Resultado (Direita no painel de conteúdo) */}
      <div className="content-panel" style={{ flex: 1 }}>
        {message && <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>{message}</div>}
        {renderForm()}
      </div>
    </div>
  );
};

export default Workers;
