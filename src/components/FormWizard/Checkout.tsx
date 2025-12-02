"use client";

import { useState } from "react";
import { BookingData } from '@/types'

export default function CheckoutPage({ bookingData }: { bookingData: BookingData }) {
  const [loading, setLoading] = useState(false);

  const startTime = `${bookingData.sessionDate}T${bookingData.sessionTime.padStart(2, "0")}:00:00+05:30`;

const endTime = `${bookingData.sessionDate}T${(parseInt(bookingData.sessionTime) + 1)
  .toString()
  .padStart(2, "0")}:00:00+05:30`;
  const createEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: bookingData.therapistId,
          summary: `Therapy Session - ${bookingData.serviceType}`,
          description: `Session for ${bookingData.reason.join(", ")}`,
          startTime: startTime,
          endTime: endTime,
        }),
      });
      const data = await response.json();
      if (data && !data.error) {
        console.log('Calendar event created successfully:', data);
       // await handlePayment();
      } else {
        console.error('Failed to create calendar event');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating calendar event:', error);
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: bookingData.serviceType === "couples" ? 2200 : bookingData.serviceType === "individual" ? 1900 : 2800,
          serviceType: bookingData.serviceType,
          therapistId: bookingData.therapistId,
          sessionStart: startTime,
          sessionEnd: endTime,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  }

  return (
    <div className="flex items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          All done!
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We’ve gathered all your session details — including therapy type,
          therapist, and timing. You’re just one step away from confirming your
          booking.
        </p>

        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-6">
          <span className="text-gray-700 font-medium">Session Fee</span>
          <span className="text-lg font-semibold text-gray-900">$12.00</span>
        </div>
       
       <div className="flex flex-col items-center mt-6">
        <button 
          className={`w-full text-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 shadow-md ${
          loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handlePayment}
          disabled={loading}
        >
        {loading ? "Redirecting..." : "Proceed to Pay"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
       >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
       </svg>
      </button>
      <p className="text-sm text-gray-500 text-center mt-4 flex gap-[5px] items-center">
       {/* Stripe logo SVG */}
       <span>Secure payment powered by</span>
       <svg width="35px" height="28px" viewBox="0 0 512 214" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <title>Stripe</title>
        <g>
         <path d="M512,110.08 C512,73.6711111 494.364444,44.9422222 460.657778,44.9422222 C426.808889,44.9422222 406.328889,73.6711111 406.328889,109.795556 C406.328889,152.604444 430.506667,174.222222 465.208889,174.222222 C482.133333,174.222222 494.933333,170.382222 504.604444,164.977778 L504.604444,136.533333 C494.933333,141.368889 483.84,144.355556 469.76,144.355556 C455.964444,144.355556 443.733333,139.52 442.168889,122.737778 L511.715556,122.737778 C511.715556,120.888889 512,113.493333 512,110.08 L512,110.08 Z M441.742222,96.5688889 C441.742222,80.4977778 451.555556,73.8133333 460.515556,73.8133333 C469.191111,73.8133333 478.435556,80.4977778 478.435556,96.5688889 L441.742222,96.5688889 Z M351.431111,44.9422222 C337.493333,44.9422222 328.533333,51.4844444 323.555556,56.0355556 L321.706667,47.2177778 L290.417778,47.2177778 L290.417778,213.048889 L325.973333,205.511111 L326.115556,165.262222 C331.235556,168.96 338.773333,174.222222 351.288889,174.222222 C376.746667,174.222222 399.928889,153.742222 399.928889,108.657778 C399.786667,67.4133333 376.32,44.9422222 351.431111,44.9422222 L351.431111,44.9422222 Z M342.897778,142.933333 C334.506667,142.933333 329.528889,139.946667 326.115556,136.248889 L325.973333,83.4844444 C329.671111,79.36 334.791111,76.5155556 342.897778,76.5155556 C355.84,76.5155556 364.8,91.0222222 364.8,109.653333 C364.8,128.711111 355.982222,142.933333 342.897778,142.933333 L342.897778,142.933333 Z M241.493333,36.5511111 L277.191111,28.8711111 L277.191111,1.42108547e-14 L241.493333,7.53777778 L241.493333,36.5511111 Z M241.493333,47.36 L277.191111,47.36 L277.191111,171.804444 L241.493333,171.804444 L241.493333,47.36 Z M203.235556,57.8844444 L200.96,47.36 L170.24,47.36 L170.24,171.804444 L205.795556,171.804444 L205.795556,87.4666667 C214.186667,76.5155556 228.408889,78.5066667 232.817778,80.0711111 L232.817778,47.36 C228.266667,45.6533333 211.626667,42.5244444 203.235556,57.8844444 Z M132.124444,16.4977778 L97.4222222,23.8933333 L97.28,137.813333 C97.28,158.862222 113.066667,174.364444 134.115556,174.364444 C145.777778,174.364444 154.311111,172.231111 159.004444,169.671111 L159.004444,140.8 C154.453333,142.648889 131.982222,149.191111 131.982222,128.142222 L131.982222,77.6533333 L159.004444,77.6533333 L159.004444,47.36 L131.982222,47.36 L132.124444,16.4977778 Z M35.9822222,83.4844444 C35.9822222,77.9377778 40.5333333,75.8044444 48.0711111,75.8044444 C58.88,75.8044444 72.5333333,79.0755556 83.3422222,84.9066667 L83.3422222,51.4844444 C71.5377778,46.7911111 59.8755556,44.9422222 48.0711111,44.9422222 C19.2,44.9422222 0,60.0177778 0,85.1911111 C0,124.444444 54.0444444,118.186667 54.0444444,135.111111 C54.0444444,141.653333 48.3555556,143.786667 40.3911111,143.786667 C28.5866667,143.786667 13.5111111,138.951111 1.56444444,132.408889 L1.56444444,166.257778 C14.7911111,171.946667 28.16,174.364444 40.3911111,174.364444 C69.9733333,174.364444 90.3111111,159.715556 90.3111111,134.257778 C90.1688889,91.8755556 35.9822222,99.4133333 35.9822222,83.4844444 Z" fill="#635BFF"/>
        </g>
       </svg>
      </p>
     </div>

      </div>
    </div>
  );
}
