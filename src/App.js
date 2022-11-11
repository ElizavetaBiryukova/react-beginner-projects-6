import React from 'react';
import './index.scss';
import {Collection} from './Collection.jsx'

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

React.useEffect(() => {

const caregory = categoryId ? `category=${categoryId}` : '';

  setIsLoading(true);
  fetch(`https://636ce17fab4814f2b270fded.mockapi.io/photo_collections?page=${page}&limit=3&${caregory}`)
  .then(res => res.json())
  .then(json => {
    setCollections(json);
  }).catch(err => {
    console.warn(err);
    alert('Ошибка при получении данных');
  })
  .finally(() => setIsLoading(false));
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
    {
        categories.map((obj, i) => (
        <li 
        onClick={() => setCategoryId(i)}
        className={categoryId === i ? 'active' : ''} 
        key={obj.name}>{obj.name}</li>))
    }

        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
        <h2>Идет загурзка...</h2>
        ) : (
          collections.filter(obj =>  obj.name.toLowerCase().includes(searchValue.toLowerCase())
        ).map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
          />
        )))}
      
      </div>
      <ul className="pagination">
{
  [...Array(3)].map((_, i) => <li key={i} onClick={() => setPage(i+1)} className={page === i+1 ? 'active' : ''} >{i + 1}</li>)
}

      </ul>
    </div>
  );
}

export default App;