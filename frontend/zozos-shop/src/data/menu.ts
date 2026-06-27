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
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600",
  },
  {
    name: "Beef Stew & Pap",
    description: "Slow-cooked beef stew served with creamy pap and gravy",
    price: "R90",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
  },
  {
    name: "Veggie Stir Fry",
    description: "Fresh seasonal vegetables wok-fried with noodles",
    price: "R65",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
  },
  {
    name: "Fried Fish & Chips",
    description: "Crispy fried fish fillet with golden chips and tartar sauce",
    price: "R80",
    image: "https://images.unsplash.com/photo-1579208030886-b2da2d67d7bc?w=600",
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
