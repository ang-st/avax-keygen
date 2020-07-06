<template>
    <b-row align-h="center">
        <b-col lg="6" md="8">
            <div class="main_card">
                <h1>Generate Your <br> <span class="ava_red"><b>AVAX</b></span> Key </h1>
                <p>This tool will allow you to generate and download your private <b>AVAX</b> key. At the end of the process, your <b>AVAX</b> address will also be shown.</p>
                <div class="checkout">
                    <b-form-checkbox :value="true"
                                     :unchecked-value="false"
                                     v-model="isCheckbox"
                    >
                        I understand and agree to the <a href="/terms_of_use.pdf" target="_blank">Terms of Use</a>.
                    </b-form-checkbox>
                    <button class="but_primary" @click="generateKey" :disabled="!canSubmit">Generate Key</button>
                </div>

            </div>
        </b-col>
    </b-row>
</template>
<script>
    export default {
        data(){
            return{
                isCheckbox: false
            }
        },
        methods: {
            generateKey(){
                this.$emit('generateKey');
            }
        },
        computed: {
            canSubmit(){

                if(!this.isCheckbox){
                    return false;
                }

                return true;
            }
        }
    }
</script>
<style scoped lang="scss">
    .main_card{
        box-shadow: 2px 0px 8px rgba(0,0,0,0.1);
        padding: 60px 60px;
    }

    button{
        width: 100%;
        margin-top: 20px;
    }

    .checkout{
        margin-top: 50px;
    }
</style>