const Footer = () => {
  return (
    <footer className="text-gray-600 h-[10vh] body-font flex justify-center items-center mt-10">
      <div className="w-11/12 md:w-10/12 lg:max-w-[1200px] mx-auto text-center">
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
          © 2023 Custom Chat App —
          <a
            href="https://faizulosman.netlify.app/"
            className="text-blue-700 underline ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @FaizulOsman
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
