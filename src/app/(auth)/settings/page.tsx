import { ProfileEditForm } from '@/components/settings/ProfileEditForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <main className="container max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your profile information and email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileEditForm />
        </CardContent>
      </Card>
    </main>
  );
} 