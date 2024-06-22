import React from 'react';

const ViewNews = ({ post }) => {
  return (
    <div className="p-6 border rounded shadow-sm bg-white">
      <h1 className="text-3xl font-bold mb-4 text-red-700">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Published At:</strong> {post.publishedAt}</p>
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
        Read full article
      </a>
    </div>
  );
};

export default ViewNews;
