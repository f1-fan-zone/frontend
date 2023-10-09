import React, { Component } from "react";
import "./style.css";
import { useMediaQuery } from "react-responsive";

export default class Header extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isMobile: false };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ isMobile: window.screen.availWidth < 768 });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    render() {
        return (
            this.state.isMobile ? (
                <img className="f1fanzone" alt="F1 Fan Zone" src="f1-fan-zone.png" />
            ) : (
                <div className="box">
                    <header className="header">
                        <div className="overlap">
                            <div className="overlap-group">
                                <img className="f1fanzone" alt="F1 Fan Zone" src="f1-fan-zone.png" />
                                <div className="text-wrapper">SEASON 2023</div>
                            </div>
                            <div className="div">PREVIOUS SEASONS</div>
                            <div className="text-wrapper-2">COMMUNITY</div>
                            <div className="text-wrapper-3">STORE</div>
                            <div className="LIVE">
                                <div className="overlap-group-2">
                                    <img className="polygon" alt="Polygon" src="polygon.svg" />
                                    <div className="rectangle" />
                                    <div className="text-wrapper-4">LIVE</div>
                                    <div className="ellipse" />
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            )
        );
    }
};
