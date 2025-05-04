

const SidebarHeader = ({menuOpen, setMenuOpen}) => {

    return (

        <>
        <header className="p-4 sticky top-0 border-b border-gray-300 flex justify-between items-center bg-green-400 text-white">
        <h1 className="text-5xl font-extrabold text-[#ff5f5f] tracking-wider border-b-8 border-amber-200 pb-2 drop-shadow-md font-[Noto Sans Devanagari]">
    गुटर-गू
  </h1>

        {/* Create group button */}
        

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2 px-3">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 2
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

        </>
        
    )
    
}

export default SidebarHeader;