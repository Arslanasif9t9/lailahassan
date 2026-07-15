import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    // TODO (launch): send email via Resend —
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({ to: site.email, ... })
    // For now the lead is logged server-side.
    console.log("[contact] new lead:", parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
