import React, {Component, PropTypes} from 'react';
import {LoginForm} from 'components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
// import * as authActions from 'redux/modules/auth';

// @connect(
//     state => ({user: state.auth.user}),
//     authActions)
export default class Login extends Component {

    static propTypes = {
        user: PropTypes.object,
        login: PropTypes.func,
        logout: PropTypes.func
    };

    render() {
        // const {user, logout} = this.props;
        // const styles = require('./Login.scss');
        return (
            <Row>
                <Col sm={6} smOffset={3} xs={12}>
                    <LoginForm />
                </Col>
            </Row>
        );
    }
}
