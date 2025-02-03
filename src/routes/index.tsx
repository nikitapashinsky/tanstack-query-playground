import { createFileRoute } from "@tanstack/react-router";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

import "../app.css";
import Posts from "../components/Posts";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const queryClient = new QueryClient();

function HomeComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-10 max-w-[720px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Posts</h1>
          <a
            href="https://jsonplaceholder.typicode.com/posts/"
            target="_blank"
            className="text-neutral-500 underline decoration-neutral-300 underline-offset-2"
          >
            https://jsonplaceholder.typicode.com/posts/
          </a>
        </div>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}
