import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import App from '../components/App';
import Auth from '../components/auth/AuthPage';
import * as actions from "../store/actions";

class Routes extends Component {
    state = {

    }

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/app" component={App}/>
                    <Route path="/auth" component={Auth}/>
                    <Redirect to="/app"/>
                </Switch>
            );
        }

        return (
            <React.Fragment>
                {routes}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.auth())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
