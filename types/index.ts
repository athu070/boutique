export interface ProductSpecifications {

    brand: string;
    connectivity?: string;
    batteryLife?: string;
    weight?: string;
  
    display?: string;
    waterResistance?: string;
  
    processor?: string;
    ram?: string;
    storage?: string;
  
    dpi?: string;
    buttons?: string;
  
    resolution?: string;
    fps?: string;
    fieldOfView?: string;
  
    switches?: string;
    layout?: string;
    backlight?: string;
  
    capacity?: string;
    ports?: string;
    fastCharging?: string;
  
    assistant?: string;
    speakers?: string;
  
    hdr?: string;
  }
  
  export type ProductCategory = 
    | 'Electronics'
    | 'Wearables'
    | 'Computers'
    | 'Gaming'
    | 'Computing'
    | 'Accessories'
    | 'Audio'
    | 'Smart Home';
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: ProductCategory;
    rating: number;
    inStock: boolean;
    specifications: ProductSpecifications;
  }
  
  export interface ProductsData {
    products: Product[];
  }
  
  export type RootStackParamList = {
    ProductList: undefined;
    ProductDetails: {
      product: Product;
    };
  };
  
  export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name';
  
  export interface FilterOptions {
    category?: ProductCategory;
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }