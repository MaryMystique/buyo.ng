import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order, CartItem } from "@/types";

// Save a new order to Firestore
export async function createOrder(orderData: {
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  total: number;
  paymentReference: string;
  deliveryInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
}) {
  try {
    // addDoc adds a new document to the "orders" collection
    // serverTimestamp() lets Firestore set the time (more accurate)
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "processing",
      createdAt: serverTimestamp(),
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, orderId: null };
  }
}

// Get all orders for a specific user
export async function getUserOrders(userId: string) {
  try {
    // query() builds a database query
    // where() filters by field value
    // orderBy() sorts results
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    // snapshot.docs is an array of document snapshots
    // We map each one to get its data plus its id
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

// Get ALL orders (for admin dashboard)
export async function getAllOrders() {
  try {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

// Update order status (for admin)
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
) {
  try {
    // doc() gets a reference to a specific document
    // updateDoc() updates specific fields without overwriting the whole document
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false };
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    // Check if email already exists
    const q = query(
      collection(db, "newsletter"),
      where("email", "==", email)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { success: false, message: "already_subscribed" };
    }

    // Save new subscriber
    await addDoc(collection(db, "newsletter"), {
      email,
      subscribedAt: serverTimestamp(),
    });

    return { success: true, message: "subscribed" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "error" };
  }
}

export async function getNewsletterSubscribers() {
  try {
    const q = query(
      collection(db, "newsletter"),
      orderBy("subscribedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}