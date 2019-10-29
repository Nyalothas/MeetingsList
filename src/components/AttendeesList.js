import React, { Component } from 'react';
import { List, Button, Rate, Icon } from 'antd';

import firebase from './Firebase';

class AttendeesList extends Component {

	constructor(props) {
		super(props);

		this.deleteAttendee = this.deleteAttendee.bind(this);
		this.toggleStar = this.toggleStar.bind(this);
	}

	/**
	 * Removes a user from the meeting
	 */
	deleteAttendee = (e, meetingId, attendeeId) => {
		const adminUser = this.props.adminUser;
		const ref = firebase.database().ref(`meetings/${adminUser}/${meetingId}/attendees/${attendeeId}`);
		ref.remove();
	}

	/**
	 * Mark a user as a favourite
	 */
	toggleStar = (e, meetingId, attendeeId) => {
		const adminUser = this.props.adminUser;
		const ref = firebase.database().ref(`meetings/${adminUser}/${meetingId}/attendees/${attendeeId}/star`);

		ref.set(e);
	}

	render() {
		const admin = this.props.adminUser === this.props.userID ? true : false;
		const { attendees } = this.props;

		return (
			<List
				size="small"
				bordered
				dataSource={attendees}
				renderItem={item =>
					<List.Item actions={
						admin && [
							<a href={`mailto:${item.attendeeEmail}`} title="Mail Attendee"><Icon type="mail" /></a>
							,
							<Button icon="delete" onClick={e => this.deleteAttendee(e, this.props.meetingId, item.attendeeId)} />
						]}>

						<Rate count={1} value={item.star} onChange={e => this.toggleStar(e, this.props.meetingId, item.attendeeId)} />
						{item.attendeeName}
					</List.Item>
				}
			/>

		);
	}
}

export default AttendeesList;