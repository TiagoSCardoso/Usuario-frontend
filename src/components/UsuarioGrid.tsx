import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { Usuario } from '../types/usuario';
import { toast } from 'react-toastify';

const UsuarioGrid: React.FC = () => {
  const [items, setItems] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Usuario[]>('/usuario');
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    navigate('/add');
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/usuario/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast.success(`Item com ID ${id} excluído com sucesso`);
    } catch (error) {
      toast.error('Erro ao excluir o item: ' + error);
      console.error('Erro ao excluir o item', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" style={{ textAlign: 'center', alignContent: 'center', marginTop: '10px', marginBottom: '0px' }}>
        Cadastro de usuários
      </Typography>
      <Box display="flex" justifyContent="flex-start" marginBottom="20px">
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Adicionar
          </Button>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>ID</TableCell>
              <TableCell style={{ color: 'white' }}>Nome</TableCell>
              <TableCell style={{ color: 'white' }}>E-mail</TableCell>
              <TableCell style={{ color: 'white' }}>Telefone</TableCell>
              <TableCell style={{ color: 'white' }}>Endereço</TableCell>
              <TableCell style={{ textAlign: 'right', color: 'white' }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.telefone}</TableCell>
                <TableCell>{item.endereco}</TableCell>
                <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained"
                    color="info"
                    onClick={() => handleEdit(item.id)}
                    style={{ marginRight: '8px' }}>Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.id)}>Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsuarioGrid;
