// components/Sidebar.js  
import React from "react";  

function Sidebar({ activeTab, onTabChange }) {  
  return (  
    <aside className="w-64 bg-pink-700 p-5 shadow-lg">  
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>  
      <nav>  
        <button  
          className={`block w-full text-left p-3 mb-2 rounded-lg hover:bg-pink-600 transition ${  
            activeTab === "progress" ? "bg-pink-600" : ""  
          }`}  
          onClick={() => onTabChange("progress")}  
        >  
          Análises de Progresso  
        </button>  
        <button  
          className={`block w-full text-left p-3 rounded-lg hover:bg-pink-600 transition ${  
            activeTab === "inputs" ? "bg-pink-600" : ""  
          }`}  
          onClick={() => onTabChange("inputs")}  
        >  
          Insumos  
        </button>  
      </nav>  
    </aside>  
  );  
}  

export default Sidebar;