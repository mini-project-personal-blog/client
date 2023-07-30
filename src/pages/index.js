import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/guest/Navbar";
import Jumbotron from "../../components/guest/Jumbotron";
import Footer from "../../components/guest/Footer";
import Link from "next/link";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/guest/posts")
      .then((res) => {
        setArticles([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Jumbotron />

      {/* article */}
      <section className="bg-white dark:bg-gray-900" id="article">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Digital Products & Brands
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Find your favorite digital products & brands article to read here
            </p>
          </div>
          <div
            className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"
            id="article"
          >
            {/* Card */}
            {articles.map((article) => {
              return (
                <div
                  key={article.id}
                  className="flex flex-col max-w-lg p-6 mx-auto text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                >
                  <h3 className="text-2xl font-semibold">{article.title}</h3>
                  <p className="mb-2 font-medium rounded-xl text-xs text-purple-400">
                    {article.Category.category}
                  </p>
                  <p className="font-light limit-text text-gray-500 dark:text-gray-400">
                    {article.content}
                  </p>
                  <Link
                    href={`/article/${article.id}`}
                    className="text-white mt-3 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900"
                  >
                    Read More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
