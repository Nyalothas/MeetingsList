import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { Form, Input, Button, Card } from 'antd';

import firebase from './Firebase';

class Checkin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
			email: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		this.setState({ [itemName]: itemValue });
	}

	handleSubmit(e) {
		e.preventDefault();

		// Get a reference to the DB path
		const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingId}/attendees`);

		// Add attendees
		ref.push({
			attendeeName: this.state.displayName,
			attendeeEmail: this.state.email,
			star: 0
		});

		navigate(`/attendees/${this.props.userID}/${this.props.meetingId}`);
	}

	render() {
		return (
			<Card title="Check in" bordered={true}>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item>
						<Input name="displayName" value={this.state.displayName} onChange={this.handleChange} />
					</Form.Item>
					<Form.Item>
						<Input name="email" value={this.state.email} onChange={this.handleChange} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Check in
					</Button>
					</Form.Item>
				</Form>
			</Card>
		);
	}
}

export default Checkin;