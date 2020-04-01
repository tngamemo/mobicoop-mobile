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
    this.passenger = !!carpoolToPost.resultPassenger;
    this.driver = !!carpoolToPost.resultDriver;

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
    this.returnTime = moment(carpool.returnTime).utc().format('HH:MM');
    this.outwardTime = moment(carpool.outwardTime).utc().format('HH:MM');
    this.priceCarpool = carpool.roundedPrice;
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

    this.directPoints = directPoints;


    if (this.frequency == 2) {
      this.regularDays = this.getRegularDaysFromSearch(carpool)
    }

    return this
  }

  fromAskCarpool(carpool){
    this.outwardDate = carpool.date;
    this.frequency = carpool.frequency;
    this.seats = carpool.seats;
    this.comment = carpool.comment;
    this.user = carpool.carpooler;
    this.returnTime = moment(carpool.returnTime).utc().format('HH:MM');
    this.outwardTime = moment(carpool.outwardTime).utc().format('HH:MM');
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
}
