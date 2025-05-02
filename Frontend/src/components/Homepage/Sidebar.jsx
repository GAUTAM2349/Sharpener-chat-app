import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setCurrGroup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch groups from backend
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/group/all");
        
        if (response.data?.joinedGroups) {
          setGroups(response.data.joinedGroups);
        } else {
          setGroups([]); 
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Failed to fetch groups:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchGroups();
  }, [navigate]); 
  

  return (
    <div className="w-1/4  h-[95vh] overflow-scroll bg-green-300 border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4  border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">gootar-gOo</h1>

        {/* Create group button */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a2 2 0 012 2v3h3a2 2 0 012 2v6a2 2 0 01-2 2h-3v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3H3a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2h4z"
              clipRule="evenodd"
            />
          </svg>
        </button>

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

      {/* Group List */}
      <div className="overflow-hidden h-screen p-3 mb-9 pb-20">
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading groups...</p>
        ) : groups.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No groups found.</p>
        ) : (
          groups.map((group, index) => (
            <GroupList
              key={group.id || index}
              group={group}
              index={index}
              setCurrGroup={setCurrGroup}            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
