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

// Global
import { IonicVueRouter } from '@ionic/vue';

import Home from './Home/Home.view.vue';
import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
import Article from './Article/Article.view.vue';
import Login from './Login/Login.view.vue';
import Register from './Register/Register.view.vue';
import GeoSearch from './GeoSearch/GeoSearch.view.vue';
import Search from './Search/Search.view.vue';
import Messages from './Messages/Messages.view.vue';
import Communities from './Communities/Communities/Communities.view.vue';
import Profile from './Profile/Profile.view.vue';
import UpdateProfile from './Profile/UpdateProfile.view.vue';
import ProfileAlerts from './Profile/ProfileAlerts.view.vue';
import ProfilePrefs from './Profile/ProfilePrefs.view.vue';
import MyCarpools from './Profile/MyCarpools.view.vue';
import AcceptedCarpools from './Profile/AcceptedCarpools.view.vue';
import PostCarpool from './PostCarpool/PostCarpool.view.vue';
import Message from './Messages/Message.view.vue';
import PostCarpoolStep from './PostCarpool/PostCarpoolStep.view.vue';
import DetailCarpool from './DetailCarpool/DetailCarpool.view.vue';
import AskCarpool from './AskCarpool/AskCarpool.view.vue';
import ConfirmRegistration from './Register/ConfirmRegistration.view.vue';
import Community from './Communities/Community/Community.view.vue';
import Events from './Events/Events/Events.view.vue';
import Event from './Events/Event/Event.view.vue';
import Contact from './Contact/Contact.view.vue';
import Solidarity from './Solidarity/Solidarity.view.vue';
import PostCommunity from './Communities/PostCommunity/PostCommunity.view.vue';
import PostEvent from './Events/PostEvent/PostEvent.view.vue';
import Dynamic from './Dynamic/Dynamic.view.vue';
import PublicTransport from './PublicTransport/PublicTransport.view.vue';
import Reviews from "./Profile/Reviews";
import Payment from './Payment/Payment.view.vue';
import BankAccount from './Payment/BankAccount.view.vue';
import Paye from './Payment/Paye.view.vue';
import ResetPassword from './Login/ResetPassword.view.vue';
import ProfilePublic from './Profile/ProfilePublic.view.vue';
import WaitingBadge from './Gamification/WaitingBadge.vue';
import WinBadge from './Gamification/WinBadge.vue';
import Badges from './Gamification/Badges.vue';

import Vue from 'vue';
import store from '../Shared/Store/store';

Vue.use(IonicVueRouter);

function guardAccesByLogin(to, from, next) {
    if (to.name !== 'login' && !store.getters.userId && !store.getters.userId) {
        store.commit('redirectionUrl_change', to.path);
        next({ name: 'login' });
    } else {
        next();
    }
}

export default [{
        path: '',
        name: 'mainTabComponent',
        component: MainTabComponent,
        children: [{
                path: '/',
                name: '',
                redirect: { name: 'carpoolsHome' }
            },
            {
                path: 'home',
                name: 'carpoolsHome',
                component: Home,
            },
            {
                path: 'help',
                name: 'help',
                component: Article,
            },
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'register',
                name: 'register',
                component: Register,
            },
            {
                path: 'messages',
                name: 'messages',
                component: Messages,
            },
            {
                path: 'communities',
                name: 'communities',
                component: Communities,
                // beforeEnter: guardAccesByLogin
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile,
            },
        ]
    },

    {
        path: 'geosearch',
        name: 'geoSearch',
        component: GeoSearch
    },

    {
        path: 'search',
        name: 'search',
        component: Search
    },
    {
        path: 'update-profile',
        name: 'update-profile',
        component: UpdateProfile
    },
    {
        path: 'profile-alerts',
        name: 'profile-alerts',
        component: ProfileAlerts
    },
    {
        path: 'profile-prefs',
        name: 'profile-prefs',
        component: ProfilePrefs
    },
    {
        path: 'my-carpools',
        name: 'my-carpools',
        component: MyCarpools
    },
    {
        path: 'accepted-carpools',
        name: 'accepted-carpools',
        component: AcceptedCarpools
    },
    {
        path: 'reviews',
        name: 'reviews',
        component: Reviews
    },
    {
        path: 'payment',
        name: 'payment',
        component: Payment,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'payment/paye',
        name: 'paye',
        component: Paye,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'bank-account',
        name: 'bank-account',
        component: BankAccount,
    },
    {
        path: 'post-carpool-step',
        name: 'post-carpool-step',
        component: PostCarpoolStep
    },
    {
        path: 'post-carpool',
        name: 'post-carpool',
        component: PostCarpool,
        props: (route) => ({
            ...route.params
        }),
        beforeEnter: guardAccesByLogin
    },
    {
        path: 'message/:idRecipient/:idAsk',
        name: 'message',
        component: Message,
        /*
        props: (route) => ({
          ...route.params
        })
         */
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article,
    },
    {
        path: '/confirm-registration/:email',
        name: 'confirm-registration',
        component: ConfirmRegistration,
    },
    {
        path: '/carpool-detail/:param',
        name: 'carpool-detail',
        component: DetailCarpool,
        beforeEnter: guardAccesByLogin
    },
    {
        path: '/public-transport/:param',
        name: 'public-transport',
        component: PublicTransport,
    },
    {
        path: '/ask-carpool/:param',
        name: 'ask-carpool',
        component: AskCarpool,
        beforeEnter: guardAccesByLogin
    },
    {
        path: 'allcommunities',
        name: 'allcommunities',
        component: Communities,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'community/:id',
        name: 'carpool-community',
        component: Community,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'post-community',
        name: 'post-community',
        component: PostCommunity,
        beforeEnter: guardAccesByLogin
    },
    {
        path: 'events',
        name: 'carpool-events',
        component: Events,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'event/:id',
        name: 'carpool-event',
        component: Event,
        // beforeEnter: guardAccesByLogin
    },
    {
        path: 'post-event',
        name: 'post-event',
        component: PostEvent,
        beforeEnter: guardAccesByLogin
    },
    {
        path: 'contact',
        name: 'carpool-contact',
        component: Contact,
    },
    {
        path: 'solidarity',
        name: 'carpool-solidarity',
        component: Solidarity,
    },
    {
        path: 'dynamic',
        name: 'dynamic',
        component: Dynamic,
        beforeEnter: guardAccesByLogin
    },
    {
        path: 'reset-password',
        name: 'reset-password',
        component: ResetPassword,
    },
    {
        path: 'public/profile/:id',
        name: 'profile-public',
        component: ProfilePublic,
    },
    {
        path: 'waiting-badge',
        name: 'waiting-badge',
        component: WaitingBadge
    },
    {
        path: 'win-badge',
        name: 'win-badge',
        component: WinBadge
    },
    {
        path: 'my-badges',
        name: 'my-badges',
        component: Badges
    }
];