import PropTypes from 'prop-types';
import { IoMdSearch } from 'react-icons/io';
import { Form, Header, Input, SubmitButton } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <SubmitButton type="submit">
          <IoMdSearch size={24} />
        </SubmitButton>

        <Input
          type="text"
          name="searchImage"
          autoFocus
          // autoComplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
