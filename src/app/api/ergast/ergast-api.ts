import { Driver } from "@/app/classes/driver";
import { Race } from "@/app/classes/race";

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

  static async getlastRace(): Promise<any> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/current/last/results.json`
    );
    const data = await response.json();

    const race = data.MRData.RaceTable.Races[0];

    return {
      raceName: race.raceName.toUpperCase(),
      date: race.date,
      time: race.time.replace("Z", ""),
      circuitName: race.Circuit.circuitName,
      locality: race.Circuit.Location.locality,
    } as Race;
  }
}
