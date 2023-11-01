import { Container } from './styles';

/* eslint-disable */
function Section({ title, children }) {
    return (
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    );
}

export default Section;
