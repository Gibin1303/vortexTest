"use client";
import { api } from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (id) getData();
  }, [id]);

  if (!data) {
    return <p className="p-10 text-lg text-gray-600">Loading...</p>;
  }

  return (
      <div className="w-full min-h-screen p-10 bg-gray-50 flex justify-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.title}</h1>

        <p className="text-gray-700 leading-relaxed mb-6">{data.body}</p>

        <div className="flex flex-wrap gap-3 mb-4">
            <span
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
                #{data.tags}
            </span>
        </div>

        <div className="border-t pt-4 mt-4 flex flex-col gap-2 text-gray-700">
          <p>
            <span className="font-semibold">Post ID:</span> {data.id}
          </p>
          <p>
            <span className="font-semibold">User ID:</span> {data.userId}
          </p>
          <p>
            <span className="font-semibold">Reactions:</span>  {data.reactions.likes} - {data.reactions.dislikes}
          </p>
          <p>
            <span className="font-semibold">Views:</span>  {data.views}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
