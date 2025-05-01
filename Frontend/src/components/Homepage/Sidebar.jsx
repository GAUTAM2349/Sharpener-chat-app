// import  { useState } from "react";

// const users = [
//   { name: "Alice", message: "Hoorayy!!", color: "ffa8e4" },
//   { name: "Martin", message: "That pizza place was amazing! We should go again sometime. 🍕", color: "ad922e" },
//   { name: "Charlie", message: "Hey, do you have any recommendations for a good movie to watch?", color: "2e83ad" },
//   { name: "David", message: "I just finished reading a great book! It was so captivating.", color: "c2ebff" },
//   { name: "Ella", message: "What's the plan for this weekend? Anything fun?", color: "e7c2ff" },
//   { name: "Fiona", message: "I heard there's a new exhibit at the art museum. Interested?", color: "ffc2e2" },
//   { name: "George", message: "I tried that new cafe downtown. The coffee was fantastic!", color: "f83f3f" },
//   { name: "Hannah", message: "I'm planning a hiking trip next month. Want to join?", color: "dddddd" },
//   { name: "Ian", message: "Let's catch up soon. It's been too long!", color: "70ff33" },
//   { name: "Jack", message: "Remember that hilarious joke you told me? I can't stop laughing!", color: "30916c" },
// ];

// const Sidebar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="w-1/4 bg-white border-r border-gray-300">
//       {/* Sidebar Header */}
//       <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
//         <h1 className="text-2xl font-semibold">Chat Web</h1>

//         {/* create group button */}

//         <button>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
//   <path fillRule="evenodd" d="M10 2a2 2 0 012 2v3h3a2 2 0 012 2v6a2 2 0 01-2 2h-3v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3H3a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2h4z" clipRule="evenodd" />
// </svg>
//         </button>

//         <div className="relative">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//               <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
//             </svg>
//           </button>
//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//               <ul className="py-2 px-3">
//                 <li>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a>
//                 </li>
//                 <li>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Contact List */}
//       <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
//         {users.map((user, index) => (
//           <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
//             <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
//               <img
//                 src={`https://placehold.co/200x/${user.color}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
//                 alt="User Avatar"
//                 className="w-12 h-12 rounded-full"
//               />
//             </div>
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold">{user.name}</h2>
//               <p className="text-gray-600">{user.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
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
        const response = await api.get("/group/all"); // Adjust if your endpoint differs
        console.log("Fetched groups:", response.data);
        setGroups(response.data.joinedGroups); // ✅ Correctly update state with fetched data
      } catch (error) {
        if(error.response.status === 401) navigate("/login");
        console.log("Failed to fetch groups:", error);
      } finally {
        setLoading(false); // ✅ Stop loading indicator
      }
    };

    fetchGroups();
  }, []); // Only run on mount

  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>

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
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
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
