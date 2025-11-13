"use client";
import React, { useEffect, useState } from "react";
import { api } from "./utils/axiosInstance.js";
import { useRouter } from "next/navigation";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/posts");
        console.log(data);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  

  const getDetails = (id) => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="w-full h-auto p-10 cursor-pointer">
      <h1 className="text-3xl font-bold mb-6">Blog App</h1>



           <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50"
              onClick={() => getDetails(item.id)}
            >
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {item.title}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-700">
                {item.body}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Page;
