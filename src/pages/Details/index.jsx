import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Links, Contnet } from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Section from '../../components/Section';
import Tag from '../../components/Tag';
import ButtonText from '../../components/ButtonText';
import api from '../../services/api';

/* eslint-disable */
function Details() {
    const [note, setNote] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    async function handleRemoveNote() {
        const isToDelete = confirm('Tem certeza que quer exluir essa nota?');
        if (isToDelete) {
            await api.delete(`notes/${params.id}`);
            navigate('/');
            alert('Nota excluida com sucesso');
        }
    }

    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await api.get(`notes/${params.id}`);
                setNote(response.data);
            } catch (error) {
                navigate('/');
                alert(error.response.data.message);
            }
        }

        fetchNotes();
    }, []);

    return (
        <Container>
            <Header />
            {note && (
                <main>
                    <Contnet>
                        <ButtonText
                            title='Excluir nota'
                            onClick={handleRemoveNote}
                        />
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>

                        <Section title='Links úteis'>
                            <Links>
                                {note.links &&
                                    note.links.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={link.url}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                {link.url}
                                            </a>
                                        </li>
                                    ))}
                            </Links>
                        </Section>
                        <Section title='Marcadores'>
                            {note.tags &&
                                note.tags.map((tag) => (
                                    <Tag key={tag.id} title={tag.name} />
                                ))}
                        </Section>
                        <Link to='/'>
                            <Button title='voltar' />
                        </Link>
                    </Contnet>
                </main>
            )}
        </Container>
    );
}

export default Details;
