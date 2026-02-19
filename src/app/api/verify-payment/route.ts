import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    // Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      // Transaction was successful
      // You can save to database here

      return NextResponse.json({ status: "success", data: data.data });
    } else {
      return NextResponse.json({
        status: "failed",
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { status: "error", message: "Verification failed" },
      { status: 500 },
    );
  }
}

// **Update your `.env.local`:**

// NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
// PAYSTACK_SECRET_KEY=sk_test_your_secret_key
