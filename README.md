# Sistema de Etiquetas para Transferência de CDs

Um sistema simples e eficiente para gerar etiquetas de transferência, desenvolvido por Wanderson Davyd.

## Funcionalidades

- **Formulário intuitivo**: Preenchimento rápido e fácil dos dados de transferência
- **Visualização prévia**: Verifique a etiqueta antes de imprimir
- **Código de barras automático**: Geração de código de barras para o link da transação
- **Opções de impressão**: Formatos para etiquetas (100x150mm) e papel A4
- **Impressão otimizada**: Layout preparado para impressão profissional

## Como utilizar

1. **Preencha o formulário**:
   - Insira o número da transação
   - Insira o número do ticket
   - Informe o volume a ser transferido
   - Defina o CD de origem
   - Defina o CD de destino
   - Adicione o pedido SAP (opcional)
   - Insira o link da transação (será usado para gerar o código de barras)

2. **Gere a etiqueta**:
   - Clique no botão "Gerar Etiqueta"
   - Visualize a etiqueta na tela de prévia

3. **Imprima**:
   - Escolha o formato desejado (etiqueta ou A4)
   - Clique no botão "Imprimir Etiqueta"
   - A janela de impressão será aberta automaticamente

## Tecnologias utilizadas

- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes de interface reutilizáveis
- **React Barcode**: Biblioteca para geração de código de barras
- **Vite**: Build tool e servidor de desenvolvimento

## Instalação para desenvolvimento

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
