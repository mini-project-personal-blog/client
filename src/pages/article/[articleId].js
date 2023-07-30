import { useEffect, useState } from "react";
import Footer from "../../../components/guest/Footer";
import Navbar from "../../../components/guest/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Comment from "../../../components/guest/Comment";

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const router = useRouter();
  const { articleId } = router.query;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/guest/posts/${articleId}`)
      .then((res) => {
        setArticle({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-white">
        <div className="max-w-screen-xl px-2 py-8 mx-auto lg:py-24 lg:px-4">
          <div className="mb-8 lg:mb-12 mt-10">
            <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900">
              {article.title}
            </h2>
            <button className="mr-2 px-2 rounded-xl text-white text-sm bg-purple-600">
              {article.Category?.category}
            </button>
            <button className="mb-6 px-2 rounded-xl text-white text-sm bg-red-600">
              {article.User?.name}
            </button>
            <p className="mb-5 font-light text-gray-500 sm:text-xl text-justify">
              {article.content}{" "}
            </p>
          </div>
          <Comment article={article} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticleDetail;
