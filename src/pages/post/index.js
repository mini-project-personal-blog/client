import Link from "next/link";
import Layout from "../../../components/layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Post = () => {
  const [post, setPosts] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts", {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setPosts([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDelete]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Post</h2>
      </div>
      <Link
        href="/post/create"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0"
      >
        Add Post
      </Link>
      {/* post */}

      <div className="grid grid-cols-4 gap-5 mt-6" id="post">
        {/* Card */}
        {post.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col max-w-lg p-6 mx-auto text-gray-900 bg-white border border-gray-100 rounded-lg shadow"
            >
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="mb-2 font-medium rounded-xl text-xs text-purple-400">
                {post.Category.category}
              </p>
              <p className="font-light limit-text text-gray-500">
                {post.content}
              </p>
              <div className="grid grid-cols-4 gap-2">
                <Link
                  href={`/post/${post.id}`}
                  className="col-span-3 text-white mt-3 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Detail
                </Link>
                <button
                  onClick={() => {
                    setIsDelete(true);
                    handleDelete(post.id);
                  }}
                  className="text-white mt-3 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Post;
