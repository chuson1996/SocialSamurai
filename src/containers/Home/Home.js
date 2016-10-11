import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import VideoThumbnail from '../../components/VideoThumbnail/VideoThumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { getChallenges } from 'redux/modules/challenge';

@asyncConnect([{
	promise: ({store: {dispatch}}) => {
		return dispatch(getChallenges());
	}
}])
@connect((state) => ({
	challenges: state.challenge.challenges,
	level: state.session.data.user.level
}))
export default class Home extends Component {
	static propTypes = {
		challenges: PropTypes.array,
		level: PropTypes.number
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
													description={challenge.title}
													locked={challenge.level > this.props.level} />
								</LinkContainer>
							</Col>
						)}
					</Row>
				</Grid>
			</div>
		);
	}
}
