<template>
    <div class="steps">
        <DownloadKeyfile :mnemonic="mnemonic" :key-pair="keyPair" :address="address"></DownloadKeyfile>
        <SaveMnemonic :mnemonic="mnemonic"></SaveMnemonic>
        <CopyAddress :address="address"></CopyAddress>
    </div>
</template>
<script>
    import DownloadKeyfile from "@/components/DownloadKeyfile";
    import SaveMnemonic from '@/components/SaveMnemonic';
    import CopyAddress from "@/components/CopyAddress";

    export default {
        components: {
            DownloadKeyfile,
            SaveMnemonic,
            CopyAddress
        },
        props: {
            mnemonic: String,
            keyPair: Object,
            address: String,
        }
    }
</script>
<style>
    .right_col{
        border-left: 2px solid #f2f2f2;
        text-align: left !important;
    }

    h2{
        text-align: left;
        padding-left: 0;
    }


</style>
<style scoped lang="scss">
    .steps{
        display: grid;
        grid-template-rows: max-content max-content max-content;
        row-gap: 45px;

        > div{
            align-self: center;
        }
    }
</style>