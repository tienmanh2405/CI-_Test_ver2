// AuthorQuotes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Quote from './Quote';
import '../App.css';
const AuthorQuotes = ({ author }) => {
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const { authorSlug } = useParams();

  useEffect(() => {
    const fetchAuthorQuotes = async () => {
      try {
        const response = await axios.get(`https://api.quotable.io/quotes?authorSlug=${authorSlug}`);
        const filteredQuotes = response.data.results.filter((quote) => quote.author === author);
        setAuthorQuotes(filteredQuotes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorQuotes();
  }, [authorSlug, author]);

  return (
      <> 
      <div className='component'>    
          <div className='form_page'>
            <div>
              <p style={{ margin:"30px 0 30px 30px",fontSize:"25px", fontWeight:"bold"}}>{author}</p>
          </div>
        {authorQuotes.map((quote, index) => (
          <Quote
            key={index}
            text={quote.content}
            author={quote.author}
            genre={quote.tags.length > 0 ? quote.tags[0] : 'Unknown'}
          />
        ))}
              </div>
        </div>
    </>
  );
};

export default AuthorQuotes;
