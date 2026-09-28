import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const query = this.state.query.trim();

    if (query === '') {
      return;
    }

    this.props.onSubmit(query);

    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <button type="submit">Search</button>

          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}