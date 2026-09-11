import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';

interface MatchCardData {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  matchScore: string;
  matchType: 'exact' | 'budget';
  badgeTitle: string;
  badgeIcon: string;
  sizeStock: string;
  image: string;
  isLowerPiece?: boolean;
}

export const VisualMatchView: React.FC = () => {
  const { addToCart, toggleWishlist, isWishlisted, showToast, openProduct } = useCommerce();

  const [activeDetection, setActiveDetection] = useState<'blazer' | 'trousers'>('blazer');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'exact' | 'budget'>('all');
  const [flashOn, setFlashOn] = useState(false);
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [tryOnItem, setTryOnItem] = useState<{ title: string; price: number; image: string }>({
    title: 'Studio Toteme Double-Breasted Raw Wool Tailored Blazer',
    price: 680,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZT2YzYjlapEqCx9nRDbwiG4C1Nq3Ey8ZTg5Hokj7Yy7Fm6FPJil4tIEDkHSHwvq3IBwJOYSuvSyQc5WG47xpIM1yaS1cW1QE47lacMd9CaNcvHls4-WiNkx-8FiEimTRqVCLXf6WRIFZu9HJEKqZgkTrbCgoIcGHm8K-q9LKnuzB_HAqetBkZaVQlSq4dO0uhCesQ-4HA2OhaG2c6GnOiXSfz8adF3aDBq2O6EEMIG7iSvufqnWY1'
  });

  // Stylist conversation state
  const [stylistPrompt, setStylistPrompt] = useState('');
  const [stylistResponse, setStylistResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const matchItems: MatchCardData[] = [
    {
      id: 'toteme-blazer',
      name: 'Double-Breasted Raw Wool Tailored Blazer',
      brand: 'Studio Toteme',
      price: 680,
      matchScore: '99% Match',
      matchType: 'exact',
      badgeTitle: 'Exact Brand Origin Detected',
      badgeIcon: 'verified',
      sizeStock: 'Size M / 38 In Stock',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsI37_UJmaJ0u49AmRsAooovWNBhBCqOjUn0I-0avmIcdrbHJYs-xs4FoosFch2PEZtkp2cjwpFDtABw1rfDLREQH7B7kzMkpXd8T5H8EAB07pHAxcoFB0ll3dNBX50BUfJiaofERiIb-zyMObi-00wi62YmAoWY_tRWfKp_DrdEvdkJ2W0iRd7BeSDyQJCznZd2rUdYsBZfzfMQHBDMSNTzUi7Ej4VszxVsVFfGZphZ-RIpM7cKCr'
    },
    {
      id: 'cos-jacket',
      name: 'Structured Wool-Tencel Boxy Jacket',
      brand: 'COS Atelier',
      price: 290,
      originalPrice: 350,
      matchScore: '94% Match',
      matchType: 'budget',
      badgeTitle: 'Value Alternative • Saves $390',
      badgeIcon: 'savings',
      sizeStock: 'Size 38 In Stock (-17%)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQy9wObrrnNX8h195oWLne_LeEu4WSsA3ZQ1QzXxfINO8ZBtBKFUi9yYg3JFsnTdCcVL9PI7RZFSGytPQyFkZzrn19U51oeFSD8HMGagonFxwiCj8dGQHeL-qvywKW4i8qJKu4_ByuqtR_1T9JN5_8IB3iFMJnQwRlC7hJgrodCjGSttw3nGuBnpABNDWdnom0-5UsdAqNvZfrcC9NbUhplqtu9wjlKGFc-roiVCBp2GDEjDkFuBw'
    },
    {
      id: 'frankie-trousers',
      name: 'Bea Pleated Wide-Leg Wool Trousers',
      brand: 'The Frankie Shop',
      price: 245,
      matchScore: '96% Match',
      matchType: 'exact',
      badgeTitle: 'Identified Lower Piece',
      badgeIcon: 'auto_awesome',
      sizeStock: 'Size 36 (US 4)',
      isLowerPiece: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqHU3iSQ-ibMECM0F4EcvbbEsRUCdIkuB8NAGeTAIfyQRjnIu4xDsxvvmCzRYD7U__gPdQ1-ZeXWMoc-Pu17wmuwOnlyE9_BLvSZdnCJvgXMzIJrjNNuRayW_T61o7gS9DfSS9ZY80a-itmnNj1NTm4BQV-qwsmUl0JKPubOT3DAxdycU4Eb8mbCqQ5rBt3wd9POoYsD8FyHXu2aqc0tqBtG31Uo0boeOxW9S1XhLCVIBs-XDjKpT'
    }
  ];

  const handleOpenTryOn = (item: MatchCardData) => {
    setTryOnItem({
      title: `${item.brand} ${item.name}`,
      price: item.price,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZT2YzYjlapEqCx9nRDbwiG4C1Nq3Ey8ZTg5Hokj7Yy7Fm6FPJil4tIEDkHSHwvq3IBwJOYSuvSyQc5WG47xpIM1yaS1cW1QE47lacMd9CaNcvHls4-WiNkx-8FiEimTRqVCLXf6WRIFZu9HJEKqZgkTrbCgoIcGHm8K-q9LKnuzB_HAqetBkZaVQlSq4dO0uhCesQ-4HA2OhaG2c6GnOiXSfz8adF3aDBq2O6EEMIG7iSvufqnWY1'
    });
    setIsTryOnModalOpen(true);
  };

  const handleStylistSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!stylistPrompt.trim()) return;

    setIsTyping(true);
    const query = stylistPrompt;
    setStylistPrompt('');

    setTimeout(() => {
      setIsTyping(false);
      if (query.toLowerCase().includes('dinner') || query.toLowerCase().includes('footwear')) {
        setStylistResponse(
          'For an evening dinner elevation, ground this relaxed wool tailoring with sharply pointed patent black slingback kitten heels. Add brushed sculptural silver drop earrings to counterbalance the oversized masculine drape.'
        );
      } else if (query.toLowerCase().includes('metal') || query.toLowerCase().includes('silver') || query.toLowerCase().includes('gold')) {
        setStylistResponse(
          'Given the cool charcoal tones and slate twill weave (#2B2C30), brushed rhodium and cold architectural sterling silver provide superior cohesion over warm yellow gold.'
        );
      } else {
        setStylistResponse(
          `Analyzing drape for "${query}"... Pair with an unbuttoned ecru mulberry silk camisole and low-profile cream sneakers to easily dress down the sharp collar silhouette.`
        );
      }
    }, 600);
  };

  const filteredMatches = matchItems.filter(item => {
    if (activeFilterTab === 'all') return true;
    return item.matchType === activeFilterTab;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Viewfinder Section */}
      <section className="pt-1 pb-3">
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#1b1b1e] shadow-md select-none group border border-[#efeeeb]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHlTaxrdXypSdfg35OVgSMzN1uNAwJYo8Bmz0gKs6uqdesZq_mde4l6cahZTHZ-kcM8bG9B_kWqt6Pu7kINHYIdkfdzUxHoHmD7edR5372WPaa1i0rb_olSH7qlttFf7fWRYTerRbiTUVsKjMV2iwVgRCrN3Uw6NIQsZhAobtXgAm-gsK4T8ynBkTgn5MOVloNhJ8Zo6L7Tt4RlX5vNLNCf324jJBAk48BlpxLB1dNTkcX5wjXQVa8"
            alt="Model scanner viewfinder"
            className="w-full h-full object-cover"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

          {/* Flashlight & Camera Tools */}
          <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between z-20">
            <button
              onClick={() => {
                setFlashOn(!flashOn);
                showToast(flashOn ? 'Flashlight off' : 'Flashlight on', 'flash_on');
              }}
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-95 shadow-sm ${
                flashOn ? 'bg-[#a13e28] text-white' : 'bg-[#faf9f6]/80 text-[#1a1c1a]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {flashOn ? 'flash_on' : 'flash_off'}
              </span>
            </button>

            <div className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#fd8367] animate-ping"></span>
              <span className="font-body text-[11px] text-white tracking-wider uppercase font-semibold">
                Live Multimodal Match
              </span>
            </div>

            <button
              onClick={() => showToast('Switched to Front Camera Feed', 'flip_camera_ios')}
              className="w-10 h-10 rounded-full bg-[#faf9f6]/80 backdrop-blur-md text-[#1a1c1a] flex items-center justify-center active:scale-95 transition-transform shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
            </button>
          </div>

          {/* Animated Scanning Beam Line */}
          <div
            className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#fd8367] to-transparent z-10 animate-pulse pointer-events-none"
            style={{ top: '44%' }}
          ></div>

          {/* Bounding Box 1: Blazer */}
          <div
            onClick={() => {
              setActiveDetection('blazer');
              showToast('Blazer region isolated • 99% match verified', 'search');
            }}
            className={`absolute left-[14%] top-[18%] w-[72%] h-[42%] rounded-xl border-2 transition-all duration-300 flex flex-col justify-start p-2.5 pointer-events-auto cursor-pointer ${
              activeDetection === 'blazer'
                ? 'border-[#fd8367] bg-[#fd8367]/15 scale-[1.02] shadow-lg'
                : 'border-white/50 bg-white/5 opacity-75'
            }`}
          >
            <div className="self-start flex items-center gap-1.5 bg-black/85 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#fd8367] text-[14px]">lens</span>
              <span className="font-body text-[11px] font-medium">Double-Breasted Wool Blazer</span>
              <span className="font-body text-[10px] text-[#ffdad2] ml-0.5 font-bold">99%</span>
            </div>
            <div className="mt-auto self-end w-5 h-5 rounded-full bg-[#a13e28] flex items-center justify-center text-white text-[10px] shadow-sm">
              <span className="material-symbols-outlined text-[13px]">search</span>
            </div>
          </div>

          {/* Bounding Box 2: Trousers */}
          <div
            onClick={() => {
              setActiveDetection('trousers');
              showToast('Trousers region isolated • 96% match found', 'search');
            }}
            className={`absolute left-[20%] top-[62%] w-[60%] h-[32%] rounded-xl border-2 transition-all duration-300 flex flex-col justify-start p-2.5 pointer-events-auto cursor-pointer ${
              activeDetection === 'trousers'
                ? 'border-[#fd8367] bg-[#fd8367]/15 scale-[1.02] shadow-lg'
                : 'border-white/50 bg-white/5 opacity-75'
            }`}
          >
            <div className="self-start flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-black px-2.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#77767b] text-[14px]">lens</span>
              <span className="font-body text-[11px] font-medium">Pleated Wide-Leg Trousers</span>
              <span className="font-body text-[10px] text-[#47464b] ml-0.5 font-bold">96%</span>
            </div>
          </div>

          {/* Bottom Hint Bar inside Viewfinder */}
          <div className="absolute bottom-2.5 inset-x-2.5 p-3 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-between shadow-md border border-[#efeeeb]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#e9e8e5] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#1a1c1a] text-[18px]">add_photo_alternate</span>
              </div>
              <p className="font-body text-[12px] text-[#47464b] truncate">
                Snap or upload anything — outfits, Pinterest pins, or sketches
              </p>
            </div>
            <button
              onClick={() => showToast('Simulating photo upload scan...', 'photo_camera')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-black text-white font-body text-[11px] font-semibold active:scale-95 transition-transform"
            >
              Upload
            </button>
          </div>
        </div>
      </section>

      {/* AI Semantic Breakdown Card */}
      <section className="mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ffdad2] flex items-center justify-center text-[#822714]">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
              </div>
              <h3 className="font-headline font-semibold text-[17px] text-[#1a1c1a]">
                AI Semantic Breakdown
              </h3>
            </div>
            <span className="font-body text-[11px] px-2.5 py-0.5 rounded-full bg-[#e9e8e5] text-[#47464b] font-medium">
              Live Vision v4.2
            </span>
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-[#f4f3f1] rounded-xl p-3 flex flex-col justify-center">
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b] font-semibold">
                Aesthetic Mood
              </span>
              <span className="font-headline font-semibold text-[16px] text-black mt-0.5">
                Quiet Luxury
              </span>
              <span className="font-body text-[11px] text-[#47464b]">
                Structured Minimalist
              </span>
            </div>
            <div className="bg-[#f4f3f1] rounded-xl p-3 flex flex-col justify-center">
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b] font-semibold">
                Fabric Composition
              </span>
              <span className="font-headline font-semibold text-[16px] text-black mt-0.5">
                Virgin Wool Blend
              </span>
              <span className="font-body text-[11px] text-[#47464b]">
                120s Twill Weave
              </span>
            </div>
          </div>

          {/* Color Palette Chips */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] text-[#77767b] uppercase tracking-wider font-semibold">
                Identified Palette Hex Tones
              </span>
              <span className="font-body text-[11px] text-[#a13e28] font-semibold">
                3 Hues Mapped
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-2 bg-[#efeeeb] px-3 py-1.5 rounded-full shrink-0">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: '#2b2c30' }}></div>
                <div className="flex flex-col">
                  <span className="font-body text-[11px] text-[#1a1c1a] leading-tight font-semibold">Charcoal Dusk</span>
                  <span className="font-mono text-[9px] text-[#77767b]">#2B2C30</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#efeeeb] px-3 py-1.5 rounded-full shrink-0">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: '#721c09' }}></div>
                <div className="flex flex-col">
                  <span className="font-body text-[11px] text-[#1a1c1a] leading-tight font-semibold">Rust Terracotta</span>
                  <span className="font-mono text-[9px] text-[#77767b]">#721C09</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#efeeeb] px-3 py-1.5 rounded-full shrink-0">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: '#dbdad7' }}></div>
                <div className="flex flex-col">
                  <span className="font-body text-[11px] text-[#1a1c1a] leading-tight font-semibold">Warm Mineral</span>
                  <span className="font-mono text-[9px] text-[#77767b]">#DBDAD7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Multimodal Matches Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline font-semibold text-[19px] text-[#1a1c1a] tracking-tight">
              AI Multimodal Matches
            </h3>
            <p className="font-body text-[12px] text-[#47464b]">
              Ranked by silhouette, weave texture, and drape profile
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-body text-[11px] font-semibold">
            {filteredMatches.length} Found
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3">
          <button
            onClick={() => setActiveFilterTab('all')}
            className={`px-4 py-1.5 rounded-full font-body text-[12px] transition-all active:scale-95 shrink-0 ${
              activeFilterTab === 'all'
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-[#f4f3f1] text-[#47464b] hover:bg-[#e9e8e5]'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveFilterTab('exact')}
            className={`px-4 py-1.5 rounded-full font-body text-[12px] transition-all active:scale-95 shrink-0 flex items-center gap-1.5 ${
              activeFilterTab === 'exact'
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-[#f4f3f1] text-[#47464b] hover:bg-[#e9e8e5]'
            }`}
          >
            <span>Exact Match</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a13e28]"></span>
          </button>
          <button
            onClick={() => setActiveFilterTab('budget')}
            className={`px-4 py-1.5 rounded-full font-body text-[12px] transition-all active:scale-95 shrink-0 ${
              activeFilterTab === 'budget'
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-[#f4f3f1] text-[#47464b] hover:bg-[#e9e8e5]'
            }`}
          >
            Smart Alternatives (<span className="font-semibold text-[#a13e28]">-$340</span>)
          </button>
        </div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-3">
          {filteredMatches.map((item) => {
            const wishlisted = isWishlisted(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 shadow-xs border border-[#efeeeb] flex flex-col gap-2"
              >
                <div className="flex gap-3">
                  {/* Thumbnail Preview with Try-On Trigger */}
                  <div className="relative w-28 aspect-[3/4] rounded-xl overflow-hidden shrink-0 bg-[#f4f3f1]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-[#a13e28] text-white font-body text-[9px] font-semibold">
                      {item.matchScore}
                    </div>

                    <button
                      onClick={() => toggleWishlist(item.id, item.name)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-black active:scale-90 transition-transform"
                    >
                      <span className={`material-symbols-outlined text-[15px] ${wishlisted ? 'fill-1 text-[#a13e28]' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Meta Details */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                    <div>
                      <div className="flex items-center gap-1 text-[#a13e28] font-body text-[11px] font-medium mb-0.5">
                        <span className="material-symbols-outlined text-[14px]">{item.badgeIcon}</span>
                        <span className="truncate">{item.badgeTitle}</span>
                      </div>
                      <h4 className="font-headline font-semibold text-[15px] text-[#1a1c1a] truncate">
                        {item.brand}
                      </h4>
                      <p className="font-body text-[12px] text-[#47464b] line-clamp-1 mt-0.5">
                        {item.name}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-headline font-bold text-[18px] text-black">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="font-body text-[12px] line-through text-[#77767b]">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="font-body text-[10px] px-2 py-0.5 rounded bg-[#f4f3f1] text-[#47464b] font-medium">
                          {item.sizeStock}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleOpenTryOn(item)}
                        className="flex-1 py-1.5 px-3 rounded-full bg-[#f4f3f1] text-[#1a1c1a] font-body text-[11px] font-medium flex items-center justify-center gap-1 hover:bg-[#e9e8e5] active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
                        <span>AR Try-On</span>
                      </button>

                      <button
                        onClick={() => {
                          addToCart({
                            productId: item.id,
                            name: `${item.brand} ${item.name}`,
                            brand: item.brand,
                            price: item.price,
                            selectedSize: 'M',
                            selectedColor: 'Charcoal',
                            quantity: 1,
                            image: item.image
                          });
                        }}
                        className="flex-1 py-1.5 px-3 rounded-full bg-black text-white font-body text-[11px] font-semibold active:scale-95 transition-transform flex items-center justify-center gap-1 hover:opacity-90"
                      >
                        <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ask Stylist How To Pair This Module */}
      <section className="mb-4">
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#efeeeb]">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdad2]/70 flex items-center justify-center text-[#a13e28] shrink-0">
              <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-headline font-semibold text-[17px] text-[#1a1c1a]">
                Ask Stylist How To Pair This
              </h4>
              <p className="font-body text-[12px] text-[#47464b] mt-0.5">
                Ask questions about shoe pairings, jewelry metals, or evening transitions.
              </p>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
            <button
              onClick={() => {
                setStylistPrompt('What footwear elevates this wool blazer for dinner?');
              }}
              className="px-3 py-1.5 rounded-full bg-[#f4f3f1] font-body text-[11px] text-[#1a1c1a] hover:bg-[#e9e8e5] active:scale-95 transition-transform shrink-0"
            >
              👠 Footwear for dinner?
            </button>
            <button
              onClick={() => {
                setStylistPrompt('Silver or gold accents with charcoal suiting?');
              }}
              className="px-3 py-1.5 rounded-full bg-[#f4f3f1] font-body text-[11px] text-[#1a1c1a] hover:bg-[#e9e8e5] active:scale-95 transition-transform shrink-0"
            >
              ✨ Silver or gold metals?
            </button>
            <button
              onClick={() => {
                setStylistPrompt('Suggest an inner silk slip camisole for layering');
              }}
              className="px-3 py-1.5 rounded-full bg-[#f4f3f1] font-body text-[11px] text-[#1a1c1a] hover:bg-[#e9e8e5] active:scale-95 transition-transform shrink-0"
            >
              🧵 Layering layer options
            </button>
          </div>

          {/* Form Input */}
          <form onSubmit={handleStylistSubmit} className="relative flex items-center">
            <input
              type="text"
              value={stylistPrompt}
              onChange={(e) => setStylistPrompt(e.target.value)}
              placeholder="e.g. How to dress this down for Sunday coffee..."
              className="w-full h-12 pl-4 pr-24 rounded-full bg-[#f4f3f1] text-[#1a1c1a] placeholder:text-[#77767b] font-body text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all border border-[#efeeeb]"
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setStylistPrompt('How do I style this for a gallery opening?');
                  showToast('Voice transcription loaded', 'mic');
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#47464b] hover:text-black active:scale-90 transition-transform"
                title="Dictate prompt"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                title="Send query"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
            </div>
          </form>

          {/* Dynamic Stylist Response */}
          {isTyping && (
            <div className="mt-3 p-3 rounded-xl bg-[#f4f3f1] flex items-center gap-2 text-[#47464b] font-body text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#a13e28] animate-spin">progress_activity</span>
              <span>Stylist is analyzing weave drape &amp; silhouette balance...</span>
            </div>
          )}

          {stylistResponse && !isTyping && (
            <div className="mt-3 p-3.5 rounded-xl bg-[#ffdad2]/30 border border-[#ffdad2] flex flex-col gap-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#a13e28] text-[16px]">auto_awesome</span>
                  <span className="font-body text-[11px] font-semibold text-[#a13e28]">
                    Élan AI Stylist Recommendation
                  </span>
                </div>
                <span className="font-body text-[10px] text-[#77767b]">Just now</span>
              </div>
              <p className="font-body text-[12px] text-[#1a1c1a] leading-relaxed">
                {stylistResponse}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AR Try-On Modal Drawer */}
      {isTryOnModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 transition-opacity">
          <div className="w-full bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 max-w-md max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="w-12 h-1 bg-[#c8c5cb] rounded-full mx-auto"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a13e28] text-[20px]">view_in_ar</span>
                <h4 className="font-headline font-semibold text-[17px] text-black">
                  Neural AR Try-On Preview
                </h4>
              </div>
              <button
                onClick={() => setIsTryOnModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f4f3f1] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e9e8e5]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* 3D AR Avatar Preview */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e9e8e5] flex items-center justify-center shadow-inner">
              <img
                src={tryOnItem.image}
                alt="AR Try-On Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-body text-[10px] flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#fd8367] animate-pulse"></span>
                <span>Draped to User Mesh Profile (Size 38 / 5'8")</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <h5 className="font-headline font-semibold text-[16px] text-[#1a1c1a]">
                {tryOnItem.title}
              </h5>
              <p className="font-body text-[12px] text-[#47464b]">
                Optimal drape fit score: <strong className="text-black font-semibold">98% True to Silhouette</strong>
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setIsTryOnModalOpen(false)}
                className="flex-1 py-3 rounded-full bg-[#f4f3f1] text-[#1a1c1a] font-body text-[12px] font-semibold hover:bg-[#e9e8e5]"
              >
                Keep Browsing
              </button>
              <button
                onClick={() => {
                  addToCart({
                    productId: 'tryon-' + Date.now(),
                    name: tryOnItem.title,
                    brand: 'ATELIER',
                    price: tryOnItem.price,
                    selectedSize: 'M',
                    selectedColor: 'Standard',
                    quantity: 1,
                    image: tryOnItem.image,
                    badge: 'AR Fit Verified'
                  });
                  setIsTryOnModalOpen(false);
                }}
                className="flex-1 py-3 rounded-full bg-black text-white font-body text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Confirm &amp; Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
