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

export const publicTransportMixin = {
  methods: {
    getIcon(ptLeg) {
      switch (ptLeg.travelMode.name) {
        case "CAR":
          return 'mdi-car';
        case "BUS":
          return 'mdi-bus';
        case "TRAMWAY":
          return 'mdi-tram';
        case "COACH":
          return 'mdi-bus-side';
        case "TRAIN":
          return 'mdi-train';
        case "TRAIN_LOCAL":
          return 'mdi-train';
        case "TRAIN_HIGH_SPEED":
          return 'mdi-train-variant';
        case "BIKE":
          return 'mdi-bike';
        case "WALK":
          return 'mdi-walk';
        case "SUBWAY":
          return 'mdi-subway-variant';
        case "WAITING":
          return 'mdi-account-clock';
        default:
          return 'mdi-help-circle'
      }
    }
  }
};
