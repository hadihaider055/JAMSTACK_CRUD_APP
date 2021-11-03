import React, { useState, useEffect } from "react";
import FetchData from "../components/getData";
import { User } from "../components/types";

const Home: React.FC = () => {
  const [data, setData] = useState<Object[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [toggleBtn, setToggleBtn] = useState<Boolean>(false);
  const [user, setUser] = useState<User>({
    title: "",
    description: "",
    id: null,
  });

  const getData = async () => {
    fetch(`.netlify/functions/get-crud`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setIsLoading(false);
      });
  };

  const handleEdit = async (post) => {
    try {
      setUser({
        title: post.data.title,
        description: post.data.description,
        id: post.ref["@ref"].id,
      });
      setToggleBtn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`.netlify/functions/delete-crud`, {
        method: "POST",
        body: JSON.stringify(id),
      });
      const data = await res.json();
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (toggleBtn === false) {
        const res = await fetch(`.netlify/functions/create-crud`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        await res.json();
      } else {
        const res = await fetch(`.netlify/functions/update-crud`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        await res.json();
        setToggleBtn(false);
      }
      setUser({
        title: "",
        description: "",
        id: null,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  if (data.length > 0) data.map((item) => console.log(item));
  return (
    <>
      <div className="flex justify-center min-h-screen items-center h-3/4">
        <form onSubmit={handleSubmit}>
          <h3 className="text-3xl text-center font-bold mb-3">CRUD APP</h3>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              name="title"
              className="w-80 border border-gray-700 h-10 rounded-sm px-2 text-md tracking-wider my-1 bg-transparent"
              placeholder="Title"
              onChange={(e) => setUser({ ...user, title: e.target.value })}
              value={user.title}
              required
            />
            <textarea
              name="description"
              className="w-80 border border-gray-700 h-32 rounded-sm px-2 text-md tracking-wider resize-y my-1 bg-transparent"
              placeholder="Description"
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
              value={user.description}
            />
            <button
              type="submit"
              className="w-80 h-10 rounded-sm px-2 text-md tracking-wider resize-y my-1 bg-indigo-600 text-white"
            >
              {toggleBtn ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-3xl text-center font-bold mb-3">CRUD LIST</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <FetchData
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
};

export default Home;
