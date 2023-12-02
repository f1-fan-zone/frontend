import { Driver } from "@/app/classes/driver";

export class ErgastApi {
  public static API_URL = "https://ergast.com/api";

  static async getDriverStandings(): Promise<Driver[]> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/current/driverStandings.json`
    );
    const data = await response.json();

    const standings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    return standings.map((driver: any) => {
      console.log(driver.Driver);
      return {
        position: driver.position,
        points: driver.points,
        firstName: driver.Driver.givenName.toUpperCase(),
        lastName: driver.Driver.familyName.toUpperCase(),
        constructorName: driver.Constructors[0].name,
        imageUrl: `https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${
          driver.Driver.driverId.indexOf("_") !== -1
            ? driver.Driver.driverId.split("_")[1]
            : driver.Driver.driverId
        }.jpg.img.640.medium.jpg/1677069810695.jpg`,
      } as Driver;
    });
  }
}
