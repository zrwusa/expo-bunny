import React, {useState, useCallback, useEffect} from 'react'
import {GiftedChat, IMessage} from 'react-native-gifted-chat'

function DemoChatScreen() {
    const initialMessages: IMessage[] = [];
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default DemoChatScreen
