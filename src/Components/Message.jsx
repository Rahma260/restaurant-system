import { useCart } from "./Context/CartContext";

function GlobalMessage() {
  const { message } = useCart();

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                    bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}

export default GlobalMessage;
