import ThemeContext from '../../context/ThemeContext'
import './index.css'

const NotFound = props => {
  const {history} = props
  const onClickRetry = () => {
    history.push('/')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColorClassName = isDarkTheme ? 'nav-bar-dark' : 'nav-bar-light'
        const navItemClassName = isDarkTheme
          ? 'list-text-dark-theme'
          : 'list-text-light-theme'
        return (
          <div className={`not-found-container ${bgColorClassName}`}>
            <img
              className="not-found-img"
              src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649202458/erroring_1_wmrpgf.png"
              alt="page not found"
            />
            <h1 className={`no-found-heading ${navItemClassName}`}>
              Page Not Found
            </h1>
            <p className={navItemClassName}>
              we are sorry, the page you requested could not be found
            </p>
            <p className={navItemClassName}>Please go back to homepage</p>
            <button
              type="button"
              className="home-page-btn"
              onClick={onClickRetry}
            >
              Home Page
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default NotFound
