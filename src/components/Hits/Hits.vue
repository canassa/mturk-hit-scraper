<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="block">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Requester</th>
                                <th>Title</th>
                                <th>HITs</th>
                                <th>Reward</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="hit in hits"
                                :key="hit.hit_set_id"
                                :class="{'table-danger': hit.is_new}">
                                <td>{{ hit.requester_name }}</td>
                                <td><a :href="acceptUrl(hit)" @click="clickHit(hit)" target="_blank">{{ hit.title }}</a></td>
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
                                                aria-expanded="false">
                                                <i class="fa fa-ban text-danger"/>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        @click.prevent="blockUser(hit)">
                                                        Block this user
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        @click.prevent="blockHit(hit)">
                                                        Block this HIT
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        props: {
            hits: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                acceptUrl(hit) {
                    return 'https://worker.mturk.com' + hit.accept_project_task_url;
                },
                clickHit() {
                    this.$emit('markAsViewed', {

                    })
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
    }

</script>

<style>
.input-group .dropdown {
    background: #363a40;
    color: #8a8d93;
    padding: 4px 10px;
}
.input-group a {
    cursor: pointer;
}
</style>