// app/dashboard/page.js  
"use client";  

import { useState, useEffect } from "react";  
import { useRouter } from "next/navigation";  
import Sidebar from "@/components/Sidebar";  
import DashboardContent from "@/components/DashboardContent";  

const URLs = {  
  sectores: "https://sonil-dev.void.co.mz/api/v4/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a",  
  insumos: "https://sonil-dev.void.co.mz/api/v4/analytics/farm-inputs/23e9336a-b20a-4478-a58f-875cc065e871?offset=1&limit=10&filter=&phase=nurseries"  
};  

function Dashboard() {  
  const [activeTab, setActiveTab] = useState("progress");  
  const [sectores, setSectores] = useState([]);  
  const [insumos, setInsumos] = useState([]);  
  const router = useRouter();  

  useEffect(() => {  
    const token = localStorage.getItem("token");  
    if (!token) {  
      router.push("/");  
    } else {  
      fetchData(token);  
    }  
  }, [router]);  

  const fetchData = async (token) => {  
    const headers = { Authorization: `Bearer ${token}` };  

    try {  
      const [resSectores, resInsumos] = await Promise.all([  
        fetch(URLs.sectores, { headers }),  
        fetch(URLs.insumos, { headers })  
      ]);  

      if (!resSectores.ok || !resInsumos.ok) {  
        throw new Error("Falha nas requisições de dados");  
      }  

      const [dataSectores, dataInsumos] = await Promise.all([  
        resSectores.json(),  
        resInsumos.json()  
      ]);  

      setSectores(Array.isArray(dataSectores) ? dataSectores : []);  
      setInsumos(Array.isArray(dataInsumos) ? dataInsumos : []);  
    } catch (error) {  
      console.error("Erro ao buscar dados:", error.message);  
    }  
  };  

  return (  
    <div className="flex min-h-screen bg-gray-800 text-white font-sans">  
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />  
      <DashboardContent activeTab={activeTab} sectores={sectores} insumos={insumos} />  
    </div>  
  );  
}  

export default function Page() {  
  return <Dashboard />;  
}