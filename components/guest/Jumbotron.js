const Jumbotron = () => {
  return (
    <section className="bg-white  ">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Learn about digital <br />
            products &amp; brands.
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-justify">
            Digital products and brands play a significant role in today's
            interconnected world, where technology and the internet have
            transformed the way we live, work, and interact. Let's explore more
            about digital products and brands.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/img/hero.png" alt="hero image" />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
