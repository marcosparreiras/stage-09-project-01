import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, Form, Avatar } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import api from '../../services/api';

/* eslint-dasable */
function Profile() {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordOld, setPasswordOld] = useState('');
    const avatarUrl = user.avatar
        ? `${api.defaults.baseURL}/files/${user.avatar}`
        : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        };
        await updateProfile({ user, avatarFile });
    }

    async function handleChangeAvatar(evnet) {
        const file = evnet.target.files[0];
        setAvatarFile(file);
        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>
            <header>
                <Link to='/'>
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} alt='Foto do usuário' />
                    <label htmlFor='avatar'>
                        <FiCamera />
                        <input
                            id='avatar'
                            type='file'
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>
                <Input
                    type='text'
                    placeholder='Nome'
                    icon={FiUser}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    type='text'
                    placeholder='E-mail'
                    icon={FiMail}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type='password'
                    placeholder='Senha atual'
                    icon={FiLock}
                    onChange={(e) => setPasswordOld(e.target.value)}
                />
                <Input
                    type='password'
                    placeholder='Nova senha'
                    icon={FiLock}
                    onChange={(e) => setPasswordNew(e.target.value)}
                />
                <Button title='Salvar' onClick={handleUpdate} />
            </Form>
        </Container>
    );
}

export default Profile;
