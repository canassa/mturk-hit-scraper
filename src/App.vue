<template>
    <div>
        <page-header :time-left="timeLeft"></page-header>
        <div class="d-flex align-items-stretch">
            <nav id="sidebar">
                <div class="sidebar-header d-flex align-items-center">
                    <div class="avatar">
                        <!-- <img src="img/avatar-6.jpg" alt="..." class="img-fluid rounded-circle"> -->
                    </div>
                    <div class="title">
                        <h1 class="h5">{{ username }}</h1>
                    </div>
                </div>
                <span class="heading">Main</span>
                <ul class="list-unstyled">
                    <li :class="{active: currentState == 'hits'}">
                        <a href="#" @click.prevent="currentState = 'hits'"><i class="fa fa-th"></i>HITs</a>
                    </li>
                    <li :class="{active: currentState == 'settings'}">
                        <a href="#" @click.prevent="currentState = 'settings'"><i class="fa fa-cog"></i>Settings</a>
                    </li>
                </ul>
            </nav>
            <div class="page-content">
                <div class="page-header">
                    <div class="container-fluid">
                        <h2 class="h5 no-margin-bottom">{{ state[currentState].title }}</h2>
                    </div>
                </div>
                <section class="no-padding-top">
                    <hits v-if="currentState == 'hits'" :hits="hits"></hits>
                    <settings v-if="currentState == 'settings'"
                              :initial-qualified-to-work="qualifiedToWork"
                              :initial-require-masters="requireMasters"
                              :initial-fetch-interval="fetchInterval"
                              :initial-min-reward="minReward"
                              :initial-bubble-hits="bubbleHits"
                              :initial-sort-by="sortBy"
                              @cancel="currentState = 'hits'"
                              @save="saveSettings"></settings>
                </section>
            </div>
        </div>
    </div>
</template>


<script>
import 'font-awesome/css/font-awesome.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.default.css';
import './assets/js/front.js';
import notification_uri from './assets/notification.mp3';

const NOTIFICATION = new Audio(notification_uri);

import Hits from './components/Hits/Hits.vue';
import Settings from './components/Settings';
import PageHeader from './components/PageHeader/PageHeader.vue';
import axios from 'axios';

export default {
    name: 'app',
    components: {
        Hits,
        PageHeader,
        Settings
    },
    data() {
        return {
            // Settings
            username: localStorage['username'],
            qualifiedToWork: true,
            requireMasters: false,
            fetchInterval: 5,
            timeLeft: 5,
            minReward: 0.6,
            bubbleHits: true,
            sortBy: 'num_hits_desc',

            // Other
            hits: [],
            seenHits: new Set(),
            currentState: 'hits',
            state: {
                settings: {
                    title: 'Settings'
                },
                hits: {
                    title: 'HITs'
                }
            }
        };
    },
    methods: {
        saveSettings(settings) {
            console.log('saveSettings', settings);
            this.qualifiedToWork = settings.qualifiedToWork;
            this.requireMasters = settings.requireMasters;
            this.fetchInterval = settings.fetchInterval;
            this.timeLeft = settings.fetchInterval;
            this.minReward = settings.minReward;
            this.bubbleHits = settings.bubbleHits;
            this.sortBy = settings.sortBy;
            this.currentState = 'hits';
        },
        fetchHits(firstFetch=false) {
            console.log('fetchHits');
            var bla = [1,2,3,4,5,6].map(i => {
                return {
                    hit_set_id: i + '',
                    requester_name: "Michael Schwalbe",
                    title: "By Invitation Only: Follow-Up Survey",
                    assignable_hits_count: 89,
                    accept_project_task_url: '/projects/3BG0QG8YO7YP1E2FVKAGIGB3M6FSC4/tasks/accept_random?ref=w_pl_prvw',
                    monetary_reward: {currency_code: "USD", amount_in_dollars: 2}
            }});

            axios.get('/', {
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                params: {
                    'page_size': 20,
                    'page_number': 1,
                    'filters[qualified]': this.qualifiedToWork,
                    'filters[masters]': this.requireMasters,
                    'sort': this.sortBy,
                    'filters[min_reward]': this.minReward
                }
            }).then(response => {
                let newHits = response.data.results || bla;
                let foundNew = false;
                // let hitsIds = new Set(this.hits.map(h => h.hit_set_id));

                console.log(firstFetch);

                newHits.forEach((h, i) => {
                    h.is_new = !this.seenHits.has(h.hit_set_id) && !firstFetch;
                    if (h.is_new) {
                        foundNew = true;
                    }
                    this.seenHits.add(h.hit_set_id);

                    // Move the HIT to the beginning of the list
                    if (this.bubbleHits && h.is_new) {
                        newHits.splice(i, 1);
                        newHits.unshift(h)
                    }
                })

                this.hits = newHits;

                if (foundNew) {
                    NOTIFICATION.play();
                }

                // this.hits = response.data.results || bla;
                // console.log(this.hits);
            }).catch((error) => {
                console.log(error);
            });

        }
    },
    mounted() {
        console.log('mounted');
        this.fetchHits(true);
        this.clock = setInterval(() => {
            this.timeLeft--;
            console.log('tickClock', this.timeLeft);
            if (this.timeLeft <= 0) {
                this.timeLeft = this.fetchInterval;
                this.fetchHits();
            }

        }, 1000);
    },
    beforeDestroy() {
        console.log('beforeDestroy');
        clearInterval(this.clock);
    },
}
</script>

<style>
.avatar {
    background-image: url('./assets/img/tibia.gif');
    background-size: contain;
}
</style>
