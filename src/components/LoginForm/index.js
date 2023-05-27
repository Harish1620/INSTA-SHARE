import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    inputType: 'password',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeCheckbox = event => {
    if (event.target.checked === true) {
      this.setState({
        inputType: 'text',
      })
    } else {
      this.setState({
        inputType: 'password',
      })
    }
  }

  onChangePassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
    console.log(password)
  }

  onChangeUsername = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
    console.log(username)
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderShowPassword = () => (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className="checkbox"
        id="CHECKBOX"
        onChange={this.onChangeCheckbox}
      />
      <label className="label-show-password" htmlFor="CHECKBOX">
        Show Password
      </label>
    </div>
  )

  renderPasswordField = () => {
    const {password, inputType} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={inputType}
          id="password"
          value={password}
          className="password-input-field"
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="username-input-field"
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login--form-container">
        <img
          className="login-img"
          alt="website login"
          src="https://res.cloudinary.com/dahw90b2z/image/upload/v1648981341/Layer_2_cq7mgu.png"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dahw90b2z/image/upload/v1648981581/Group_qtyxfl.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <h1 className="website-heading">Insta Share</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <>{this.renderShowPassword()}</>

          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
