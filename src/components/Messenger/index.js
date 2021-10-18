import React, {useEffect, useState} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {respondMockResult} from "../../utils/respond-mock-result";
import messages1 from "../../assets/fixtures/messages-1.json";
import messages2 from "../../assets/fixtures/messages-2.json";
import messages3 from "../../assets/fixtures/messages-3.json";
import messages4 from "../../assets/fixtures/messages-4.json";
import conversations from "../../assets/fixtures/conversations.json";

export default function Messenger() {
    const [sortedConversations, setConversations] = useState([]);
    let [messages, setMessages] = useState([]);


    useEffect(() => {
        getConversations()
        getInitialMessages();
    }, []);

    const allMessages = [].concat(messages1, messages2, messages3, messages4);

    const getConversations = () => {
        try {
            respondMockResult(conversations).then((response) => {
                let newConversations = response.results.map(result => {
                    return {
                        photo: result.picture.large,
                        name: `${result.name.first} ${result.name.last}`,
                        text: 'Привет-привет! Тут супер-длинное сообщение, которое надо обрезать',
                        date: result.date,
                        id: result.id
                    };
                });
                const sortedConversations = newConversations.slice().sort((a, b) => b.date - a.date);

                setConversations([...sortedConversations]);
            });
        } catch (e) {
            throw new Error(`Unable to get conversations. ${e}`);
        }
    };

    const getInitialMessages = () => {
        messages = [];
        setMessages([...messages, ...messages]);
    };

  const onConversationChange = (id) => {
    const currentChatMessages = allMessages.find(item => item.chatId === id).messages;

    if (!currentChatMessages) {
      return;
    }

    try {
          getInitialMessages();
          setMessages([...messages, ...(currentChatMessages)]);

    } catch (e) {
      throw new Error(`Unable to get messages. ${e}`);
    }
  }

    return (
        <div className="messenger">
            <div className="scrollable sidebar">
                <ConversationList sortedConversations={sortedConversations}
                                  onConversationChange={onConversationChange}/>
            </div>
            <div className="scrollable content">
                <MessageList messages={messages}/>
            </div>
        </div>
    );
}
