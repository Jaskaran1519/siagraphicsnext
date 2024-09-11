import { create } from "zustand";
import { round2 } from "../utils1";
import { OrderItem, ShippingAddress } from "../models/OrderModel";
import { persist } from "zustand/middleware";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;

  paymentMethod: string;
  shippingAddress: ShippingAddress;
};
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: "Razorpay",
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    mobileNumber: "",
    country: "",
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: "cartStore",
  })
);

export default function useCartService() {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore();
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item: OrderItem) => {
      const exist = items.find(
        (x) => x.slug === item.slug && x.size === item.size
      );

      if (exist) {
        // If the item exists with the same size, increase its quantity
        const updatedCartItems = items.map((x) =>
          x.slug === item.slug && x.size === item.size
            ? { ...exist, qty: exist.qty + 1 }
            : x
        );
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems);
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
      } else {
        // If the item doesn't exist with the same size, add it as a new entry
        const updatedCartItems = [...items, { ...item, qty: 1 }];
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems);
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
      }
    },
    decrease: (item: OrderItem) => {
      const exist = items.find(
        (x) => x.slug === item.slug && x.size === item.size
      );

      if (exist) {
        const updatedCartItems =
          exist.qty === 1
            ? items.filter(
                (x: OrderItem) => x.slug !== item.slug || x.size !== item.size
              )
            : items.map((x) =>
                x.slug === item.slug && x.size === item.size
                  ? { ...exist, qty: exist.qty - 1 }
                  : x
              );

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems);

        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
      }
    },
    saveShippingAddrress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({
        shippingAddress,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
    init: () => cartStore.setState(initialState),
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = 0,
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
