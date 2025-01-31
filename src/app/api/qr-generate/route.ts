import { APIResponse } from '@/utils/types';
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET() {
  return NextResponse.json({ test: "test" }, { status: 200 });
}

export async function POST(request: Request) {
  const { data } = await request.json();
  const requiredFields = ["course", "venue"];

  const missingFields = requiredFields.filter(x => !data?.[x]);
  if (missingFields.length > 0) {
    const response = { success: false, message: `Missing required fields: ${missingFields.join(", ")}` };
    return NextResponse.json(response, { status: 400 });
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = request.headers.get("host");
  const formPath = "/attendance/form"

  const formUrl = new URL(formPath, `${protocol}://${host}`);
  formUrl.searchParams.set("course", data.course);
  formUrl.searchParams.set("venue", data.venue);

  try {
    const qrCode = await QRCode.toDataURL(formUrl.toString(), {
      errorCorrectionLevel: 'M',
      width: 800,
      margin: 2,
    });
    
    const response: APIResponse = { success: true, data: qrCode }; 
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to generate QR code: ${error}` },
      { status: 500 }
    );
  }

}

