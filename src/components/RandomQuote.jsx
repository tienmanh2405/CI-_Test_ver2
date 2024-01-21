
import React from 'react';
import '../App.css';
import { RiLoopRightFill } from "react-icons/ri";
const RandomQuote = ({ getRandomQuote }) => (
  <button className='random_button' onClick={getRandomQuote}>random<RiLoopRightFill /></button>
);

export default RandomQuote;
