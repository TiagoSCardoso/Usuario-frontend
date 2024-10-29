import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Usuario, initialUsuarioState } from '../types/usuario';

const UsuarioEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Usuario>(initialUsuarioState);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get<Usuario>(`/usuario/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Erro ao buscar o item', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => (prevItem ? { ...prevItem, [name]: value } : initialUsuarioState));
  };

  const handleSave = async () => {
    try {
        await api.patch(`/usuario/${id}`, item);
        toast.success(`Usuário ${id} salvo com sucesso!`); // Exib
        navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, error: errorMessage, statusCode } = error.response.data;
        
        if (Array.isArray(message)) {
          message.forEach((msg) => toast.error(msg, {autoClose: false}));
        } else {
          toast.error('Erro ao atualizar o usuário.');
        }

        console.error(`Erro ${statusCode}: ${errorMessage}`, message);
      } else {
        toast.error('Erro desconhecido ao atualizar o usuário.');
        console.error('Erro desconhecido', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!item) {
    return <p>Carregando...</p>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Editar Usuário
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
        type='email'
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

export default UsuarioEdit;
