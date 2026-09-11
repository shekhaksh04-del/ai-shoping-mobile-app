import { Product, LookbookHotspot } from '../types';

export const HERO_BANNER_DATA = {
  code: 'FALL20',
  discount: '20% OFF CODE: FALL20',
  season: 'AUTUMN MINIMAL 24',
  headline: 'Structured silhouettes for effortless transitions',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABxb8d0C-g8mDnMP9CD1JdsGiaaBB253HuYCFP1hvAbpnhJdKK2j2ZOnzJUeSh_RJUQDuoZN093_Yczor9IMddyxPn3p72hVGrttKWJ4GaVApW1wBLJZs-M2N3TNsXg0ew-mBnem-JBCV2swrA65knNDkBm7oDQzdqDcAkCMlUn6k6ZzwF8nV29sPltTMnIb8QtYiCvcoyggTELQktdFHvjUa_VNHTclUMlCGST_JL7ggTTHNAAI3X',
};

export const KYOTO_LOOKBOOK_DATA = {
  title: 'Your Kyoto Evening Edit',
  subtitle: 'Engineered for cold mountain breezes with lightweight tonal draping.',
  matchScore: '98% Taste Match',
  weather: '14°C Crisp Dusk',
  bundlePrice: 1040,
  savings: 95,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMkbYRIHRyZBpcl3kHWC68WdXum83R0przX3v6otvqUiK5PuW-IYY90FXSOesFObu6htRBz2Om9QlXHnpVph9nsKx5r3YVa5aheD28jl4agx5RCp1wh18VVGn63KYaoEPU6SEiXUCgCqC3Ie9zgqN4nP42WAn7_6XyirYnERcMFtw7zI99MTs7v0GORu5DOIm1fEgX1VitFqmXj1Y2k2koynx8oiDONiNFqSU6hAg_vNzcSHcnGFme',
  hotspots: [
    {
      id: 'hotspot-coat',
      label: 'Outerwear',
      role: 'Outerwear',
      price: 490,
      name: 'Felted Cocoon Coat',
      desc: 'Thermoregulating raw wool',
      x: '46%',
      y: '28%',
      align: 'left',
      productId: 'cocoon-overcoat'
    },
    {
      id: 'hotspot-knit',
      label: 'Underlayer',
      role: 'Underlayer',
      price: 210,
      name: 'Morus Silk Turtleneck',
      desc: 'Matches saved neutral tone',
      x: '68%',
      y: '48%',
      align: 'right',
      productId: 'silk-knit'
    },
    {
      id: 'hotspot-shoes',
      label: 'Footwear',
      role: 'Footwear',
      price: 340,
      name: 'Oblique Block Heeled Mule',
      desc: 'Ergonomic walking sole',
      x: '34%',
      y: '86%',
      align: 'left',
      productId: 'curved-mule'
    }
  ] as LookbookHotspot[]
};

