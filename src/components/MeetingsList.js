import React, { Component } from 'react';
import { List, Button } from 'antd';
import { navigate } from '@reach/router';

import firebase from './Firebase';

const ButtonGroup = Button.Group;

class MeetingsList extends Component {

	constructor(props) {
		super(props);

		this.deleteMeeting = this.deleteMeeting.bind(this);
	}

	/**
	 * Deletes the selected meeting from the DB
	 */
	deleteMeeting = (e, meetingId) => {
		// Get a reference to the meeting DB path
		const ref = firebase.database().ref(`meetings/${this.props.userID}/${meetingId}`);

		// Obliterate the meeting 😈
		ref.remove();
	}

	render() {
		const { meetings } = this.props;

		return (
			<List
				size="large"
				bordered
				dataSource={meetings}
				renderItem={item =>
					<List.Item>
						{item.meetingName}
						<ButtonGroup style={{ float: 'right' }}>
							<Button type="default" icon="link"
								onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingId}`)} />
							<Button type="default" icon="unordered-list"
								onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingId}`)} />
							<Button type="default" icon="delete" onClick={e => this.deleteMeeting(e, item.meetingId)} />
						</ButtonGroup>
					</List.Item>
				}
			/>
		);
	}
}

export default MeetingsList;