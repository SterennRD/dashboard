import React, {Component} from 'react';
import { Badge, Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
import './Metro.css';

class Metro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metros : [],
            size: this.props.size
        };

    }



    componentDidMount() {
        fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-des-lignes-de-metro-du-reseau-star-en-temps-reel&facet=nomcourt&facet=etat')
            .then(response => response.json())
            .then(data => this.setState({metros : data}))
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
        // this.timer = setInterval(() => {
        //         fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-des-lignes-de-metro-du-reseau-star-en-temps-reel&facet=nomcourt&facet=etat')
        //             .then(response => response.json())
        //             .then(data => this.setState({metros : data}))
        //         ;
        // }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        if (this.state.metros.length === 0) {
            return <div>Chargement en cours...</div>
        }
        console.log(this.state.metros);

        const metro = this.state.metros.records.map((metro) => <div key={metro.fields.idligne}>Ligne <span className="metro">{metro.fields.nomcourt}</span> : {metro.fields.etat}</div>);
        const update = new Date(this.state.metros.records[0].fields.lastupdate).toLocaleTimeString();

        return (
            <Card className={ this.state.size }>
                <CardHeader tag="h4">Etat des lignes du métros en temps réel</CardHeader>
                <CardBody>
                    {metro}
                </CardBody>
                <CardFooter className="text-muted">Dernière mise à jour à {update}</CardFooter>
            </Card>
        );
    }
}

export default Metro;