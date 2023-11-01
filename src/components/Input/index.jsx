import { Container } from './styles';

/* eslint-disable */
function Input({ icon: Icon, ...rest }) {
    return (
        <Container>
            {Icon && <Icon size={20} />}
            <input {...rest} />
        </Container>
    );
}

export default Input;
