import React, {useEffect} from 'react';
import shave from 'shave';
import './ConversationListItem.css';

export default function ConversationListItem(props) {
    useEffect(() => {
        shave('.conversation-snippet', 20);
    })

    const {photo, name, text, date, id} = props.data;
    const {onConversationChange} = props;

    const currentDate = new Date(date).toLocaleDateString('ru');

    return (
        <div className="conversation-list-item" onClick={() => onConversationChange(id)}>
            <img className="conversation-photo" src={photo} alt="conversation"/>
            <div className="conversation-info">
                <h1 className="conversation-title">{name}</h1>
                <div className="conversation-date">{currentDate}</div>
                <p className="conversation-snippet">{text}</p>
            </div>
        </div>
    );
}
