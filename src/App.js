import React, { Component } from 'react';
import animatecss from 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Dashboard, Widget} from 'react-realtime-dashboard';
import Color from "./Widget/Color";
import Weather from "./Widget/Weather";
import Metro from "./Widget/Metro";
import Pokemon from "./Widget/Pokemon";

class App extends Component {
  render() {
    return (
        <Dashboard row={4} col={4} gutter={10} animationClassIn='animated flipInX' animationClassOut='animated flipOutX'>
            {/*<Widget>
                <Color colors={['red', 'blue', 'green']}/>
            </Widget>*/}
            <Widget size="tall">
                <Weather city={'rennes'}/>
            </Widget>
            <Widget size="tall">
                <Metro/>
            </Widget>
            <Widget size="" id={Math.floor(Math.random() *10)}>
                <Pokemon/>
            </Widget>
        </Dashboard>
    );
  }
}

export default App;
