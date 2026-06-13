import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const typeMap: Record<string, string> = {
  services: "service",
  equipment: "equipment",
  packages: "holidayPackage",
  testimonials: "testimonial",
  faq: "faqItem",
  team: "teamMember",
  settings: "siteSettings",
};

// GET /api/admin/[type] — list all, or /api/admin/settings — get one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const typeKey = path[0];
  const sanityType = typeMap[typeKey];

  if (!sanityType) {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  try {
    if (typeKey === "settings") {
      const doc = await sanity.fetch(`*[_type == $type][0]`, { type: sanityType });
      return NextResponse.json(doc || {});
    }
    const docs = await sanity.fetch(`*[_type == $type] | order(order asc)`, {
      type: sanityType,
    });
    return NextResponse.json(docs);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/admin/[type] — create new item
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const typeKey = path[0];
  const sanityType = typeMap[typeKey];

  if (!sanityType) {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const doc = { _type: sanityType, ...body };
    delete doc._id;
    delete doc._createdAt;
    delete doc._updatedAt;
    delete doc._rev;

    const created = await sanity.create(doc);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PUT /api/admin/[type] — update (for settings) or update by body._id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const typeKey = path[0];
  const sanityType = typeMap[typeKey];

  if (!sanityType) {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (typeKey === "settings") {
      const existing = await sanity.fetch(`*[_type == $type][0]._id`, {
        type: sanityType,
      });
      if (existing) {
        const updated = await sanity.patch(existing).set(body).commit();
        return NextResponse.json(updated);
      } else {
        const created = await sanity.create({ _type: sanityType, ...body });
        return NextResponse.json(created, { status: 201 });
      }
    }

    // For other types, expect body._id
    const id = body._id;
    if (!id) {
      return NextResponse.json({ error: "_id required for update" }, { status: 400 });
    }

    const updateData = { ...body };
    delete updateData._id;
    delete updateData._type;
    delete updateData._createdAt;
    delete updateData._updatedAt;
    delete updateData._rev;

    const updated = await sanity.patch(id).set(updateData).commit();
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/admin/[type]?id=xxx
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const typeKey = path[0];
  const sanityType = typeMap[typeKey];

  if (!sanityType) {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id query param required" }, { status: 400 });
  }

  try {
    await sanity.delete(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
