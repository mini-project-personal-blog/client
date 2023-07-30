import axios from "axios";
import { useState } from "react";

const Comment = ({ article }) => {
  const [input, setInput] = useState({
    comment: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8000/api/posts/${article.id}/comment`, input)
      .then((res) => {
        setInput({
          comment: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-0 p-4 bg-gray-200 rounded-lg shadow-xs">
        <h2 className="mb-2 text-xl font-extrabold tracking-tight text-gray-900">
          Leave a Reply
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-3">
            <input
              name="comment"
              type="text"
              onChange={handleChange}
              value={input.comment}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Comment"
              required
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-2 py-1 text-sm font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
            >
              Add
            </button>
          </div>
        </form>
        <div className="grid grid-cols-3 gap-2 mt-10">
          {article.Comments?.map((comment) => {
            return (
              <div className="container mx-auto" key={comment.id}>
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
                  <h4 className="mb-1 font-semibold text-gray-600 text-sm">
                    {comment.comment}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
