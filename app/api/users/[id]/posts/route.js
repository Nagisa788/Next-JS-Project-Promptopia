import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  // these params get populated if we pass dynamic variables into the URL
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate( //we will only get posts of the specific user
      "creator"
    );
    console.log(prompts, "promptsss");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
