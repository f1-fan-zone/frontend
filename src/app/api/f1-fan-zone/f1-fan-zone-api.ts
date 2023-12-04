export class F1FanZoneApi {
  public static API_URL = "http://localhost:4000";

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
}
