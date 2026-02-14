"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  PenLine, 
  CheckCircle, 
  Rocket,
  Plus,
  MessageSquare,
  LayoutGrid,
  Calendar,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Offer {
  id: number;
  title: string;
  status: "draft" | "ready" | "launched";
  idealClient: string | null;
  limitation: string | null;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-stone-100 text-stone-700 border-stone-200",
  },
  ready: {
    label: "Ready",
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  launched: {
    label: "Launched",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
};

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await fetch("/api/offers");
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: offers.length,
    drafts: offers.filter(offer => offer.status === "draft").length,
    ready: offers.filter(offer => offer.status === "ready").length,
    launched: offers.filter(offer => offer.status === "launched").length,
  };

  const recentOffers = offers.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-8 w-64 mb-2 bg-amber-100" />
              <Skeleton className="h-5 w-96 bg-amber-100" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-6 mb-4 bg-amber-100" />
                    <Skeleton className="h-8 w-16 mb-2 bg-amber-100" />
                    <Skeleton className="h-4 w-24 bg-amber-100" />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-6 w-32 mb-4 bg-amber-100" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                      <CardContent className="p-4">
                        <Skeleton className="h-5 w-48 mb-2 bg-amber-100" />
                        <Skeleton className="h-4 w-32 mb-3 bg-amber-100" />
                        <Skeleton className="h-2 w-full bg-amber-100" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <Skeleton className="h-6 w-32 mb-4 bg-amber-100" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-6 mb-3 bg-amber-100" />
                        <Skeleton className="h-5 w-32 mb-2 bg-amber-100" />
                        <Skeleton className="h-4 w-full bg-amber-100" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
                Welcome back
              </h1>
              <p className="text-stone-600 text-lg">
                Your No-Phone Offer command center
              </p>
            </header>
            
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-amber-600" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mb-3">
                No offers yet
              </h2>
              <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto">
                Start building your first high-ticket No-Phone Offer and transform how you sell premium services
              </p>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-medium">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
              Welcome back
            </h1>
            <p className="text-stone-600 text-lg">
              Your No-Phone Offer command center
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <LayoutGrid className="w-6 h-6 text-amber-600" />
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">{stats.total}</div>
                <div className="text-sm text-stone-600">Total Offers</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <PenLine className="w-6 h-6 text-stone-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">{stats.drafts}</div>
                <div className="text-sm text-stone-600">Drafts</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">{stats.ready}</div>
                <div className="text-sm text-stone-600">Ready to Launch</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Rocket className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">{stats.launched}</div>
                <div className="text-sm text-stone-600">Launched</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-stone-900">Recent Offers</h2>
                <Link href="/offers">
                  <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <Card key={offer.id} className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Link href={`/offers/${offer.id}`} className="flex-1">
                          <h3 className="font-display text-lg font-semibold text-stone-900 hover:text-amber-800 transition-colors line-clamp-1">
                            {offer.title || "Untitled Offer"}
                          </h3>
                        </Link>
                        <Badge className={`${statusConfig[offer.status].className} font-medium text-xs px-2 py-1 rounded-full border ml-3`}>
                          {statusConfig[offer.status].label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-stone-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(offer.createdAt)}</span>
                        </div>
                        <span>Step {offer.currentStep} of 8</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                            style={{ width: `${(offer.currentStep / 8) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-stone-500 min-w-fit">
                          {Math.round((offer.currentStep / 8) * 100)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <Link href="/builder">
                  <Card className="bg-gradient-to-br from-amber-100/50 to-orange-100/30 border-amber-200/50 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-stone-900 mb-1">Create New Offer</h3>
                          <p className="text-sm text-stone-600">Build your next high-ticket offer</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/chat">
                  <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MessageSquare className="w-6 h-6 text-stone-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-stone-900 mb-1">AI Chat</h3>
                          <p className="text-sm text-stone-600">Get personalized guidance</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/offers">
                  <Card className="bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <LayoutGrid className="w-6 h-6 text-stone-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-stone-900 mb-1">View All Offers</h3>
                          <p className="text-sm text-stone-600">Manage your offer portfolio</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
