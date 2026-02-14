"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MoreVertical, 
  Pencil, 
  Rocket, 
  Trash2, 
  Calendar,
  FileText 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface OfferCardProps {
  id: number;
  title: string;
  status: "draft" | "ready" | "launched";
  outcomeStatement: string | null;
  currentStep: number;
  createdAt: string;
  onDelete: (id: number) => void;
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200",
  },
  ready: {
    label: "Ready",
    className: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100",
  },
  launched: {
    label: "Launched",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
  },
};

export function OfferCard({
  id,
  title,
  status,
  outcomeStatement,
  currentStep,
  createdAt,
  onDelete,
}: OfferCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete offer");
      }

      toast.success("Offer deleted successfully");
      onDelete(id);
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete offer");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const displayTitle = title || "Untitled Offer";
  const truncatedOutcome = outcomeStatement 
    ? outcomeStatement.length > 120 
      ? outcomeStatement.substring(0, 120) + "..."
      : outcomeStatement
    : "No outcome statement defined yet";

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const formattedDate = formatRelativeTime(createdAt);

  return (
    <>
      <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 hover:shadow-lg hover:shadow-amber-100/20 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <Badge 
              variant="secondary" 
              className={`${statusConfig[status].className} font-medium text-xs px-3 py-1 rounded-full border`}
            >
              {statusConfig[status].label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-100/50"
                >
                  <MoreVertical className="h-4 w-4 text-stone-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-amber-100">
                <DropdownMenuItem asChild>
                  <Link 
                    href={`/builder?id=${id}`}
                    className="flex items-center gap-2 text-stone-700 hover:text-amber-800 hover:bg-amber-50"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Offer
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href={`/launch/${id}`}
                    className="flex items-center gap-2 text-stone-700 hover:text-amber-800 hover:bg-amber-50"
                  >
                    <Rocket className="h-4 w-4" />
                    Launch
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href={`/offers/${id}`} className="block group/link">
            <h3 className="font-display text-xl font-semibold text-stone-900 mb-3 group-hover/link:text-amber-800 transition-colors line-clamp-2">
              {displayTitle}
            </h3>
          </Link>

          <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
            {truncatedOutcome}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-stone-500 min-w-fit">
              Step {currentStep} of 8
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            <Link 
              href={`/offers/${id}`}
              className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              View Details
            </Link>
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white/95 backdrop-blur-sm border-amber-100">
          <DialogHeader>
            <DialogTitle className="text-stone-900">Delete Offer</DialogTitle>
            <DialogDescription className="text-stone-600">
              Are you sure you want to delete &ldquo;{displayTitle}&rdquo;? This action cannot be undone.
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