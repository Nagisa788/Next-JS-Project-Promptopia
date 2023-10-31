"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard key={post._id} post={post} onTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    let data = await response.json();

    if (searchText) {
      data = data.filter(
        (p) =>
          p.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          p.tag.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={(tag) => setSearchText(tag)} />
    </section>
  );
};

export default Feed;
