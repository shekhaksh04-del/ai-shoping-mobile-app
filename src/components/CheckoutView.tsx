import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';

export const CheckoutView: React.FC = () => {
  const { cart, finalTotal, subtotal, discountTotal, appliedPromo, loyaltyPointsActive, setScreen, showToast } = useCommerce();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');

  const [fullName, setFullName] = useState('Genevieve Laurent');
  const [address, setAddress] = useState('450 Sutter St, Suite 1400');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94108');
  const [email, setEmail] = useState('genevieve.laurent@atelier-couture.com');

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      showToast('Order #AT-8924 placed successfully!', 'verified');
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-md mx-auto text-center pt-24 pb-20">
        <div className="w-16 h-16 rounded-full bg-[#ffdad2] flex items-center justify-center text-[#822714] mb-4 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-[36px]">verified</span>
        </div>

        <span className="font-body text-[11px] uppercase tracking-widest text-[#a13e28] font-bold">
          Order Confirmed #AT-8924
        </span>
        <h2 className="font-headline font-semibold text-[26px] text-black mt-1">
          Thank you, Genevieve
        </h2>
        <p className="font-body text-[13px] text-[#47464b] mt-2 max-w-xs leading-relaxed">
          Your pieces are being prepared by our master tailors with complimentary garment bags and cedar hangers.
        </p>

        {/* Order Details Receipt Box */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] my-5 text-left text-[12px] font-body">
          <div className="flex justify-between pb-2 border-b border-[#f4f3f1]">
            <span className="text-[#77767b]">Estimated Arrival</span>
            <span className="font-semibold text-black">Thursday, Oct 24 (2 Days)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#f4f3f1]">
            <span className="text-[#77767b]">Courier</span>
            <span className="font-semibold text-black">White-Glove Carbon Neutral</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#f4f3f1]">
            <span className="text-[#77767b]">Destination</span>
            <span className="font-semibold text-black truncate max-w-[180px]">{address}, {city}</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-[#77767b]">Total Charged</span>
            <span className="font-headline font-bold text-[16px] text-black">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <button
            onClick={() => {
              setScreen('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 rounded-full bg-black text-white font-body text-[13px] font-semibold hover:opacity-90 active:scale-95 transition-transform"
          >
            Return to Discover
          </button>
          <button
            onClick={() => showToast('Tracking link sent to ' + email, 'send')}
            className="w-full py-3 rounded-full bg-[#f4f3f1] text-[#1a1c1a] font-body text-[13px] font-medium hover:bg-[#e9e8e5]"
          >
            Send Receipt to Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Title */}
      <div className="mb-4">
        <h2 className="font-headline font-semibold text-[22px] text-[#1a1c1a]">
          Express Checkout
        </h2>
        <p className="font-body text-[12px] text-[#47464b]">
          Review delivery destination &amp; payment authorization
        </p>
      </div>

      {/* Quick 1-Touch Express Pay */}
      <div className="mb-5">
        <button
          onClick={() => setPaymentMethod('apple')}
          className="w-full h-12 rounded-2xl bg-black text-white font-headline text-[15px] font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 shadow-sm transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
          <span>Pay with Apple Pay</span>
        </button>
      </div>

      <div className="flex items-center gap-3 my-2 text-[#77767b] text-[11px] uppercase tracking-wider font-semibold">
        <div className="flex-1 h-[1px] bg-[#efeeeb]"></div>
        <span>Or Pay with Card</span>
        <div className="flex-1 h-[1px] bg-[#efeeeb]"></div>
      </div>

      {/* Delivery Address Form */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a13e28] text-[20px]">local_shipping</span>
            <h3 className="font-headline font-semibold text-[16px] text-black">
              Delivery Address
            </h3>
          </div>
          <span className="font-body text-[11px] px-2 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-semibold">
            VIP Priority
          </span>
        </div>

        <div className="flex flex-col gap-2.5 font-body text-[13px]">
          <div>
            <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
              Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a13e28] text-[20px]">credit_card</span>
            <h3 className="font-headline font-semibold text-[16px] text-black">
              Payment Method
            </h3>
          </div>
          <span className="font-body text-[11px] text-green-700 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">lock</span> 256-Bit SSL
          </span>
        </div>

        <div className="flex flex-col gap-2.5 font-body text-[13px]">
          <div>
            <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
              Card Number
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                defaultValue="•••• •••• •••• 4242"
                className="w-full h-10 pl-3 pr-10 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black font-mono"
              />
              <span className="material-symbols-outlined text-[#77767b] text-[18px] absolute right-3">
                credit_card
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
                Expires
              </label>
              <input
                type="text"
                defaultValue="11/27"
                className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#77767b] uppercase tracking-wider font-semibold block mb-1">
                CVC
              </label>
              <input
                type="text"
                defaultValue="•••"
                className="w-full h-10 px-3 rounded-xl bg-[#f4f3f1] text-[#1a1c1a] border border-[#efeeeb] focus:outline-none focus:ring-1 focus:ring-black font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary Accordion */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] mb-6">
        <h4 className="font-headline font-semibold text-[15px] text-black mb-2">
          Items in this Order ({cart.length})
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cart.map((item) => (
            <div key={item.id} className="w-16 h-20 rounded-lg overflow-hidden bg-[#f4f3f1] shrink-0 border border-[#efeeeb] relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white font-body text-[9px] px-1 rounded-full">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-[#efeeeb] flex justify-between items-baseline font-body">
          <span className="font-medium text-black">Total to be charged</span>
          <span className="font-headline font-bold text-[20px] text-black">${finalTotal.toFixed(2)}</span>
        </div>
      </section>

      {/* Sticky Bottom Authorize Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#efeeeb] pb-safe shadow-[0_-8px_24px_-6px_rgba(24,24,27,0.08)]">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4">
          <button
            disabled={isProcessing}
            onClick={handlePlaceOrder}
            className="w-full h-[52px] rounded-full bg-black text-white font-body text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:opacity-95 disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                <span>Authorizing Payment...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Authorize &amp; Pay ${finalTotal.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
