import React from 'react';
import classNames from 'classnames';
import Image from 'react-bootstrap/lib/Image';

const VideoThumbnail = ({src, description, ...rest}) => {
    const styles = require('./VideoThumbnail.scss');
    return (
        <a className="thumbnail" {...rest}>
            <div className={styles['thumbnail-video']}>
                <span className={classNames('glyphicon glyphicon-lock', styles['lock-icon'])} aria-hidden="true"></span>
                <Image className={styles['locked-video']} src={src} responsive/>
            </div>
            <h3 className={styles.title}>{description}</h3>
        </a>
    );
};

// VideoPanel.propTypes = {};
// VideoPanel.defaultProps = {};

export default VideoThumbnail;
