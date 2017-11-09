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
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="hit in hits" :class="{'table-danger': hit.is_new}">
                        <td>{{ hit.requester_name }}</td>
                        <td><a :href="acceptUrl(hit)" target="_blank">{{ hit.title }}</a></td>
                        <td>{{ hit.assignable_hits_count }}</td>
                        <td>{{ hit.monetary_reward.amount_in_dollars }}</td>
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
                }
            }
        }
    }

</script>

<style>

</style>