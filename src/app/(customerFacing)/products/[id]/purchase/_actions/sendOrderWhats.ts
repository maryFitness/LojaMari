import sendOrderToDB from "./sendOrderDb";

interface CartItem {
    id: string;
    url: string;
    name: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
  }

const generateWhatsAppMessage = (cartItems: CartItem[], total: number) => {
    
    const baseUrl = "https://api.whatsapp.com/send";
    const phoneNumber = "+55 81 996580195";
    const introText = "Olá, gostaria de realizar meu pedido:\n";
  
    const cartDetails = cartItems.map(item => (
      `\n- *${item.name}*\n  Cor: ${item.color}\n  Tamanho: ${item.size}\n  Quantidade: ${item.quantity}\n  Preço: ${(item.price / 100).toFixed(2)}`
    )).join("\n");
  
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100;
    const totalText = `\n\nTotal: $${totalPrice.toFixed(2)}`;
  
    const message = encodeURIComponent(introText + cartDetails + totalText);

    sendOrderToDB(cartItems, total)

    return `${baseUrl}?phone=${phoneNumber}&text=${message}`;
  };



  
  export default generateWhatsAppMessage