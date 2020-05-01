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

    /*
    * код ниже не очень красивый, но я не вижу иного способа. видимо неправильно понял задание, переписывать уже буду на TS на праздниках.
    * еще не совсем понятно, как через хуки очищать стейт, кроме как пихать в него пустое значение. но я разберусь.
    * сильно не бейте =)
    * */

    const onConversationChange = (id) => {
        try {
            if (id === '1') {
                respondMockResult(messages1).then((response) => {
                    getInitialMessages();
                    setMessages([...messages, ...(response)]);
                })
            } else if (id === '2') {
                respondMockResult(messages2).then((response) => {
                    getInitialMessages();
                    setMessages([...messages, ...(response)]);
                })
            } else if (id === '3') {
                getInitialMessages();
                respondMockResult(messages3).then((response) => {
                    setMessages([...messages, ...(response)]);
                })
            } else if (id === '4') {
                getInitialMessages();
                respondMockResult(messages4).then((response) => {
                    setMessages([...messages, ...(response)]);
                })
            }
        } catch (e) {
            throw new Error(`Unable to get messages. ${e}`);
        }
    };

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
