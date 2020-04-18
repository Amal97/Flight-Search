import React, { Component } from 'react';
import './App.css';

import Header from './components/Header.js';
import SideBar from './components/SideBar.js';
import Flights from './components/Flights';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
        DestinationCity:'',
        DepatureDate: new Date(),
        OriginCity:'',
        Passengers:0,
        ReturnDate:  new Date(),
        OneWay:true,
        priceRange:[0,20000]
    }

}
  
  handleSubmit = (OriginCity,DestinationCity,DepatureDate,ReturnDate,Passengers,OneWay) => {
    this.setState({
        DestinationCity:DestinationCity,
        DepatureDate:DepatureDate,
        Passengers:Passengers,
        ReturnDate:ReturnDate,
        OneWay:OneWay,
        OriginCity:OriginCity
    });
  }

  handlePrice = (priceRange) =>{
    this.setState({
      priceRange:priceRange
    })
  }

  styleRow = () =>{
    if(this.state.DestinationCity.length > 0){
      return "row mb-12";
    }
    else{
      return ""
    }
  }

render(){
  return (
    <div className="body">
      <div className="App">
      <Header />
      <div className="row mb-12">
        <div className="col-md-4">
          <SideBar handleSubmit={this.handleSubmit} slider={this.handlePrice}/>
        </div>
        <div className="col-md-8 themed-grid-col">
          <Flights data = {this.state}/>
        </div>
      </div>
      </div>
    </div>
  )
}
}

export default App;
