/**

 Copyright (c) 2018, MOBICOOP. All rights reserved.
 This project is dual licensed under AGPL and proprietary licence.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <gnu.org/licenses>.

 Licence MOBICOOP described in the file
 LICENSE
 **************************/

import moment from 'moment'

export default class RecapCarpoolDTO {

  construct(data) {

  }

  fromCarpoolToPost(carpoolToPost, user, priceCarpool, directPoints){
    this.outwardDate = carpoolToPost.outwardDate;
    this.frequency = carpoolToPost.frequency;
    this.outwardWaypoints = carpoolToPost.outwardWaypoints;
    this.seats = carpoolToPost.seatsDriver;
    this.comment = carpoolToPost.comment;
    this.user = user;
    this.isMultipleTime = carpoolToPost.schedule && carpoolToPost.schedule.length > 1;
    this.returnTime = (carpoolToPost.schedule && carpoolToPost.schedule[0].returnTime) ? carpoolToPost.schedule[0].returnTime : carpoolToPost.returnTime;
    this.outwardTime = (carpoolToPost.schedule && carpoolToPost.schedule[0].outwardTime) ? carpoolToPost.schedule[0].outwardTime : carpoolToPost.outwardTime;
    this.directPoints = directPoints;
    this.priceCarpool = priceCarpool;
    this.passenger = carpoolToPost.role == 2 || carpoolToPost.role == 3;
    this.driver = carpoolToPost.role == 1 || carpoolToPost.role == 3;

    if (this.frequency == 2) {
      this.regularDays = this.getRegularDaysFromCarpoolToPost(carpoolToPost)
    }

    return this
  }

  fromCarpoolSearch(carpool, directPoints){
    this.outwardDate = carpool.date;
    this.frequency = carpool.frequency;
    this.seats = carpool.seats;
    this.comment = carpool.comment;
    this.user = carpool.carpooler;
    this.returnTime = (!!carpool.returnTime) ? moment(carpool.returnTime).utc().format('HH:mm') : null;
    this.outwardTime = (!!carpool.outwardTime) ? moment(carpool.outwardTime).utc().format('HH:mm') : null ;
    this.priceCarpool = carpool.roundedPrice;
    this.passenger = !!carpool.resultDriver;
    this.driver =  !!carpool.resultPassenger;
    this.startDate = carpool.startDate;
    this.toDate = carpool.toDate;

    let result = carpool.resultDriver ;
    if (! !!result) result = carpool.resultPassenger;

    this.outwardWaypoints = [];
    result.outward.waypoints.forEach(item => {
      item.address['role'] = item.role;
      item.address['time'] = item.time;
      item.address['type'] = item.type;
      this.outwardWaypoints.push(item.address);
    })

    this.isMultipleTime = result.outward.multipleTimes;

    this.directPoints = directPoints;


    if (this.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool)
    }

