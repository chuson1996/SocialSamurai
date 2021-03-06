import React, {Component, PropTypes} from 'react';
import {RegisterForm} from 'components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

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
                    <RegisterForm />
                </Col>
            </Row>
        );
    }
}
