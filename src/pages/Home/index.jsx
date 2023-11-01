import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { FiPlus, FiSearch } from 'react-icons/fi';
import Header from '../../components/Header';
import ButtonText from '../../components/ButtonText';
import Input from '../../components/Input';
import Section from '../../components/Section';
import Note from '../../components/Note';

function Home() {
    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleTagSelected(tagName) {
        const alreadySelected = tagSelected.includes(tagName);
        if (alreadySelected) {
            const filteredTags = tagSelected.filter((tag) => tag !== tagName);
            setTagSelected(filteredTags);
        } else {
            setTagSelected((prevState) => {
                if (tagName == 'all') {
                    return [];
                }
                return Array.from(new Set([...prevState, tagName]));
            });
        }
    }

    function handleDatails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const tagsResponse = await api.get('tags');
            const tagsNames = tagsResponse.data.tags.map((tag) => tag.name);
            const tagsUniqueName = Array.from(new Set(tagsNames));
            setTags(tagsUniqueName);
        }

        fetchTags();
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(
                `notes?title=${search}&tags=${tagSelected.join(',')}`
            );
            setNotes(response.data);
        }

        fetchNotes();
    }, [search, tagSelected]);

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText
                        title='Todos'
                        isActive={tagSelected.length === 0}
                        onClick={() => handleTagSelected('all')}
                    />
                </li>
                {tags &&
                    tags.map((tag, index) => (
                        <li key={String(index)}>
                            <ButtonText
                                title={tag}
                                isActive={tagSelected.includes(tag)}
                                onClick={() => handleTagSelected(tag)}
                            />
                        </li>
                    ))}
            </Menu>

            <Search>
                <Input
                    icon={FiSearch}
                    placeholder='Pesquisar pelo título'
                    onChange={(e) => setSearch(e.target.value)}
                    vaule={search}
                />
            </Search>

            <Content>
                <Section title='Minhas notas'>
                    {notes &&
                        notes.map((note) => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDatails(note.id)}
                            />
                        ))}
                </Section>
            </Content>

            <NewNote to='/new'>
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}
export default Home;
