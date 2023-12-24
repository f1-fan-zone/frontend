export class F1FanZoneApi {
  public static API_URL = "https://f1-fan-zone-backend.onrender.com";

  public static async getUsers(): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users`);

    return await response.json();
  }

  public static async getUserById(userId: string): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/users/${userId}`);

    return await response.json();
  }

  public static async registerUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
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
    password: string
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

  public static async getPostsByPostCategoryId(
    postCategoryId: string
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/posts/category/${postCategoryId}`
    );

    return await response.json();
  }

  public static async getPostCategoryById(
    postCategoryId: string
  ): Promise<any> {
    const response = await fetch(
      `${F1FanZoneApi.API_URL}/post-categories/${postCategoryId}`
    );

    return await response.json();
  }

  public static async getPostById(postId: string): Promise<any> {
    const response = await fetch(`${F1FanZoneApi.API_URL}/posts/${postId}`);

    return await response.json();
  }
}
