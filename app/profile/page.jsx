"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPrompts(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post?._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post?._id}`, {
          method: "DELETE",
        });
        const filteredPrompts = prompts.filter((p) => p._id !== post._id);
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default MyProfile;
