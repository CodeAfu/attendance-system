import { APIResponse } from '@/lib/types';
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  const { course, venue } = await request.json();
  
  const requiredFields = ["course", "venue"];
  const fields = { course, venue };
  const missingFields = requiredFields.filter(field => !fields[field as keyof typeof fields]);
  
  if (missingFields.length > 0) {
    return NextResponse.json(
      { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = request.headers.get("host");
  const formPath = "/attendance/form"

  const formUrl = new URL(formPath, `${protocol}://${host}`);
  formUrl.searchParams.set("course", course);
  formUrl.searchParams.set("venue", venue);

  try {
    const qrCode = await QRCode.toDataURL(formUrl.toString(), {
      errorCorrectionLevel: 'M',
      width: 800,
      margin: 2,
    });
    
    const response: APIResponse = { 
      success: true, 
      data: {
        QRCode: qrCode,
        url: formUrl.toString(),
        course: course,
        venue: venue,
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}

