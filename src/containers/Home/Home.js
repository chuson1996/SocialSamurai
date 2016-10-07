import React, { Component } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import VideoThumbnail from '../../components/VideoThumbnail/VideoThumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {LinkContainer} from 'react-router-bootstrap';
import {browserHistory} from 'react-router';

export default class Home extends Component {

	// constructor(props) {
	// 	super(props);
	// 	// if (!localStorage.getItem('token')) {
	// 	// 	browserHistory.push('/login');
	// 	// }
	// 	console.log(localStorage);
	// }

	render() {
		const styles = require('./Home.scss');
		// require the logo image both from client and server
		// const logoImage = require('./logo.png');
		console.log(styles);
		return (
			<div className={styles.home}>
				<Helmet title="Social Samurai"/>
				<h1 className={styles['homepage-title']}>My Roadmap</h1>
				<Grid>
					<Row>
						<Col xs={6} md={4}>
							<LinkContainer to="/challenges/1">
								<VideoThumbnail src="../../assets/handshake.png" description="Handshake"/>
							</LinkContainer>

						</Col>
						<Col xs={6} md={4}>
							<LinkContainer to="/challenges/2">
								<VideoThumbnail src="../../assets/hugging.png" description="Hugging"/>
							</LinkContainer>
						</Col>
						<Col xs={6} md={4}>
							<LinkContainer to="/challenges/3">
								<VideoThumbnail src="../../assets/shouting.png" description="Shouting"/>
							</LinkContainer>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
