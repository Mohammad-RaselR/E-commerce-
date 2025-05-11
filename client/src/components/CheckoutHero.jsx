import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const flatRate = 200;

  const [shippingMethod, setShippingMethod] = useState("free");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingCost = shippingMethod === "flat" ? flatRate : 0;
    setTotal(productTotal + shippingCost);
  }, [cartItems, shippingMethod]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center mb-2">Checkout</h1>
      <p className="text-center text-sm mb-8">
        Have a coupon? <span className="underline cursor-pointer">Enter your code</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="border rounded-md p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter your first name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter your last name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name (optional)</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter your company name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country / Region*</label>
              <select className="w-full border px-3 py-2 rounded-md">
                <option>Bangladesh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street address*</label>
              <input className="w-full border px-3 py-2 rounded-md mb-2" placeholder="House no & street name" />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Town / City*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter city" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter state" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter zip code" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter your phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email address*</label>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Enter your email address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order notes (optional)</label>
              <textarea className="w-full border px-3 py-2 rounded-md" placeholder="Notes about your order, e.g. special notes for delivery." rows={3} />
            </div>
          </div>
        </div>

        {/* Your Order */}
        <div className="border rounded-md p-6 space-y-6">
          <h2 className="text-lg font-semibold">Your Order</h2>
          <div className="border-t pt-2 space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
                  <div className="text-sm">
                    <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline">
                      {item.title}
                    </Link>
                    <p className="text-gray-500">{item.quantity} × {item.price.toFixed(2)} BDT</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{(item.quantity * item.price).toFixed(2)} BDT</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-1">Shipping: Truffles</p>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="free"
                name="shipping"
                value="free"
                checked={shippingMethod === "free"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              <label htmlFor="free" className="text-sm">Free Shipping</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="flat"
                name="shipping"
                value="flat"
                checked={shippingMethod === "flat"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              <label htmlFor="flat" className="text-sm text-gray-500">
                Flat rate {flatRate.toFixed(2)} BDT
              </label>
            </div>
          </div>

          <div className="flex justify-between font-semibold pt-4 border-t">
            <span>Total</span>
            <span>{total.toFixed(2)} BDT</span>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-start gap-2">
              <input type="radio" name="payment" defaultChecked />
              <div className="text-sm text-gray-700">
                <strong>Direct bank transfer</strong>
                <p className="text-xs text-gray-500">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span className="text-sm">Check payment</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span className="text-sm">Cash on delivery</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label className="text-sm">
                I have read and agree to the website <a className="underline">Terms and conditions</a>
              </label>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold mt-4">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
