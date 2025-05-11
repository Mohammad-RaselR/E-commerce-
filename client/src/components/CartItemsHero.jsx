import React, { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";


const initialCartItems = [
  {
    id: 1,
    title: "Beats Pro Over-Ear Headphones – Black",
    price: 1900,
    quantity: 1,
    vendor: "abcStore",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    title: "Smart Keyboard Folio for 12.9 (English)",
    price: 19000,
    quantity: 1,
    vendor: "abcStore",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    title: "SoundLink\u00ae Revolve+ Bluetooth Speaker",
    price: 900,
    quantity: 1,
    vendor: "abcStore",
    image: "https://via.placeholder.com/80",
  },
];

const CartItemsHero = () => {
    const navigate = useNavigate();

const handleCheckout = () => {
  navigate("/checkout", { state: { cartItems } });
};

  const [cartItems, setCartItems] = useState(initialCartItems);
  const shippingRate = 100;

  const increment = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = total + cartItems.length * shippingRate;

  return (
    <div className="max-w-7xl mx-auto px-20 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border rounded-md">
          <div className="grid grid-cols-5 font-semibold text-gray-700 border-b px-6 py-4">
            <span className="col-span-2">Products</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 items-center border-b px-6 py-4"
            >
              <div className="col-span-2 flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Vendor: {item.vendor}</p>
                </div>
              </div>

              <div>{item.price.toFixed(2)} BDT</div>

              <div className="flex items-center border rounded w-max">
                <button onClick={() => decrement(item.id)} className="px-2 py-1 hover:bg-gray-200">
                  <Minus size={16} />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => increment(item.id)} className="px-2 py-1 hover:bg-gray-200">
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>{(item.price * item.quantity).toFixed(2)} BDT</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-600 ml-3"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-md p-6 space-y-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Cart totals</span>
            <span>{grandTotal.toFixed(2)} BDT</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="text-sm border-t pt-4">
              <p className="font-medium mb-1">Shipping: {item.vendor}</p>
              <p className="text-gray-600">Flat rate: {shippingRate.toFixed(2)} BDT</p>
              <p className="text-gray-500 mt-1">{item.title}</p>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-4 border-t">
            <span>Total</span>
            <span>{grandTotal.toFixed(2)} BDT</span>
          </div>

          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            onClick={handleCheckout}
            >
            Proceed to checkout
        </button>

        </div>
      </div>
    </div>
  );
};

export default CartItemsHero;
