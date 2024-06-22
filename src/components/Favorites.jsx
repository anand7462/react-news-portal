import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {favorites.map((post, index) => (
        <div key={index} className="p-4 border rounded shadow-sm bg-white relative flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-red-700">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
              Read More
            </a>
          </div>
          <button onClick={() => removeFromFavorites(post.url)} className="mt-4 bg-red-600 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
