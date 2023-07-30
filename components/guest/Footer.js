const Footer = () => {
  return (
    <div className="text-center my-12">
      <a
        href="#"
        className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          src="/img/todo.png"
          className="h-6 mr-3 sm:h-9"
          alt="Landwind Logo"
        />
      </a>
      <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
        © 2023 GIGADGET™. All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
