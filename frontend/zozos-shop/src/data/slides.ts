import zozoShop from '../assets/slides/ZozoShop.jpeg'
import zozoShop1 from '../assets/slides/ZozoShop1.jpeg'
import zozoShop2 from '../assets/slides/ZozoShop2.jpeg'

export interface Slide {
  image: string
  title: string
  subtitle: string
}

export const slides: Slide[] = [
  {
    image: zozoShop,
    title: "Welcome to Zozo's Kitchen",
    subtitle: "Homemade meals made with love",
  },
  {
    image: zozoShop1,
    title: "Fresh Ingredients Daily",
    subtitle: "Quality you can taste",
  },
  {
    image: zozoShop2,
    title: "Family Recipes",
    subtitle: "Generations of flavour",
  },
]
