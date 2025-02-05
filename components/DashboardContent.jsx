// components/DashboardContent.js  
import React, { useState } from "react";  
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // ajuste o caminho conforme necessário  
import DashboardHeader from "./DashboardHeader";  

function DashboardContent({ activeTab, sectores, insumos }) {  
  const [filter, setFilter] = useState("");  

  const filteredSectores = sectores.filter(sector =>  
    sector.name.toLowerCase().includes(filter.toLowerCase()) ||  
    sector.area.toLowerCase().includes(filter.toLowerCase()) ||  
    sector.technician.toLowerCase().includes(filter.toLowerCase())  
  );  

  return (  
    <main className="flex-1 p-8 bg-gray-800 text-white space-y-6">  
      {activeTab === "progress" && (  
        <section>  
          <DashboardHeader title="Análises - Progresso" />  
          <div className="mb-4">  
            <input  
              type="text"  
              placeholder="Filtrar setores..."  
              className="p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"  
              value={filter}  
              onChange={(e) => setFilter(e.target.value)}  
            />  
          </div>  
          <Table className="divide-y divide-gray-700">  
            <TableHeader>  
              <TableRow>  
                <TableCell className="bg-gray-600 font-semibold">Sector</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Área</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Técnico</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Semana 1</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Semana 2</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Semana 3</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Meta</TableCell>  
              </TableRow>  
            </TableHeader>  
            <TableBody>  
              {filteredSectores.length > 0 ? (  
                filteredSectores.map((sector, idx) => (  
                  <TableRow key={idx} className="hover:bg-gray-700 transition">  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.name}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.area}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.technician}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.week1}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.week2}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.week3}</TableCell>  
                    <TableCell className="px-4 py-2 border border-gray-600">{sector.goal}</TableCell>  
                  </TableRow>  
                ))  
              ) : (  
                <TableRow>  
                  <TableCell colSpan={7} className="text-center text-gray-400">  
                    Nenhum dado disponível para análise.  
                  </TableCell>  
                </TableRow>  
              )}  
            </TableBody>  
          </Table>  
        </section>  
      )}  

      {activeTab === "inputs" && (  
        <section>  
          <DashboardHeader title="Insumos" />  
          {/* Adicione filtros para insumos aqui se necessário */}  
          <Table className="divide-y divide-gray-700">  
            <TableHeader>  
              <TableRow>  
                <TableCell className="bg-gray-600 font-semibold">Sector</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Área</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Técnico</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Produtores</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Semente X Distribuídos</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Semente Y Recebidos</TableCell>  
                <TableCell className="bg-gray-600 font-semibold">Meta</TableCell>  
              </TableRow>  
            </TableHeader>  
            <TableBody>  
            {insumos.length > 0 ? (  
  insumos.map((insumo, idx) => (  
    <TableRow key={idx} className="hover:bg-gray-700 transition">  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.setor}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.area}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.tecnico}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.produtores}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.sementeXDistribuidos}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.sementeYRecebidos}</TableCell>  
      <TableCell className="px-4 py-2 border border-gray-600">{insumo.meta}</TableCell>  
    </TableRow>  
  ))  
) : (  
  <TableRow>  
    <TableCell colSpan={7} className="text-center text-gray-400">  
      Nenhum dado disponível para insumos.  
    </TableCell>  
  </TableRow>  
)}
            </TableBody>  
          </Table>  
        </section>  
      )}  
    </main>  
  );  
}  

export default DashboardContent;