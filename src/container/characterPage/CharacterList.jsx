import React from "react";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { FcAddImage } from "react-icons/fc";
import { IoPersonAddSharp } from "react-icons/io5";
import { FiTv } from "react-icons/fi";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderNeuter } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [addCharacter, setAddCharacter] = useState({
    username: "",
    name: "",
    image: "",
    series: "",
    gender: "Other",
  });
  const [loading, setLoading] = useState(true);
  const [addDisplay, setAddDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const API = "https://68372a55664e72d28e43d073.mockapi.io/post";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchDisplay, setSearchDisplay] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API);
      setCharacters(response.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCharacter = () => {
    setLoading(true);
    if (!addCharacter.name) {
      setError("Please fill in Character Name field");
      setTimeout(() => {
        setError("");
      }, 1500);
      setLoading(false);
      return;
    }
    if (!addCharacter.image) {
      setError("Please fill in Image URL field");
      setTimeout(() => {
        setError("");
      }, 1500);
      setLoading(false);
      return;
    }
    if (!addCharacter.series) {
      setError("Please fill in Series field");
      setTimeout(() => {
        setError("");
      }, 1500);
      setLoading(false);
      return;
    }

    axios
      .post(API, {
        username: localStorage.getItem("user"),
        name: addCharacter.name,
        image: addCharacter.image,
        series: addCharacter.series,
        gender: addCharacter.gender,
      })
      .then(() => {
        setSuccess("Character added successfully!");
        setAddDisplay(false);
        fetchCharacters();
        setAddCharacter({
          username: "",
          name: "",
          image: "",
          series: "",
          gender: "Other",
        });
        setTimeout(() => {
          setSuccess("");
        }, 1500);
      })
      .catch((error) => {
        setError("Error adding character");
        console.error("Error adding character:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDeleteCharacter = (id) => {
    setLoading(true);
    axios
      .delete(`${API}/${id}`)
      .then(() => {
        setSuccess("Character deleted successfully!");
        fetchCharacters();
        setTimeout(() => {
          setSuccess("");
        }, 1500);
      })
      .catch((error) => {
        setError("Error deleting character");
        console.error("Error deleting character:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);
  const filteredList = characters.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {success}
        </Alert>
      )}
      <div className="flex flex-col  items-center px-5 md:px-12 lg:px-18 xl:px-23 gap-5 py-5 bg-neutral-100 min-h-screen">
        {addDisplay ? (
          <div className="flex flex-col justify-center items-center bg-white p-5 rounded-xl shadow-md mx-5 md:mx-0 ">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-neutral-50 px-2 py-1 rounded-lg">
                <input
                  type="text"
                  placeholder="Character Name"
                  className="p-2 px-4 rounded-lg focus:border-none focus:outline-none "
                  value={addCharacter.name}
                  onChange={(e) =>
                    setAddCharacter({ ...addCharacter, name: e.target.value })
                  }
                />
                <IoPersonAddSharp className="text-4xl text-gray-400" />
              </div>

              <div className="flex items-center gap-4 bg-neutral-50 px-2 py-1 rounded-lg">
                <input
                  type="text"
                  placeholder="Add Image URL"
                  className=" p-2 px-4 rounded-lg focus:border-none focus:outline-none "
                  value={addCharacter.image}
                  onChange={(e) =>
                    setAddCharacter({ ...addCharacter, image: e.target.value })
                  }
                />
                <FcAddImage className="text-4xl text-gray-400" />
              </div>
              <div className="flex items-center gap-4 bg-neutral-50 px-2 py-1 rounded-lg">
                <input
                  type="text"
                  placeholder="From which TV Series"
                  className=" p-2 px-4 rounded-lg focus:border-none focus:outline-none "
                  value={addCharacter.series}
                  onChange={(e) =>
                    setAddCharacter({ ...addCharacter, series: e.target.value })
                  }
                />
                <FiTv className="text-4xl text-gray-400" />
              </div>
              <div className="flex items-center gap-4 bg-neutral-50 px-2 py-1 rounded-lg">
                <p className="text-neutral-600 pl-4">Choose gender:</p>
                <select
                  className="p-2 px-4 rounded-lg focus:border-none focus:outline-none"
                  value={addCharacter.gender}
                  onChange={(e) =>
                    setAddCharacter({ ...addCharacter, gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end w-full">
                <button
                  className="bg-sky-600 text-white px-4 py-2 w-30 rounded hover:bg-sky-700 transition cursor-pointer"
                  onClick={() => {
                    handleAddCharacter();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center w-full">
          <div
            className={
              searchDisplay
                ? "flex items-center bg-white w-full py-3 md:w-9/12 lg:w-8/12 xl:w-9/12 rounded-lg transition-all duration-300 ease-in-out"
                : "w-10 flex items-center bg-white  py-3  rounded-lg transition-all duration-300 ease-in-out"
            }
          >
            <IoSearchOutline
              className="text-neutral-400 text-2xl ml-2 cursor-pointer hover:text-sky-500 transition-colors duration-200 hover:scale-105"
              onClick={() => {
                setSearchDisplay((prev) => !prev);
              }}
            />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search characters..."
              className={
                searchDisplay
                  ? " px-5 md:w-7/12 rounded-lg w-full focus:border-none focus:outline-none"
                  : "w-0 opacity-0"
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition cursor-pointer text-sm md:text-lg flex items-center gap-2"
            onClick={() => {
              {
                localStorage.getItem("user")
                  ? setAddDisplay(true)
                  : setError("Please login to add a character!");
              }
            }}
          >
            Add Character
          </button>
        </div>
        <h1 className="text-3xl font-bold w-full border-b pb-2">
          Character List
        </h1>
        {loading && (
          <div className="col-span-4 text-center text-gray-500">Loading...</div>
        )}

        {filteredList.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            No characters found.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ">
          {[...filteredList].reverse().map((character) => (
            <div
              key={character.id}
              className="flex flex-col bg-white pb-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 gap-4"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover rounded-t-xl "
              />
              <div className="flex flex-col gap-4 px-4">
                <h1 className="text-xl font-semibold text-center">
                  {character.name}
                </h1>
                <div className="flex  items-center gap-3">
                  <FaUserAlt className="text-neutral-600 text-xl" />
                  <p>{character.username}</p>
                </div>
                <div className="flex  items-center gap-3">
                  <FiTv className="text-neutral-600 text-xl" />
                  <p>{character.series}</p>
                </div>
                <div className="flex  items-center gap-3">
                  {character.gender === "Female" && (
                    <BsGenderFemale className="text-pink-500 text-xl " />
                  )}
                  {character.gender === "Male" && (
                    <BsGenderMale className="text-blue-500 text-xl " />
                  )}
                  {character.gender === "Other" && (
                    <BsGenderNeuter className="text-neutral-600 text-xl " />
                  )}
                  <p className="text-neutral-600">
                    <span
                      className={`font-semibold ${
                        character.gender === "Female" ? "text-pink-500" : ""
                      }
              ${character.gender === "Male" ? "text-blue-500" : ""}
              ${character.gender === "Other" ? "text-neutral-600" : ""}
              `}
                    >
                      {character.gender}
                    </span>
                  </p>
                </div>
                {localStorage.getItem("user") === character.username && (
                  <button
                    className="bg-red-500 text-white px-4  py-2 rounded-xl hover:bg-red-600 transition cursor-pointer"
                    onClick={() => handleDeleteCharacter(character.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CharacterList;
