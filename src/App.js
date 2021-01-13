import React, { useState } from 'react';
import './App.css';

require('dotenv').config();

const App = () => {
  const [query, setQuery] = React.useState('Space Travel');
  const [list, setList] = React.useState(null);

  const search = (e) => {
    e.preventDefault();
    searchYouTube(query).then(setList);
  };

  return (
    <div className='app'>
      <h1>Search for YouTube videos by Topic</h1>
      <p>
        source code available on
        <a href='https://github.com/lebogangolifant/youtube-api/'> GitHub</a>
      </p>
      <form onSubmit={search}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Results</button>
      </form>
      {list &&
        (list.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul className='items'>
            {list.map((item) => (
              <li className='item' key={item.id}>
                <div>
                  <b ClassName='title'>
                    <a href={item.link}>{item.title}</a>
                  </b>
                  <p>{item.description}</p>
                </div>
                <ul className='meta'>
                  <li>
                    By: <a href={item.author.ref}>{item.author.name}</a>
                  </li>
                  <li>Views: {item.views}</li>
                  <li>Duration: {item.duration}</li>
                  <li>Uploaded: {item.uploaded_at}</li>
                </ul>
                <img alt='' src={item.thumbnail} />
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
};

export default App;
require('dotenv').config();
async function searchYouTube(q) {
  q = encodeURIComponent(q);
  const response = await fetch(
    'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=' + q,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'youtube-search-results.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    }
  );
  const body = await response.json();
  console.log(body);
  return body.items.filter((item) => item.type === 'video');
}