export const FLASH_DROPS: Product[] = [
  {
    id: 'arch-blazer',
    name: 'Architectural Wool Blazer',
    brand: 'STUDIO ATELIER',
    price: 185,
    originalPrice: 230,
    tag: 'Selling Fast',
    rating: 4.9,
    reviewCount: 72,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5riCy6AAG40TteRA_CAFnfIhKsY0gySvoDOKkPWNZ1o7fzkNVfC75vVYENTpn4JcDvP-A_5mFn6KCcudoYyi0ROuGTQOcvoW3ZIrvEDpGj--qm9_MlBSzkkWIsPIpVIKjX0Whn0rHqVP8luLJKlNzq1FdshXHLG_2cs_8BN-UeIUjqZFzyYY6o2hGq2_bKy-eiOHBNIxSseGiwhYNAPHBGxHVdcJlNTY01KWtLDPsl_26KMIkZbfS',
    description: 'Tailored architectural blazer in warm clay terracotta wool, styled cleanly with structural lapels and horn buttons.',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'outerwear',
    shades: [
      { name: 'Terracotta', hex: '#A13E28' },
      { name: 'Charcoal', hex: '#363636' },
      { name: 'Oatmeal', hex: '#E3DAC9' }
    ]
  },
  {
    id: 'saddle-bag',
    name: 'Curved Saddle Bag',
    brand: 'ATELIER CUIR',
    price: 240,
    originalPrice: 310,
    tag: 'Editorial Pick',
    rating: 4.9,
    reviewCount: 43,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuadeULZXmyu5j2Yyo3xhAlM5BYkTwESDLd6fSfwrsD9YG0m-aPov4ZYr0hIi2whKhEO3AEtT9ERh9U0BE-Lsh16KYO9zNMeo1lzI9VoSH2BsD96zfB5iD59q301etClbazxSYkFlSToROzwUgHJRdQfLw0hW0TwrLtnwGUIKC8Wr0C_9U4fJ8fgiEmU9D3KODuKq8beSDu0Ynb14yn33rAo5QdgcAl5KKjt2Kgk05SWLTcttkVB7U',
    description: 'Structured calfskin leather crossbody saddle bag in dark obsidian black with matte brass hardware.',
    sizes: ['One Size'],
    category: 'accessories'
  },
  {
    id: 'glove-boot',
    name: 'Suede Glove Ankle Boot',
    brand: 'ATELIER STEP',
    price: 295,
    originalPrice: 380,
    tag: 'Selling Fast',
    rating: 4.8,
    reviewCount: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ88dwkW3ymH51RVbXifwjDLoCx7QJp8xMsjVdIcQyFj0PG8tj-quqz8aokOh59xKvmCI1Hht5u6XAyv5k9ZZSIsj9CcUT9cOe_MbWb0pIk_ue_stONpwvN9Vp5BMjULw_Ap28t6CeLOiIdFOwA_nPGACUUj5p8MTYv_LA5FSu5ppiFf8x-dRbDvatDR9QBtG_tMRzKUYWEgh0gbegA_e8-FNI2wH0honIgxRSOfZMb-oDXebe-Jlf',
    description: 'Modern pointed-toe ankle boots crafted from buttery soft warm sand-colored suede.',
    sizes: ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU'],
    category: 'footwear'
  }
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: 'wool-trench',
    name: 'Oversized Wool Trench',
    brand: 'ATELIER STUDIO',
    price: 320,
    originalPrice: 380,
    discountBadge: 'Save 15%',
    tag: 'Bestseller',
    rating: 4.9,
    reviewCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNp2yIdr2wHwJ376VPoJHe710bstNjNsJsY0N3Aw3XQcpNE1hNVSifvroU4uXOEDGs25k71xxWb83178NeMOp49CCYI058DFP2tUAljrIcY3cHkDzZpwlIZWcYxmvyq0szoU-BgWiI5oB-wyjHSvqNnV2wDISFiAkjg4Qnn-VkWQZ4tU4G9Qhvudwbxrll3lOR_-IZjHjQUBPJshZyHq53L3AqC0QhseJ1ar1_dg8sjFSa1A9WcQl7',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNp2yIdr2wHwJ376VPoJHe710bstNjNsJsY0N3Aw3XQcpNE1hNVSifvroU4uXOEDGs25k71xxWb83178NeMOp49CCYI058DFP2tUAljrIcY3cHkDzZpwlIZWcYxmvyq0szoU-BgWiI5oB-wyjHSvqNnV2wDISFiAkjg4Qnn-VkWQZ4tU4G9Qhvudwbxrll3lOR_-IZjHjQUBPJshZyHq53L3AqC0QhseJ1ar1_dg8sjFSa1A9WcQl7',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr_7JKKqTlf2oORlFX2DckK6xtzphVd8bKfxhOwxN8ETP3ymEDEiLsH92lSnkkYp4vnHOpi_XexrlgJLA0hvdIXNoVP5-YXJYvGML4GgAJIUMj-vKgzljXlInSIszvyhR0N9QY95J2oAdYlfxgQ4NnHV_66a3CGM8UTc_MY1_MP6KyTxuU9KhNK0gUQqwTjx7FQ9MHP2YiC7on4TjIKXrTSsvkR59eih9qGtUqRVkVFTZqU_2nvZw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTPipWVneGtJTWxXE2QYXgk8CyDe4M9jqCT6sH3LqPCTYlXVx7DaOsJHA7Dv7WYLH5SDmWMfDeVDNNOR6h6BYZQb-8DexDFKg6aOQG_V3CTmWoGcLXP4Y8O_SBtW4NgtVgbQYcfs35bWGKE95DoSlEs5zKX398x4nLgNfYBumlUbNKV7riXEDEAOzyfhxv98X7HUUD8p-ttvFUEdNZ2QChcEstNEgY3E7MbknfxzSLZoNYo5QwVHOR',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoez35sv7C4bVnAX6qMRHyycwJWamHr5bLoNXrd0HSGuo0DR1ciUxHXjyL3dpInFtCxZsm-Y4h2MMCJa9uR-7vIBUYl2ydbCw_vClvx--1G399HA6lZukSXgD8Je-82E7CrKDCuQ_uBl214MZDciWIAx3IiNthgXiS4gvg0wL8omthYr2FStuZA8zGSy5yYhTBcDXjFQO9-FDT4t5Aifhsc4rH5BB_w53dIxW8PKVS8FEsn6BybU9V'
    ],
    description: 'Designed with an intentionally generous, unstructured silhouette. Features dropped shoulders, deep welt pockets, and storm flap detailing.',
    fabricDetails: 'Crafted from 100% Recycled Italian Melton Wool (750 GSM) spun in Prato, Italy. Lined with silky 100% organic cupro for easy layering.',
    fitDetails: 'Designed for an oversized drape. Model is 5\'10" (178cm) wearing size M. Total length 47.5".',
    traceability: 'Spun from certified traceable Tuscan mills and assembled by master cutters in Florence with zero plastic content.',
    shades: [
      { name: 'Sandstone Beige', hex: '#E5DECF' },
      { name: 'Dark Olive', hex: '#464A3E' },
      { name: 'Jet Black', hex: '#1A1A1A' },
      { name: 'Espresso Brown', hex: '#3B2F2F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'outerwear'
  },
  {
    id: 'linen-trousers',
    name: 'Pleated Linen Trousers',
    brand: 'ATELIER SŌ',
    price: 145,
    rating: 4.8,
    reviewCount: 52,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9OkyFXm6DLn5pxjUbAEdeMRoWivhl78hNxSHTYlKbiMDLWho4nyC7uTh75FpRr5gdS_W6yrU7z7Ko4QEWCxVhoiZZF55SaB4WBdlCAgkeEklYuRDXvyqIyUfxNgAyAC6znCWC3CrfMOykbrLktOF0BV5XCkvJNkoJbkgkWMnPfRJtG-CuTYmRoch0AHygu_HJrdLx7G6o8pElBlK0jeyndJtR7wj94eckqngMg8kUijImnfmMTmuK',
    description: 'High-waisted pleated tailored trousers in pure crisp European flax with wide-leg drape.',
    shades: [
      { name: 'Charcoal', hex: '#363636' },
      { name: 'Oatmeal', hex: '#E3DAC9' },
      { name: 'Chalk', hex: '#EAE8E3' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'pants'
  },
  {
    id: 'leather-tote',
    name: 'Structured Leather Tote',
    brand: 'ATELIER CUIR',
    price: 290,
    rating: 4.9,
    reviewCount: 118,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mdWsehXeCO4S1z0e7h5RockFUVnDIbSDCWpqNybX7n5Z3sOakbgIPY2y8fr7GPQdZAnqDAsbtDD4elmflHLteGyJwDuIL5WkkEiNP4jQ8F0qIX0Bg8wRmQIWNMRjIQF7z2Z3AMya2PNxUSWKQY1HmnCM-2YwJ3lR-r_HUG9DxCB5fBLFGj_PnBYiPYCqE6Ymi4Tw5Wel1maRCVYT2yHu2qDDQXnNpyzTvJZuTJnvf58KOVpZ4IAk',
    description: 'Sculpted carryall tote bag in rich terracotta sienna calfskin with hand-painted raw edge finishing.',
    shades: [
      { name: 'Terracotta', hex: '#A13E28' },
      { name: 'Noir', hex: '#1A1C1A' },
      { name: 'Sand', hex: '#C2B29D' }
    ],
    sizes: ['One Size'],
    category: 'accessories'
  },
  {
    id: 'cashmere-knit',
    name: 'Chunky Cashmere Knit',
    brand: 'ATELIER TRICOT',
    price: 210,
    rating: 4.9,
    reviewCount: 96,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCroBOWmeoYohB_zcP9XVuSv4e5HMmAxomxRxEoQSVMrpwpSegOBf3B2SJXBS9GYs_EI65NauNRNKX1zIdlzLjUx_QbjJLlJTN7ETmZ0odZELdgQez7-XnNxVWh5k9vaBnfDOMenZukOEh6E5YUdCEWBRJbYpLcoRUF9eckODBTlBqFPXT0ZPQoIa_yiXLRpRPKqc-_anYrJmtcX5ZvI9JSSGJO2ODhI0NUvOMyhOqelx8RTBN6raPV',
    description: 'Chunky ribbed knit crewneck sweater spun from ethically combed Mongolian cashmere in warm ivory cream.',
    shades: [
      { name: 'Ivory', hex: '#EAE8E3' },
      { name: 'Charcoal', hex: '#363636' },
      { name: 'Terracotta', hex: '#A13E28' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'knitwear'
  }
];

export const AI_CURATED_TRENDING: Product[] = [
  {
    id: 'silk-blouse',
    name: 'Raw Morus Silk Blouse',
    brand: 'ATELIER SŌ',
    price: 185,
    tag: 'NEW',
    aiVerdict: 'Fits your relaxed drape profile',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmzUAWfj0MV6xMj6b-O_ot1OvWEp2ly1q02Skv9osXgAH0vTuz51vFhyANL900rLSIF-VCV7Hw3LxUG6Q57deDgiJpZjJuUb3r7ZPEIr-QWfqZWF1XgvVCutNfI-du13P-4F47dPf3vnN0SME627cTkMtJq9diXzYz88nV_HDhXYYolsoOJ7Ib757M5V26pYRPFkiqZBGTmGoG4Bc6NWA_UOzSm1v9Aj-oe3h4OI5aP8PBKyUWLDRK',
    description: 'Relaxed tailored silk button-down shirt with natural mother-of-pearl buttons.',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'outerwear'
  },
  {
    id: 'tailored-pleat',
    name: 'Tailored Pleated Trouser',
    brand: 'L\'ORANGERIE',
    price: 260,
    tag: '96% MATCH',
    aiVerdict: 'Pairs with 4 items in your bag',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2oBjaNmsEylyTIptIsfFOhJYejIseyhBysQgZZI70aZvdY2k5tJ8UMU-WRmn7O8QUNeTCu1WMK6ckRunj6y5wvpJ2SYj_6bDtaV1gDCxA3DkRxubfx0Dh1BLRSjWp2T4Jl1CIeb8Jmg2rIVBVvbeboIROMI9dysIM74Me7zN9yI3lcqHX0WW6mOQJvQxUqtPetLEFsdMfYM0JAEH_q6qRME2bzVrvM4Iqu3jOM7WHr-XytQKqUQko',
    description: 'Fluid high-waisted pleated trousers in charcoal melange wool suiting cloth.',
    sizes: ['34 EU', '36 EU', '38 EU', '40 EU'],
    category: 'pants'
  },
  {
    id: 'origami-tote',
    name: 'Origami Folded Tote',
    brand: 'KURO CRAFT',
    price: 320,
    tag: 'CAPSULE KEY',
    aiVerdict: 'Accents your warm palette',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmPONcNPH1XGu9TEWf234sipxVh3LRZcyjKOrsOVm2YTmfAAd45oev5O0suO0o-9orIkdeAv4LqcXzCWJViikEFRSWhcwKF5iic3K1bWSNGUmB-0zyZdF8oq80-_1a9-nCwbbIFqUYL1idib0VNb_cbs_x6sWDJ9rBA_kdv34chxCo1O2_OSsnFXp4y_73du1SeTWUDChMwo3CWDVwlfgRnnbhsajbs8Dk_3kUsiflt_XK0eBiwXPb',
    description: 'Supple terracotta calfskin tote bag with architectural folded silhouette.',
    sizes: ['One Size'],
    category: 'accessories'
  },
  {
    id: 'court-sneaker',
    name: 'Court Low Sneaker',
    brand: 'FORM STUDIO',
    price: 195,
    tag: '94% FIT',
    aiVerdict: 'True to your size 39 EU',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEUxEM6AJiUjGtv8jbT8NWaEerJM9R9hjVFN1Itl31d-QljM1LB3iYQN-WQvZOJPbjiqsK2PPUB6SsFrZe3uvIm_A6s2Bm7fTjY8_9B1mdTKmFB--DQgpQ0o1K2pVTtCTsf9SaulumviaY1zLIFuURpyI7Pmte1KWsfnZEIoiMT6ZTUsojBNn4ThhgnsCGXIF9Rra65bDPAQKOVQr1N_22Ybsn1P_BaVjMkMJ-HT_N6zql8PNWfYr_',
    description: 'Sleek chalk white leather low-profile sneakers with natural gum sole.',
    sizes: ['37 EU', '38 EU', '39 EU', '40 EU', '41 EU'],
    category: 'footwear'
  }
];

export const AI_COUTURE_PRODUCT: Product = {
  id: 'sculpted-cocoon-coat',
  name: 'The Sculpted Cashmere Cocoon Overcoat',
  brand: 'ATELIER COUTURE',
  price: 1480,
  tag: 'Limited Edition 04/50',
  rating: 4.9,
  reviewCount: 450,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4bXfJ6do1ZfuXL0EWfQWj__TWhleCRc8s9V7EpLt0Ez-Nc32eR0AEWBxTQMvD1YSmuaZKPNLv5vrmt05wCKoJphfMyYMpej9utjSBNLFiI4kg3b-sZCZqyDPRdx0eDoKqbVr-6W8J4EZIex7b4RzZkO7idXVilOWlhT4XOB9yl-fOCUsmuBD4M5PKyyZeAZ1sq44UYXfOYuetqvMmxSWFyy3xu8aFMdqQRdQ7vlNzXh64oaVAZNYv',
  additionalImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4bXfJ6do1ZfuXL0EWfQWj__TWhleCRc8s9V7EpLt0Ez-Nc32eR0AEWBxTQMvD1YSmuaZKPNLv5vrmt05wCKoJphfMyYMpej9utjSBNLFiI4kg3b-sZCZqyDPRdx0eDoKqbVr-6W8J4EZIex7b4RzZkO7idXVilOWlhT4XOB9yl-fOCUsmuBD4M5PKyyZeAZ1sq44UYXfOYuetqvMmxSWFyy3xu8aFMdqQRdQ7vlNzXh64oaVAZNYv',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCVDXoYZJ60aMt590Avr92coQ80Oza5l2fwEmUK7Ht52MVhbp5W_XEOIeBL-pihIwnDx5A7J5KmleM0em1M48lkCU64P1y5e7QaKsbNyOLrdHAIXXgTJmDDcY06OCTdi7BiGXCezv3JNtJdacMfxbG6rwCOH-Dk79CWOH8ACR72jXNsGbPY4Ou30_uPWN1LoISMya8YS-3qp11TIZ3ZI_aOxlKOgegqDA1f_FjixaY2czex0N2NGbfp'
  ],
  description: 'Double-faced Italian cashmere feels whisper-light yet thermal down to -5°C. Features signature relaxed cocoon silhouette with zero shoulder bunching.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'outerwear'
};

export const INITIAL_CART_ITEMS = [
  {
    id: 'cart-1',
    productId: 'wool-trench',
    name: 'Oversized Wool Trench',
    brand: 'ATELIER',
    price: 320.00,
    selectedSize: 'M',
    selectedColor: 'Sandstone',
    quantity: 1,
    tag: 'Pre-fall',
    badge: 'Price-Drop Watchdog: Best 30d Rate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFr-wGClMrpU-iPp2SKLWWwYv9e7T9bJvp2m2m_Y5XVvcfpeF0tNKRw2bFh_ap6U-wyl6m-ZCnmpg-9Tw0vL3hjvDVGrNyAWbVrdXA2RLmuODuVAAoFI77rZ5KyddFUDqYXmhIf9aq5o5D8evuQcKfjXWuGR9fNO3AExb1QqR8d976XPLxOgqVcRYW0JttjbpVniXlF9FX82jaVj1dcvMJ98qnO5aj-NxA2TNQiUZGgXbD2FYmmrG'
  },
  {
    id: 'cart-2',
    productId: 'linen-trousers',
    name: 'Pleated Linen Trousers',
    brand: 'ATELIER',
    price: 145.00,
    selectedSize: 'S',
    selectedColor: 'Oat White',
    quantity: 1,
    badge: 'Price Match Guaranteed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9OkyFXm6DLn5pxjUbAEdeMRoWivhl78hNxSHTYlKbiMDLWho4nyC7uTh75FpRr5gdS_W6yrU7z7Ko4QEWCxVhoiZZF55SaB4WBdlCAgkeEklYuRDXvyqIyUfxNgAyAC6znCWC3CrfMOykbrLktOF0BV5XCkvJNkoJbkgkWMnPfRJtG-CuTYmRoch0AHygu_HJrdLx7G6o8pElBlK0jeyndJtR7wj94eckqngMg8kUijImnfmMTmuK'
  },
  {
    id: 'cart-3',
    productId: 'cardholder',
    name: 'Structured Leather Cardholder',
    brand: 'ATELIER',
    price: 65.00,
    selectedSize: 'One Size',
    selectedColor: 'Warm Cognac',
    quantity: 1,
    badge: 'Saved $40 via Flash Member Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQos7VlzhiBzkDAvmxUBNhw7t8NTNwZWD_MZaCinZ9UpyfkcJAoRPVu7P_3guLFFHBUDmARStgN24e6X0mMBkdXdiqZcM1MeNktMPwE6Q2XLfwJmtAsu8J5yZCAIK6vngsPlPpf5J3VdBDH7dCCRbcuJNUFp-_d8f1wlzsP2Ub7osHACZRziiFJf7ooGO0ES4QpmNW8rpr603Tf6osxqkFGZPD2r6b-oH5Xtd1SW69bxxww-p9q0sD'
  }
];

export const BUNDLE_ITEM = {
  id: 'bundle-scarf',
  name: 'Oatmeal Cashmere Scarf',
  brand: 'ATELIER',
  price: 65.00,
  originalPrice: 110.00,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvw-myUMECKPj_lZuYveYFhidPhlE6Kgc2kzld7Ank2BzXtWFG-0D0heRjSGrN0yufL0_ARYnPmaYwFfZn5nk2gCxVMd--ahYuOjI54dtfEOKSALufjl9i4EVfKWx2Nko7j-sHsrDGwt7H8r74guAQaJVVE_KzRCHtEAfuR96zOQknWvG8MNgLWkR6T-HFhnE0N7IQTK5rp9MW9R5ob3ZlW_iX4I64l_A7LLhFziTOf-8qspKADH88'
};
