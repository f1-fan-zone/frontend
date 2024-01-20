import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Component } from "react";
import ReactLoading from "react-loading";
import "./style.css";
import theme from "@/app/theme";

export default class Loading extends Component<any, any> {
  randomFacts = [
    "Toro Rosso won a race before Red Bull did.",
    "Button got given a 70 place grid drop in Mexico 2015 when all his penalty points were added up.",
    "Despite an impressive junior career, winning Le Mans and driving over 100 F1 cars. During his 12 year F1 career with 9 podiums, Martin Brundle never led a lap.",
    "Brawn GP won every WDC and WCC they competed in.",
    "Slim Borgudd was a drummer for ABBA, and was also a Formula 1 driver for ATS and Tyrell. The car even had the ABBA logo as an unpaid sponsorship.",
    "Nico Rosberg never drove an F1 race as world champion.",
    "Hans Heyer is the only driver to DNQ, DNS, DNF and DSQ for the same race (German GP 1977).",
    "Markus Winkelhock led 100% of races he started in.",
    "The 2019 German GP was the first time since 1961 that a Mercedes did not finish in the top 10.",
    "The 1994 Japanese GP was the only time in F1 history that the top 3 finishers were disqualified.",
    "1990 Japanese Grand Prix is the last GP where the podium had no Europeans on it.",
    "The 2018 Azerbaijan GP was the first time since 2012 that a Mercedes did not finish on the podium.",
    "The first Formula One Grand Prix race took place on May 13, 1950, at the Silverstone Circuit in England.",
    "Ayrton Senna holds the record for the most consecutive pole positions with eight in the 1988 season.",
    "Michael Schumacher has won the most World Drivers' Championships, securing the title seven times during his career.",
    "The fastest lap in Formula One history was set by Kimi Räikkönen during the 2018 Italian Grand Prix at Monza, with an average speed of 263.587 km/h (163.785 mph).",
    "The Monaco Grand Prix is one of the most prestigious races on the F1 calendar and is known for its tight and challenging street circuit, with limited overtaking opportunities.",
    "The Brabham team introduced the first successful rear-engine car in F1 in 1966, revolutionizing the design of Formula One cars.",
    "Juan Manuel Fangio won five World Championships in the 1950s and held the record for most championships for several decades.",
    "The 'Flying Finn,' Mika Häkkinen, won back-to-back World Championships with McLaren in 1998 and 1999.",
    "The F1 circuit with the most corners is the Circuit de Spa-Francorchamps in Belgium, featuring 19 turns over its 7.004-kilometer length.",
    "The Hockenheimring in Germany is known for its long straights and was a high-speed circuit before being modified in 2002.",
    "The 'shark fin' engine cover, introduced by the BMW Sauber team in the mid-2000s, was designed to improve aerodynamics but was later banned by F1 regulations.",
    "In 1994, the Imola Grand Prix weekend witnessed the tragic deaths of Ayrton Senna and Roland Ratzenberger, leading to significant safety improvements in Formula One.",
    "The V10 era in F1, featuring high-revving 10-cylinder engines, lasted from 1995 to 2005 before transitioning to V8 and later hybrid power units.",
    "The 'DRS' (Drag Reduction System) was introduced in 2011 to promote overtaking by allowing drivers to open an adjustable flap on their car's rear wing to reduce aerodynamic drag on designated straightaways.",
    "The 1976 Formula One season was depicted in the movie 'Rush,' focusing on the rivalry between James Hunt and Niki Lauda.",
    "The term 'Pit Stop' was first coined in Formula One racing, referring to the stop made by a racing car for new tires, fuel, or repairs.",
    "The youngest F1 World Champion is Sebastian Vettel, who achieved the title in 2010 at the age of 23.",
    "The first F1 race under artificial lights took place at the Singapore Grand Prix in 2008, marking the beginning of night races in the sport.",
    "The constructor with the most consecutive Constructors' Championships is Scuderia Ferrari, with six titles from 1999 to 2004.",
    "The 1955 Le Mans disaster, which resulted in the death of over 80 people, led to Mercedes-Benz and other manufacturers withdrawing from motorsport, including Formula One.",
    "The 'Tifosi' is the passionate fanbase of Scuderia Ferrari, known for their fervent support during races, especially at the team's home race in Monza.",
    "The 'Grooved Tire' era in F1 started in 1998, with tire manufacturers required to add grooves to the tires for safety reasons.",
    "Nico Rosberg won the 2016 F1 World Championship driving for Mercedes, becoming the first son of a World Champion (Keke Rosberg) to win the title himself.",
    "The FIA, the governing body of Formula One, stands for 'Fédération Internationale de l'Automobile.'",
    "The current scoring system in F1 awards points to the top 10 finishers, with the winner receiving 25 points.",
    "The Circuit Gilles Villeneuve in Montreal, Canada, is named after the late Canadian driver Gilles Villeneuve, who won six Grand Prix races.",
    "The 'Halo' cockpit protection device was introduced in F1 in 2018 to improve driver safety and reduce the risk of head injuries.",
    "Alain Prost, a four-time F1 World Champion, earned the nickname 'The Professor' for his strategic and calculated approach to racing.",
    "The term 'Blue Flag' is used in F1 to instruct a lapped car to move aside and let faster cars pass during a race.",
    "The Williams F1 team, founded by Sir Frank Williams, has won multiple Constructors' Championships but has faced challenges in recent years.",
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      randomFact: "",
    };
  }

  getRandomFact() {
    return this.randomFacts[
      Math.floor(Math.random() * this.randomFacts.length)
    ];
  }

  componentDidMount() {
    this.setState({ randomFact: this.getRandomFact() });

    setInterval(() => {
      this.setState({ randomFact: this.getRandomFact() });
    }, 5000);
  }

  render() {
    return (
      <div className="centered">
        <ThemeProvider theme={theme}>
          <ReactLoading type="spin" color="red" />
          <br />
          <Typography variant="body1" color="text.secondary">
            {this.state.randomFact}
          </Typography>
        </ThemeProvider>
      </div>
    );
  }
}
