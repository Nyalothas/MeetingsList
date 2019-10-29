import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import firebase from './Firebase';

import AttendeesList from './AttendeesList';

class Attendees extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allAttendees: [],
			displayAttendees: [],
			searchQuery: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.resetQuery = this.resetQuery.bind(this);
		this.choseRandom = this.choseRandom.bind(this);
	}

	componentDidMount() {
		const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingId}/attendees`);

		ref.on('value', snapshot => {
			let attendees = snapshot.val();
			let attendeesList = [];
			for (const item in attendees) {
				const attendee = attendees[item];
				attendeesList.push({
					attendeeId: item,
					attendeeName: attendee.attendeeName,
					attendeeEmail: attendee.attendeeEmail,
					star: attendee.star
				});
			}

			this.setState({
				allAttendees: attendeesList,
				displayAttendees: attendeesList
			});
		});
	}

	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		this.setState({ [itemName]: itemValue });
	}

	/**
	 * Picks a random user from the list of attendees
	 */
	choseRandom() {
		const randomAttendee = Math.floor(Math.random() * this.state.allAttendees.length);
		this.resetQuery();

		// Show only one attendee
		this.setState({displayAttendees: [this.state.allAttendees[randomAttendee]]})
	}

	/**
	 * Resets the search query
	 */
	resetQuery() {
		this.setState({
			displayAttendees: this.state.allAttendees,
			searchQuery: ''
		});
	}

	render() {

		const dataFilter = item => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;
		const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

		return (
			<Card title="Attendees" bordered={true}>

				<Input name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange}
					placeholder="Search Attendees"
					addonAfter={
						<Button.Group>
							<Button icon="undo" onClick={this.resetQuery} />
							<Button icon="interaction" onClick={this.choseRandom} />
						</Button.Group>
					}
				/>

				<AttendeesList adminUser={this.props.adminUser} userID={this.props.userID} attendees={filteredAttendees}
					meetingId={this.props.meetingId} />
			</Card>
		);
	}
}

export default Attendees;