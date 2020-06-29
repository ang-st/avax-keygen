<template>
    <div>
        <VerifyMnemonic :mnemonic="mnemonic" ref="verify"></VerifyMnemonic>
        <b-row>
            <b-col md="7">
                <h2 style="text-align: left">Step 2: Save Your <span class="ava_red">AVAX</span> Mnemonic Phrase</h2>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col md="7">
                <p class="mnemonic">{{mnemonic}}</p>
            </b-col>
            <b-col md="4" class="right_col" offset-md="1">
                <b-form-checkbox>
                    I wrote down my mnemonic keyphrase.
                </b-form-checkbox>
                <button class="but_primary" @click="openVerify" :disabled="!canVerify">Verify</button>
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
        computed: {
            canVerify(){
                return true;
            }
        },
        methods: {
            openVerify(){
                this.$refs.verify.isActive = true;
            }
        }
    }
</script>
<style scoped lang="scss">
    .mnemonic{
        padding: 30px;
        text-align: center;
        border: 1px solid #eee;
        border-radius: 8px;
    }
</style>