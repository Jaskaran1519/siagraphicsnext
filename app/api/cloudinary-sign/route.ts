import { auth } from "@/lib/auth";
import cloudinary from "cloudinary";

export const POST = auth(async (req: any) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET!
  );

  return Response.json({ signature, timestamp });
}) as any;
