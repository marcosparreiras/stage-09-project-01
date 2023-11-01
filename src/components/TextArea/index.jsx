import { Container } from './styles';

/* eslint-disable */
function TextArea({ value, ...rest }) {
    return <Container {...rest}>{value}</Container>;
}

export default TextArea;
