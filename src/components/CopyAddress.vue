<template>
    <div>
        <b-row>
            <b-col md="7">
                <h2 style="text-align: left">Step 3: Copy Your <span class="ava_red">AVAX</span> Address to Sale Page</h2>
            </b-col>
        </b-row>
        <b-row align-v="center">
            <b-col md="7">
                <img src="@/assets/addr_copy.svg">
                <p class="addr">{{address}}</p>
            </b-col>
<!--            <b-col md="4" class="right_col" offset-md="1">-->
<!--            </b-col>-->
        </b-row>
    </div>
</template>
<script>
    export default {
        props: {
            address: String
        }
    }
</script>
<style scoped lang="scss">
    .addr{
        padding: 10px;
        text-align: center;
        border: 1px solid #CDCDCD;
        border-radius: 8px;
    }

    img{
        max-height: 70px;
        margin-bottom: 20px;
    }
</style>