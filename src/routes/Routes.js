import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import App from '../components/App';
import Auth from '../components/auth/AuthPage';
import * as actions from "../store/actions";
import Loading from "../components/loading/Loading";
import Home from "../components/home/Home";
import Profile from "../components/profile/Profile";
import VoteFetcher from "../components/vote/VoteFetcher";
import NavBar from "../components/nav/NavBar";
import MyGames from "../components/profile/MyGames";
import HowToPlay from "../components/howto/HowtoPlay";

class Routes extends Component {
    state = {}

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Redirect to="/auth"/>
            </Switch>
        );

        if (this.props.loading && this.props.match?.path !== '/app') {
            routes = (<Route path="/" component={Loading}/>);
        } else if (this.props.error) {
            routes = (
                <Route path="/">
                    <h2 style={{
                        textAlign: 'center',
                        height: '100%',
                        margin: 'auto'
                    }}>
                        {'Error: ' + this.props.error?.message || 'An Error Occurred :('}
                    </h2>
                </Route>
            );
        } else if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/app/:game_id" component={App}/>
                    <Route path="/vote/:game_id?" component={VoteFetcher}/>
                    <Route path="/auth" component={Auth}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route path="/profile/games/:gameId?" component={MyGames}/>
                    <Route path="/how-to-play" component={HowToPlay}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <div className="App">
                <header>
                    <NavBar/>
                </header>
                <main style={{height: '100%'}}>
                    {routes}
                </main>
                <footer>
                    Disclaimer: Drawing Challenge is not responsible for any drawings created and/or posted. © Drawing Challenge 2021
                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
