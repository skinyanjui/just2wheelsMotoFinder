// components/order-summary-payment.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Assuming this exists

interface OrderSummaryPaymentProps {
  listingTitle?: string; // Optional: To show what listing this fee is for
  listingFee: number;
  // In future, could add other items like 'featured upgrade fee', 'taxes', etc.
}

export default function OrderSummaryPayment({ listingTitle, listingFee }: OrderSummaryPaymentProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {listingTitle && (
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Listing Title:</span>
            <span className="font-medium truncate max-w-[60%]">{listingTitle}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg">Standard Listing Fee</span>
          <span className="text-lg font-semibold">${listingFee.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total Amount Due</span>
          <span>${listingFee.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>By completing your purchase, you agree to our Terms of Service.</p>
      </CardFooter>
    </Card>
  );
}
