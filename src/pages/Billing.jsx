import React from 'react';
import { CalendarDays, CheckCircle, AlertCircle } from 'lucide-react';
import { initializePaddle } from '@paddle/paddle-js';
import { useGet } from '../api/useGet';
import { useUser } from '../Components/ProtectedRoute';

const Billing = () => {
  const [loading, setLoading] = React.useState(false);
  const [paddle, setPaddle] = React.useState();
  const user = useUser();
  console.log('User:', user);
  
  const { data: subscription, loading: subscriptionLoading } = useGet(
    user?.id ? `user-subscription?id=${user.id}` : null
  );
  console.log(subscription);

  const userJson = `
{
  "id": "b92b719c-7362-4ec9-ba36-8af82b6586cd",
  "aud": "authenticated",
  "role": "authenticated",
  "email": "salar.amir@metu.edu.tr",
  "email_confirmed_at": "2025-01-20T18:09:15.108795Z",
  "phone": "",
  "confirmation_sent_at": "2025-01-20T18:08:55.635706Z",
  "confirmed_at": "2025-01-20T18:09:15.108795Z",
  "last_sign_in_at": "2025-01-31T14:31:06.957546Z",
  "app_metadata": {
    "provider": "email",
    "providers": [
      "email"
    ]
  },
  "user_metadata": {
    "email": "salar.amir@metu.edu.tr",
    "email_verified": true,
    "full_name": "Sal Damme",
    "phone_verified": false,
    "sub": "b92b719c-7362-4ec9-ba36-8af82b6586cd"
  },
  "identities": [
    {
      "identity_id": "3f346663-4893-4747-89c9-885312238139",
      "id": "b92b719c-7362-4ec9-ba36-8af82b6586cd",
      "user_id": "b92b719c-7362-4ec9-ba36-8af82b6586cd",
      "identity_data": {
        "email": "salar.amir@metu.edu.tr",
        "email_verified": true,
        "full_name": "Sal Damme",
        "phone_verified": false,
        "sub": "b92b719c-7362-4ec9-ba36-8af82b6586cd"
      },
      "provider": "email",
      "last_sign_in_at": "2025-01-20T18:08:55.629351Z",
      "created_at": "2025-01-20T18:08:55.629432Z",
      "updated_at": "2025-01-20T18:08:55.629432Z",
      "email": "salar.amir@metu.edu.tr"
    }
  ],
  "created_at": "2025-01-20T18:08:55.61698Z",
  "updated_at": "2025-02-03T10:31:09.890616Z",
  "is_anonymous": false
}
`;

const userObject = JSON.parse(userJson);


  const isSubscribed = subscription && subscription.status === 'active';

  React.useEffect(() => {
    initializePaddle({ 
      environment: 'sandbox', 
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN 
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const handleSubscribe = async () => {
    console.log('Subscribing user:', user);
    if (!user?.id) return;
    
    setLoading(true);
    try {
      await paddle?.Checkout.open({
        items: [{ 
          priceId: 'pri_01jh3jt10jsrm4p020wgbhesq2', 
          quantity: 1 
        }],
        customData: {
          userId: user.id,
        }
      });
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-gray-600">Loading subscription information...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      {isSubscribed ? (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Current Subscription</h2>
                <p className="text-gray-500">Your subscription is active</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-base font-medium">Pro Plan</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-base font-medium capitalize">{subscription?.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Started On</p>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <p className="text-base font-medium">{formatDate(subscription?.billing_start)}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Renews On</p>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <p className="text-base font-medium">{formatDate(subscription?.billing_end)}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button 
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Subscribe to Pro Plan</h2>
            <p className="text-gray-500">Get access to all premium features</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-lg font-medium">$10.00/month</p>
                  <p className="text-sm text-gray-500">Cancel anytime</p>
                </div>
                <button 
                  onClick={handleSubscribe} 
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4" />
                  <p>Subscription will renew automatically monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;