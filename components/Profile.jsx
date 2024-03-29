"use client";

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, onEdit, onDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            onEdit={() => onEdit && onEdit(post)}
            onDelete={() => onDelete && onDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
