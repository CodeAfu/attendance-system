import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  const { data } = await request.json();

  
  return NextResponse.json({ success: true, data }, { status: 200 });
}