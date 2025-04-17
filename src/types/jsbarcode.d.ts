
// Type definitions for JsBarcode
interface JsBarcodeOptions {
  format?: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  text?: string;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  valid?: (valid: boolean) => void;
}

interface JsBarcode {
  (element: string | HTMLElement | SVGSVGElement, data: string, options?: JsBarcodeOptions): void;
  toString?: () => string;
}

// Extend the Window interface globally
declare global {
  interface Window {
    JsBarcode: JsBarcode;
  }
}

export {};
