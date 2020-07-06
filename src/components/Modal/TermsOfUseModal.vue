<template>
    <div class="verify" v-if="isActive">
        <div class="bg" @click="close"></div>
        <div class="content">
            <iframe :src="pdf_url" width=”100%” height=”100%”></iframe>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                pdf_url: ""
            }
        },
        created(){

        },
        methods: {
            close(){
                this.isActive = false;
            }
        }
    }
</script>
<style scoped lang="scss">
    .close_but{
        position: absolute;
        top: 12px;
        right: 20px;
        background-color: transparent;
        border: none;
        outline: none;
        opacity: 0.2;

        &:hover{
            opacity: 1;
        }
    }
    .verify{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
    }

    .content{
        position: relative;
        background-color: #fff;
        padding: 40px 30px;
        max-width: 100%;
        width: 420px;
        z-index: 1;
        border-radius: 14px;
    }



    .but_primary{
        /*width: max-content;*/
        width: 80%;
        margin: 0px auto;
        padding: 8px 30px;
    }
</style>