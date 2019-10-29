import React, { Component } from 'react';
import { Card, Col, Row, Form, Input, Button } from 'antd';
import { navigate } from '@reach/router';

import firebase from './Firebase';

import FormError from './FormError';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errorMessage: null
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		this.setState({ [itemName]: itemValue });
	}

	handleSubmit(e) {
		const loginInfo = {
			email: this.state.email,
			password: this.state.password
		}
		e.preventDefault();

		// log in user with email and password
		firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
			.then(() => {
				navigate('/meetings');
			}).catch(error => {
				if (error.message !== null) {
					this.setState({ errorMessage: error.message })
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
					<Card title="Log in" bordered={true}>

						{this.state.errorMessage !== null ? (<FormError theMessage={this.state.errorMessage} />) : null}

						<Form {...formItemLayout} onSubmit={this.handleSubmit}>
							<Form.Item label="Email">
								<Input name="email" value={this.state.email} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Password">
								<Input.Password name="password" value={this.state.password} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Log in
								</Button>
							</Form.Item>
						</Form>

					</Card>
				</Col>
			</Row>
		);
	}
}

export default Login;