import React, { Component } from 'react'
import FlightData from '../data/FlightData.json'
import Card from 'react-bootstrap/Card';

class Flights extends Component{

    render() {
        const {DestinationCity,DepatureDate,OriginCity,Passengers,ReturnDate,OneWay,priceRange} = this.props.data
        let flightListDepart = [];
        let flightListArrival = [];

        const filterData = () =>{ 
            flightListDepart = FlightData.filter( flightDepart => (
                                flightDepart.from.toLowerCase() === OriginCity.toLowerCase() &&
                                flightDepart.to.toLowerCase() === DestinationCity.toLowerCase()  &&
                                flightDepart.depatureDate === DepatureDate.toLocaleDateString()  &&
                                flightDepart.seats >= Passengers             
                            )).map((flights,i) =>{ return flights})
                            
            if(!OneWay){
                flightListArrival = FlightData.filter( flightArrive => (
                                    flightArrive.to.toLowerCase() === OriginCity.toLowerCase() &&
                                    flightArrive.from.toLowerCase() === DestinationCity.toLowerCase()  &&
                                    flightArrive.depatureDate === ReturnDate.toLocaleDateString()      &&
                                    flightArrive.seats >= Passengers  
                                )).map((flights,i) =>{ return flights})
                        }
        }

        const fullTicket = [];
        const returnTicket = () =>{
           let k = 0;
            for (let i = 0; i < flightListDepart.length; i++) {
                fullTicket[k] ={...flightListDepart[i],flightListArrival};
                k++;
           }
       }

       const bookTicket = () =>{
           alert("Ticket Booked");
       }

       const ticketDisplayHandler = (i,j) =>{
           if(flightListArrival.length !== 0){
               return(
                <Card.Text className="col-md-6">
                {OneWay ? "" : fullTicket[i].flightListArrival[j].flightNo}
                <br></br>
                <b> {OneWay ? "":  fullTicket[i].to + " > " + fullTicket[i].from } </b>
                <br></br>
                {OneWay ?"" :"Depart :" + fullTicket[i].flightListArrival[j].departTime}
                <br></br>
                {OneWay ? "" :"Arrive :" + fullTicket[i].flightListArrival[j].arriveTime}
            </Card.Text>
               )
           }
       }


        const displayTickets = () =>{
            const finalList = [];
            let k = 0;
            let totalFlightPrice = 0;
            let loop = flightListArrival.length;
            if(flightListArrival.length === 0){
                loop = flightListDepart.length;
            }
            
            if(OriginCity.length !== 0 && fullTicket.length === 0){
                return(<h2 style={{color:"white"}}> No results found </h2>);
            }

            for (let i = 0; i < flightListDepart.length; i++) {
                for (let j = 0; j < loop; j++) {
                    if(flightListArrival.length === 0){
                        totalFlightPrice = fullTicket[i].price;
                    }
                    else{
                        totalFlightPrice = fullTicket[i].price + fullTicket[i].flightListArrival[j].price;
                    }
                    if(totalFlightPrice >= priceRange[0] && totalFlightPrice <= priceRange[1]){
                        finalList.push(
                            <Card style={{ width: '80%', opacity:'0.95' }} key={k}>
                                <Card.Body>
                                    <Card.Title>Total Price ${ flightListArrival.length === 0 ? fullTicket[i].price : fullTicket[i].price + fullTicket[i].flightListArrival[j].price} </Card.Title>
                                    <div className="row mb-12">
                                        <Card.Text className="col-md-6">
                                            {fullTicket[i].flightNo}
                                            <br></br>
                                            <b> {fullTicket[i].from} > {fullTicket[i].to} </b>
                                            <br></br>
                                            Depart: {fullTicket[i].departTime}
                                            <br></br>
                                            Arrive: {fullTicket[i].arriveTime}
                                        </Card.Text>
                                        {ticketDisplayHandler(i,j)}
                                    </div>
                                </Card.Body>     
                                <button onClick={bookTicket} className="btn btn-outline-primary" style={{marginLeft:"20%", width:"60%"}}>Book Ticket</button>  
                                <br></br>         
                            </Card>
                        )
                        k++;
                    }
                    if(flightListArrival.length === 0){
                        break;
                    }            
                }
            }
            return finalList;
        }

        const header = () =>{
            if(OriginCity.length !== 0 && fullTicket.length !== 0){
                if(OneWay){
                    return(
                        <h2 style={{color:"white"}}> {OriginCity} > {DestinationCity} </h2>
                    )
                }
                if(flightListArrival.length !== 0){
                    return( <h2 style={{color:"white"}}> {OriginCity} > {DestinationCity} > {OriginCity} </h2>)
                }
                else{
                    return(
                        <div>
                            <h3 style={{color:"white"}}>  Return Ticket Not Found showing </h3>
                            <h2 style={{color:"white"}}> {OriginCity} > {DestinationCity} </h2>
                        </div>
                );
                }
            }
        }


        return (
            <React.Fragment>
                <br/><br/><br/>
            {filterData()}
            {returnTicket()}
            {header()}
            {displayTickets()}
            </React.Fragment>
        )
    }
}

export default Flights