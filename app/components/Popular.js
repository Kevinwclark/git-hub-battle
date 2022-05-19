import React from 'react';
import PropTypes from 'prop-types';

function LanguagesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='flex-center'>
      {languages.map(language => {
        return (
          <li key={language}>
            <button 
              onClick={() => onUpdateLanguage(language)} 
              className='btn-clear nav-link'
              style={language === selected ? {color: 'red'} : null}
            >
              {language}
            </button>
          </li>
        );
      })}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      color: 'blue'
    }
    console.log('here in Popular', this)
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage });
  }

  render() {
    const { selectedLanguage } = this.state;

    return(
      <React.Fragment>
        <LanguagesNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    )
  }
}
