import React from 'react';
import './ToolbarButton.css';

// это задел на будущее, потом все будет, если руки дойдут.

export default function ToolbarButton(props) {
    const { icon } = props;
    return (
      <i className={`toolbar-button ${icon}`} />
    );
}
