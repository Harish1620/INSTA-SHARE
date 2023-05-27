import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import UserDetails from './components/UserDetails'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(preState => ({isDarkTheme: !preState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state
    return (
      <>
        <ThemeContext.Provider
          value={{
            isDarkTheme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <ProtectedRoute
              exact
              path="/users/:userId"
              component={UserDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ThemeContext.Provider>
      </>
    )
  }
}

export default App
