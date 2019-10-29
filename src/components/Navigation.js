import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from '@reach/router';

import mainLogo from '../images/logo.png';

const { Header } = Layout;

class Navigation extends Component {

	render() {
		const { user, logOutUser } = this.props;
		return (
				<Header>
					<img  src={mainLogo} alt="meeting list"/>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px', float: 'right' }} >
						{user &&
							<Menu.Item key="1">
								<Link to="/meetings">Meetings</Link>
							</Menu.Item>}
						{!user &&
							<Menu.Item key="2">
								<Link to="/login">Log in</Link>
							</Menu.Item>}
						{!user &&
							<Menu.Item key="3">
								<Link to="/register">Register</Link>
							</Menu.Item>}
						{user &&
							<Menu.Item key="4">
								<Link to="/login" onClick={e => logOutUser(e)}>Log out</Link>
							</Menu.Item>}
					</Menu>
				</Header>
		);
	}
}

export default Navigation;