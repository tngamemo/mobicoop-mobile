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

export default class CarpoolItemDTO {

  construct(data) {

  }

  carpoolItemFromSearch(carpool){
    this.id = carpool.id;
    this.frequency = carpool.frequency;
    this.price = carpool.roundedPrice;
    this.passenger = !!carpool.resultDriver;
    this.driver = !!carpool.resultPassenger;
    this.seats = carpool.seats;
    this.origin = carpool.origin;
    this.destination = carpool.destination;
    this.carpooler = this.getCarpooler(carpool);
    if(carpool.communities) {
      this.community =  Array.isArray(carpool.communities) ? carpool.communities : Object.keys(carpool.communities);
    }
    this.pendingAsk = carpool.pendingAsk;
    this.acceptedAsk = carpool.acceptedAsk;
    if (carpool.frequency == 1) {
      this.date = carpool.date;
      this.time = carpool.time;
      // indexTime permet d'afficher l'horaire de prise en charge, si passager on prend le 2eme outward waypoint et l'avant dernier pour la dépose.
      const indexTime = !!carpool.resultDriver ? 1 : 0;
      this.outwardTime = this.resultDriveOrPassenger(carpool).outward.waypoints[indexTime].time;
      const arr = [...this.resultDriveOrPassenger(carpool).outward.waypoints];
      this.outwardEndTime = arr[arr.length - (1 + indexTime)].time;
    }
    if (carpool.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool);
      this.outwardTime = carpool.outwardTime;
      this.returnTime = carpool.returnTime;
    }
    this.resultDriverOrPassenger = this.resultDriveOrPassenger(carpool);
    if(this.resultDriverOrPassenger  && this.resultDriverOrPassenger.outward) {
      this.isMultipleTimes = this.resultDriverOrPassenger.outward.multipleTimes;
    }
    this.paymentStatus = carpool.paymentStatus
    return this;
  }

  carpoolItemFromRdex(carpool){
    this.id = carpool.id;
    this.externalOperator =  carpool.externalOperator;
    this.externalOrigin = carpool.externalOrigin;
    this.externalUrl = carpool.externalUrl;
    this.frequency = carpool.frequency;
    this.price = carpool.roundedPrice;
    this.passenger = !!carpool.resultDriver;
    this.driver = !!carpool.resultPassenger;
    this.seats = carpool.seats;
    this.origin = carpool.origin;
    this.destination = carpool.destination;
    this.carpooler = this.getCarpooler(carpool);
    this.pendingAsk = carpool.pendingAsk;
    this.acceptedAsk = carpool.acceptedAsk;
    if (carpool.frequency == 1) {
      this.date = carpool.date;
      this.time = carpool.time;
      // indexTime permet d'afficher l'horaire de prise en charge, si passager on prend le 2eme outward waypoint et l'avant dernier pour la dépose.
      // this.outwardTime = carpool.time;
      // this.outwardEndTime = null
    }
    if (carpool.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool);
      this.outwardTime = carpool.outwardTime;
      this.returnTime = carpool.returnTime;
    }
    this.resultDriverOrPassenger = this.resultDriveOrPassenger(carpool);
    if(this.resultDriverOrPassenger && this.resultDriverOrPassenger.outward) {
      this.isMultipleTimes = this.resultDriverOrPassenger.outward.multipleTimes;
    }
    return this;
  }

  carpoolItemFromMyCarpool(carpool){
    this.id = carpool.id;
    this.frequency = carpool.frequency;
    this.passenger = carpool.role == 2 || carpool.role == 3
    this.driver = carpool.role == 1 || carpool.role == 3
    this.origin = carpool.outwardWaypoints[0].address
    this.destination = [...carpool.outwardWaypoints].pop().address
    this.isMultipleTimes = false;
    this.paused = carpool.paused;
    this.proposalId = carpool.proposalId
    this.potentialCarpoolers = carpool.potentialCarpoolers;
    if (carpool.frequency == 1) {
      this.date = carpool.outwardDate;
      this.time = carpool.outwardTime + "+00:00" ;
      this.outwardTime = carpool.outwardTime + "+00:00";
      this.returnTime = carpool.returnTime + "+00:00";
    }
    if (carpool.frequency == 2) {
      this.dateValidity = carpool.outwardLimitDate;
      this.regularDays = this.getRegularDaysFromMyCarpool(carpool);
      this.outwardTime = this.getRegularOutwardTime(carpool.schedule);
      this.returnTime = this.getRegularReturnTime(carpool.schedule);
    }
    return this;
  }

  carpoolItemFromAsk(ask){
    const carpool = ask.results[0];
    this.id = carpool.id;
    this.frequency = carpool.frequency;
    this.originAddress = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'origin' && item.person === 'requester').address
    this.pickUpAddress = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'origin' && item.person === 'carpooler').address
    this.dropOffAddress = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'destination' && item.person === 'carpooler').address
    this.destinationAddress = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'destination' && item.person === 'requester').address
    this.originTime = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'origin' && item.person === 'requester').time
    this.pickUpTime = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'origin' && item.person === 'carpooler').time
    this.dropOffTime = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'destination' && item.person === 'carpooler').time
    this.destinationTime = this.resultDriveOrPassenger(carpool).outward.waypoints.find(item => item.type === 'destination' && item.person === 'requester').time
    this.distance = this.resultDriveOrPassenger(carpool).outward.commonDistance + this.resultDriveOrPassenger(carpool).outward.detourDistance
    this.seats = carpool.seats;
    this.price = carpool.roundedPrice;
    this.return = carpool.return;
    this.status = ask.askStatus;
    this.canUpdateAsk = ask.canUpdateAsk;
    if (carpool.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool);
      this.outwardTime = this.getTimes(this.resultDriveOrPassenger(carpool).outward);
      this.returnTime = this.getTimes(this.resultDriveOrPassenger(carpool).return);
    }
    return this;
  }

  getCarpooler(carpool) {
    const carpooler = {};
    if (carpool.carpooler.avatars) {
      carpooler.avatar = carpool.carpooler.avatars[0];
    }
    carpooler.givenName = carpool.carpooler.givenName;
    carpooler.shortFamilyName = carpool.carpooler.shortFamilyName;
    return carpooler
  }

  getRegularDaysFromSearch(carpool) {
      const result = [];
      if (carpool) {
        result.push({trad: 'Carpool.L', value: carpool.monCheck});
        result.push({trad: 'Carpool.Ma', value: carpool.tueCheck});
        result.push({trad: 'Carpool.Me', value: carpool.wedCheck});
        result.push({trad: 'Carpool.J', value: carpool.thuCheck});
        result.push({trad: 'Carpool.V', value: carpool.friCheck});
        result.push({trad: 'Carpool.S', value: carpool.satCheck});
        result.push({trad: 'Carpool.D', value: carpool.sunCheck});
      }
      return result;
  }

  getRegularDaysFromMyCarpool(carpool) {
    const result = [];
    if (carpool) {
      result.push({trad: 'Carpool.L', value: carpool.schedule.mon});
      result.push({trad: 'Carpool.Ma', value: carpool.schedule.tue});
      result.push({trad: 'Carpool.Me', value: carpool.schedule.wed});
      result.push({trad: 'Carpool.J', value: carpool.schedule.thu});
      result.push({trad: 'Carpool.V', value: carpool.schedule.fri});
      result.push({trad: 'Carpool.S', value: carpool.schedule.sat});
      result.push({trad: 'Carpool.D', value: carpool.schedule.sun});
    }
    return result;
  }

  getTimes(carpool) {
    const result = [];
    if (carpool) {
      result.push({trad: 'Carpool.L', value: carpool.monTime});
      result.push({trad: 'Carpool.Ma', value: carpool.tueTime});
      result.push({trad: 'Carpool.Me', value: carpool.wedTime});
      result.push({trad: 'Carpool.J', value: carpool.thuTime});
      result.push({trad: 'Carpool.V', value: carpool.friTime});
      result.push({trad: 'Carpool.S', value: carpool.satTime});
      result.push({trad: 'Carpool.D', value: carpool.sunTime});
    }
    return result;
  }


  getRegularOutwardTime(schedule) {
    const outwardTime =  schedule.monOutwardTime || schedule.tueOutwardTime
      || schedule.wedOutwardTime || schedule.thuOutwardTime
      || schedule.friOutwardTime || schedule.satOutwardTime
      || schedule.sunOutwardTime
    return outwardTime;
  }

  getRegularReturnTime(schedule) {
    const returnTime = schedule.monReturnTime || schedule.tueReturnTime
      || schedule.wedReturnTime || schedule.thuReturnTime
      || schedule.friReturnTime || schedule.satReturnTime
      || schedule.sunReturnTime
    return returnTime
  }

  resultDriveOrPassenger(carpool) {
    return !! carpool.resultDriver ? carpool.resultDriver : carpool.resultPassenger;
  }

}
