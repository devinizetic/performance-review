import { notFound } from "next/navigation";
import { getExternalReviewByToken } from "@/lib/repository/external-reviews-repository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ExternalReviewForm from "./ExternalReviewForm";

interface ExternalReviewPageProps {
  params: {
    token: string;
  };
}

export default async function ExternalReviewPage({ params }: ExternalReviewPageProps) {
  const { token } = await params;
  const externalReview = await getExternalReviewByToken(token);

  // Handle case where review is not found or invalid token
  if (!externalReview) {
    notFound();
  }

  // Handle case where the review is already completed
  if (externalReview.status === "completed") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
            <CardDescription>
              You have already completed this review. Thank you for your feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                Your feedback has been recorded and is very valuable to us.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">External Review</CardTitle>
              <CardDescription>
                Please provide your feedback for{" "}
                <span className="font-semibold">
                  {externalReview.reviewee?.full_name || "this person"}
                </span>
              </CardDescription>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage 
                src={externalReview.reviewee?.avatar_url || ""} 
                alt={externalReview.reviewee?.full_name || ""}
              />
              <AvatarFallback>
                {externalReview.reviewee?.full_name
                  ? externalReview.reviewee.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "??"}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <ExternalReviewForm 
            externalReview={externalReview}
          />
        </CardContent>
      </Card>
    </div>
  );
}