"use client";
import React, { useState } from "react";
import SideNav from "./_component/SideNav";
import { Header } from "./_component/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/UpdatedCreditUsageContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
        <UserSubscriptionContext.Provider
          value={{ userSubscription, setUserSubscription }}
        >
          <UpdateCreditUsageContext.Provider
            value={{ updateCreditUsage, setUpdateCreditUsage }}
          >
            <div className="bg-slate-300 h-screen">
              <div className="md:w-64 hidden md:block fixed">
                <SideNav />
              </div>
              <div className="md:ml-64 ">
                <Header />
                {children}
              </div>
            </div>
          </UpdateCreditUsageContext.Provider>
        </UserSubscriptionContext.Provider>
      </TotalUsageContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Layout;
