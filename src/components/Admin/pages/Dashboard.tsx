"use client"

import EcommerceMetrics from "../ecommerce/EcommerceMetrics";
import StatisticsChart from "../ecommerce/StatisticsChart";
import TherapyPieChart from "../ecommerce/TherapyPieChart";
import RecentOrders from "../ecommerce/RecentOrders";
import DemographicCard from "../ecommerce/DemographicCard";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [series, setSeries] = useState<{ name: string; data: number[]; }[]>([]);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [seriesPie, setSeriesPie] = useState<number[]>([]);
  const [cardData, setCardData] = useState({
     sessions: 0,
     clients: 0,
     therapists: 0,
     revenue: 0    
  })

  useEffect(() => {
      const fetchStats = async () => {
        try {
           const res = await fetch("/api/statistics");
           const data = await res.json();
           // console.log("Stat Data: " + data);
           setCardData({
            ...cardData, 
            sessions: data.orders,
            clients: data.clients,
            therapists: data.therapists,
            revenue: data.revenue
          })

           setSeries([
             { name: "Sessions", data: data.sessions },
           ]);
           setCategories(data.categories);
           setSeriesPie(data.piechart);
        } catch (err) {
          console.error("Error fetching stats:", err);
        }
      };
  
      fetchStats();
  }, [])

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics data={cardData}/>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <TherapyPieChart seriesPie={seriesPie}/>
        </div>

        <div className="col-span-12">
          <StatisticsChart series={series} categories={categories}/>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
