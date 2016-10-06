import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router';
import {login as _login, logout as _logout} from 'redux/modules/auth';
import {browserHistory} from 'react-router';

@connect(
	state => ({loginError: state.auth.loginError}),
	{
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
		logout: PropTypes.func,
		formName: PropTypes.string,
		loginError: PropTypes.object
	};

	handleSubmit = (values) => {
		this.props.login(values).then(({token}) => {
			localStorage.setItem('token', token);
			browserHistory.push('/');
		});
	};

	render() {
		const { handleSubmit, pristine, submitting, formName } = this.props;
				const styles = require('./LoginForm.scss');
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
								{this.props.loginError &&
								<p className={styles['error-message']}>{this.props.loginError.message}</p>}
				<button className="button" disabled={pristine || submitting}
						type="submit">{formName}</button>
				<Link className="button m-l-10" to="/register">Register</Link>
			</form>
		);
	}
}

// Decorate the form component
export default reduxForm({
	form: 'login'
})(LoginForm);
