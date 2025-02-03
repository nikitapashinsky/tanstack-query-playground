import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function List() {
  const [page, setPage] = useState(1);

  async function fetchPosts(page: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`,
    );

    return response.json();
  }

  const { isPending, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
  });

  if (isPending) return "loading";

  if (error) return "error: " + error.message;

  return (
    <div className="flex flex-col gap-8 w-full">
      {data.map((post: Post) => {
        return (
          <div key={post.id}>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="mt-2">{post.body}</p>
          </div>
        );
      })}
      <nav className="flex justify-between items-center bg-white fixed bottom-4 w-[320px] left-[50%] -translate-x-[50%] p-2 pl-4 rounded-xl shadow-2xl shadow-black/60 ring ring-black/[4%]">
        <span className="text-sm font-medium text-neutral-800">{`Page ${page} of 10`}</span>
        <div className="flex gap-2">
          <button
            className="bg-neutral-100 rounded-lg px-3 py-1 cursor-pointer disabled:text-neutral-400 disabled:cursor-not-allowed hover:bg-neutral-200 disabled:hover:bg-neutral-100 text-sm font-medium"
            onClick={() => {
              setPage((old) => old - 1);
            }}
            // Disable the Next Page button until we know a next page is available
            // disabled={isPlaceholderData || !data?.hasMore}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="bg-neutral-100 rounded-lg px-3 py-1 cursor-pointer disabled:text-neutral-400 disabled:cursor-not-allowed hover:bg-neutral-200 disabled:hover:bg-neutral-100 text-sm font-medium"
            onClick={() => {
              setPage((old) => old + 1);
            }}
            // Disable the Next Page button until we know a next page is available
            // disabled={isPlaceholderData || !data?.hasMore}
            disabled={page === 10}
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
