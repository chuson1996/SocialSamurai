import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Youtube from 'react-youtube';

class Challenge extends Component {
	static propTypes = {};

	render() {
		return (
			<Row>
				<Col sm={3}>SideBar</Col>
				<Col sm={9}>
					<Youtube
						videoId={`v7UIz_ANLb0`}
					/>
					<h2>Challenge 0: Who is Social Samurai?</h2>
					<Panel>
						<p>Challenge: </p>
						<p>Go up to 5 strangers and get compliments from them.</p>
					</Panel>
				</Col>
			</Row>
		);
	}
}
export default withRouter(Challenge);
