import React from 'react';

const Options = React.createClass({
  _sortOptions: ['alphabetical', 'shuffle'],

  _handleSortToggle(e) {
    const { letters, sortBy } = this.props;
    const { nextLetter, sortLettersBy } = this.props;
    sortLettersBy(e.currentTarget.value);
    nextLetter(this.props.letters[0]);
  },

  render() {
    const { sortBy } = this.props;

    return (
      <div>
        { this._sortOptions.map((option, i) =>
          <label
            htmlFor={ `sort-${option}` }
            style={{ textTransform: 'capitalize' }}
            key={ i }>
            <input
              type="radio"
              name="sortBy"
              id={ `sort-${option}` }
              value={ option }
              checked={ sortBy === option }
              ref={ `sort:${option}` }
              onChange={ this._handleSortToggle }
            />
            { option }
          </label>
        ) }
      </div>
    );
  }
});

export default Options;
