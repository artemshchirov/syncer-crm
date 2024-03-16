export interface IMenuItem {
  title: string;
  path: string;
  icon: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    title: "Home",
    icon: "radix-icons:dashboard",
    path: "/",
  },
  {
    title: "Products",
    icon: "ep:goods",
    path: "/products",
  },
  {
    title: "Payments",
    icon: "ph:contactless-payment",
    path: "/payments",
  },
  {
    title: "Orders",
    icon: "fluent:receipt-28-regular",
    path: "/orders",
  },
  {
    title: "Customers",
    icon: "mingcute:group-line",
    path: "/customers",
  },
  {
    title: "Feedback",
    icon: "fluent:person-feedback-48-regular",
    path: "/feedback",
  },
  {
    title: "Settings",
    icon: "radix-icons:gear",
    path: "/settings",
  },
  {
    title: "Help center",
    icon: "radix-icons:question-mark",
    path: "/help",
  },
];
