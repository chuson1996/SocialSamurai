import React from 'react';
import classNames from 'classnames';

const VideoThumbnail = ({src, description, ...rest}) => {
    const styles = require('./VideoThumbnail.scss');
    return (
        <a className="thumbnail" {...rest}>
            <span className={classNames('glyphicon glyphicon-lock', styles['lock-icon'])} aria-hidden="true"></span>
            <img className={styles['locked-video']} src={src}/>
            <h3 className={styles.title}>{description}</h3>
        </a>
    );
};

// VideoPanel.propTypes = {};
// VideoPanel.defaultProps = {};

export default VideoThumbnail;
