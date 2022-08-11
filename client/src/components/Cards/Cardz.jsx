import React, { Component } from 'react'
import { FaCcDinersClub } from 'react-icons/fa'
import Card from './Cards'

import img1 from '../../assets/beach_sunset.jpeg';
import img2 from '../../assets/cheesy_skillet_hashbrowns_eggs-edited-686x916.jpg'
import img3 from '../../assets/Cat_November_2010-1a.jpg.webp'



class Cards extends Component {

render() {
    return (
        <div className="container">
            <div className="row"></div>
            <div className="col-md-4">  
            </div>
            <Card imgsrc={img1}title="Sunset"/>
            <div className="col-md-4">
            </div>
             <Card imgsrc= {img2}title="Foodie"/>
            <div className="col-md-4"></div>
             <Card imgsrc= {img3}title="Eve"/>
        </div>
    );
}
}

export default Cards;