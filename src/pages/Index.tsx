import React, { useState } from "react";
import TransferForm from "@/components/TransferForm";
import TransferLabel from "@/components/TransferLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  transactionNumber: string;
  ticketNumber: string;
  volume: string;
  sourceCD: string;
  destinationCD: string;
  sapTransferOrder: string;
  transactionLink: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [activeTab, setActiveTab] = useState("form");

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setActiveTab("preview");
  };

  const handleBack = () => {
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gray-50">
      <header className="w-full max-w-xl mb-4 text-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/1/16/Brisanet_logo.svg" 
          alt="Wanderson Davyd - Sistema de Etiquetas" 
          className="h-10 md:h-12 mx-auto mb-2"
        />
        <h1 className="text-xl md:text-2xl font-bold text-[#FF5500]">
          Sistema de Etiquetas para Transferência de CDs
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Preencha o formulário para gerar uma etiqueta de transferência
        </p>
      </header>

      <main className="w-full max-w-lg flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="form">Formulário</TabsTrigger>
            <TabsTrigger value="preview" disabled={!formData}>
              Visualizar Etiqueta
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-2">
            <TransferForm onFormSubmit={handleFormSubmit} />
            
            <Card>
              <CardContent className="p-4">
                <h2 className="text-base font-semibold mb-2">Instruções:</h2>
                <ol className="list-decimal pl-4 space-y-1 text-sm">
                  <li>Preencha todos os campos obrigatórios (marcados com *).</li>
                  <li>O campo "PEDIDO DE TRANSFERÊNCIA SAP" é opcional.</li>
                  <li>O LINK DA TRANSAÇÃO será usado para gerar o código de barras.</li>
                  <li>Após preencher o formulário, clique em "Gerar Etiqueta".</li>
                  <li>Visualize a etiqueta e utilize o botão "Imprimir".</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            {formData && <TransferLabel data={formData} onBack={handleBack} />}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="w-full max-w-lg mt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Sistema de Etiquetas - Desenvolvido por Wanderson Davyd
      </footer>
    </div>
  );
};

export default Index;
