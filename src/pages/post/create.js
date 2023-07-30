import { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const CreatePost = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setCategories([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/posts", input, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setInput({
          title: "",
          content: "",
          category_id: "",
        });
        router.push("/post");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Create Post
        </h2>
        <div className="p-4 bg-white rounded-lg shadow-xs">
          <form className="px-1 pt-1" onSubmit={handleSubmit}>
            <label className="block text-sm mb-3">
              <input
                onChange={handleChange}
                value={input.title}
                name="title"
                type="text"
                className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border py-1 px-2 rounded-lg"
                placeholder="Title"
                required
              />
            </label>
            <label className="block text-sm mb-3">
              <input
                onChange={handleChange}
                value={input.content}
                name="content"
                type="text"
                className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border py-1 px-2 rounded-lg"
                placeholder="Content"
                required
              />
            </label>
            <label className="block text-sm mb-3">
              <select
                onChange={handleChange}
                value={input.category_id}
                name="category_id"
                className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border py-1 px-2 rounded-lg"
                required
              >
                <option value="" disabled>
                  Add Category
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.category}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="flex justify-end text-center space-x-1">
              <button
                onClick={() => {
                  router.push("/post");
                }}
                className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
