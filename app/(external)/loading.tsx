import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Please wait while we load your review
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}