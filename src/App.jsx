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
import Favorites from "./components/Favorites";

const App = () => {
  const apiKey = "971d87fa604c40279fb910916504bafd";
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("bitcoin");
  const [favorites, setFavorites] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`);
      setPosts(response.data.articles);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const addToFavorites = (post) => {
    setFavorites([...favorites, post]);
  };

  const removeFromFavorites = (url) => {
    setFavorites(favorites.filter((fav) => fav.url !== url));
  };

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
            <li>
              <Link to="/favorites" className="text-red-600 hover:underline text-lg">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex justify-center mb-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              className="px-4 py-2 border rounded-l-lg"
              placeholder="Search for news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-r-lg">
              Search
            </button>
          </form>
        </div>

        <Routes>
          <Route
            path="/"
            element={<NewsList posts={currentPosts} totalPosts={posts.length} postsPerPage={postsPerPage} paginate={paginate} addToFavorites={addToFavorites} />}
          />
          <Route
            path="/view/:postId"
            element={<ViewPostWrapper posts={posts} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
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
