"use client"; // For potential future client-side interactions like fetching user data

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Edit3 } from "lucide-react";

// Mock user data - in a real app, this would come from useAuth() or an API
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  image: "/placeholder-user.jpg", // Using an existing placeholder
  bio: "Motorcycle enthusiast, loves long rides on weekends. Looking for a classic cruiser.",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">My Profile</h1>
      
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage src={mockUser.image} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-3xl font-semibold">{mockUser.name}</h2>
            <p className="text-muted-foreground">{mockUser.email}</p>
            <p className="text-muted-foreground">{mockUser.phone}</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile Photo
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <Input id="name" defaultValue={mockUser.name} disabled />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <Input id="email" type="email" defaultValue={mockUser.email} disabled />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue={mockUser.phone} disabled />
          </div>
          <div>
            <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
            <textarea
              id="bio"
              defaultValue={mockUser.bio}
              disabled
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              rows={4}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button>
              <Edit3 className="mr-2 h-4 w-4" /> Edit Information
            </Button>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">Change Password</Button>
            <Button variant="outline" className="w-full justify-start">Notification Preferences</Button>
            <Button variant="destructive" className="w-full justify-start">Deactivate Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
