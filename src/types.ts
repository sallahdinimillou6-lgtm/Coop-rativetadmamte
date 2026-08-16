export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  nameEn?: string;
  category: 'amlou' | 'argan' | 'honey' | 'cosmetics';
  categoryAr: string;
  categoryFr?: string;
  categoryEn?: string;
  price: number;
  description: string;
  descriptionAr?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  longDescription?: string;
  longDescriptionAr?: string;
  longDescriptionFr?: string;
  longDescriptionEn?: string;
  benefits: string[];
  benefitsAr?: string[];
  benefitsFr?: string[];
  benefitsEn?: string[];
  weight: string; // e.g., "500 غرام" or "250 غرام"
  weightAr?: string;
  weightFr?: string;
  weightEn?: string;
  image: string;
  imageMetadata?: {
    size?: number;
    type?: string;
    uploadedAt?: string;
    originalName?: string;
  };
  isBestSeller?: boolean;
  shippingCost?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
}