    return this
  }

  fromMessage(carpool, directPoints){
    this.outwardDate = carpool.date;
    this.frequency = carpool.frequency;
    this.seats = carpool.seats;
    this.comment = carpool.comment;
    this.user = carpool.carpooler;
    this.returnTime = (!!carpool.returnTime) ? moment(carpool.returnTime).utc().format('HH:mm') : null;
    this.outwardTime = (!!carpool.outwardTime) ? moment(carpool.outwardTime).utc().format('HH:mm') : null ;
    this.priceCarpool = carpool.roundedPrice;
    this.passenger = !!carpool.resultPassenger;
    this.driver = !!carpool.resultDriver;
    this.startDate = carpool.startDate;
    this.toDate = carpool.toDate;

    let result = carpool.resultDriver ;
    if (! !!result) result = carpool.resultPassenger;

    this.outwardWaypoints = [];
    result.outward.waypoints.forEach(item => {
      item.address['role'] = item.role;
      item.address['time'] = item.time;
      item.address['type'] = item.type;
      this.outwardWaypoints.push(item.address);
    })

    this.isMultipleTime = result.outward.multipleTimes;

    this.directPoints = directPoints;


    if (this.frequency == 2) {
      this.regularDays = this.getRegularDaysFromMessage(carpool);
    }

    return this
  }

  fromAskCarpool(carpool){
    this.outwardDate = carpool.date;
    this.frequency = carpool.frequency;
    this.seats = carpool.seats;
    this.comment = carpool.comment;
    this.user = carpool.carpooler;
    this.returnTime = carpool.returnTime ? moment(carpool.returnTime).utc().format('HH:mm') : null;
    this.outwardTime = carpool.outwardTime ? moment(carpool.outwardTime).utc().format('HH:mm') : null;
    this.passenger = !!carpool.resultPassenger;
    this.driver = !!carpool.resultDriver;

    let result = carpool.resultDriver ;
    if (! !!result) result = carpool.resultPassenger;

    this.outwardWaypoints = [];
    result.outward.waypoints.forEach(item => {
      item.address['role'] = item.role;
      item.address['time'] = item.time;
      item.address['type'] = item.type;
      this.outwardWaypoints.push(item.address);
    })

    this.isMultipleTime = result.outward.multipleTimes;

    return this
  }

  getRegularDaysFromCarpoolToPost(carpoolToPost) {
    const result = [];
    result.push({
      trad: "Carpool.L",
      value: carpoolToPost.schedule.some(item => item["mon"] == true)
    });
    result.push({
      trad: "Carpool.Ma",
      value: carpoolToPost.schedule.some(item => item["tue"] == true)
    });
    result.push({
      trad: "Carpool.Me",
      value: carpoolToPost.schedule.some(item => item["wed"] == true)
    });
    result.push({
      trad: "Carpool.J",
      value: carpoolToPost.schedule.some(item => item["thu"] == true)
    });
    result.push({
      trad: "Carpool.V",
      value: carpoolToPost.schedule.some(item => item["fri"] == true)
    });
    result.push({
      trad: "Carpool.S",
      value: carpoolToPost.schedule.some(item => item["sat"] == true)
    });
    result.push({
      trad: "Carpool.D",
      value: carpoolToPost.schedule.some(item => item["sun"] == true)
    });

    return result;
  }

  getRegularDaysFromSearch(carpool) {
    const result = [];
    result.push({
      trad: "Carpool.L",
      value: !! carpool.monCheck
    });
    result.push({
      trad: "Carpool.Ma",
      value: !! carpool.tueCheck
    });
    result.push({
      trad: "Carpool.Me",
      value: !! carpool.wedCheck
    });
    result.push({
      trad: "Carpool.J",
      value: !! carpool.thuCheck
    });
    result.push({
      trad: "Carpool.V",
      value: !! carpool.friCheck
    });
    result.push({
      trad: "Carpool.S",
      value: !! carpool.satCheck
    });
    result.push({
      trad: "Carpool.D",
      value: !! carpool.sunCheck
    });

    return result;
  }

  getRegularDaysFromMessage(carpool) {
    let driverOrPassenger = carpool.resultDriver ;
    if (! !!driverOrPassenger) driverOrPassenger = carpool.resultPassenger;

    const result = [];
    result.push({
      trad: "Carpool.L",
      value: !! driverOrPassenger.outward.monTime
    });
    result.push({
      trad: "Carpool.Ma",
      value: !! driverOrPassenger.outward.tueTime
    });
    result.push({
      trad: "Carpool.Me",
      value: !! driverOrPassenger.outward.wedTime
    });
    result.push({
      trad: "Carpool.J",
      value: !! driverOrPassenger.outward.thuTime
    });
    result.push({
      trad: "Carpool.V",
      value: !! driverOrPassenger.outward.friTime
    });
    result.push({
      trad: "Carpool.S",
      value: !! driverOrPassenger.outward.satTime
    });
    result.push({
      trad: "Carpool.D",
      value: !! driverOrPassenger.outward.sunTime
    });

    return result;
  }
}
