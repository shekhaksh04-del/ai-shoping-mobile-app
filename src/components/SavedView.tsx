import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { TRENDING_PRODUCTS, FLASH_DROPS, AI_CURATED_TRENDING, KYOTO_LOOKBOOK_DATA } from '../data/products';

export const SavedView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, openProduct, setScreen } = useCommerce();

  const allProducts = [...TRENDING_PRODUCTS, ...FLASH_DROPS, ...AI_CURATED_TRENDING];
  const savedProducts = allProducts.filter(p => wishlist.includes(p.id));
  const hasSavedCapsule = wishlist.includes('kyoto-capsule');

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-headline font-semibold text-[22px] text-[#1a1c1a]">
            Saved &amp; Wishlist
          </h2>
          <p className="font-body text-[12px] text-[#47464b]">
            {wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} bookmarked for your seasonal wardrobe
          </p>
        </div>
      </div>

      {/* Saved Capsule Card if bookmarked */}
      {hasSavedCapsule && (
        <div className="mb-5 bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] flex gap-3.5">
          <div className="w-24 h-32 rounded-xl overflow-hidden bg-[#f4f3f1] shrink-0">
            <img
              src={KYOTO_LOOKBOOK_DATA.image}
              alt="Kyoto Evening Capsule"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <span className="font-body text-[10px] uppercase tracking-wider text-[#a13e28] font-bold">
                Saved Lookbook Capsule
              </span>
              <h4 className="font-headline font-semibold text-[16px] text-[#1a1c1a] leading-tight mt-0.5">
                {KYOTO_LOOKBOOK_DATA.title}
              </h4>
              <p className="font-body text-[12px] text-[#47464b] mt-0.5 line-clamp-1">
                {KYOTO_LOOKBOOK_DATA.subtitle}
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="font-headline font-bold text-[16px] text-black">
                  ${KYOTO_LOOKBOOK_DATA.bundlePrice}
                </span>
                <span className="font-body text-[11px] text-[#a13e28] font-semibold">
                  Save ${KYOTO_LOOKBOOK_DATA.savings} as set
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => {
                  addToCart({
                    productId: 'kyoto-capsule',
                    name: 'Kyoto Evening Capsule (3 Pieces)',
                    brand: 'ATELIER ÉLAN',
                    price: 1040,
                    selectedSize: 'M',
                    selectedColor: 'Sandstone / Charcoal',
                    quantity: 1,
                    image: KYOTO_LOOKBOOK_DATA.image
                  });
                }}
                className="flex-1 py-1.5 px-3 rounded-full bg-black text-white font-body text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                Add Set to Bag
              </button>
              <button
                onClick={() => toggleWishlist('kyoto-capsule')}
                className="w-8 h-8 rounded-full bg-[#f4f3f1] flex items-center justify-center text-[#77767b] hover:text-[#a13e28]"
                title="Remove"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Saved Pieces */}
      {savedProducts.length === 0 && !hasSavedCapsule ? (
        <div className="py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 border border-[#efeeeb]">
          <span className="material-symbols-outlined text-[44px] text-[#c8c5cb] mb-2">favorite_border</span>
          <h3 className="font-headline font-semibold text-[18px] text-[#1a1c1a]">No saved pieces yet</h3>
          <p className="font-body text-[13px] text-[#77767b] mt-1 max-w-xs">
            Tap the heart icon on any garment in Discover or Visual Match to save it here.
          </p>
          <button
            onClick={() => setScreen('discover')}
            className="mt-4 px-6 py-2.5 rounded-full bg-black text-white font-body text-[13px] font-semibold shadow-xs hover:opacity-90 active:scale-95"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => openProduct(product.id, product.id === 'sculpted-cocoon-coat' ? 'ai' : 'atelier')}
              className="bg-white rounded-2xl p-3 shadow-xs border border-[#efeeeb] flex flex-col justify-between cursor-pointer hover:border-[#c8c5cb] transition-all"
            >
              <div>
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f3f1] mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    aria-label="Remove from Saved"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id, product.name);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#a13e28] shadow-xs active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px] fill-1">favorite</span>
                  </button>
                </div>

                <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b] font-semibold block">
                  {product.brand}
                </span>
                <h4 className="font-headline font-semibold text-[14px] leading-tight text-[#1a1c1a] mt-0.5 line-clamp-1">
                  {product.name}
                </h4>
              </div>

              <div className="pt-2 mt-1 flex items-center justify-between border-t border-[#f4f3f1]">
                <span className="font-headline font-bold text-[16px] text-[#1a1c1a]">
                  ${product.price}
                </span>
                <button
                  aria-label="Add to Bag"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      productId: product.id,
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      selectedSize: product.sizes[0] || 'M',
                      selectedColor: 'Standard',
                      quantity: 1,
                      image: product.image
                    });
                  }}
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
