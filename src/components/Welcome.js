import React, { Component } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

class Welcome extends Component {

	render() {
		const { userName } = this.props;
		return (
			<React.Fragment>
				{userName &&
					<Title level={3}>Welcome {userName} 👋</Title>
				}
			</React.Fragment>
		);
	}
}

export default Welcome;