import { FiPlus, FiX } from 'react-icons/fi';
import { Container } from './styles';

/* eslint-disable */
function NoteItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container $isnew={isNew}>
            <input type='text' value={value} readOnly={!isNew} {...rest} />
            <button
                type='button'
                onClick={onClick}
                className={isNew ? 'btn-add' : 'btn-delete'}
            >
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    );
}

export default NoteItem;
