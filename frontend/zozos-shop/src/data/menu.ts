import zozoShop3 from '../assets/menus/ZozoShop3.jpeg'
import zozoShop4 from '../assets/menus/ZozoShop4.jpeg'
import zozoShop5 from '../assets/menus/ZozoShop5.jpeg'
import zozoShop7 from '../assets/menus/ZozoShop7.jpeg'

export interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

export const todayMenu: MenuItem[] = [
  {
    name: "Grilled Chicken & Rice",
    description: "Tender grilled chicken with seasoned rice and fresh vegetables",
    price: "R85",
    image: zozoShop3,
  },
  {
    name: "Beef Stew & Pap",
    description: "Slow-cooked beef stew served with creamy pap and gravy",
    price: "R90",
    image: zozoShop4,
  },
  {
    name: "Veggie Stir Fry",
    description: "Fresh seasonal vegetables wok-fried with noodles",
    price: "R65",
    image: zozoShop5,
  },
  {
    name: "Fried Fish & Chips",
    description: "Crispy fried fish fillet with golden chips and tartar sauce",
    price: "R80",
    image: zozoShop7,
  },
]

export const allMenu: MenuItem[] = [
  ...todayMenu,
  {
    name: "Bunny Chow",
    description: "Classic Durban-style bunny with your choice of filling",
    price: "R75",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
  },
  {
    name: "Chicken Pie",
    description: "Homemade chicken pie with flaky pastry",
    price: "R55",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
  },
]
