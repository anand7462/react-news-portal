import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import NewsList from "./components/NewsList";
import ViewNews from "./components/ViewNews";

const App = () => {
  const apiUrl = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=971d87fa604c40279fb910916504bafd";

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Adjust this number as needed

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setPosts(response.data.articles); // Adjusting to access the articles array
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Router>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <div className="bg-red-200 p-6 mb-6 rounded-lg shadow-md">
          <h1 className="text-5xl font-bold text-red-800 text-center mb-4">
            News Portal
          </h1>
          <p className="text-gray-700 text-center text-lg">
            Explore and read the latest news
          </p>
        </div>

        <nav className="mb-8">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="/" className="text-red-600 hover:underline text-lg">
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<NewsList posts={currentPosts} totalPosts={posts.length} postsPerPage={postsPerPage} paginate={paginate} />}
          />
          <Route
            path="/view/:postId"
            element={<ViewPostWrapper posts={posts} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const ViewPostWrapper = ({ posts }) => {
  const { postId } = useParams();
  const post = posts[parseInt(postId)]; // Accessing by index since no ID is available
  return post ? <ViewNews post={post} /> : <p>Post not found</p>;
};

export default App;
