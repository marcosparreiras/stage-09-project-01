import { useState } from 'react';
import { Container, Form } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import NoteItem from '../../components/NoteItem';
import Section from '../../components/Section';
import Button from '../../components/Button';

function New() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [tags, setTags] = useState([]);
    const [newtag, setTNewTag] = useState('');
    const navigate = useNavigate();

    function handleAddLink() {
        setLinks((prevState) => [...prevState, newLink]);
        setNewLink('');
    }

    function handleRemoveLink(deleted) {
        setLinks((prevState) => prevState.filter((link) => link !== deleted));
    }

    function handleAddTag() {
        setTags((prevState) => [...prevState, newtag]);
        setTNewTag('');
    }

    function handleRemoveTag(deleted) {
        setTags((prevState) => prevState.filter((tag) => tag !== deleted));
    }

    async function handleNewNote() {
        if (!title) {
            return alert('Digite o título da nota');
        }
        if (newLink) {
            return alert(
                'Você deixou um link no campo para adicionar, mas não cliclou em adicionar. Clique para adicionar ou deixe o campo vazio'
            );
        }
        if (newtag) {
            return alert(
                'Você deixou uma tag no campo para adicionar, mas não cliclou em adicionar. Clique para adicionar ou deixe o campo vazio'
            );
        }
        await api.post('/notes', { title, description, tags, links });
        alert('Nota criada com sucesso');
        navigate('/');
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to='/'>voltar</Link>
                    </header>
                    <Input
                        placeholder='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextArea
                        placeholder='Observações'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Section title='Links úteis'>
                        {links &&
                            links.map((link, index) => (
                                <NoteItem
                                    value={link}
                                    key={String(index)}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))}
                        <NoteItem
                            isNew
                            placeholder='Novo link'
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    <Section title='Marcadores'>
                        <div className='tags'>
                            {tags &&
                                tags.map((tag, index) => (
                                    <NoteItem
                                        value={tag}
                                        key={String(index)}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))}
                            <NoteItem
                                isNew
                                placeholder='Nova tag'
                                value={newtag}
                                onChange={(e) => setTNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button title='Salvar' onClick={handleNewNote} />
                </Form>
            </main>
        </Container>
    );
}

export default New;
