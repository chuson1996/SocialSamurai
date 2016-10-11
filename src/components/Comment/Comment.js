import React, { Component, PropTypes } from 'react';
// import Col from 'react-bootstrap/lib/Col';
// import Row from 'react-bootstrap/lib/Row';
import Image from 'react-bootstrap/lib/Image';
import classNames from 'classnames';

export default class Comment extends Component {
	static propTypes = {
		comment: PropTypes.object
	};

	render() {
		const styles = require('./Comment.scss');
		const { comment } = this.props;

		return (
			<table className={styles.commentTable}>
				<tbody>
					<tr>
						<td className={styles.avatarContainer}>
							<Image className={styles.avatar} src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" circle responsive />
						</td>
						<td className={styles.commentContainer}>
							<a className={styles.username}>{comment._creator.name}</a>
							<p className={styles['comment-text']}>{comment.body}</p>
							<a className={classNames('icon fa-comment', styles['reply-icon'])}>
								{/* <Glyphicon glyph="comment" /> */}
								<span className="m-l-5">Reply</span>
							</a>
							<div className="m-b-5">&nbsp;</div>
							{comment.comments.reverse().map((_comment, key) => <table className={styles.commentTable} key={key}>
								<tbody>
									<tr>
										<td className={styles.avatarContainer}>
											<Image className={styles.avatar} src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" circle responsive />
										</td>
										<td className={styles.commentContainer}>
											<a className={styles.username}>{_comment._creator.name}</a>
											<p className={styles['comment-text']}>{_comment.body}</p>
											<a className={classNames('icon fa-comment', styles['reply-icon'])}>
												{/* <Glyphicon glyph="comment" /> */}
												<span className="m-l-5">Reply</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>)}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}
