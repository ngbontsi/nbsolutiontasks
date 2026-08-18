import type { Property } from '../types';

export const RASMENI_CONTACT = {
  name: 'Rasmeni & Sons Guesthouse',
  address: '37 Isikolo Street, Lingelihle, Inxuba, 5881',
  whatsappNikie: '068 090 0081',
  whatsappAlex: '082 264 6866',
  landline: '048 492 0007',
  emailPrimary: 'rasmeniguesthous2020@outlook.com',
  emailSecondary: 'rasmenihome@gmail.com',
  hours: 'Mon–Sat 08:00–17:00',
  afterHours: 'Call Nikie',
};

const mockProperties: Property[] = [
  {
    id: 'rasmeni-1',
    name: 'Rasmeni & Sons Guesthouse',
    location: '37 Isikolo Street, Lingelihle, Inxuba',
    description:
      'A warm, family-run guesthouse in the heart of Inxuba. Whether you are here for business or leisure, we offer comfortable rooms with attentive service and a home-away-from-home atmosphere.',
    rating: 4.7,
    reviews: 32,
    featured: true,
    tags: ['Family Run', 'WiFi', 'Parking', 'Breakfast Available'],
    rooms: [
      {
        id: 'room-std-1',
        name: 'Standard Room',
        type: 'Standard',
        price: 550,
        capacity: 2,
        amenities: ['Double Bed', 'WiFi', 'TV', 'Shared Bathroom'],
        available: true,
        images: 3,
        size: '18m²',
      },
      {
        id: 'room-dlx-1',
        name: 'Deluxe Room',
        type: 'Deluxe',
        price: 780,
        capacity: 2,
        amenities: ['Queen Bed', 'WiFi', 'TV', 'En-suite Bathroom', 'Coffee Station'],
        available: true,
        images: 3,
        size: '24m²',
      },
      {
        id: 'room-fam-1',
        name: 'Family Room',
        type: 'Family',
        price: 1050,
        capacity: 4,
        amenities: ['2 Double Beds', 'WiFi', 'TV', 'En-suite Bathroom', 'Fridge', 'Microwave'],
        available: true,
        images: 3,
        size: '32m²',
      },
      {
        id: 'room-exec-1',
        name: 'Executive Suite',
        type: 'Suite',
        price: 1200,
        capacity: 2,
        amenities: ['King Bed', 'WiFi', 'Smart TV', 'Luxury En-suite', 'Mini Bar', 'Workspace'],
        available: true,
        images: 3,
        size: '35m²',
      },
    ],
  },
];

export default mockProperties;
