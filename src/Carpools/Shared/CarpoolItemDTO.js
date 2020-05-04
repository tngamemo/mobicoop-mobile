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
    this.community = carpool.communities;
    this.pendingAsk = carpool.pendingAsk;
    this.acceptedAsk = carpool.acceptedAsk;
    if (carpool.frequency == 1) {
      this.date = carpool.date;
      this.time = carpool.time;
      this.outwardTime = this.resultDriveOrPassenger(carpool).outward.waypoints[0].time;
      this.outwardEndTime = [...this.resultDriveOrPassenger(carpool).outward.waypoints].pop().time;
    }
    if (carpool.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool);
      this.outwardTime = carpool.outwardTime;
      this.returnTime = carpool.returnTime;
    }
    this.resultDriverOrPassenger = this.resultDriveOrPassenger(carpool);
    this.isMultipleTimes = this.resultDriverOrPassenger.outward.multipleTimes;
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
    if (carpool.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool);
      this.outwardTime = this.getTimes(this.resultDriveOrPassenger(carpool).outward);
      this.returnTime = this.getTimes(this.resultDriveOrPassenger(carpool).return);
    }
    return this;
  }

  getCarpooler(carpool) {
    const carpooler = {};
    carpooler.avatar = carpool.carpooler.avatars[0];
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
