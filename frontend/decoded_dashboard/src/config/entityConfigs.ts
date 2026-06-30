import type { LucideIcon } from "lucide-react";
import { Shield, Store, Hotel, ShoppingBag } from "lucide-react";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "number" | "boolean" | "select" | "textarea" | "date" | "email";
  required?: boolean;
  editable?: boolean;
  options?: { value: string; label: string }[];
  width?: string;
  hidden?: boolean;
}

export interface EntityGroup {
  group: string;
  icon: LucideIcon;
  entities: EntityConfig[];
}

export interface EntityConfig {
  key: string;
  label: string;
  labelPlural: string;
  apiBase: string;
  idField: string;
  searchField: string;
  fields: FieldDef[];
}

export const entityGroups: EntityGroup[] = [
  {
    group: "Auth",
    icon: Shield,
    entities: [
      {
        key: "roles",
        label: "Role",
        labelPlural: "Roles",
        apiBase: "/api/auth/roles",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "text" },
          { name: "fullAccess", label: "Full Access", type: "boolean" },
          { name: "modify", label: "Modify", type: "boolean" },
          { name: "readOnly", label: "Read Only", type: "boolean" },
        ],
      },
      {
        key: "users",
        label: "User",
        labelPlural: "Users",
        apiBase: "/api/auth/users",
        idField: "id",
        searchField: "email",
        fields: [
          { name: "email", label: "Email", type: "email", required: true },
          { name: "firstName", label: "First Name", type: "text", required: true },
          { name: "lastName", label: "Last Name", type: "text", required: true },
          { name: "role", label: "Role", type: "text", editable: false },
          { name: "enabled", label: "Enabled", type: "boolean" },
        ],
      },
    ],
  },
  {
    group: "Restaurant",
    icon: Store,
    entities: [
      {
        key: "restaurants",
        label: "Restaurant",
        labelPlural: "Restaurants",
        apiBase: "/api/restaurant/restaurants",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "address", label: "Address", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "active", label: "Active", type: "boolean" },
        ],
      },
      {
        key: "menu-items",
        label: "Menu Item",
        labelPlural: "Menu Items",
        apiBase: "/api/restaurant/menu",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label: "Price", type: "number", required: true },
          { name: "category", label: "Category", type: "text" },
          { name: "available", label: "Available", type: "boolean" },
        ],
      },
    ],
  },
  {
    group: "Guesthouse",
    icon: Hotel,
    entities: [
      {
        key: "guesthouses",
        label: "Guesthouse",
        labelPlural: "Guesthouses",
        apiBase: "/api/guesthouse/guesthouses",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "address", label: "Address", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "active", label: "Active", type: "boolean" },
        ],
      },
      {
        key: "rooms",
        label: "Room",
        labelPlural: "Rooms",
        apiBase: "/api/guesthouse/rooms",
        idField: "id",
        searchField: "roomNumber",
        fields: [
          { name: "roomNumber", label: "Room #", type: "text", required: true },
          { name: "type", label: "Type", type: "text" },
          { name: "pricePerNight", label: "Price/Night", type: "number", required: true },
          { name: "capacity", label: "Capacity", type: "number" },
          { name: "available", label: "Available", type: "boolean" },
        ],
      },
      {
        key: "reservations",
        label: "Reservation",
        labelPlural: "Reservations",
        apiBase: "/api/guesthouse/reservations",
        idField: "id",
        searchField: "id",
        fields: [
          { name: "roomId", label: "Room ID", type: "text" },
          { name: "userId", label: "User ID", type: "text" },
          { name: "checkInDate", label: "Check In", type: "date" },
          { name: "checkOutDate", label: "Check Out", type: "date" },
          { name: "numberOfGuests", label: "Guests", type: "number" },
          { name: "status", label: "Status", type: "text" },
          { name: "totalPrice", label: "Total", type: "number" },
        ],
      },
    ],
  },
  {
    group: "Marketplace",
    icon: ShoppingBag,
    entities: [
      {
        key: "categories",
        label: "Category",
        labelPlural: "Categories",
        apiBase: "/api/marketplace/categories",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "active", label: "Active", type: "boolean" },
        ],
      },
      {
        key: "products",
        label: "Product",
        labelPlural: "Products",
        apiBase: "/api/marketplace/products",
        idField: "id",
        searchField: "name",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label: "Price", type: "number", required: true },
          { name: "stockQuantity", label: "Stock", type: "number" },
          { name: "categoryId", label: "Category ID", type: "text" },
          { name: "active", label: "Active", type: "boolean" },
        ],
      },
      {
        key: "orders",
        label: "Order",
        labelPlural: "Orders",
        apiBase: "/api/marketplace/orders",
        idField: "id",
        searchField: "id",
        fields: [
          { name: "userId", label: "User ID", type: "text" },
          { name: "totalAmount", label: "Total", type: "number" },
          { name: "shippingAddress", label: "Shipping", type: "textarea" },
          { name: "status", label: "Status", type: "text" },
          { name: "createdAt", label: "Created", type: "text", editable: false },
        ],
      },
    ],
  },
];

export function getEntityConfig(key: string): EntityConfig | undefined {
  for (const g of entityGroups) {
    const e = g.entities.find((e) => e.key === key);
    if (e) return e;
  }
  return undefined;
}
