import { NextResponse } from "next/server";
import { db } from "../../../utils/db";
import { UserSubscription } from "../../../utils/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subscriptionId, email, userName } = body;

    // Save to your database
    const result = await db.insert(UserSubscription).values({
      email: email,
      userName: userName,
      active: true,
      paymentId: subscriptionId,
      joinDate: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json(
      { error: "Failed to save subscription" },
      { status: 500 }
    );
  }
}
