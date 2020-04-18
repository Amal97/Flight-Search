import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import {Form, Button, Col} from 'react-bootstrap/';
import '../css/sidebar.css';
import '../css/rd.css';
import Slider from '@material-ui/core/Slider';

// import OneWay from './OneWay';
//import '../css/sidebar.css';

class SideBar extends Component{
    constructor(){
        super();
        this.state = {
            DestinationCity:'',
            DepatureDate: new Date(),
            fail:false,
            message:"",
            Passengers: "",
            ReturnDate: new Date(),
            ReturnWay:false,
            OneWay:true,
            OriginCity:'',
            priceRange:[0, 5000]
        }

    }

    onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        let re;
        if(name === "Passengers"){
            re = /^[0-9]+$/;
        }
        else{
            re = /^[a-zA-Z]+$/;
        }
        let valid =   re.test(value);

        if(valid){
            this.setState({
                [name]:value,
                fail:false
            });
        }
        else{
            this.setState({
                fail:true
            });
            
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.fail === true || this.state.OriginCity === '' || this.state.DestinationCity === '' || this.state.DepatureDate === '' || this.state.Passengers === ''){
            this.setState({
                fail:true,
                message: "Invalid Input"
            });
        }
        else if(!this.state.fail){
            this.props.handleSubmit(this.state.OriginCity,this.state.DestinationCity,this.state.DepatureDate,this.state.ReturnDate,this.state.Passengers,this.state.OneWay);
        }
    }

    handleDepartDate = (date) => {
        this.setState({
            DepatureDate:date
        });
    }

    handleReturnDate = (date) => {
        this.setState({
            ReturnDate:date
        });
    }


    returnDayBox = () =>{
        if(this.state.ReturnWay === true){
            return(
                <Form.Group bsPrefix="form-groups" controlId="departDate">
                <Form.Label> Return Date </Form.Label>
                <DatePicker 
                    minDate={new Date()}
                    className="form-control"
                    selected={this.state.ReturnDate}
                    placeholderText="Click to select a date"
                    onChange={this.handleReturnDate}
                />
                </Form.Group>
            )
        }
        else{
            return;
        }
    }

    handleCheckBox = (e) =>{

        if(e.target.name === "OneWay"){
            if(e.target.checked === true){
                this.setState({
                    [e.target.name]: e.target.checked,
                    ReturnWay:false
                })
            }
        }

        if(e.target.name === "ReturnWay"){
            if(e.target.checked === true){
                this.setState({
                    [e.target.name]: e.target.checked,
                    OneWay:false
                })
            }
        }
    }
    
    handlePriceChange = (event, newValue) =>{
        this.setState({
            priceRange:newValue
        })

        this.props.slider(newValue);
    }

    showMessage = () =>{
        if(this.state.fail){
           return( <h5><font color="red">{this.state.message} </font></h5>);
        }
    }

    render() {
        return (
            <React.Fragment>
            <br/>
            <br/>
            <br/>
            <div>
            <div className="sideBarBackground row mb-6 no-gutters border rounded shadow-sm position-relative">
            <Form>
                <Form.Row>
                <Col>
                <Form.Check className='form-controls' type="checkbox" name="OneWay" label="One Way" checked={this.state.OneWay} onChange={this.handleCheckBox}/>
                </Col>
                <Col>
                <Form.Check className='form-controls' type="checkbox" name="ReturnWay" label="Return" checked={this.state.ReturnWay} onChange={this.handleCheckBox}/>
                </Col>
                </Form.Row>

                <Form.Group bsPrefix="form-groups" controlId="originCity">
                <Form.Label> Origin City </Form.Label>
                <Form.Control  name="OriginCity" type="text" placeholder="Origin City" onChange={this.onChange} />
                </Form.Group>

                <Form.Group bsPrefix="form-groups" controlId="destinationCity">
                <Form.Label> Destination City</Form.Label>
                <Form.Control placeholder="Enter Destination City" name="DestinationCity" type="text" onChange={this.onChange}  />
               </Form.Group>

                <Form.Group bsPrefix="form-groups" controlId="departDate">
                <Form.Label> Depart Date </Form.Label>
                <DatePicker 
                    minDate={new Date()}
                    className="form-control"
                    selected={this.state.DepatureDate}
                    placeholderText="Click to select a date"
                    onChange={this.handleDepartDate}
                />
                </Form.Group>

                {this.returnDayBox()}

                <Form.Group bsPrefix="form-groups" controlId="passengers">
                <Form.Label> Passengers </Form.Label>
                <Form.Control name="Passengers" placeholder="Passengers"type="text" onChange={this.onChange}/>
                </Form.Group>

                <Button style={{marginLeft: '5%', marginBlockEnd:'10%'}} className="btn btn-success" onClick={this.onSubmit}>Search</Button>
            </Form>
            {this.showMessage()}
            </div>
            
            <div className="refineSearch row mb-6 no-gutters border rounded shadow-sm position-relative">
            <h5> Price Range </h5>
            <Slider
                style={{marginLeft:"20%",marginTop:"20%",textAlign:"center", width:'150px'}}
                valueLabelDisplay="on"
                value={this.state.priceRange}
                onChange={this.handlePriceChange}
                aria-labelledby="range-slider"
                min={0}
                max={5000}
            />
            </div>
            </div>
        </React.Fragment>
        )
    }
}

export default SideBar