<template>
    <tr>
        <td>
            <div
                class="status"
                :class="getStatus"
            />
        </td>
        <td>{{ hit.requester_name }}</td>
        <td>
            <a
                :href="acceptUrl"
                @click="clickHit(hit)"
                target="_blank"
            >
                {{ hit.title }}
            </a>
        </td>
        <td>{{ hit.assignable_hits_count }}</td>
        <td>{{ hit.monetary_reward.amount_in_dollars }}</td>
        <td style="width: 100px">
            <div class="input-group">
                <div class="input-group-btn">
                    <button
                        class="btn btn-white btn-sm dropdown"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="fa fa-ban text-danger" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a
                                class="dropdown-item"
                                @click.prevent="blockUser(hit)"
                            >
                                Block this user
                            </a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                @click.prevent="blockHit(hit)"
                            >
                                Block this HIT
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </td>
    </tr>

</template>

<script>
    export default {
        props: {
            hit: {
                type: Object,
                required: true
            },
            openedHits: {
                type: Object,
                required: true
            }
        },
        computed: {
            acceptUrl() {
                return 'https://worker.mturk.com' + this.hit.accept_project_task_url;
            },
            getStatus() {
                if (this.openedHits[this.hit.hit_set_id]) {
                    return {viewed: true};
                }
                else if (this.hit.is_new) {
                    return {new: true};
                }
            }
        },
        methods: {
            clickHit(hit) {
                this.$emit('markAsOpened', hit.hit_set_id);
            },
            blockUser(hit) {
                this.$emit('block', {
                    attr: 'requester_id',
                    value: hit.requester_id,
                    human: hit.requester_name
                });
            },
            blockHit(hit) {
                this.$emit('block', {
                    attr: 'hit_set_id',
                    value: hit.hit_set_id,
                    human: hit.title
                });
            }
        }
    }
</script>

<style scoped>
.status {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    border-radius: 15px;
}
.status.new {
    background-color: green;
}
.status.viewed {
    background-color: #5c5cc3;
}
.input-group .dropdown {
    background: #363a40;
    color: #8a8d93;
    padding: 0px 25px;
}
.input-group a {
    cursor: pointer;
}
</style>