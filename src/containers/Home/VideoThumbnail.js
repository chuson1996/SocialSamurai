import React from 'react';
// import Thumbnail from 'react-bootstrap/lib/Thumbnail';
// import { Link } from 'react-router';

const VideoThumbnail = ({src, description, ...rest}) => {
    const styles = require('./Home.scss');
    // console.log(rest);
    return (
        <a className="thumbnail" {...rest}>
            <img src={src}/>
            <h3 className={styles['thumbnail-title']}>{description}</h3>
        </a>
    );
};

// VideoPanel.propTypes = {};
// VideoPanel.defaultProps = {};

export default VideoThumbnail;
