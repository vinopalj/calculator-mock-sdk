type CallbackFunction = (response: TrianglCalculatorResponse) => void;
type ErrorCallbackFunction = (error?:Error) => void;


// options for Triangl calculator - render options for Triangl calculator
interface TrianglCalculatorOptions {
    callback?: CallbackFunction;
    errorCallback?: ErrorCallbackFunction;
    apiKey?: string; // API key for Triangl calculator
    type?: string;  // detail | cart
    products?: string[]; // list of products of financials providers
    price?: number; // total price (amount)
    selectedProduct?: TrianglCalculatorSelectedProduct
}

interface TrianglCalculatorSelectedProduct {
    productCode: string;
    downPayment: number; //akontace  // format 5 000,- ==> 500000
    period: number // in months
}

// response from Triangl calculator
interface TrianglCalculatorResponse extends TrianglCalculatorSelectedProduct  {
    creditAmount: number; //celková výše úvěru (měla by odpovídat ceně zboží / košíku)
    preferredInstallment: number; // preferovaná výše splátky
}

class TrianglCalculator extends HTMLElement {
    private callback: CallbackFunction | null;
    private apiKey: string;
    private type: string;
    private products: string[];
    private price: number;

    private defaultResponse: TrianglCalculatorResponse = {
        productCode: "InBankXYZ",
        downPayment: 200000,
        period: 12,
        creditAmount: 6000000,
        preferredInstallment: 825600
    }

    constructor(options: TrianglCalculatorOptions = {}) {
        super();
        this.apiKey = options.apiKey || "";
        this.callback = options.callback || null;
        this.type = options.type || "detail"; // detail | cart
        this.products = options.products || [];
        this.price = options.price || 0;
    }

    connectedCallback() {
        this.updateDisplay();

        //create include of react app
        if (this.callback) {
            this.callback(this.defaultResponse); // call the callback with the current value
        }
    }

    updateDisplay() {
    this.innerHTML = `<h2>Response</h2><pre>${JSON.stringify(this.defaultResponse, null, 2)}</pre>`;    }
}
customElements.define('triangl-calculator', TrianglCalculator);