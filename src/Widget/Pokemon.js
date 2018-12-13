import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardHeader } from 'reactstrap';
import './Pokemon.css';

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            size : this.props.size
        };
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/' + this.props.id + '/')
            .then(response => response.json())
            .then(data => this.setState({
                pokemons : data
            }))
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
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        if (this.state.pokemons.length === 0 ) {
            return <div>Chargement en cours...</div>
        }

        console.log(this.state.pokemons);
        const types = this.state.pokemons.types.map((type) => <Badge key={type.type.name} className="mr-2">{type.type.name}</Badge>);
        return (
            <Card className={ this.state.size }>
                <CardTitle>
                    {this.Capitalize(this.state.pokemons.name)}
                </CardTitle>
                <CardSubtitle>Le pokémon du jour</CardSubtitle>
                <div>
                    <img src={this.state.pokemons.sprites.front_default} />
                    {types}
                </div>
            </Card>
        );
    }
}

export default Pokemon;