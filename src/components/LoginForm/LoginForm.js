import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {login as _login, logout as _logout} from 'redux/modules/auth';

@connect(
    null, {
        login: _login,
        logout: _logout
    }
)
class LoginForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        fields: PropTypes.object,
        login: PropTypes.func,
        logout: PropTypes.func
    };

    handleSubmit = (values) => {
        console.log(values);
        this.props.login(values);
    };

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group">
                    <label>Email</label>
                    <div>
                        <Field className="form-control" name="email"
                               component="input" type="email" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div>
                        <Field className="form-control" name="password"
                               component="input" type="password" placeholder="Password" />
                    </div>
                </div>
                <button className="btn btn-success" disabled={pristine || submitting}
                        type="submit">Login</button>
            </form>
        );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'simple'
})(LoginForm);
