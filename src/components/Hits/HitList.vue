<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="block">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th/>
                                <th>Requester</th>
                                <th>Title</th>
                                <th>HITs</th>
                                <th>Reward</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <hit
                                v-for="hit in hits"
                                :key="hit.hit_set_id"
                                :hit="hit"
                                :opened-hits="openedHits"
                                @markAsOpened="markAsOpened"
                                @block="block"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Hit from './Hit.vue'

    export default {
        components: {
            Hit
        },
        props: {
            hits: {
                type: Array,
                required: true
            },
            openedHits: {
                type: Object,
                required: true
            }
        },
        methods: {
            block(blockData) {
                this.$emit('block', blockData);
            },
            markAsOpened(hitSetId) {
                this.$emit('markAsOpened', hitSetId);
            }
        }
    }

</script>

<style>

</style>