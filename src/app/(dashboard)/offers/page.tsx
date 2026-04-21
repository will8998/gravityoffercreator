"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Filter, SortAsc, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OfferCard } from "@/components/offer-card";

interface Offer {
  id: number;
  title: string;
  status: "draft" | "ready" | "launched";
  outcomeStatement: string | null;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

type StatusFilter = "all" | "draft" | "ready" | "launched";
type SortOption = "newest" | "oldest";

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("/api/offers");
      if (!response.ok) throw new Error("Failed to fetch offers");
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = (deletedId: number) => {
    setOffers(prev => prev.filter(offer => offer.id !== deletedId));
  };

  const filteredAndSortedOffers = offers
    .filter(offer => statusFilter === "all" || offer.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-6 w-16 bg-amber-100" />
            <Skeleton className="h-8 w-8 bg-amber-100" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-3 bg-amber-100" />
          <Skeleton className="h-4 w-full mb-2 bg-amber-100" />
          <Skeleton className="h-4 w-2/3 mb-4 bg-amber-100" />
          <Skeleton className="h-2 w-full mb-4 bg-amber-100" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 bg-amber-100" />
            <Skeleton className="h-4 w-24 bg-amber-100" />
          </div>
        </Card>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="relative mb-8">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-amber-600" />
        </div>
        <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full animate-pulse" />
      </div>
      
      <h2 className="font-display text-2xl font-semibold text-stone-900 mb-3">
        Your Offer Library Awaits
      </h2>
      <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
        Transform your expertise into irresistible high-ticket offers that clients can&apos;t refuse.
      </p>
      
      <Link href="/builder">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Offer
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent mb-2">
                  Offer Library
                </h1>
                <p className="text-stone-600 text-lg">
                  Your collection of high-converting offers
                </p>
              </div>
              
              <Link href="/builder">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Offer
                </Button>
              </Link>
            </div>

            {!loading && offers.length > 0 && (
              <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-amber-100/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-stone-600" />
                  <span className="text-sm font-medium text-stone-700">Filter:</span>
                  <Select value={statusFilter} onValueChange={(value: StatusFilter) => setStatusFilter(value)}>
                    <SelectTrigger className="w-32 h-9 border-amber-200 focus:border-amber-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-100">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="launched">Launched</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4 text-stone-600" />
                  <span className="text-sm font-medium text-stone-700">Sort:</span>
                  <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
                    <SelectTrigger className="w-32 h-9 border-amber-200 focus:border-amber-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-100">
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="ml-auto text-sm text-stone-600">
                  {filteredAndSortedOffers.length} of {offers.length} offers
                </div>
              </div>
            )}
          </header>

          {loading ? (
            <LoadingSkeleton />
          ) : offers.length === 0 ? (
            <EmptyState />
          ) : filteredAndSortedOffers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <Filter className="w-12 h-12 text-stone-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">
                No offers match your filters
              </h3>
              <p className="text-stone-600 mb-6">
                Try adjusting your filter settings to see more offers.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setSortOption("newest");
                }}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  id={offer.id}
                  title={offer.title}
                  status={offer.status}
                  outcomeStatement={offer.outcomeStatement}
                  currentStep={offer.currentStep}
                  createdAt={offer.createdAt}
                  onDelete={handleDeleteOffer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}