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

import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store';
import { searchStore } from './search.store';
import { registerStore } from './register.store';
import { carpoolStore } from './carpool.store';
import { messageStore } from "./message.store";
import { sliderStore } from './slider.store';
import { articleStore } from './article.store';
import { communityStore } from './community.store';
import { eventStore } from './event.store';
import { appStore } from './app.store';
import { dynamicStore } from './dynamic.store';
import { publicTransportStore } from './public-transport.store';
import { rdexStore } from './rdex.store';
import { reviewStore } from "./review.store";
import { paymentStore } from './payment.store';
import { proofStore } from './proof.store';
import createPersistedState from "vuex-persistedstate";



Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    userStore: userStore,
    searchStore: searchStore,
    registerStore: registerStore,
    carpoolStore: carpoolStore,
    messageStore: messageStore,
    sliderStore: sliderStore,
    appStore: appStore,
    articleStore: articleStore,
    communityStore: communityStore,
    eventStore: eventStore,
    dynamicStore: dynamicStore,
    publicTransportStore: publicTransportStore,
    rdexStore: rdexStore,
    reviewStore: reviewStore,
    paymentStore: paymentStore,
    proofStore: proofStore
  }
})
