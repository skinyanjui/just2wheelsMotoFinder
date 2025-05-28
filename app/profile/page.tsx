"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Bell, Lock, Palette, Trash2, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { AuthGuard } from "@/components/auth-guard"
import { useState } from "react"

export default function ProfilePage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)

  // Mock notification preferences - in a real app, this would come from an API
  const [notificationPrefs, setNotificationPrefs] = useState({
    newMessages: true,
    savedSearchMatches: true,
    promotionalEmails: false,
    listingUpdates: true,
  })

  const handleSaveChanges = (section: string) => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Changes Saved",
        description: `${section} information has been updated.`,
      })
      setIsUpdating(false)
    }, 1000)
  }

  const handlePasswordChange = () => {
    toast({ title: "Redirecting to Change Password (Placeholder)" })
    // router.push('/profile/change-password');
  }

  const handleNotificationToggle = (prefId: string, checked: boolean) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [prefId]: checked,
    }))
  }

  return (
    <AuthGuard>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">Account Settings</h1>
          <p className="mt-2 text-lg text-muted-foreground text-center max-w-xl mx-auto">
            Manage your profile details, security settings, and notification preferences.
          </p>
        </header>

        <Tabs defaultValue="details" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-8">
            <TabsTrigger value="details" className="py-2.5 text-sm sm:text-base">
              <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Profile Details
            </TabsTrigger>
            <TabsTrigger value="security" className="py-2.5 text-sm sm:text-base">
              <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="py-2.5 text-sm sm:text-base">
              <Bell className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Details Tab */}
          <TabsContent value="details" className="p-1">
            <div className="glassmorphic-card p-6 sm:p-8 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/20">
                  <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="text-3xl">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-semibold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => toast({ title: "Change Photo Clicked" })}
                  >
                    <Palette className="mr-2 h-4 w-4" /> Change Profile Photo
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-1">Full Name</h3>
                  <p className="text-muted-foreground">{user?.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email Address</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Phone Number</h3>
                  <p className="text-muted-foreground">Not provided</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Bio</h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    Seasoned rider with a passion for vintage bikes and cross-country tours. Always looking for the next
                    adventure on two wheels.
                  </p>
                </div>
                <div className="flex justify-end pt-4 border-t mt-8">
                  <Button onClick={() => toast({ title: "Edit Profile Details Clicked" })}>
                    <Palette className="mr-2 h-4 w-4" /> Edit Profile Details
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="p-1">
            <div className="glassmorphic-card p-6 sm:p-8 rounded-lg shadow space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Password Management</h3>
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed: {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" onClick={handlePasswordChange}>
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Two-Factor Authentication (2FA)</h3>
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Status: Disabled</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Button variant="outline" onClick={() => toast({ title: "Enable 2FA Clicked" })}>
                    Enable 2FA
                  </Button>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Account Deactivation</h3>
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border border-destructive/50 rounded-md bg-destructive/5">
                  <div>
                    <p className="font-medium text-destructive">Deactivate Account</p>
                    <p className="text-sm text-destructive/80">This action is permanent and cannot be undone.</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => toast({ title: "Deactivate Account Clicked", duration: 5000 })}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Deactivate My Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="p-1">
            <div className="glassmorphic-card p-6 sm:p-8 rounded-lg shadow space-y-6">
              <h3 className="text-xl font-semibold mb-2">Email Notifications</h3>
              <p className="text-muted-foreground mb-6">Choose what updates you receive via email.</p>

              {[
                {
                  id: "newMessages",
                  label: "New Messages",
                  description: "Get notified when someone sends you a message.",
                  current: notificationPrefs.newMessages,
                },
                {
                  id: "savedSearchMatches",
                  label: "Saved Search Matches",
                  description: "Receive alerts for new listings matching your saved searches.",
                  current: notificationPrefs.savedSearchMatches,
                },
                {
                  id: "listingUpdates",
                  label: "Updates on Your Listings",
                  description: "Alerts about activity on your listings (e.g., new inquiries, sold status).",
                  current: notificationPrefs.listingUpdates,
                },
                {
                  id: "promotionalEmails",
                  label: "Promotions & Announcements",
                  description: "Occasional updates on new features, promotions, and platform news.",
                  current: notificationPrefs.promotionalEmails,
                },
              ].map((pref) => (
                <div
                  key={pref.id}
                  className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <Label htmlFor={pref.id} className="font-medium">
                      {pref.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{pref.description}</p>
                  </div>
                  <Switch
                    id={pref.id}
                    checked={pref.current}
                    onCheckedChange={(checked) => handleNotificationToggle(pref.id, checked)}
                    disabled={isUpdating}
                  />
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t mt-8">
                <Button onClick={() => handleSaveChanges("Notification preferences")} disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Notification Settings"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}
