import React from 'react';
import './ConversationSearch.css';

export default function ConversationSearch() {
    const inputHandler = e => {
       console.log('input', e.target.value)
    }


    return (
      <div className="conversation-search">
        <input
          type="search"
          onChange={inputHandler}
          className="conversation-search-input"
          placeholder="Найти в сообщениях"
        />
      </div>
    );
}
