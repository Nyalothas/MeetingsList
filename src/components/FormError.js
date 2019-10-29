import React, { Component } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

class FormError extends Component {
	render() {
		const { theMessage } = this.props;

		return (
			<Text type="danger">{theMessage}</Text>
		);
	}
}

export default FormError;