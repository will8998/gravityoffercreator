"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Pencil, 
  Rocket, 
  Trash2, 
  Calendar,
  User,
  Target,
  CheckCircle,
  MapPin,
  Truck,
  DollarSign,
  FileText,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Offer {
  id: number;
  title: string;
  status: "draft" | "ready" | "launched";
  idealClient: string | null;
  limitation: string | null;
  solutionsInventory: string | null;
  thornScorecard: string | null;
  outcomeStatement: string | null;
  roadmap: string | null;
  deliveryModel: string | null;
  pricing: string | null;
  documentContent: string | null;
  dmScript: string | null;
  emailSequence: string | null;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

interface OfferDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-stone-100 text-stone-700 border-stone-200",
    icon: AlertCircle,
  },
  ready: {
    label: "Ready to Launch",
    className: "bg-amber-50 text-amber-800 border-amber-200",
    icon: CheckCircle,
  },
  launched: {
    label: "Launched",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Rocket,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OfferDetailPage(_props: OfferDetailPageProps) {
  const resolvedParams = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const id = resolvedParams?.id as string;

  useEffect(() => {
    if (id) {
      const loadOffer = async () => {
        try {
          const response = await fetch(`/api/offers/${id}`);
          if (!response.ok) {
            if (response.status === 404) {
              router.push("/offers");
              toast.error("Offer not found");
              return;
            }
            throw new Error("Failed to fetch offer");
          }
          const data = await response.json();
          setOffer(data);
        } catch (error) {
          console.error("Error fetching offer:", error);
          toast.error("Failed to load offer");
        } finally {
          setLoading(false);
        }
      };
      loadOffer();
    }
  }, [id, router]);


  const handleDelete = async () => {
    if (!offer) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/offers/${offer.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete offer");
      }

      toast.success("Offer deleted successfully");
      router.push("/offers");
    } catch (error) {
      toast.error("Failed to delete offer");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseJsonField = (field: string | null) => {
    if (!field) return null;
    try {
      return JSON.parse(field);
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-10 w-10 bg-amber-100" />
              <div className="flex-1">
                <Skeleton className="h-8 w-64 mb-2 bg-amber-100" />
                <Skeleton className="h-4 w-32 bg-amber-100" />
              </div>
            </div>
            
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <Skeleton className="h-6 w-48 mb-4 bg-amber-100" />
                  <Skeleton className="h-4 w-full mb-2 bg-amber-100" />
                  <Skeleton className="h-4 w-3/4 bg-amber-100" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-stone-900 mb-2">
            Offer Not Found
          </h2>
          <p className="text-stone-600 mb-6">
            The offer you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
          <Link href="/offers">
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Offers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[offer.status].icon;
  const solutionsInventory = parseJsonField(offer.solutionsInventory);
  const thornScorecard = parseJsonField(offer.thornScorecard);
  const roadmap = parseJsonField(offer.roadmap);
  const deliveryModel = parseJsonField(offer.deliveryModel);
  const pricing = parseJsonField(offer.pricing);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link href="/offers">
                  <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-display text-3xl font-bold text-stone-900">
                      {offer.title || "Untitled Offer"}
                    </h1>
                    <Badge className={`${statusConfig[offer.status].className} font-medium px-3 py-1 border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[offer.status].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(offer.createdAt)}
                    </div>
                    <div>Step {offer.currentStep} of 8</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/builder?id=${offer.id}`}>
                  <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Link href={`/launch/${offer.id}`}>
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                    <Rocket className="w-4 h-4 mr-2" />
                    Launch
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteDialog(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {offer.idealClient && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Ideal Client</h2>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{offer.idealClient}</p>
                  {offer.limitation && (
                    <>
                      <Separator className="my-4 bg-amber-200/50" />
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <h3 className="font-semibold text-stone-900">Current Limitation</h3>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{offer.limitation}</p>
                    </>
                  )}
                </Card>
              )}

              {solutionsInventory && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Solutions Inventory</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solutionsInventory.map((solution: Record<string, string>, index: number) => (
                      <div key={index} className="p-4 bg-white/50 rounded-lg border border-amber-100">
                        <h3 className="font-semibold text-stone-900 mb-2">{solution.name}</h3>
                        <p className="text-stone-600 text-sm">{solution.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {thornScorecard && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Thorn Scorecard</h2>
                  </div>
                  <div className="space-y-3">
                    {thornScorecard.map((item: Record<string, string | number>, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-amber-100">
                        <span className="text-stone-700">{item.thorn}</span>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          {item.score}/10
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {offer.outcomeStatement && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Outcome Statement</h2>
                  </div>
                  <p className="text-stone-700 leading-relaxed text-lg">{offer.outcomeStatement}</p>
                </Card>
              )}

              {roadmap && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Roadmap</h2>
                  </div>
                  <div className="space-y-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {roadmap.phases?.map((phase: any, index: number) => (
                      <div key={index} className="p-4 bg-white/50 rounded-lg border border-amber-100">
                        <h3 className="font-semibold text-stone-900 mb-2">
                          Phase {index + 1}: {phase.name}
                        </h3>
                        <p className="text-stone-600 mb-3">{phase.description}</p>
                        {phase.deliverables && (
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-stone-700">Deliverables:</h4>
                            <ul className="text-sm text-stone-600 space-y-1">
                              {phase.deliverables.map((deliverable: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-amber-600" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {deliveryModel && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Delivery Model</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Format</h3>
                      <p className="text-stone-600">{deliveryModel.format}</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Duration</h3>
                      <p className="text-stone-600">{deliveryModel.duration}</p>
                    </div>
                  </div>
                  {deliveryModel.details && (
                    <div className="mt-4 p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Details</h3>
                      <p className="text-stone-600">{deliveryModel.details}</p>
                    </div>
                  )}
                </Card>
              )}

              {pricing && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Pricing</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Price</h3>
                      <p className="text-2xl font-bold text-amber-600">${pricing.price?.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Payment Terms</h3>
                      <p className="text-stone-600">{pricing.paymentTerms}</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                      <h3 className="font-semibold text-stone-900 mb-2">Guarantee</h3>
                      <p className="text-stone-600">{pricing.guarantee || "None specified"}</p>
                    </div>
                  </div>
                </Card>
              )}

              {offer.documentContent && (
                <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <h2 className="font-display text-xl font-semibold text-stone-900">Generated Document</h2>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border border-amber-100 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-stone-700 text-sm leading-relaxed">
                      {offer.documentContent}
                    </pre>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white/95 backdrop-blur-sm border-amber-100">
          <DialogHeader>
            <DialogTitle className="text-stone-900">Delete Offer</DialogTitle>
            <DialogDescription className="text-stone-600">
              Are you sure you want to delete &ldquo;{offer.title || "Untitled Offer"}&rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              className="border-stone-200 text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}