import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import VideoThumbnail from '../../components/VideoThumbnail/VideoThumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import get from 'lodash/get';
import { asyncConnect } from 'redux-async-connect';
import { getChallenges } from 'redux/modules/challenge';

@asyncConnect([{
	promise: ({store: {dispatch}}) => {
		const promises = [];
		promises.push(dispatch(getChallenges()));
		return Promise.all(promises);
	}
}])
@connect((state) => ({
	challenges: state.challenge.challenges
}))
export default class Home extends Component {
	static propTypes = {
		challenges: PropTypes.array
	};

	render() {
		const styles = require('./Home.scss');
		return (
			<div className={styles.home}>
				<Helmet title="Social Samurai"/>
				<h1 className={styles['homepage-title']}>My Roadmap</h1>
				<Grid>
					<Row>
						{this.props.challenges.map(challenge =>
							<Col key={challenge._id} xs={6} md={4}>
								<LinkContainer to={`/challenges/${challenge.level}`}>
									<VideoThumbnail src={challenge.thumbnailUrl}
													description={challenge.title} />
								</LinkContainer>
							</Col>
						)}
					</Row>
				</Grid>
			</div>
		);
	}
}
