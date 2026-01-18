import { getInfluencerPosts } from "@/services/postService";
import type { Influencer } from "@/types/influencer.types";
import type { Post } from "@/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { CopyPlus, MessageSquareText, ThumbsUp } from "lucide-react";

export default function InfluencerProfileFeed() {
  const { influencer } = useRouteContext({
    from: "/_private/profile",
  });

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", influencer.userId],
    queryFn: () => getInfluencerPosts(influencer.userId),
    enabled: !!influencer.userId,
  });

  if (isLoading) {
    return <div className="mt-10 p-10 px-20 text-center">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="mt-10 p-10 px-20 text-center">Error loading posts.</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-10 p-10 px-20 text-center">No posts available.</div>
    );
  }
 
  return (
    <div className="mt-10 p-10 px-20">
      {data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post) => (
        <PostCard key={post.id} influencer={influencer} post={post} />
      ))}
    </div>
  );
}

const PostCard = ({
  influencer,
  post,
}: {
  influencer: Influencer;
  post: Post;
}) => {
  const transformToFormat = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("sr-RS", options);
  };
  return (
    <div className="border border-primary rounded-lg p-6 mb-16 bg-white">
      <PostHeader
        influencer={influencer}
        postTimestamp={transformToFormat(post.createdAt)}
        postId={post.id}
      />
      <div className="mb-4">{post.text}</div>
      {post.images.length > 0 && <PostGallery images={post.images} />}
      <div className="flex items-center justify-between text-gray-600 text-sm cursor-default">
        <div className="flex gap-1 items-center">
          <ThumbsUp className="w-5 h-5" /> {post.numLikes ?? 0}
        </div>
        <p>{post.numComments ?? 0} komentara</p>
      </div>

      <hr className="my-5 border-primary" />

      <PostButtons postId={post.id} likedByLoggedUser={post.likedByLoggedUser} />
    </div>
  );
};

const PostHeader = ({
  influencer,
  postTimestamp,
  postId,
}: {
  influencer: Influencer;
  postTimestamp: string;
  postId: number;
}) => {
  const handleEditPost = (id: number) => {
    console.log(`Edit post with ID: ${id}`);
  };

  const handleDeletePost = (id: number) => {
    console.log(`Delete post with ID: ${id}`);
  };
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-4">
        <img
          src={
            "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={influencer.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col items-start">
          <div className="font-bold text-lg">{influencer.name}</div>
          <div className="text-gray-500 text-xs">{postTimestamp}</div>
        </div>
      </div>
      <div className="flex gap-4 text-gray-500">
        <button
          className="hover:text-gray-800 cursor-pointer"
          onClick={() => handleEditPost(postId)}
        >
          Izmeni objavu
        </button>
        <button
          className="hover:text-gray-800 cursor-pointer"
          onClick={() => handleDeletePost(postId)}
        >
          Izbriši objavu
        </button>
      </div>
    </div>
  );
};

const PostGallery = ({ images }: { images: string[] }) => {
  if (images.length < 3) {
    return (
      <div
        className={`grid gap-px mb-4 overflow-hidden rounded-xl aspect-15/12
    ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}
  `}
      >
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            className="w-full h-full object-cover"
            alt=""
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="flex gap-px aspect-15/12 overflow-hidden rounded-xl mb-4">
        <img src={images[0]} className="w-1/2 h-full object-cover" alt="" />

        <div className="flex flex-col gap-px w-1/2 h-full">
          <img src={images[1]} className="w-full h-1/2 object-cover" alt="" />
          <img src={images[2]} className="w-full h-1/2 object-cover" alt="" />
        </div>
      </div>
    );
  }
  if (images.length > 3) {
    return (
      <div className="flex flex-col gap-px aspect-15/12 overflow-hidden rounded-xl mb-4">
        <img src={images[0]} className="w-full h-3/5 object-cover" alt="" />

        <div className="flex gap-px h-2/5">
          {images.slice(1, 4).map((imgUrl, index) => {
            const isLastVisible = index === 2;
            const hasMore = images.length > 4;
            const remaining = images.length - 4;

            return (
              <div key={index} className="relative w-1/3 h-full">
                <img
                  src={imgUrl}
                  className={`w-full h-full object-cover ${isLastVisible && hasMore ? "brightness-50" : ""}`}
                  alt=""
                />

                {isLastVisible && hasMore && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                    +{remaining}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

const PostButtons = ({ postId, likedByLoggedUser }: { postId: number; likedByLoggedUser: boolean }) => {
  const handleLikePost = (id: number) => {
    console.log(`Like post with ID: ${id}`);
  };
  const handleCommentPost = (id: number) => {
    console.log(`Comment on post with ID: ${id}`);
  };
  const handleSharePost = (id: number) => {
    console.log(`Share post with ID: ${id}`);
  };
  return (
    <div className="flex justify-around px-[20%]">
      <button
        onClick={() => handleLikePost(postId)}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <ThumbsUp className={`w-7 h-7 ${likedByLoggedUser ? "text-blue-500" : ""}`} />
      </button>
      <button
        onClick={() => handleCommentPost(postId)}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MessageSquareText className="w-7 h-7" />
      </button>
      <button
        onClick={() => handleSharePost(postId)}
        className="flex gap-2 items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <CopyPlus className="w-7 h-7" />
      </button>
    </div>
  );
};
