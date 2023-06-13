import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleInput = ({ target: { value } }) => {
    setSearchName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearchSubmit(searchName);
    setSearchName('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleInput}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
