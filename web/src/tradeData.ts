// Common tradeable items with estimated values (in generic "credits")
// Users can also enter custom items with custom values.

export interface TradeItem {
  id: string;
  name: string;
  category: string;
  value: number;
  emoji: string;
}

export const PRESET_ITEMS: TradeItem[] = [
  // Electronics
  { id: "iphone15", name: "iPhone 15", category: "Electronics", value: 799, emoji: "📱" },
  { id: "iphone14", name: "iPhone 14", category: "Electronics", value: 599, emoji: "📱" },
  { id: "iphone13", name: "iPhone 13", category: "Electronics", value: 399, emoji: "📱" },
  { id: "samsung_s24", name: "Samsung Galaxy S24", category: "Electronics", value: 749, emoji: "📱" },
  { id: "airpods_pro", name: "AirPods Pro", category: "Electronics", value: 249, emoji: "🎧" },
  { id: "airpods", name: "AirPods (3rd gen)", category: "Electronics", value: 169, emoji: "🎧" },
  { id: "ipad_pro", name: "iPad Pro", category: "Electronics", value: 1099, emoji: "📲" },
  { id: "ipad_air", name: "iPad Air", category: "Electronics", value: 599, emoji: "📲" },
  { id: "macbook_pro", name: "MacBook Pro 14\"", category: "Electronics", value: 1999, emoji: "💻" },
  { id: "macbook_air", name: "MacBook Air M2", category: "Electronics", value: 1099, emoji: "💻" },
  { id: "ps5", name: "PlayStation 5", category: "Gaming", value: 499, emoji: "🎮" },
  { id: "xbox_sx", name: "Xbox Series X", category: "Gaming", value: 499, emoji: "🎮" },
  { id: "nintendo_switch", name: "Nintendo Switch", category: "Gaming", value: 299, emoji: "🎮" },
  { id: "steam_deck", name: "Steam Deck", category: "Gaming", value: 399, emoji: "🎮" },
  { id: "apple_watch_ultra", name: "Apple Watch Ultra", category: "Electronics", value: 799, emoji: "⌚" },
  { id: "apple_watch_s9", name: "Apple Watch Series 9", category: "Electronics", value: 399, emoji: "⌚" },
  { id: "gopro", name: "GoPro Hero 12", category: "Electronics", value: 399, emoji: "📷" },
  { id: "canon_r50", name: "Canon EOS R50", category: "Electronics", value: 679, emoji: "📷" },
  // Shoes
  { id: "jordan1_mid", name: "Air Jordan 1 Mid", category: "Sneakers", value: 115, emoji: "👟" },
  { id: "jordan1_high", name: "Air Jordan 1 High OG", category: "Sneakers", value: 180, emoji: "👟" },
  { id: "yeezy_350", name: "Yeezy Boost 350", category: "Sneakers", value: 230, emoji: "👟" },
  { id: "dunk_low", name: "Nike Dunk Low", category: "Sneakers", value: 110, emoji: "👟" },
  { id: "af1", name: "Nike Air Force 1", category: "Sneakers", value: 90, emoji: "👟" },
  { id: "new_balance_550", name: "New Balance 550", category: "Sneakers", value: 110, emoji: "👟" },
  { id: "ultraboost", name: "Adidas Ultraboost", category: "Sneakers", value: 190, emoji: "👟" },
  // Cards & Collectibles
  { id: "pokemon_charizard", name: "Charizard VMAX", category: "Cards", value: 45, emoji: "🃏" },
  { id: "pokemon_pikachu", name: "Pikachu Promo", category: "Cards", value: 20, emoji: "🃏" },
  { id: "mtg_black_lotus", name: "MTG Black Lotus", category: "Cards", value: 5000, emoji: "🃏" },
  { id: "sports_rookie", name: "Sports Rookie Card", category: "Cards", value: 50, emoji: "🃏" },
  // Clothing
  { id: "supreme_box", name: "Supreme Box Logo Hoodie", category: "Clothing", value: 350, emoji: "👕" },
  { id: "off_white_tee", name: "Off-White T-Shirt", category: "Clothing", value: 200, emoji: "👕" },
  { id: "north_face", name: "North Face Jacket", category: "Clothing", value: 299, emoji: "🧥" },
  { id: "patagonia", name: "Patagonia Fleece", category: "Clothing", value: 149, emoji: "🧥" },
  // Accessories
  { id: "rolex_submariner", name: "Rolex Submariner", category: "Watches", value: 9000, emoji: "⌚" },
  { id: "omega_seamaster", name: "Omega Seamaster", category: "Watches", value: 4500, emoji: "⌚" },
  { id: "louis_vuitton_bag", name: "Louis Vuitton Bag", category: "Bags", value: 1200, emoji: "👜" },
  { id: "gucci_bag", name: "Gucci Bag", category: "Bags", value: 900, emoji: "👜" },
  // Gift Cards / Cash
  { id: "cash_50", name: "$50 Cash", category: "Money", value: 50, emoji: "💵" },
  { id: "cash_100", name: "$100 Cash", category: "Money", value: 100, emoji: "💵" },
  { id: "cash_200", name: "$200 Cash", category: "Money", value: 200, emoji: "💵" },
  { id: "cash_500", name: "$500 Cash", category: "Money", value: 500, emoji: "💵" },
  { id: "gc_amazon_50", name: "Amazon Gift Card $50", category: "Gift Cards", value: 50, emoji: "🎁" },
  { id: "gc_amazon_100", name: "Amazon Gift Card $100", category: "Gift Cards", value: 100, emoji: "🎁" },
  { id: "gc_psn_50", name: "PSN Gift Card $50", category: "Gift Cards", value: 50, emoji: "🎁" },
  { id: "gc_steam_50", name: "Steam Gift Card $50", category: "Gift Cards", value: 50, emoji: "🎁" },
];

export const CATEGORIES = [...new Set(PRESET_ITEMS.map((i) => i.category))];
