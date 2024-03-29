import React from 'react';
import { ChatState } from '../context/ChatProvider';
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogics';

import { Tooltip, Avatar } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {messages &&
        messages.map((m, i) => {
          return (
            <div style={{ display: 'flex' }} key={m._id}>
              {(isSameSender(messages, m, i, user.id) ||
                isLastMessage(messages, i, user.id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user.id),
                  marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
              >
                {m.content}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ScrollableChat;
