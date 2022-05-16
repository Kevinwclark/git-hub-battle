import React from 'react';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    console.log('Updating language to: ', selectedLanguage);
    this.setState({ selectedLanguage });
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className='flex-center'>
        {languages.map(language => {
          return (
            <li key={language}>
              <button 
                onClick={() => this.updateLanguage(language)} 
                className='btn-clear nav-link'
                style={language === this.state.selectedLanguage ? {color: 'red'} : null}
              >
                {language}
              </button>
            </li>
          );
        })}
      </ul>
    )
  }
}