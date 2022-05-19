import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api'

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
      repos: null,
      error: null
    }
    console.log('here in Popular', this)
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    console.log('updateLanguage', selectedLanguage)
    this.setState({ 
      selectedLanguage,
      repos: null,
      error: null,
    });
    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null,
      }))
      .catch((error) => {
        console.warn('error fetching repos: ', error)

        this.setState({
          error: "There was an error fetching repos"
        })
      })
      
  }

  isLoading() {
    return this.state.error === null && this.state.repos === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return(
      <React.Fragment>
        <LanguagesNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos && repos.map((repo) => {
          return(
            <div key={repo.id}>{repo.git_url}</div>
          )
        })}
      </React.Fragment>
    )
  }
}
