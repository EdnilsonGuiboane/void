"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const URL_SECTORES =
  "https://sonil-dev.void.co.mz/api/v4/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a";
const URL_AREAS =
  "https://sonil-dev.void.co.mz/api/v4/areas?sector=8ed816a5-7c96-40fe-9561-8d1ca32c6fa1";
const URL_SEMANAS =
  "https://sonil-dev.void.co.mz/api/v4/last-week/de190ded-d23c-410c-89ac-89faf4dfb36a&_limit=10";
const URL_INSUMOS =
  "https://sonil-dev.void.co.mz/api/v4/analytics/farm-inputs/23e9336a-b20a-4478-a58f-875cc065e871?offset=1&limit=10&filter=&phase=nurseries";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("progress"); 
  const [sectores, setSectores] = useState([]);
  const [areas, setAreas] = useState([]);
  const [semanas, setSemanas] = useState([]);
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
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [resSectores, resAreas, resSemanas, resInsumos] = await Promise.all([
        fetch(URL_SECTORES, { headers }),
        fetch(URL_AREAS, { headers }),
        fetch(URL_SEMANAS, { headers }),
        fetch(URL_INSUMOS, { headers })
      ]);

      const [dataSectores, dataAreas, dataSemanas, dataInsumos] = await Promise.all([
        resSectores.json(),
        resAreas.json(),
        resSemanas.json(),
        resInsumos.json()
      ]);

      setSectores(Array.isArray(dataSectores) ? dataSectores : []);
      setAreas(Array.isArray(dataAreas) ? dataAreas : []);
      setSemanas(Array.isArray(dataSemanas) ? dataSemanas : []);
      setInsumos(Array.isArray(dataInsumos) ? dataInsumos : []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-5">
        <h1 className="text-xl font-bold mb-5">Dashboard</h1>
        <nav>
          <button className={`block w-full text-left p-2 mb-2 rounded-lg ${activeTab === "progress" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => setActiveTab("progress")}>
            Análises de Progresso
          </button>
          <button className={`block w-full text-left p-2 rounded-lg ${activeTab === "inputs" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => setActiveTab("inputs")}>
            Insumos
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        {activeTab === "progress" && (
          <section>
            <h2 className="text-2xl font-bold mb-5">Análises - Progresso</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Área</TableCell>
                  <TableCell>Técnico</TableCell>
                  <TableCell>Semana 1</TableCell>
                  <TableCell>Semana 2</TableCell>
                  <TableCell>Semana 3</TableCell>
                  <TableCell>Meta</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectores.length > 0 ? sectores.map((sector, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{sector.name}</TableCell>
                    <TableCell>{sector.area}</TableCell>
                    <TableCell>{sector.technician}</TableCell>
                    <TableCell>{sector.week1}</TableCell>
                    <TableCell>{sector.week2}</TableCell>
                    <TableCell>{sector.week3}</TableCell>
                    <TableCell>{sector.goal}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Nenhum dado disponível.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>
        )}
        {activeTab === "inputs" && (
          <section>
            <h2 className="text-2xl font-bold mb-5">Insumos</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Área</TableCell>
                  <TableCell>Técnico</TableCell>
                  <TableCell>Produtores</TableCell>
                  <TableCell>Semente X Distribuídos</TableCell>
                  <TableCell>Semente Y Recebidos</TableCell>
                  <TableCell>Meta</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insumos.length > 0 ? insumos.map((insumo, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{insumo.sector}</TableCell>
                    <TableCell>{insumo.area}</TableCell>
                    <TableCell>{insumo.technician}</TableCell>
                    <TableCell>{insumo.producers}</TableCell>
                    <TableCell>{insumo.seedX}</TableCell>
                    <TableCell>{insumo.seedY}</TableCell>
                    <TableCell>{insumo.goal}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Nenhum dado disponível.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>
        )}
      </main>
    </div>
  );
}

export default function Page() {
  return <Dashboard />;
}
