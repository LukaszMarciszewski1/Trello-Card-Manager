export interface Material {
  type: string; 
  name: string; 
  value: string; 
  color: string; 
  priceType: string; 
  priceModifier: string | undefined; 
  application: string; 
  src?: string | undefined;
}