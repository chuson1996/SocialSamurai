import React from 'react';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

const VideoThumbnail = ({src, description}) => {
    const styles = require('./Home.scss');
    return (
        <Thumbnail src={src}>
            <h3 className={styles['thumbnail-title']}>{description}</h3>
        </Thumbnail>
    );
};

// VideoPanel.propTypes = {};
// VideoPanel.defaultProps = {};

export default VideoThumbnail;
