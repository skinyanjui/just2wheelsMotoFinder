// components/payment-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"; // Assuming this exists
import { CreditCard, Lock, User as UserIcon, CalendarIcon, AlertTriangle } from "lucide-react"; // Icons

interface PaymentFormProps {
  listingFee: number;
  onSubmitPayment: (paymentDetails: any) => Promise<{ success: boolean; error?: string }>; // Simulates API call
}

export default function PaymentForm({ listingFee, onSubmitPayment }: PaymentFormProps) {
  const { toast } = useToast();
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 16) value = value.substring(0, 16); // Max 16 digits for simplicity
    // Add spaces for readability (every 4 digits)
    setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length >= 2) {
      setExpiryDate(`${value.substring(0, 2)}/${value.substring(2)}`);
    } else {
      setExpiryDate(value);
    }
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.substring(0, 4); // Max 3-4 digits
    setCvv(value);
  };


  const validateForm = (): boolean => {
    if (!cardholderName.trim()) { setPaymentError("Cardholder name is required."); return false; }
    if (cardNumber.replace(/\s/g, "").length < 13 || cardNumber.replace(/\s/g, "").length > 16) { // Basic length check
        setPaymentError("Invalid card number length."); return false; 
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) { setPaymentError("Expiry date must be MM/YY."); return false; }
    if (cvv.length < 3 || cvv.length > 4) { setPaymentError("CVV must be 3 or 4 digits."); return false; }
    setPaymentError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentError(null);

    // Simulate API call
    const paymentDetails = { cardholderName, cardNumber: cardNumber.replace(/\s/g, ""), expiryDate, cvv };
    const result = await onSubmitPayment(paymentDetails);

    setIsProcessing(false);

    if (result.success) {
      toast({
        title: "Payment Successful!",
        description: `Your payment of $${listingFee.toFixed(2)} was processed.`,
        variant: "default", // Or a specific success variant if available
      });
      // Form could be reset here or parent component handles navigation
    } else {
      setPaymentError(result.error || "Payment failed. Please try again.");
      toast({
        title: "Payment Failed",
        description: result.error || "Please check your payment details and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Lock className="mr-2 h-6 w-6 text-primary" /> Secure Payment
        </CardTitle>
        <p className="text-sm text-muted-foreground">Enter your payment details below. Listing Fee: <span className="font-bold text-primary">${listingFee.toFixed(2)}</span></p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="cardholderName" className="flex items-center mb-1"><UserIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Cardholder Name</Label>
            <Input id="cardholderName" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} placeholder="John M. Doe" required />
          </div>
          <div>
            <Label htmlFor="cardNumber" className="flex items-center mb-1"><CreditCard className="mr-2 h-4 w-4 text-muted-foreground"/>Card Number</Label>
            <Input id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="flex items-center mb-1"><CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Expiry Date</Label>
              <Input id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" required />
            </div>
            <div>
              <Label htmlFor="cvv" className="flex items-center mb-1"><Lock className="mr-2 h-4 w-4 text-muted-foreground"/>CVV</Label>
              <Input id="cvv" value={cvv} onChange={handleCvvChange} placeholder="123" required />
            </div>
          </div>
          {paymentError && (
            <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertTriangle className="h-4 w-4 mr-2 shrink-0"/>
                {paymentError}
            </div>
          )}
          <Button type="submit" className="w-full text-lg py-6" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay $${listingFee.toFixed(2)} Securely`}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground text-center">
        <p>Your payment information is encrypted and processed securely.</p>
      </CardFooter>
    </Card>
  );
}
