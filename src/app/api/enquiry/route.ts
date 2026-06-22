import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Save to Sanity
    const enquiry = await sanity.create({
      _type: "enquiry",
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      contactMethod: body.contactMethod || "email",
      services: body.services || [],
      dateFrom: body.dateFrom || "",
      dateTo: body.dateTo || "",
      people: body.people || "1",
      accommodation: body.accommodation || "",
      mobilityLevel: body.mobilityLevel || "",
      specificNeeds: body.specificNeeds || "",
      message: body.message || "",
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // 2. Send email notification to admin
    if (resend) {
      await resend.emails.send({
        from: "Bali Mobility Website <noreply@balimobility.com>",
        to: process.env.ADMIN_EMAIL || "admin@balimobility.com",
        subject: `New Enquiry from ${body.firstName} ${body.lastName}`,
        html: `
          <h2>New Equipment Rental Enquiry</h2>
          <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
          <p><strong>Preferred contact:</strong> ${body.contactMethod}</p>
          <hr />
          <p><strong>Services interested in:</strong></p>
          <ul>${(body.services || []).map((s: string) => `<li>${s}</li>`).join("")}</ul>
          <p><strong>Travel dates:</strong> ${body.dateFrom || "TBD"} to ${body.dateTo || "TBD"}</p>
          <p><strong>Number of people:</strong> ${body.people}</p>
          <p><strong>Accommodation area:</strong> ${body.accommodation || "Not specified"}</p>
          <p><strong>Mobility level:</strong> ${body.mobilityLevel || "Not specified"}</p>
          <p><strong>Specific needs:</strong> ${body.specificNeeds || "None"}</p>
          <p><strong>Message:</strong> ${body.message || "None"}</p>
          <hr />
          <p>View enquiries in Sanity Studio.</p>
        `,
      });

      // 3. Send confirmation email to customer
      await resend.emails.send({
        from: "Bali Mobility <noreply@balimobility.com>",
        to: body.email,
        subject: "We received your enquiry — Bali Mobility",
        html: `
          <h2>Thank you, ${body.firstName}!</h2>
          <p>We've received your enquiry about a Bali holiday and will get back to you within 24 hours.</p>
          <p><strong>Your enquiry details:</strong></p>
          <ul>
            <li>Services: ${(body.services || []).join(", ") || "Not specified"}</li>
            <li>Travel dates: ${body.dateFrom || "TBD"} to ${body.dateTo || "TBD"}</li>
            <li>Number of people: ${body.people}</li>
          </ul>
          <p>If you need a faster response, message us on WhatsApp: +62 821-4652-2084</p>
          <p>Warm regards,<br />The Bali Mobility Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true, id: enquiry._id });
  } catch (e: any) {
    console.error("Enquiry error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET — list all enquiries (admin only)
export async function GET() {
  try {
    const enquiries = await sanity.fetch(
      `*[_type == "enquiry"] | order(submittedAt desc)`
    );
    return NextResponse.json(enquiries);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
