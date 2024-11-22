"use client";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/(context)/UserSubscriptionContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  intent: "capture",
};

function Billing() {
  const { user } = useUser();
  const { userSubscription } = useContext(UserSubscriptionContext);

  const handlePaymentSuccess = async (details: any) => {
    try {
      // Save subscription details to your backend
      await SaveSubscription(details.id);
      window.location.reload();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const SaveSubscription = async (paymentId: string) => {
    try {
      const response = await axios.post("/api/save-subscription", {
        subscriptionId: paymentId,
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      });
      return response.data;
    } catch (error) {
      console.error("Error saving subscription:", error);
      throw error;
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-center font-bold text-3xl my-3">
          Upgrade With Monthly Plan
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          {/* Free Plan Card */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Free
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  0$
                </strong>
                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">10,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">50+ Content Templates</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">1 Month of History</span>
              </li>
            </ul>
          </div>

          {/* Paid Plan Card */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Monthly
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  9.99$
                </strong>
                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">1,00,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">50+ Template Access</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">1 Year of History</span>
              </li>
            </ul>

            {userSubscription ? (
              <Button
                disabled={true}
                className="w-full rounded-full mt-5 p-6"
                variant="outline"
              >
                Active Plan
              </Button>
            ) : (
              <div className="mt-5">
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data: any, actions: any) => {
                    return actions?.order?.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "9.99",
                            currency_code: "USD",
                          },
                          description: "Monthly Premium Plan",
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      const details = await actions.order.capture();
                      await handlePaymentSuccess(details);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default Billing;
