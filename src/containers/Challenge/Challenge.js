import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Youtube from 'react-youtube';
import { Comment } from 'components';
import { connect } from 'react-redux';
// import get from 'lodash/get';
// import find from 'lodash/find';
import Image from 'react-bootstrap/lib/Image';
import { saveComment as _saveComment } from 'redux/modules/challenge';
import {levelUp as _levelUp} from 'redux/modules/challenge';
import { asyncConnect } from 'redux-async-connect';
import { load as loadChallenge } from 'redux/modules/challenge';
import last from 'lodash/last';
import classNames from 'classnames';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const pathname = getState().routing.locationBeforeTransitions.pathname;
		const challengeLevel = last(pathname.split('/'));
		return Promise.all([dispatch(loadChallenge(challengeLevel))]);
	}
}])
@connect(
	(state) => ({
		challenge: state.challenge.data,
		userId: state.session.data.user._id,
		userLevel: state.session.data.user.level
	}),
	{
		saveComment: _saveComment,
		levelUp: _levelUp
	}
)
class Challenge extends Component {
	static propTypes = {
		challenge: PropTypes.object,
		params: PropTypes.object.isRequired,
		saveComment: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired,
		userLevel: PropTypes.number.isRequired,
		levelUp: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			completed: this.props.params.challengeId < this.props.userLevel
		};
	}

	saveComment(body) {
		const { saveComment, params: { challengeId } } = this.props;
		saveComment({
			challengeId,
			body
		}).then(() => {
			this.mainCommentElem.value = '';
		});
	}

	levelUp = () => {
		this.setState({
			completed: true
		});
		this.props.levelUp(this.props.userId);
	};

	render() {
		const styles = require('./Challenge.scss');
		const {challenge} = this.props;
		const videoUrl = challenge && challenge.videoUrl;
		console.log(this.state.completed);
		return (
			<Row>
				<Col xs={12} sm={8}>
					{videoUrl &&
					 <Youtube
						opts={{
							width: '100%'
						}}
						videoId={videoUrl}
					/>}
					{challenge && <h2>{ challenge.title }</h2>}
					<Panel>
						<p>Challenge: </p>
						{challenge && <p>{ challenge.description }</p>}
					</Panel>
				</Col>
				<Col xs={12} sm={4}>
					{this.state.completed ? <button
						className={classNames('button', styles.completed)} disabled>
						Completed</button> :
						<a onClick={this.levelUp} className="button" disabled>Complete</a>}
					<hr/>
					<Panel header="Comments">
						<table className={styles.commentTable}>
							<tbody>
								<tr>
									<td className={styles.avatarContainer}>
										<Image src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" circle responsive />
									</td>
									<td className={styles.commentContainer}>
										<textarea required className="m-b-10" id="" cols="30" rows="2" placeholder="Add a comment" ref={(_ref) => this.mainCommentElem = _ref}></textarea>
										<button className="pull-right m-l-10" onClick={() => this.saveComment(this.mainCommentElem.value)}>Comment</button>
										<button className="pull-right m-l-10" onClick={() => this.mainCommentElem.value = '' }>Cancel</button>
									</td>
								</tr>
							</tbody>
						</table>
						{challenge && challenge.comments &&
							challenge.comments.reverse().map((comment, key) => <Comment key={key} comment={comment} />)
						}
					</Panel>
				</Col>
			</Row>
		);
	}
}
export default withRouter(Challenge);
