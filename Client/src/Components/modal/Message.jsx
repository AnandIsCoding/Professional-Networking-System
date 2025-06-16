import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function Message() {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className="w-full mx-auto pt-8 md:pt-0">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">💬 Send a Message</h2>

      <form
        onSubmit={handleSend}
        className="bg-white/60 w-full backdrop-blur-md  rounded-2xl p-2 space-y-6"
      >
        {/* Textarea */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Your Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="7"
            placeholder="Write your message..."
            className="w-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
          title='Send message'
            type="submit"
            className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all"
          >
            <FaPaperPlane className="text-white" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Message;
