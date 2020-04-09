import React, {useState, useEffect} from 'react';
import './App.css';

import Header from './components/Header';
import api from './services/api';


function App(){

  const [repositories, setRepositories]= useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },  []);

  async function handleAddRepository(){
    //setRepositories([...repositories,`Novo repository ${Date.now()}`]);
    
    const response = await api.post('repositories',{
      title: `Repositorio ${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      techs: ['NodeJS','ReactJS','React Native']
    });

    const repository = response.data;

    setRepositories([... repositories, repository]);
  }
 
  async function handleRemoveRepository(id){
 
    const response = await api.delete(`/repositories/${id}`);
    
    const repository = response.data;
    
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
    repositories.splice(repositoryIndex,1);
    
    repositories[repositoryIndex] = repository;
    
    setRepositories([...repositories]);
    
  }

  return (
<>
<Header title="Repositories" />

<ul>{repositories.map(repository => <li key={repository.id}>
  {repository.title}
  <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
  </li>)}</ul>

<button type="button" onClick={handleAddRepository}>Adicionar Projeto</button>
</>
  );
}

export default App;