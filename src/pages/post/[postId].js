import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { data } from "autoprefixer";

const PostDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const { postId } = router.query;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${postId}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setPost({ ...res.data });
        setCurrentId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isEdit]);

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
  }, [isEdit]);

  const handleEdit = () => {
    axios
      .get(`http://localhost:8000/api/posts/${currentId}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setInput({
          title: res.data.title,
          content: res.data.content,
          category_id: res.data.category_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/posts/${currentId}`, input, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setInput({
          title: "",
          content: "",
          category_id: "",
        });
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Post Detail
        </h2>
      </div>

      {!isEdit && (
        <>
          <button
            onClick={() => {
              setIsEdit(true);
              handleEdit();
            }}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0"
          >
            Edit Post
          </button>

          <div className="mb-8 lg:mb-12 mt-5">
            <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900">
              {post.title}
            </h2>
            <button className="mr-2 px-2 rounded-xl text-white text-sm bg-purple-600">
              {post.Category?.category}
            </button>
            <button className="mb-6 px-2 rounded-xl text-white text-sm bg-red-600">
              {post.User?.name}
            </button>
            <p className="mb-5 font-light text-gray-500 sm:text-xl text-justify">
              {post.content}{" "}
            </p>
          </div>
        </>
      )}

      {isEdit && (
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
                  setIsEdit(false);
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
      )}
    </Layout>
  );
};

export default PostDetail;
