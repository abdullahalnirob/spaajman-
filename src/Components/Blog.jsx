
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBlogs from '../Hooks/useBlogs';
import Loading from './Loading/Loading';

const Blog = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [salon, loading] = useBlogs();

  useEffect(() => {
    setFilteredBlogs(salon);
  }, [salon]);

  const handleBlog = () => {
    if (searchVal.trim() === "") {
      setFilteredBlogs(salon);
      return;
    }
    const filterBySearch = salon.filter((item) => {
      const isTitleMatch = item.title.toLowerCase().includes(searchVal.toLowerCase());
      const isTagMatch = item.tags.some((tag) =>
        tag.toLowerCase().includes(searchVal.toLowerCase())
      );
      return isTitleMatch || isTagMatch;
    });
    setFilteredBlogs(filterBySearch);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Salon and Spa Blogs</h1>

      <div className="flex justify-center bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search blogs by title or tags..."
          className="border p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={handleBlog}
          className="bg-indigo-600 text-white p-2 rounded-r-lg transition-colors duration-300 hover:bg-indigo-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {filteredBlogs.map((salonBlog) => (
          <div key={salonBlog._id} className="flex flex-col items-center border rounded-lg shadow-lg p-4 transition-transform duration-300 transform hover:scale-105">
            <img
              src={salonBlog.image}
              alt={salonBlog.title}
              className="w-fit h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{salonBlog.title}</h2>
            <p className="text-sm text-gray-500">
              {salonBlog.date} by {salonBlog.author}
            </p>
            <p className="mt-2 text-sm text-gray-700">{salonBlog.description}</p>

            <div className="mt-3">
              {salonBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-3 py-1 rounded hover:bg-gray-300 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* <Link to={`/blog/${salonBlog._id}`}>
              <button className="my-5 w-full underline underline-offset-4 hover:no-underline relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-indigo-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">View More</span>
              </button>
            </Link> */}
            <Link to={`/blog/${salonBlog._id}`} class="relative my-5 inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
              <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-indigo-500 opacity-[3%]"></span>
              <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-indigo-600 opacity-100 group-hover:-translate-x-8"></span>
              <span class="relative w-full text-left text-indigo-600 transition-colors duration-200 ease-in-out group-hover:text-white">View More</span>
              <span class="absolute inset-0 border-2 border-indigo-600 rounded-full"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
