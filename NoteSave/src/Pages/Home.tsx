import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type d = {
  _id: string;
  note: string;
};



const Addnote = (): React.ReactElement => {
  const [data, setData] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const token: any = localStorage.getItem("user");
      if (!token) {
        navigate("/login");
      }
      if (data === "") return;
      try {
        const params = {
          _data_: data.substring(0, 435),
        };
        const response = await axios.post(
          "http://localhost:8080/add_note",
          params,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        console.log(response.data.message);
        location.reload();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="shadow-lg  border p-2 m-2 mx-4 h-fit max-w-64 min-w-64">
      <div className="flex flex-col justify-center mt-2 mb-1">
        <textarea
          maxLength={275}
          placeholder="Enter note here"
          className=" p-1 min-h-64 hover:border-opacity-100 resize-none border-opacity-50 
          focus:border-opacity-100  border-2  border-x-0 border-cyan-700  focus:outline-none"
          onChange={(e) => setData(e.target.value.replace("  ", " "))}
        ></textarea>
        <button
          className="hover:underline underline-offset-4 decoration-red-600 font font-black"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

// Home page

function Home(): React.ReactElement {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<d[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const handleDelete = async (id: string) => {
    try {
      setNotes(notes.filter((n) => n._id != id));
      await axios.delete(`http://localhost:8080/delete_note${id}`);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  const color = ["orange-300","green-300","red-300"]
  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  const handleDeleteaccount = async () => {
    try {
      const token: any = localStorage.getItem("user");
      const decoded: any = jwtDecode(token);
      localStorage.removeItem("user");
      navigate("/login");
      await axios.delete(
        `http://localhost:8080/delete_account${decoded.Email}`
      );
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const get = async () => {
      try {
        const token: any = localStorage.getItem("user");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get("http://localhost:8080/get_note", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setNotes(response.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    get();
  }, []);
  return (
    <>
      <nav className="py-4 flex w-full justify-center sm:justify-around bg-slate-900 ">
        <h1 className="text-white font text-center text-sm sm:text-3xl ">Notes Saver</h1>
        <ul className="flex gap-5 mx-5">
          <li className="text-white hover:text-opacity-75 flex 
          items-center decoration-orange-600 hover:underline 
          underline-offset-8 text-sm sm:text-xl font ">
            <button onClick={() => setShow(!show)}>+ Add Note</button>
          </li>
          <li className="text-white hover:text-opacity-75 flex items-center decoration-orange-600 hover:underline underline-offset-8 text-sm sm:text-xl font ">
            <button onClick={handleDeleteaccount}>Delete Account</button>
          </li>
          <li className="text-white hover:text-opacity-75 flex items-center decoration-orange-600 hover:underline underline-offset-8 text-sm sm:text-xl font">
            <a href="/" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex  justify-center sm:justify-normal sm:p-12  flex-wrap  " id="page">
        {show && <Addnote />}
        {notes.map((note) => (
          <div
            key={note._id}
            className={` shadow-xl ransition-transform duration-300
            shadow-${color[Math.floor(Math.random()*3)]} ease-in-out transform hover:scale-110 border p-2 m-2 mx-4 h-fit 
            max-w-64 min-w-64`}
          >
            <p className="cursor-text min-h-64   break-words">{note.note}</p>
            <hr />
            <div className="flex justify-center mt-2 mb-1">
              <button
                className="hover:underline underline-offset-4 decoration-red-600 font font-black"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
