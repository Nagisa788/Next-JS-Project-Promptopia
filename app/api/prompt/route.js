import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    console.log(prompts,"promptsss")

    return new Response(JSON.stringify(prompts), { status: 200 });

  } catch (error) {
    console.log(error,"errors")
    return new Response("Failed to fetch all prompts"+error, { status: 500 });
  }
};
