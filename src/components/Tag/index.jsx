import { Container } from './styles';

/* eslint-disable */
function Tag({ title, ...rest }) {
    return <Container {...rest}>{title}</Container>;
}

export default Tag;
