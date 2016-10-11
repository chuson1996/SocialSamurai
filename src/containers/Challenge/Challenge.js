import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Youtube from 'react-youtube';
import { Comment } from 'components';
import { connect } from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import Image from 'react-bootstrap/lib/Image';
import { saveComment as _saveComment } from 'redux/modules/comment';
import {levelUp as _levelUp} from 'redux/modules/challenge';

@connect(
	(state) => ({
		session: state.session.data
	}),
	{
		saveComment: _saveComment,
		levelUp: _levelUp
	}
)
class Challenge extends Component {
	static propTypes = {
		session: PropTypes.object,
		params: PropTypes.object.isRequired,
		saveComment: PropTypes.func.isRequired
	};

	saveComment(body) {
		const { saveComment, params: { challengeId } } = this.props;
		saveComment({
			challengeId,
			body
		});
	}

	levelUp = () => {
		console.log(this.props.session.user._id);
	};

	render() {
		const styles = require('./Challenge.scss');
		const challenge = find(get(this.props.session, 'challenges'), { _id: this.props.params.challengeId });
		const videoUrl = challenge && challenge.videoUrl;
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
					<a onClick={this.levelUp} className="button">Completed</a>
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
