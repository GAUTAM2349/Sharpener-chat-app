// const SelectUser = ({ user }) => {
//     const inputId = `user-check-${user.id}`; // Unique ID based on user ID
  
//     return (
//       <div>
//         <label
//           className="flex items-center cursor-pointer relative"
//           htmlFor={inputId}
//         >
//           <input
//             type="checkbox"
//             className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
//             id={inputId}
//             name="selectedUsers"
//           />
//           <span className="ml-2">{user.name}</span>
//         </label>
//       </div>
//     );
//   };
  
//   export default SelectUser;
  

const SelectUser = ({ user }) => {
    const inputId = `user-check-${user.id}`;
  
    return (
      <div>
        <label htmlFor={inputId} className="flex items-center cursor-pointer">
          <input
            id={inputId}
            type="checkbox"
            name="selectedUsers"
            value={user.id}
            className="mr-2 h-4 w-4 border border-slate-300 rounded"
          />
          {user.name}
        </label>
      </div>
    );
  };
  
  export default SelectUser;
  