import React, {Component, PropTypes} from 'react';
import {RegisterForm} from 'components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import * as authActions from 'redux/modules/auth';

// @connect(
//     state => ({user: state.auth.user}),
//     authActions)
export default class Register extends Component {

    static propTypes = {
        user: PropTypes.object,
        login: PropTypes.func,
        logout: PropTypes.func
    };

    render() {
        return (
            <Row>
                <Col sm={6} smOffset={3} xs={12}>
                    <RegisterForm formName="Register" />
                </Col>
            </Row>
        );
    }
}
