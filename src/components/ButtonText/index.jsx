import { Container } from './styles';

/* eslint-disable */
function ButtonText({ title, isActive = false, ...rest }) {
    return (
        <Container type='button' $isactive={isActive} {...rest}>
            {title}
        </Container>
    );
}

export default ButtonText;
