// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quote from './components/Quote';
import RandomQuote from './components/RandomQuote';
import AuthorQuotes from './components/AuthorQuotes';
import { HiArrowRight } from 'react-icons/hi2';

const App = () => {
  const [quote, setQuote] = useState({});

  const getRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/quotes');
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomQuote = response.data.results[randomIndex];
      setQuote(randomQuote);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className='container'>
              <div className="icon_random">
                <RandomQuote getRandomQuote={getRandomQuote} />
              </div>
            <div className="form_page">
              
              {quote.tags && (
                <Quote
                  text={quote.content}
                  author={quote.author}
                  genre={quote.tags.length > 0 ? quote.tags[0] : 'Unknown'}
                />
              )}

              {quote.author && (
                <Link to={`/${quote.authorSlug}`}>
                  <button className="tacgia">
                    <div className="tacgia_name">
                      <p>{quote.author}</p>
                      <span>{quote.tags}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '20px', color: '#ffff' }}>
                        <HiArrowRight />
                      </p>
                    </div>
                  </button>
                </Link>
              )}
              </div>
              </div>
          }
        />

        <Route path="/:authorSlug" element={<AuthorQuotes author={quote.author} />} />
      </Routes>
    </Router>
  );
};

export default App;
