import React, { Component, /* PropTypes */ } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Image from 'react-bootstrap/lib/Image';
import classNames from 'classnames';

export default class Comment extends Component {
	static propTypes = {};

	render() {
		const styles = require('./Comment.scss');

		return (
			<Row>
				<Col xs={3}>
					<Image src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" circle responsive />
				</Col>
				<Col xs={9}>
					<a className={styles.username}>SonChu</a>
					<p className={styles['comment-text']}>How can I reduce approach anxiety?</p>
					<a className={classNames('icon fa-comment', styles['reply-icon'])}>
						{/* <Glyphicon glyph="comment" /> */}
						<span className="m-l-5">Reply</span>
					</a>
				</Col>
			</Row>
		);
	}
}
