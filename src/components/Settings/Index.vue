<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="block">
                    <div class="block-body">
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">Pays at least</label>
                                <div class="input-group col-sm-9"><span class="input-group-addon">$</span>
                                    <input v-model.number="minReward" type="number" min="0.0" placeholder="0.5" step="0.01" class="form-control">
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">HITs that</label>
                                <div class="col-sm-9">
                                    <div class="i-checks">
                                        <input v-model="qualifiedToWork" id="checkboxCustom1" type="checkbox" class="checkbox-template">
                                        <label for="checkboxCustom1">I'm qualified to work on</label>
                                    </div>
                                    <div class="i-checks">
                                        <input v-model="requireMasters" id="checkboxCustom2" type="checkbox" class="checkbox-template">
                                        <label for="checkboxCustom2">Require Master Qualification</label>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">Page size</label>
                                <div class="col-sm-9 select">
                                    <select v-model="pageSize" class="form-control">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                        <option value="60">60</option>
                                        <option value="70">70</option>
                                        <option value="80">80</option>
                                        <option value="90">90</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">Sort by</label>
                                <div class="col-sm-9 select">
                                    <select v-model="sortBy" class="form-control" name="sort">
                                        <optgroup label="Creation Date">
                                            <option value="updated_asc">Creation date: oldest first</option>
                                            <option value="updated_desc">Creation date: newest first</option>
                                        </optgroup>
                                        <optgroup label="Reward Amount">
                                            <option value="reward_asc">Reward amount: lowest first</option>
                                            <option value="reward_desc">Reward amount: highest first</option>
                                        </optgroup>
                                        <optgroup label="HITs">
                                            <option value="num_hits_asc">HITs: least first</option>
                                            <option selected="" value="num_hits_desc">HITs: most first</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">Auto-refresh delay</label>
                                <div class="input-group col-sm-9"><span class="input-group-addon">sec</span>
                                    <input v-model.number="fetchInterval" type="number" min="1" step="1" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">
                                    Bubble new HITs
                                    <br>
                                    <small class="text-primary">Always place new HITs at the top of the results table.</small>
                                </label>
                                <div class="col-sm-9">
                                    <div class="i-checks">
                                        <input v-model="bubbleHits" id="checkboxCustom1" type="checkbox" class="checkbox-template">
                                        <label for="checkboxCustom1">Enable</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-control-label">
                                    Block list
                                    <br>
                                    <small class="text-primary">This HITs will be hidden from the main list</small>
                                </label>
                                <div class="col-sm-9">
                                    <div v-for="(block, i) in blockList">
                                        <a href="" @click.prevent="removeBlock(i)"><i class="fa fa-trash-o"></i></a> {{ printBlock(block) }}
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="form-group row">
                                <div class="col-sm-9 ml-auto">
                                    <button @click.prevent="cancel" class="btn btn-secondary">Cancel</button>
                                    <button @click.prevent="save" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            initialQualifiedToWork: {
                type: Boolean,
                required: true
            },
            initialRequireMasters: {
                type: Boolean,
                required: true
            },
            initialFetchInterval: {
                type: Number,
                required: true
            },
            initialBubbleHits: {
                type: Boolean,
                required: true
            },
            initialMinReward: {
                type: Number,
                required: true
            },
            initialSortBy: {
                type: String,
                required: true
            },
            initialBlockList: {
                type: Array,
                required: true
            },
            initialPageSize: {
                type: Number,
                required: true
            },
        },
        data() {
            return {
                qualifiedToWork: this.initialQualifiedToWork,
                requireMasters: this.initialRequireMasters,
                fetchInterval: this.initialFetchInterval,
                minReward: this.initialMinReward,
                bubbleHits: this.initialBubbleHits,
                sortBy: this.initialSortBy,
                blockList: this.initialBlockList,
                pageSize: this.initialPageSize
            }
        },
        methods: {
            removeBlock(index) {
                console.log('removeBlock', index);
                this.blockList.splice(index, 1);
            },
            printBlock(block) {
                let type = {
                    requester_id: 'Requester',
                    hit_set_id: 'HIT',
                }
                return `${type[block.attr]}: "${block.human}"`
            },
            save() {
                console.log('save');
                this.$emit('save', {
                    qualifiedToWork: this.qualifiedToWork,
                    requireMasters: this.requireMasters,
                    fetchInterval: this.fetchInterval,
                    minReward: this.minReward,
                    bubbleHits: this.bubbleHits,
                    sortBy: this.sortBy,
                    blockList: this.blockList,
                    pageSize: this.pageSize
                });
            },
            cancel() {
                console.log('cancel');
                this.$emit('cancel');
            }
        }
    }

</script>

<style>

</style>