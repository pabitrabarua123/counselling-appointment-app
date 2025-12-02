"use client";

import { useEffect, useState } from 'react';

interface SessionDetails {
  status: string;
  serviceType: string;
  sessionStart: Date;
  sessionEnd: Date;
  therapistName: string;
  customerName: string;
}

export default function CheckoutStatus({sessionId}: {sessionId: string | null}) {

    const [status_loading, setStatusLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
   
    useEffect(() => {
     if (!sessionId) return;
     const fetchOrder = async () => {
       try {
         const res = await fetch(`/api/checkout?session_id=${sessionId}`);
         const data = await res.json();
         console.log('Order details:', data);
         if(data.error) {
            setErrorMessage(data.error);
         }
         if(data.order && data.order.status !== 'paid') {
            setErrorMessage("Payment not completed yet, once confirmed, you'll receive a confirmation email shortly.");
         }
         if(data.order && data.order.status === 'paid') {
          setSessionDetails({
            status: data.order.status,
            serviceType: data.order.serviceType,
            sessionStart: new Date(data.order.sessionStart),
            sessionEnd: new Date(data.order.sessionEnd),
            therapistName: data.order.therapist.name,
            customerName: data.order.customerName,
          });
         }
        } catch (error) {
          console.error('Error fetching session details:', error);
          setErrorMessage("Error fetching session details");
        }
        setStatusLoading(false);
       };
       fetchOrder();
    }, [sessionId]);

  if(status_loading) {
    return (
      <div className="bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3">
  <svg
    className="animate-spin h-10 w-10 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>

              <span className="text-gray-600">Please wait while we verify your payment...</span>
            </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        { errorMessage && (
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-red-600 mb-4">{errorMessage} </h3>
          </div>
        )}
        { !errorMessage && (
<div className="text-center mb-12">
  <h1 className="text-4xl font-bold text-green-600 mb-4">
    🎉 Payment Successful!
  </h1>

  <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
    Thank you, <span className="font-semibold">{sessionDetails?.customerName}</span>! 
    Your payment for the <span className="font-semibold">{sessionDetails?.serviceType}</span> session 
    with <span className="font-semibold">{sessionDetails?.therapistName}</span> has been confirmed. Below are your session details:
  </p>

  <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
    <table className="min-w-full text-left">
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-gray-50 transition">
          <td className="px-8 py-4 font-semibold text-gray-800 bg-gray-50">Therapist Name</td>
          <td className="px-8 py-4 text-gray-700">{sessionDetails?.therapistName}</td>
        </tr>
        <tr className="hover:bg-gray-50 transition">
          <td className="px-8 py-4 font-semibold text-gray-800 bg-gray-50">Counselling Type</td>
          <td className="px-8 py-4 text-gray-700">{sessionDetails?.serviceType}</td>
        </tr>
        <tr className="hover:bg-gray-50 transition">
          <td className="px-8 py-4 font-semibold text-gray-800 bg-gray-50">Session Start</td>
          <td className="px-8 py-4 text-gray-700">
            {sessionDetails?.sessionStart.toLocaleString()}
          </td>
        </tr>
        <tr className="hover:bg-gray-50 transition">
          <td className="px-8 py-4 font-semibold text-gray-800 bg-gray-50">Session End</td>
          <td className="px-8 py-4 text-gray-700">
            {sessionDetails?.sessionEnd.toLocaleString()}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-lg text-gray-600 mt-8">
    We look forward to seeing you at the scheduled time.  
    If you have any questions, feel free to reach out!
  </p>
</div>

        )}
        </div>
        </div>
  )
}