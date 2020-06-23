<template>
    <b-row align-h="center" align-v="center">
        <b-col lg="6">
            <div>
                <h1>Your wallet is ready.</h1>
                <KeyCard :mnemonic="mnemonic" :address="address"></KeyCard>

                <div class="buts">
<!--                    <button class="but_primary">Download Wallet</button>-->
                    <button class="but_primary" @click="print">Print</button>
                </div>
                <div>
                    <button class="but_subtle" @click="restart">Create another address..</button>
                </div>
            </div>
        </b-col>
        <b-col lg="5" class="warning_col" offset-lg="1">
            <h2 style="color: #E04D4D;">WARNING</h2>
            <p class="warning">If you lose your <b>Mnemonic Key Phrase</b> you will lose access to your wallet.</p>
            <p>There is <b>NO WAY</b> for AVA Labs to recover your lost mnemonic phrase for you. This information is not stored anywhere.</p>
            <p>You should print and store your information <b>offline</b> by printing it.</p>
        </b-col>
    </b-row>
</template>
<script>
    import KeyCard from "@/components/KeyCard";
    export default {
        components: {
            KeyCard
        },
        props: {
            mnemonic: String,
            address: String,
        },
        methods: {
            print() {
                window.print();
            },
            restart(){
                this.$emit('restart');
            }
        }
    }
</script>
<style scoped lang="scss">




    .buts{
        display: flex;
        justify-self: center;

        >* {
            margin-right: 4px;
        }
    }

    .warning_col{
        border-left: 2px solid #f2f2f2;
        text-align: left;

        h2{
            /*animation-name: blink_red;*/
            animation-duration: 0.5s;
            animation-direction: alternate;
            animation-iteration-count: infinite;
        }
    }


    @keyframes blink_red {
        from {color: red;}
        to {color: #555;}
    }
</style>