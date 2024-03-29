import { Order } from "@/app/classes/order";
import { Post } from "@/app/classes/post";

export class F1FanZoneApi {
  public static API_URL =
    process.env.NODE_ENV === "production"
      ? "https://f1-fan-zone-backend.onrender.com"
      : "http://localhost:3000";

  public static async getUsers(): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users`);

    return await response.json();
  }

  public static async getUserById(userId: string): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users/${userId}`);

    return await response.json();
  }

  public static async getUserByUsername(username: string): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/users/profile/${username}`,
    );

    return await response.json();
  }

  public static async registerUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        firstName,
        lastName,
      }),
    });

    return await response.json();
  }

  public static async loginUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameOrEmail,
        password,
      }),
    });

    return await response.json();
  }

  public static async getPostCategories(): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/post-categories`);

    return await response.json();
  }

  public static async getProductCategories(): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/product-categories`);

    return await response.json();
  }

  public static async getPostsByPostCategoryId(
    postCategoryId: string,
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/posts/category/${postCategoryId}`,
    );

    return await response.json();
  }

  public static async getProductsByProductCategoryId(
    productCategoryId: string,
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/products/category/${productCategoryId}`,
    );

    return await response.json();
  }

  public static async getPostCategoryById(
    postCategoryId: string,
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/post-categories/${postCategoryId}`,
    );

    return await response.json();
  }

  public static async getProductCategoryById(
    productCategoryId: string,
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/product-categories/${productCategoryId}`,
    );

    return await response.json();
  }

  public static async getPostById(postId: string): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/posts/${postId}`);

    return await response.json();
  }

  public static async getProductById(productId: string): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/products/${productId}`,
    );

    return await response.json();
  }

  public static async getPostCommentsByPostId(postId: string): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/posts/${postId}/comments`,
    );

    return await response.json();
  }

  public static async createPost(post: Post): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    return await response.json();
  }

  public static async createOrder(order: Order): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await response.json();
  }

  public static async getUserOrders(userId: string): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/orders/user/${userId}`,
    );

    return await response.json();
  }
}
