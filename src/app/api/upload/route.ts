import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
       .upload_stream(
         { folder: "mindvoyage-next" },
         (error, result) => {
           if (error) reject(error);
           else resolve(result as UploadApiResponse);
         }
      )
      .end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed: " + error},
      { status: 500 }
    );
  }
}