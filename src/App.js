import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './components/Firebase';

import { Layout } from 'antd';
import './App.css';

import Home from './components/Home';
import Welcome from './components/Welcome';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Meetings from './components/Meetings';
import Register from './components/Register';
import Checkin from './components/Checkin';
import Attendees from './components/Attendees';

const { Content } = Layout;

class App extends Component {

	constructor() {
		super();
		this.state = {
			user: null,
			displayName: null,
			userID: null
		};
	}

	componentDidMount() {
		// When a user is logged in, get related data
		firebase.auth().onAuthStateChanged(FBUser => {
			if (FBUser) {
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid
				});

				// Get a DB reference to all the meetings for the specified userId
				const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid);

				// When the value changes update the meetingsList
				meetingsRef.on('value', snapshot => {
					let meetings = snapshot.val();
					let meetingsList = [];

					for (let item in meetings) {
						meetingsList.push({
							meetingId: item,
							meetingName: meetings[item].meetingName
						});
					}

					this.setState({
						meetings: meetingsList,
						howManyMeetings: meetingsList.length
					});
				});

			} else {
				this.setState({ user: null });
			}
		});
	}

	/**
	 * Adds a new meeting in the Firebase DB
	 */
	addMeeting = meetingName => {
		// Get a reference to the DB node
		const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);

		// Add a new record to the node
		ref.push({ meetingName: meetingName });
	}

	/**
	 * Registers a user using the Firebase api
	 */
	registerUser = userName => {

		// When something changes about authentication, this event gets generated
		firebase.auth().onAuthStateChanged(FBUser => {
			// Push information to firebase
			FBUser.updateProfile({
				displayName: userName
			}).then(() => {

				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid
				});

				navigate('/meetings');
			});
		});
	}

	/**
	 * Logs out the current authenticated user
	 */
	logOutUser = e => {
		e.preventDefault();
		this.setState({
			user: null,
			displayName: null,
			userID: null
		});

		firebase.auth().signOut().then(() => navigate('/login'));
	}

	render() {
		return (
			<React.Fragment>
				<Layout className="layout">
					<Navigation user={this.state.displayName} logOutUser={this.logOutUser} />
					<Content>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							{this.state.displayName && <Welcome userName={this.state.displayName}/>}
							<Router>
								<Home path="/" user={this.state.user} />
								<Login path="/login" user={this.state.user} />
								<Meetings path="/meetings" user={this.state.user} addMeeting={this.addMeeting}
									meetings={this.state.meetings} userID={this.state.userID} />
								<Attendees path="/attendees/:userID/:meetingId" adminUser={this.state.userID} />
								<Checkin path="/checkin/:userID/:meetingId" />
								<Register path="/register" registerUser={this.registerUser} />
							</Router>
						</div>
					</Content>
				</Layout>
			</React.Fragment>
		);
	}

}

export default App;
