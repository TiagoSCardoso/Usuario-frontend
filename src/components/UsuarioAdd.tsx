// src/components/AddUser.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { NovoUsuario, initialNovoUsuarioState } from '../types/usuario';

const UsuarioAdd: React.FC = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<NovoUsuario>(initialNovoUsuarioState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await api.post('/usuario', item); // Envia uma requisição POST para criar um novo registro
      toast.success(`Usuário '${item.nome}' adicionado com sucesso!`); // Exib
      navigate('/'); // Redireciona de volta ao grid
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, error: errorMessage, statusCode } = error.response.data;
        
        if (Array.isArray(message)) {
          message.forEach((msg) => toast.error(msg, {autoClose: false}));
        } else {
          toast.error('Erro ao adicionar o usuário.');
        }

        console.error(`Erro ${statusCode}: ${errorMessage}`, message);
      } else {
        toast.error('Erro desconhecido ao adicionar o usuário.');
        console.error('Erro desconhecido', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redireciona de volta ao grid
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Adicionar Usuário
      </Typography>
      <TextField
        label="Nome"
        name="nome"
        value={item.nome}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        value={item.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Telefone"
        name="telefone"
        type="tel"
        value={item.telefone}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Endereço"
        name="endereco"
        value={item.endereco}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />      
      <Box style={{ marginTop: '10px' }}>
        <Button variant="contained" 
          color="primary" 
          onClick={handleSave}
          style={{ marginRight: '8px' }}>Salvar
        </Button>
        <Button variant="outlined" 
          color="secondary" 
          onClick={handleCancel}>Cancelar
        </Button>
      </Box>
    </Container>
  );
};

export default UsuarioAdd;
