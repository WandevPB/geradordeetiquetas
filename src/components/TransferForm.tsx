
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  transactionNumber: string;
  ticketNumber: string;
  volume: string;
  sourceCD: string;
  destinationCD: string;
  sapTransferOrder: string;
  transactionLink: string;
}

interface TransferFormProps {
  onFormSubmit: (data: FormData) => void;
}

const TransferForm = ({ onFormSubmit }: TransferFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    transactionNumber: "",
    ticketNumber: "",
    volume: "",
    sourceCD: "",
    destinationCD: "",
    sapTransferOrder: "",
    transactionLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = [
      "transactionNumber", 
      "ticketNumber", 
      "volume", 
      "sourceCD", 
      "destinationCD", 
      "transactionLink"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    onFormSubmit(formData);
    toast({
      title: "Etiqueta gerada",
      description: "Sua etiqueta foi gerada com sucesso!",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="transactionNumber" className="text-sm">TRANSAÇÃO *</Label>
              <Input
                id="transactionNumber"
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                placeholder="Número da transação"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="ticketNumber" className="text-sm">TICKET *</Label>
              <Input
                id="ticketNumber"
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleChange}
                placeholder="Número do ticket"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="volume" className="text-sm">VOLUME *</Label>
              <Input
                id="volume"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                placeholder="Quantia ou volume"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="sourceCD" className="text-sm">DE (CD de origem) *</Label>
              <Input
                id="sourceCD"
                name="sourceCD"
                value={formData.sourceCD}
                onChange={handleChange}
                placeholder="CD de origem"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="destinationCD" className="text-sm">PARA (CD de destino) *</Label>
              <Input
                id="destinationCD"
                name="destinationCD"
                value={formData.destinationCD}
                onChange={handleChange}
                placeholder="CD de destino"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="sapTransferOrder" className="text-sm">PEDIDO DE TRANSFERÊNCIA SAP</Label>
              <Input
                id="sapTransferOrder"
                name="sapTransferOrder"
                value={formData.sapTransferOrder}
                onChange={handleChange}
                placeholder="Opcional"
                className="text-sm h-9"
              />
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="transactionLink" className="text-sm">LINK DA TRANSAÇÃO *</Label>
              <Input
                id="transactionLink"
                name="transactionLink"
                value={formData.transactionLink}
                onChange={handleChange}
                placeholder="URL para código de barras"
                className="text-sm h-9"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-[#FF5500] hover:bg-[#E34D00] text-sm">
            Gerar Etiqueta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransferForm;
