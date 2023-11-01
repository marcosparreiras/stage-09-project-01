import { Container } from './styles';

/* eslint-disable */
function Button({ title, loading = false, ...rest }) {
    return (
        <Container type='button' disabled={loading} {...rest}>
            {loading ? 'Carregando...' : title}
        </Container>
    );
}

export default Button;
