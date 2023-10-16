import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Input } from '@nextui-org/react'

import { BiPaperPlane } from 'react-icons/bi'

const initialQuestions = [
  {
    username: 'Alice',
    image: 'https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg',
    userId: 'user123',
    date: '2023-10-15',
    message: 'Hey there! How are you doing?',
    answer: ['Hello there']
  },
  {
    username: 'Bob',
    userId: 'user456',
    image: 'https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg',
    date: '2023-10-15',
    message: 'Hi Alice! Im doing well, thank you. How about you?',
    answer: 'Hello there'
  },
  {
    username: 'John',
    image: 'https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg',
    userId: 'user123',
    date: '2023-10-16',
    message: 'Im doing great too! Lets catch up soon.',
    answer: 'Hello there'
  },
  {
    username: 'Mike',
    userId: 'user456',
    image: 'https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg',
    date: '2023-10-16',
    message:
      'Sure, that sounds good. Looking forward to it!. Sure, that sounds good. Looking forward to it!',
    answer: 'Hello there'
  }
]
function Test () {
  const [selectedChat, setSelectedChat] = useState('No one')
  const [questions, setQuestions] = useState(initialQuestions)
  const [message, setMessage] = useState('')
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // Update the counter to trigger re-render when message is updated
    setCounter(counter + 1)
  }, [message])
  const selectChat = (question) => {
    setSelectedChat(question)
  }
  const handleSendMessage = () => {
    if (selectedChat !== 'No one') {
      const updatedQuestions = questions.map((question) => ({
        ...question,
        answer:
          question.username === selectedChat.username
            ? message
            : question.answer
      }))
      setQuestions(updatedQuestions)
    }
  }
  return (
    <div className='w-full h-screen flex overflow-hidden chat-selector'>
      <div className='w-1/5 bg-zinc-900 p-4 flex flex-col chat-display'>
        {questions.map((question, index) => (
          <div
            key={`${question.userId}-${index}`}
            onClick={() => selectChat(question)}
            className='w-full border-b h-14 border-t border-slate-400 flex space-x-2 items-center cursor-pointer'
          >
            <img
              className='w-8 h-8 rounded-full'
              name={question.username}
              src={question.image}
              alt={`${question.username}'s avatar`}
            />
            <div className='flex flex-col'>
              <span className='text-sm'>{question.username}</span>
              <span className='text-xs line-clamp-2'>{question.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='w-4/5 flex flex-col'>
        <div className='bg-stone-800 flex items-center'>
          <span className='text-3xl font-bold p-3'>
            Chatting with {selectedChat.username}
          </span>
        </div>
        <div className='bg-zinc-600 w-full h-full p-4'>
          <div className='flex flex-col text-3xl text-ellipsis w-full space-y-2'>
            <div className='flex justify-start'>
              <div className='p-2 bg-zinc-500 w-1/2 rounded-md flex'>
                <span>{selectedChat.message}</span>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='p-2 bg-slate-700 w-1/2 rounded-md flex'>
                <span className=''>{selectedChat.answer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full bg-zinc-800 h-14 flex items-center px-6 space-x-4'>
          <Input
            type='text'
            variant='underlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label='Message'
            className=''
          />
          <BiPaperPlane
            size={40}
            className='cursor-pointer'
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Test
