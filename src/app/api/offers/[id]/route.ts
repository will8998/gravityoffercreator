import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { offers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { runMigrations } from "@/lib/db/migrate";

function parseOfferId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await runMigrations();
  const { id } = await params;
  const offerId = parseOfferId(id);
  if (offerId === null)
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const [offer] = await db
    .select()
    .from(offers)
    .where(eq(offers.id, offerId));
  if (!offer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(offer);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await runMigrations();
  const { id } = await params;
  const offerId = parseOfferId(id);
  if (offerId === null)
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await request.json();

  const updateData: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };

  const directFields = [
    "title",
    "status",
    "idealClient",
    "limitation",
    "outcomeStatement",
    "documentContent",
    "dmScript",
    "emailSequence",
    "currentStep",
  ];
  for (const field of directFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  const jsonFields = [
    "solutionsInventory",
    "thornScorecard",
    "roadmap",
    "deliveryModel",
    "pricing",
  ];
  for (const field of jsonFields) {
    if (body[field] !== undefined) {
      updateData[field] =
        typeof body[field] === "string"
          ? body[field]
          : JSON.stringify(body[field]);
    }
  }

  const [updated] = await db
    .update(offers)
    .set(updateData)
    .where(eq(offers.id, offerId))
    .returning();

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await runMigrations();
  const { id } = await params;
  const offerId = parseOfferId(id);
  if (offerId === null)
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await db.delete(offers).where(eq(offers.id, offerId));
  return NextResponse.json({ success: true });
}
