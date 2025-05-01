// import  { useEffect, useState } from 'react';
// import SelectUser from './SelectUser';
// import AllUsers from './AllUsers';
// import api from '../../../config/axiosConfig';
// import AllUsersContext from '../../../utils/AllUsersContext';

// // const CreateGroup = () => {

// //     return (

// //         <>



// const CreateGroup = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => setIsOpen(false);
//   const openModal = () => setIsOpen(true);
//   const [allUsers, setAllUsers] = useState([]);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await api.get('/user');
//         const users = response.data.users;
//         console.log("got user response : ", response);
//         setAllUsers(users);
//       } catch (error) {
//         console.log("an error occurred fetching users", error);
//       }
//     };
  
//     fetchUsers();
//   }, []); 
  
  

//   return (
//     <>
//       {/* Trigger Button */}
//       <div className="text-center mt-4">
//         <button
//           onClick={openModal}
//           className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
//         >
//           Open Modal
//         </button>
//       </div>

//       {/* Modal Backdrop */}
//       {isOpen && (
//         <div
//           onClick={closeModal}
//           className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
//         >
//           {/* Modal Dialog */}
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
//           >
//             <div className="relative flex flex-col bg-white">
//               {/* Header */}
//               <div className="relative m-2 items-center flex justify-center text-white h-24 rounded-md bg-green-400">
//                 <h3 className="text-2xl">Create Group +</h3>
//               </div>

//               {/* Form */}
//               <div className="flex flex-col gap-4 p-6">
//                 <div className="w-full max-w-sm min-w-[200px]">
//                   <label className="block mb-2 text-sm text-slate-600">Group Name</label>
//                   <input
//                     type="email"
//                     className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//                     placeholder="Your Group Name"
//                   />
//                 </div>

                

//                 {/* ALL USERS */}

//                 <div className=" mt-2">

//                   <AllUsersContext.Provider value={{ users : allUsers}}>
//                   <AllUsers/>
//                   </AllUsersContext.Provider>
                  
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="p-6 pt-0">
//                 <button
//                   className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                   type="button"
//                 >
//                   Sign In
//                 </button>
//                 <p className="flex justify-center mt-6 text-sm text-slate-600">
//                   Don&apos;t have an account?
//                   <a
//                     href="#signup"
//                     className="ml-1 text-sm font-semibold text-slate-700 underline"
//                   >
//                     Sign up
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreateGroup;


 

import { useEffect, useState, useRef, useContext } from 'react';
import SelectUser from './SelectUser';
import AllUsers from './AllUsers';
import api from '../../../config/axiosConfig';
import AllUsersContext from '../../../utils/AllUsersContext';
import UserContext from '../../../utils/UserContext';

const CreateGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const {user} = useContext(UserContext);
  const formRef = useRef();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user');
        const users = response.data.users;
        console.log("got user response : ", response);
        setAllUsers(users);
      } catch (error) {
        console.log("an error occurred fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    try{

    const form = formRef.current;
    const formData = new FormData(form);

    const groupName = formData.get("groupName");
    const selectedUserIds = formData.getAll("selectedUsers");

    const data = {  groupName, userIds:selectedUserIds, adminId:user.id};

    console.log("data sent is ",data);

    const response = await api.post('/group/add-group', data);
    console.log(response);

    }catch(error){
      console.log("error in creating group :  ",error);
    }
    
    // closeModal();
  };

  return (
    <>
      <div className="text-center mt-4">
        <button
          onClick={openModal}
          className="rounded-md bg-slate-800 py-2 px-4 text-white text-sm"
        >
          Open Modal
        </button>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-[24rem] rounded-lg bg-white overflow-hidden"
          >
            <form ref={formRef} className="flex flex-col">
              {/* Header */}
              <div className="m-2 flex justify-center items-center h-24 rounded-md bg-green-400 text-white">
                <h3 className="text-2xl">Create Group +</h3>
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col gap-4 p-6">
                <div className="w-full">
                  <label className="block mb-2 text-sm text-slate-600">Group Name</label>
                  <input
                    type="text"
                    name="groupName"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400"
                    placeholder="Your Group Name"
                  />
                </div>

                {/* User Checkboxes */}
                <div className="mt-2">
                  <AllUsersContext.Provider value={{ users: allUsers }}>
                    <AllUsers 
                      selectable = {false}
                    />
                  </AllUsersContext.Provider>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-md bg-slate-800 py-2 px-4 text-white text-sm"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;

