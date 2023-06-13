import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ searchName: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={this.handleInput}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
