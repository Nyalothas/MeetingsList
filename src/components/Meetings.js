import React, { Component } from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';

import MeetingsList from './MeetingsList';

class Meetings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			meetingName: ''
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
		e.preventDefault();

		this.props.addMeeting(this.state.meetingName);
		this.setState({ meetingName: '' });
	}

	render() {
		return (
			<React.Fragment>
				<Row gutter={[0, 16]}>
					<Col>
						<Card title="Add a Meeting" bordered={true}>
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<Form.Item label="Meeting name">
									<Input name="meetingName" value={this.state.meetingName} onChange={this.handleChange} />
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" icon="plus" />
								</Form.Item>
							</Form>
						</Card>
					</Col>
				</Row>

				<Row gutter={[0, 16]}>
					<Col>
						{this.props.meetings && (
							<Card title="Your Meetings" bordered={true}>
								<MeetingsList meetings={this.props.meetings} userID={this.props.userID} />
							</Card>
						)}
					</Col>
				</Row>

			</React.Fragment>
		);
	}
}

export default Meetings;