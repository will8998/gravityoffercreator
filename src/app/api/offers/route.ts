import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { offers } from "@/lib/db/schema";
import { runMigrations } from "@/lib/db/migrate";
import { desc } from "drizzle-orm";

runMigrations();

export async function GET() {
  const allOffers = db.select().from(offers).orderBy(desc(offers.createdAt)).all();
  return NextResponse.json(allOffers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOffer = db
    .insert(offers)
    .values({
      title: body.title || "Untitled Offer",
      status: body.status || "draft",
      idealClient: body.idealClient,
      limitation: body.limitation,
      solutionsInventory: body.solutionsInventory
        ? JSON.stringify(body.solutionsInventory)
        : null,
      thornScorecard: body.thornScorecard
        ? JSON.stringify(body.thornScorecard)
        : null,
      outcomeStatement: body.outcomeStatement,
      roadmap: body.roadmap ? JSON.stringify(body.roadmap) : null,
      deliveryModel: body.deliveryModel
        ? JSON.stringify(body.deliveryModel)
        : null,
      pricing: body.pricing ? JSON.stringify(body.pricing) : null,
      currentStep: body.currentStep || 1,
    })
    .returning()
    .get();
  return NextResponse.json(newOffer, { status: 201 });
}
