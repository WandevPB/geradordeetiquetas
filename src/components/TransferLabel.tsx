import React, { useRef, useState } from "react";
import Barcode from "react-barcode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LabelData {
  transactionNumber: string;
  ticketNumber: string;
  volume: string;
  sourceCD: string;
  destinationCD: string;
  sapTransferOrder: string;
  transactionLink: string;
  quantityPieces: string;
  invoiceNumber: string;
}

interface TransferLabelProps {
  data: LabelData;
  onBack?: () => void;
}

const TransferLabel = ({ data, onBack }: TransferLabelProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [printFormat, setPrintFormat] = useState<"etiqueta" | "a4">("etiqueta");

  const handlePrint = () => {
    if (labelRef.current) {
      const printWindow = window.open('', '_blank', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Etiqueta de Transferência</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
          @page {
            size: ${printFormat === "etiqueta" ? "100mm 150mm" : "A4"};
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .print-container {
            width: ${printFormat === "etiqueta" ? "100mm" : "210mm"};
            height: ${printFormat === "etiqueta" ? "150mm" : "auto"};
            padding: ${printFormat === "etiqueta" ? "5mm" : "10mm"};
            box-sizing: border-box;
            page-break-after: always;
            margin: ${printFormat === "etiqueta" ? "0" : "0 auto"};
          }
          .print-content {
            border: 1px solid #000;
            height: ${printFormat === "etiqueta" ? "100%" : "auto"};
            padding: 10px;
            box-sizing: border-box;
            max-width: ${printFormat === "etiqueta" ? "none" : "190mm"};
            margin: ${printFormat === "etiqueta" ? "0" : "0 auto"};
          }
          .logo {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
          }
          .logo img {
            height: 40px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
            text-align: left;
          }
          th {
            font-weight: bold;
            background-color: #f5f5f5;
          }
          .barcode-container {
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .section-title {
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 5px;
          }
          @media print {
            body {
              width: ${printFormat === "etiqueta" ? "100mm" : "210mm"};
              height: ${printFormat === "etiqueta" ? "150mm" : "auto"};
            }
          }
        `);
        printWindow.document.write('</style>');
        
        // Adicionar JSBarcode de forma mais confiável
        printWindow.document.write(`
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
        `);
        
        printWindow.document.write('</head><body>');
        
        // Print content
        printWindow.document.write('<div class="print-container"><div class="print-content">');
        
        // Logo
        printWindow.document.write('<div class="logo">');
        printWindow.document.write('<img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Brisanet_logo.svg" alt="Brisanet Logo" />');
        printWindow.document.write('</div>');
        
        // Dados da transferência
        printWindow.document.write('<div class="section-title">DADOS DA TRANSFERÊNCIA:</div>');
        printWindow.document.write('<table>');
        printWindow.document.write(`<tr><th>TRANSAÇÃO:</th><td>${data.transactionNumber}</td></tr>`);
        printWindow.document.write(`<tr><th>TICKET:</th><td>${data.ticketNumber}</td></tr>`);
        printWindow.document.write(`<tr><th>VOLUME:</th><td>${data.volume}</td></tr>`);
        printWindow.document.write(`<tr><th>QTD DE PEÇAS:</th><td>${data.quantityPieces}</td></tr>`);
        printWindow.document.write(`<tr><th>NÚMERO DE NF:</th><td>${data.invoiceNumber}</td></tr>`);
        
        if (data.sapTransferOrder) {
          printWindow.document.write(`<tr><th>PEDIDO SAP:</th><td>${data.sapTransferOrder}</td></tr>`);
        }
        
        printWindow.document.write('</table>');
        
        // Origem e Destino
        printWindow.document.write('<div class="section-title">ORIGEM / DESTINO:</div>');
        printWindow.document.write('<table>');
        printWindow.document.write(`<tr><th>DE:</th><td>${data.sourceCD}</td></tr>`);
        printWindow.document.write(`<tr><th>PARA:</th><td>${data.destinationCD}</td></tr>`);
        printWindow.document.write('</table>');
        
        // Código de barras com ID fixo
        printWindow.document.write('<div class="barcode-container" id="barcode-wrapper">');
        // Criamos um elemento SVG com ID específico para o JsBarcode
        printWindow.document.write('<svg id="barcode"></svg>');
        printWindow.document.write('</div>');
        
        printWindow.document.write('</div></div>');
        
        // Script para gerar o código de barras após fechar o documento
        printWindow.document.write(`
          <script>
            // Função para gerar o código de barras
            function generateBarcode() {
              try {
                JsBarcode("#barcode", "${data.transactionLink}", {
                  format: "CODE128",
                  displayValue: true,
                  fontSize: 12,
                  height: 80,
                  width: 2,
                  margin: 10
                });
                console.log("Código de barras gerado com sucesso");
                
                // Ajustar tamanho do SVG após geração
                var barcodeSvg = document.getElementById('barcode');
                if (barcodeSvg) {
                  barcodeSvg.style.width = '100%';
                  barcodeSvg.style.maxHeight = '80px';
                }
              } catch (e) {
                console.error("Erro ao gerar código de barras:", e);
                document.getElementById('barcode-wrapper').innerHTML = '<p>Erro ao gerar código de barras: ' + e.message + '</p>';
              }
            }
            
            // Garantir que o DOM esteja carregado antes de tentar gerar o código de barras
            window.onload = function() {
              // Esperar um pouco para garantir que o JSBarcode esteja carregado
              setTimeout(function() {
                generateBarcode();
                // Dar tempo para o barcode ser renderizado antes de imprimir
                setTimeout(function() {
                  window.print();
                }, 500);
              }, 500);
            };
          </script>
        `);
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível abrir a janela de impressão.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      <Card className="mb-4 overflow-hidden">
        <div ref={labelRef} className="p-6 bg-white">
          <div className="flex justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/16/Brisanet_logo.svg" 
              alt="Brisanet Logo" 
              className="h-10"
            />
          </div>
          
          <div className="border border-black p-4 mb-4">
            <h3 className="font-bold text-lg mb-2">DADOS DA TRANSFERÊNCIA:</h3>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-black">
                  <th className="border border-black p-2 bg-gray-100 text-left">TRANSAÇÃO:</th>
                  <td className="border border-black p-2">{data.transactionNumber}</td>
                </tr>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">TICKET:</th>
                  <td className="border border-black p-2">{data.ticketNumber}</td>
                </tr>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">VOLUME:</th>
                  <td className="border border-black p-2">{data.volume}</td>
                </tr>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">QTD DE PEÇAS:</th>
                  <td className="border border-black p-2">{data.quantityPieces}</td>
                </tr>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">NÚMERO DE NF:</th>
                  <td className="border border-black p-2">{data.invoiceNumber}</td>
                </tr>
                {data.sapTransferOrder && (
                  <tr>
                    <th className="border border-black p-2 bg-gray-100 text-left">PEDIDO SAP:</th>
                    <td className="border border-black p-2">{data.sapTransferOrder}</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <h3 className="font-bold text-lg mt-4 mb-2">ORIGEM / DESTINO:</h3>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">DE:</th>
                  <td className="border border-black p-2">{data.sourceCD}</td>
                </tr>
                <tr>
                  <th className="border border-black p-2 bg-gray-100 text-left">PARA:</th>
                  <td className="border border-black p-2">{data.destinationCD}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex justify-center mt-4">
              <Barcode 
                value={data.transactionLink} 
                format="CODE128" 
                width={1.5} 
                height={50} 
                fontSize={12}
                margin={10}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mb-4">
        <RadioGroup value={printFormat} onValueChange={(value) => setPrintFormat(value as "etiqueta" | "a4")} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="etiqueta" id="etiqueta" />
            <Label htmlFor="etiqueta">Formato Etiqueta (100x150mm)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="a4" id="a4" />
            <Label htmlFor="a4">Formato A4</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex gap-2">
        {onBack && (
          <Button 
            onClick={onBack} 
            variant="outline"
            className="flex-1"
          >
            Voltar
          </Button>
        )}
        <Button 
          onClick={handlePrint} 
          className="flex-1 bg-[#FF5500] hover:bg-[#E34D00]"
        >
          Imprimir Etiqueta
        </Button>
      </div>
    </div>
  );
};

export default TransferLabel;
