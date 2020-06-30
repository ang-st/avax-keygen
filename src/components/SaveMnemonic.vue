<template>
    <div>
        <VerifyMnemonic :mnemonic="mnemonic" ref="verify" @complete="complete"></VerifyMnemonic>
        <b-row>
            <b-col md="7">
                <h2 style="text-align: left">Step 2: Save Your <span class="ava_red">AVAX</span> Mnemonic Phrase</h2>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col md="7">
                <p class="mnemonic" :value="mnemonic">{{mnemonic}}</p>
            </b-col>
            <b-col md="4" class="right_col" offset-md="1">
                <b-form-checkbox :value="true"
                                 :unchecked-value="false"
                                 v-model="isCheckbox" :disabled="isVerified">
                    I wrote down my mnemonic keyphrase.
                </b-form-checkbox>
                <button v-if="!isVerified" class="but_primary" @click="openVerify" :disabled="!canVerify">Verify</button>
                <button v-else class="but_primary" disabled><fa icon="check-circle"></fa></button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import VerifyMnemonic from "@/components/VerifyMnemonic";
    export default {
        components: {
            VerifyMnemonic
        },
        props: {
            mnemonic: String
        },
        data(){
            return {
                isCheckbox: false,
                isVerified: false,
            }
        },
        computed: {
            canVerify(){
                if(!this.isCheckbox) return  false;

                return true;
            }
        },

        methods: {
            openVerify(){
                this.$refs.verify.isActive = true;
            },
            complete(){
                this.isVerified = true;
                this.$emit('complete')
            },
        }
    }
</script>
<style scoped lang="scss">
    .mnemonic{
        resize: none;
        width: 100%;
        outline: none;
        padding: 30px;
        text-align: center;
        border: 1px solid #CDCDCD;
        border-radius: 8px;
        height: max-content;
        background-color: transparent;
    }
</style>