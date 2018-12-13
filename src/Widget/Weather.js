import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import './Weather.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather : [],
            city: this.props.city,
            size : this.props.size
        };
    }
    componentDidMount() {
        fetch('https://www.prevision-meteo.ch/services/json/' + this.state.city)
            .then(response => response.json())
            .then(data => this.setState({weather : data}))
        ;

        switch(this.state.size){
            case 'tall':
            case 'big':
            case 'large':
                break;
            case 'undefined':
            default:
                this.setState({size: 'no-class'});
                break;
        }

        this.timer = setInterval(() => {
            this.props.animate().then(() => {
                fetch('https://www.prevision-meteo.ch/services/json/' + this.state.city)
                    .then(response => response.json())
                    .then(data => this.setState({
                        weather : data
                    }))
                ;
            });
        }, 3600000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        if (this.state.weather.length === 0) {
            return <div>Chargement en cours...</div>
        }

        const {weather} = this.state;
        console.log(this.state.weather);
        return (
            <Card className={`d-flex flex-row weather ${ this.state.size }`}>
                <CardBody className="d-flex align-items-center justify-content-center flex-wrap">
                    <img src={weather.current_condition.icon_big} />
                    <div className="d-flex flex-column justify-content-center align-items-center weather-tmp">
                        <div>{weather.current_condition.hour}</div>
                        <h2 className="p-1">{weather.current_condition.tmp}°C</h2>
                    </div>
                </CardBody>
                <CardBody className="d-flex justify-content-center flex-column weather-right">
                    <div className="weather-date">
                        <Badge color="primary">{weather.current_condition.date}</Badge>
                    </div>
                    <CardTitle className="display-4 mb-0">{weather.city_info.name}</CardTitle>
                    <div className="weather-previsions">
                        <div>Actuellement : {weather.current_condition.condition}</div>
                        <div>Demain : {weather.fcst_day_1.condition}</div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Weather;