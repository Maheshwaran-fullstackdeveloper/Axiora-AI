import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaHeart,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-800/50 backdrop-blur-sm bg-zinc-900/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Axiora AI
            </h2>
            <p className="text-zinc-500 text-sm flex items-center gap-1.5">
              Built with{" "}
              <FaHeart className="w-3 h-3 text-rose-500 animate-pulse" /> by
              Maheshwaran G
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Maheshwaran-fullstackdeveloper"
              className="p-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              title="GitHub"
              target="_blank"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/mahzz_.xx/"
              className="p-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              title="Instagram"
              target="_blank"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/maheshwaran-g30"
              className="p-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              title="LinkedIn"
              target="_blank"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {currentYear} Axiora AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
