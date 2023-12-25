import { Driver } from "@/app/classes/driver";
import { Race } from "@/app/classes/race";
import { Season } from "@/app/classes/season";

export class ErgastApi {
  public static API_URL = "https://ergast.com/api";

  static async getDriverStandings(): Promise<Driver[]> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/current/driverStandings.json`,
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
      `${ErgastApi.API_URL}/f1/current/last/results.json`,
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

  static async getAllSeasons(): Promise<any> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/seasons.json?limit=100`,
    );
    const data = await response.json();

    const seasons = data.MRData.SeasonTable.Seasons;

    const driverWinners = await ErgastApi.getDriverWinners();

    const constructorWinners = await ErgastApi.getConstructorWinners();

    return seasons.map((season: any) => {
      const driverWinner = driverWinners.find(
        (winner: any) => winner.season === season.season,
      );
      const constructorWinner = constructorWinners.find(
        (winner: any) => winner.season === season.season,
      );

      return {
        season: season.season,
        url: season.url,
        driverWinner: driverWinner ? driverWinner.name : "N/A",
        constructorWinner: constructorWinner ? constructorWinner.name : "N/A",
      } as Season;
    });
  }

  static async getDriverWinners(): Promise<any> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/driverStandings/1.json?limit=100`,
    );
    const data = await response.json();

    const seasons = data.MRData.StandingsTable.StandingsLists;

    return seasons.map((season: any) => {
      let driver = season.DriverStandings[0].Driver;
      return {
        season: season.season,
        name: `${driver.givenName} ${driver.familyName}`,
      };
    });
  }

  static async getConstructorWinners(): Promise<any> {
    const response = await fetch(
      `${ErgastApi.API_URL}/f1/constructorStandings/1.json?limit=100`,
    );
    const data = await response.json();

    const seasons = data.MRData.StandingsTable.StandingsLists;

    return seasons.map((season: any) => {
      let constructor = season.ConstructorStandings[0].Constructor;
      return {
        season: season.season,
        name: constructor.name,
      };
    });
  }
}
