import React, { Component } from 'react';
import { Card, Col, Row, Form, Input, Button } from 'antd';

import firebase from './Firebase';

import FormError from './FormError';

class Register extends Component {

	constructor(props) {
		super(props); // make the props from here available anywhere in the application
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			errorMessage: null
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		this.setState({ [itemName]: itemValue }, () => {
			if (this.state.password !== this.state.confirmPassword) {
				this.setState({ errorMessage: 'Password do not match!' });
			} else {
				this.setState({ errorMessage: null });
			}
		});
	}

	handleSubmit(e) {
		var registrationInfo = {
			displayName: this.state.displayName,
			email: this.state.email,
			password: this.state.password
		}
		e.preventDefault();

		// Create a new user with email and password
		firebase.auth().createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
			.then(() => {
				this.props.registerUser(registrationInfo.displayName);
			}).catch(error => {
				if (error.message !== null) {
					this.setState({ errorMessage: error.message });
				} else {
					this.setState({ errorMessage: null });
				}
			});
	}

	render() {

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		}

		return (
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Register" bordered={true}>

						{this.state.errorMessage !== null ? (<FormError theMessage={this.state.errorMessage} />) : null}

						<Form {...formItemLayout} onSubmit={this.handleSubmit}>
							<Form.Item label="Display Name">
								<Input name="displayName" value={this.state.displayName} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Email Address">
								<Input name="email" value={this.state.email} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Password">
								<Input.Password name="password" value={this.state.password} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Confirm Password">
								<Input.Password name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Register
								</Button>
							</Form.Item>
						</Form>

					</Card>
				</Col>
			</Row>
		);
	}
}

export default Register;