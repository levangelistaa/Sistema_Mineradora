import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';
import { PlusCircle, List, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
import api from '../api';

const Cities = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({ id: '', nome: '' });
  const [searchId, setSearchId] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCities = async () => {
    try {
      const response = await api.get('/cities');
      setCities(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Erro ao buscar cidades');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cities', { nome: formData.nome });
      setMessage('Cidade criada com sucesso!');
      setFormData({ id: '', nome: '' });
    } catch (error) {
      setMessage(error.response?.data?.mensagem || 'Erro ao criar');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/cities/${searchId}`);
      setCities([response.data]);
      setMessage('');
    } catch (error) {
      setMessage('Cidade não encontrada');
      setCities([]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cities/${formData.id}`, {
        nome: formData.nome
      });
      setMessage('Cidade atualizada com sucesso!');
    } catch (error) {
      setMessage(error.response?.data?.mensagem || 'Erro ao atualizar');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/cities/${searchId}`);
      setMessage('Cidade deletada com sucesso!');
      setCities([]);
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
              <h2>Criar Cidade</h2>
            </div>
            <div className="form-group">
              <label>Nome da Cidade</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
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
              <h2>Lista de Cidades</h2>
            </div>
            <button type="button" onClick={fetchCities} className="btn btn-primary">Buscar Todas</button>
            <div className="data-list">
              {cities.map(c => (
                <div key={c.id_city} className="data-item">
                  <div>
                    <strong>{c.name_city || c.nome}</strong>
                    <p style={{ fontSize: '12px', color: '#666' }}>ID: {c.id_city}</p>
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
              <h2>Buscar Cidade</h2>
            </div>
            <form onSubmit={handleSearch} className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Digite o ID" value={searchId} onChange={e => setSearchId(e.target.value)} required />
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
            <div className="data-list">
              {cities.map(c => (
                <div key={c.id_city} className="data-item">
                  <div>
                    <strong>{c.name_city || c.nome}</strong>
                    <p style={{ fontSize: '12px', color: '#666' }}>ID: {c.id_city}</p>
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
              <h2>Atualizar Cidade</h2>
            </div>
            <div className="form-group">
              <label>ID da Cidade</label>
              <input type="text" name="id" value={formData.id} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Novo Nome</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
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
              <h2>Deletar Cidade</h2>
            </div>
            <div className="form-group">
              <label>ID da Cidade</label>
              <input type="text" value={searchId} onChange={e => setSearchId(e.target.value)} required />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '0 0 250px' }}>
        <ActionCard title="Voltar para Início" icon={ArrowLeft} to="/" />
        <ActionCard title="Buscar Todas" icon={List} active={activeTab === 'list'} onClick={() => { setActiveTab('list'); setMessage(''); setCities([]); }} />
        <ActionCard title="Criar" icon={PlusCircle} active={activeTab === 'create'} onClick={() => { setActiveTab('create'); setMessage(''); }} />
        <ActionCard title="Buscar por ID" icon={Search} active={activeTab === 'search'} onClick={() => { setActiveTab('search'); setMessage(''); setCities([]); }} />
        <ActionCard title="Atualizar" icon={Edit} active={activeTab === 'update'} onClick={() => { setActiveTab('update'); setMessage(''); }} />
        <ActionCard title="Deletar" icon={Trash2} active={activeTab === 'delete'} onClick={() => { setActiveTab('delete'); setMessage(''); }} />
      </div>
      <div className="content-panel" style={{ flex: 1 }}>
        {message && <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>{message}</div>}
        {renderForm()}
      </div>
    </div>
  );
};

export default Cities;
