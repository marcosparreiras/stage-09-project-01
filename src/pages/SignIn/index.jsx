import { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, Form, Backgorund } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { singIn } = useAuth();

    async function handleSignIn() {
        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }
        await singIn({ email, password });
    }

    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus link úteis.</p>
                <h2>Faça seu login</h2>
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
                <Button title='Entrar' onClick={handleSignIn} />
                <Link to='/register'>Criar conta</Link>
            </Form>
            <Backgorund />
        </Container>
    );
}

export default SingIn;
