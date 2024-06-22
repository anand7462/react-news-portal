import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ posts, totalPosts, postsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-2 text-red-700">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <Link to={`/view/${index}`} className="text-red-500 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
      <nav className="mt-8">
        <ul className="flex justify-center space-x-2">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="px-3 py-1 border rounded bg-red-100 text-red-700 hover:bg-red-200">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NewsList;
