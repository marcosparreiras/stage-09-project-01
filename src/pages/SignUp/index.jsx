import { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Backgorund } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

function SingUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            await api.post('/users', { name, email, password });
            alert('Usuário cadastrado com sucesso');
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('Não foi possível cadastrar');
            }
        }
    }

    return (
        <Container>
            <Backgorund />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus link úteis.</p>
                <h2>Crie sua conta</h2>
                <Input
                    icon={FiUser}
                    placeholder='Nome'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={FiMail}
                    placeholder='E-mail'
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={FiLock}
                    placeholder='Senha'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button title='Cadastrar' onClick={handleSignUp} />
                <Link to='/'>Voltar para o login</Link>
            </Form>
        </Container>
    );
}

export default SingUp;
