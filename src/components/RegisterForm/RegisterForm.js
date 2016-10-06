import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {register as _register} from 'redux/modules/auth';
import {Link} from 'react-router';

@connect(
	null, {
		register: _register,
	}
)
class RegisterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool,
		fields: PropTypes.object,
		register: PropTypes.func,
		formName: PropTypes.string
	};

	handleSubmit = (values) => {
		this.props.register(values).then(({token}) => {
			localStorage.setItem('token', token);
		});
	};

	render() {
		const { handleSubmit, pristine, submitting, formName } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleSubmit)}>
				<div className="form-group">
					<label>Name</label>
					<div>
						<Field className="form-control" name="name"
							component="input" type="text" placeholder="Name" />
					</div>
				</div>
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
				<button className="button" disabled={pristine || submitting}
						type="submit">{formName}</button>
				<Link className="button m-l-10" to="/login">Login</Link>
			</form>
		);
	}
}

// Decorate the form component
export default reduxForm({
	form: 'register'
})(RegisterForm);
