import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Search } from 'lucide-react';
import { voiceCommands, searchSuggestions } from '../utils/mockData';

const VoiceSearch = ({ onSearch, isListening, setIsListening }) => {
  const [transcript, setTranscript] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    if (transcript) {
      const filtered = searchSuggestions.filter(s => 
        s.toLowerCase().includes(transcript.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 4));
    } else {
      setSuggestions([]);
    }
  }, [transcript]);

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setTranscript(randomCommand);
      setIsListening(false);
      onSearch(randomCommand);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleManualSearch = () => {
    if (transcript.trim()) {
      onSearch(transcript);
      setTranscript('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setTranscript(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex-1 relative">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Search products or try voice search..."
            className="w-full px-6 py-4 text-lg focus:outline-none bg-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
          />
          
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <Search className="inline w-4 h-4 mr-3 text-gray-400" />
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-3 px-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleManualSearch}
            className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Search className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isListening 
                ? 'bg-red-100 text-red-600 shadow-lg' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="listening"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative"
                >
                  <MicOff className="w-5 h-5" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-red-400 rounded-full opacity-30"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.8,
                      delay: i * 0.2 
                    }}
                    className="w-1 h-4 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
              <span className="text-blue-700 font-medium">Listening...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceSearch;