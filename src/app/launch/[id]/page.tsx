"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Save, 
  ArrowLeft, 
  FileText, 
  MessageSquare, 
  Mail, 
  Loader2,
  Settings,
  AlertCircle
} from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { DM_SCRIPT_PROMPT } from "@/lib/ai/prompts/dm-script";
import { EMAIL_SEQUENCE_PROMPT } from "@/lib/ai/prompts/email";
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

interface GenerationState {
  isGenerating: boolean;
  content: string;
  isSaving: boolean;
  isCopied: boolean;
}

function buildOfferSummary(offer: Offer): string {
  const sections = [];
  
  const parseJSON = (field: string | null) => {
    if (!field) return null;
    try {
      return JSON.parse(field);
    } catch {
      return null;
    }
  };

  sections.push(`OFFER TITLE: ${offer.title}`);

  if (offer.idealClient) {
    sections.push(`IDEAL CLIENT: ${offer.idealClient}`);
  }

  if (offer.limitation) {
    sections.push(`CURRENT LIMITATION: ${offer.limitation}`);
  }

  if (offer.outcomeStatement) {
    sections.push(`OUTCOME STATEMENT: ${offer.outcomeStatement}`);
  }

  const solutionsInventory = parseJSON(offer.solutionsInventory);
  if (solutionsInventory && Array.isArray(solutionsInventory)) {
    const solutions = solutionsInventory.map((s: { name: string; description: string }) => `${s.name}: ${s.description}`).join('; ');
    sections.push(`SOLUTIONS: ${solutions}`);
  }

  const thornScorecard = parseJSON(offer.thornScorecard);
  if (thornScorecard && Array.isArray(thornScorecard)) {
    const thorns = thornScorecard.map((t: { thorn: string; score: number }) => `${t.thorn} (${t.score}/10)`).join('; ');
    sections.push(`PAIN POINTS: ${thorns}`);
  }

  const roadmap = parseJSON(offer.roadmap);
  if (roadmap?.phases && Array.isArray(roadmap.phases)) {
    const phases = roadmap.phases.map((p: { name: string; description: string }, i: number) => 
      `Phase ${i + 1}: ${p.name} - ${p.description}`
    ).join('; ');
    sections.push(`ROADMAP: ${phases}`);
  }

  const deliveryModel = parseJSON(offer.deliveryModel);
  if (deliveryModel) {
    sections.push(`DELIVERY: ${deliveryModel.format} over ${deliveryModel.duration}${deliveryModel.details ? ` - ${deliveryModel.details}` : ''}`);
  }

  const pricing = parseJSON(offer.pricing);
  if (pricing) {
    sections.push(`PRICING: $${pricing.price?.toLocaleString()} - ${pricing.paymentTerms}${pricing.guarantee ? ` with ${pricing.guarantee}` : ''}`);
  }

  return sections.join('\n\n');
}

export default function LaunchPage() {
  const params = useParams();
  const router = useRouter();
  const { settings, getActiveKey, isLoaded } = useSettings();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("document");
  
  const [documentState, setDocumentState] = useState<GenerationState>({
    isGenerating: false,
    content: "",
    isSaving: false,
    isCopied: false,
  });
  
  const [dmState, setDmState] = useState<GenerationState>({
    isGenerating: false,
    content: "",
    isSaving: false,
    isCopied: false,
  });
  
  const [emailState, setEmailState] = useState<GenerationState>({
    isGenerating: false,
    content: "",
    isSaving: false,
    isCopied: false,
  });

  const id = params?.id as string;

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
          
          // Pre-load existing content
          setDocumentState(prev => ({ ...prev, content: data.documentContent || "" }));
          setDmState(prev => ({ ...prev, content: data.dmScript || "" }));
          setEmailState(prev => ({ ...prev, content: data.emailSequence || "" }));
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

  const generateContent = async (type: "document" | "dm" | "email") => {
    if (!offer) return;

    const activeKey = getActiveKey();
    if (!activeKey) {
      toast.error("Please configure your API key in settings");
      return;
    }

    const setState = type === "document" ? setDocumentState : 
                    type === "dm" ? setDmState : setEmailState;
    
    setState(prev => ({ ...prev, isGenerating: true, content: "" }));

    try {
      const offerSummary = buildOfferSummary(offer);
      let prompt = "";
      
      if (type === "document") {
        prompt = `Create a comprehensive offer document in Google Doc format based on the following offer details. Structure it as: Story → Outcome → Roadmap → Delivery → Pricing → Bonuses/FAQ → Scarcity. Make it compelling and sales-focused.\n\nHere is my offer data:\n${offerSummary}`;
      } else if (type === "dm") {
        prompt = `${DM_SCRIPT_PROMPT}\n\nHere is my offer data:\n${offerSummary}`;
      } else {
        prompt = `${EMAIL_SEQUENCE_PROMPT}\n\nHere is my offer data:\n${offerSummary}`;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          provider: settings.provider,
          apiKey: activeKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let result = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setState(prev => ({ ...prev, content: result }));
      }

      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Generation failed:", error);
      toast.error("Failed to generate content");
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const copyToClipboard = async (content: string, type: "document" | "dm" | "email") => {
    try {
      await navigator.clipboard.writeText(content);
      const setState = type === "document" ? setDocumentState : 
                      type === "dm" ? setDmState : setEmailState;
      
      setState(prev => ({ ...prev, isCopied: true }));
      setTimeout(() => {
        setState(prev => ({ ...prev, isCopied: false }));
      }, 2000);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const saveContent = async (content: string, field: string, type: "document" | "dm" | "email") => {
    if (!offer) return;

    const setState = type === "document" ? setDocumentState : 
                    type === "dm" ? setDmState : setEmailState;
    
    setState(prev => ({ ...prev, isSaving: true }));

    try {
      const response = await fetch(`/api/offers/${offer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      toast.success("Content saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save content");
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-10 w-10 bg-amber-100" />
              <div className="flex-1">
                <Skeleton className="h-8 w-64 mb-2 bg-amber-100" />
                <Skeleton className="h-4 w-32 bg-amber-100" />
              </div>
            </div>
            
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                  <Skeleton className="h-6 w-48 mb-4 bg-amber-100" />
                  <Skeleton className="h-64 w-full bg-amber-100" />
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

  // Check if settings are configured
  if (isLoaded && !getActiveKey()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link 
                href={`/offers/${offer.id}`}
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors mb-4 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Offer
              </Link>
              
              <h1 className="font-display text-4xl font-bold text-stone-900 mb-2">
                Launch Tools
              </h1>
              <div className="flex items-center gap-3">
                <h2 className="text-xl text-stone-700 font-medium">{offer.title}</h2>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  {offer.status}
                </Badge>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50 text-center">
              <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">
                Configure AI Settings
              </h3>
              <p className="text-stone-600 mb-6">
                You need to configure your AI provider settings before generating content.
              </p>
              <Link href="/settings">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Go to Settings
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link 
              href={`/offers/${offer.id}`}
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors mb-4 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Offer
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-4xl font-bold text-stone-900 mb-2">
                  Launch Tools
                </h1>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl text-stone-700 font-medium">{offer.title}</h2>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    {offer.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-amber-100/50 border border-amber-200">
              <TabsTrigger 
                value="document" 
                className="data-[state=active]:bg-white data-[state=active]:text-amber-900 text-amber-700 font-medium"
              >
                <FileText className="h-4 w-4 mr-2" />
                Offer Document
              </TabsTrigger>
              <TabsTrigger 
                value="dm" 
                className="data-[state=active]:bg-white data-[state=active]:text-amber-900 text-amber-700 font-medium"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                DM Scripts
              </TabsTrigger>
              <TabsTrigger 
                value="email" 
                className="data-[state=active]:bg-white data-[state=active]:text-amber-900 text-amber-700 font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Sequence
              </TabsTrigger>
            </TabsList>

            {/* Document Tab */}
            <TabsContent value="document" className="mt-6">
              <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-semibold text-stone-900">Offer Document</h3>
                  <Button
                    onClick={() => generateContent("document")}
                    disabled={documentState.isGenerating}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    {documentState.isGenerating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    {documentState.isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
                
                {documentState.content ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[500px] w-full rounded-lg border border-amber-200 bg-white/80 p-4">
                      <div className="prose prose-stone max-w-none prose-headings:text-stone-900 prose-p:text-stone-700 prose-strong:text-stone-900">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {documentState.content}
                        </ReactMarkdown>
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(documentState.content, "document")}
                        variant="outline"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        {documentState.isCopied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {documentState.isCopied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                      
                      <Button
                        onClick={() => saveContent(documentState.content, "documentContent", "document")}
                        disabled={documentState.isSaving}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                      >
                        {documentState.isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {documentState.isSaving ? "Saving..." : "Save to Offer"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center border border-amber-200 rounded-lg bg-white/50">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-stone-600">Click &ldquo;Generate&rdquo; to create your offer document</p>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* DM Scripts Tab */}
            <TabsContent value="dm" className="mt-6">
              <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-semibold text-stone-900">DM Scripts</h3>
                  <Button
                    onClick={() => generateContent("dm")}
                    disabled={dmState.isGenerating}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    {dmState.isGenerating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    {dmState.isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
                
                {dmState.content ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[500px] w-full rounded-lg border border-amber-200 bg-white/80 p-4">
                      <div className="prose prose-stone max-w-none prose-headings:text-stone-900 prose-p:text-stone-700 prose-strong:text-stone-900">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {dmState.content}
                        </ReactMarkdown>
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(dmState.content, "dm")}
                        variant="outline"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        {dmState.isCopied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {dmState.isCopied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                      
                      <Button
                        onClick={() => saveContent(dmState.content, "dmScript", "dm")}
                        disabled={dmState.isSaving}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                      >
                        {dmState.isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {dmState.isSaving ? "Saving..." : "Save to Offer"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center border border-amber-200 rounded-lg bg-white/50">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-stone-600">Click &ldquo;Generate&rdquo; to create your DM scripts</p>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Email Sequence Tab */}
            <TabsContent value="email" className="mt-6">
              <Card className="p-6 bg-gradient-to-br from-amber-50/30 to-orange-50/20 border-amber-100/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-semibold text-stone-900">Email Sequence</h3>
                  <Button
                    onClick={() => generateContent("email")}
                    disabled={emailState.isGenerating}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    {emailState.isGenerating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    {emailState.isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
                
                {emailState.content ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[500px] w-full rounded-lg border border-amber-200 bg-white/80 p-4">
                      <div className="prose prose-stone max-w-none prose-headings:text-stone-900 prose-p:text-stone-700 prose-strong:text-stone-900">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {emailState.content}
                        </ReactMarkdown>
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(emailState.content, "email")}
                        variant="outline"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        {emailState.isCopied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {emailState.isCopied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                      
                      <Button
                        onClick={() => saveContent(emailState.content, "emailSequence", "email")}
                        disabled={emailState.isSaving}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                      >
                        {emailState.isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {emailState.isSaving ? "Saving..." : "Save to Offer"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center border border-amber-200 rounded-lg bg-white/50">
                    <div className="text-center">
                      <Mail className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-stone-600">Click &ldquo;Generate&rdquo; to create your email sequence</p>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}