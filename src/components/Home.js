import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Button, Typography } from 'antd';

const { Title } = Typography;

class Home extends Component {

	render() {
		const { user } = this.props;
		return (
			<div style={{ textAlign: 'center' }}>
				<Title level={2}>Meetings List</Title>
				{user == null && (
					<React.Fragment>
						<Button>
							<Link to="/register">Register</Link>
						</Button>
						<Button>
							<Link to="/login">Log In</Link>
						</Button>
					</React.Fragment>
				)}

				{user && (
					<Button type="primary">Meetings</Button>
				)}

			</div>
		);
	}
}

export default Home;