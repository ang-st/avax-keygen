<template>
    <div class="steps" :step="step">
        <DownloadKeyfile class="step_0" :mnemonic="mnemonic" :key-pair="keyPair" :address="address" @complete="step=1"></DownloadKeyfile>
        <SaveMnemonic class="step_1" :mnemonic="mnemonic" @complete="step=2"></SaveMnemonic>
        <CopyAddress class="step_2" :address="address"></CopyAddress>
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
        },
        data(){
            return {
                step: 2,
            }
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
        padding: 40px 0px;

        > div{
            align-self: center;
        }

        $blursize: 0.5rem;
        &[step="0"]{
            .step_1, .step_2{
                -webkit-filter: blur($blursize);
                -moz-filter: blur($blursize);
                -o-filter: blur($blursize);
                -ms-filter: blur($blursize);
                filter: blur($blursize);
                pointer-events: none;
                user-select: none;
            }
        }

        &[step="1"]{
            .step_2{
                -webkit-filter: blur($blursize);
                -moz-filter: blur($blursize);
                -o-filter: blur($blursize);
                -ms-filter: blur($blursize);
                filter: blur($blursize);
                pointer-events: none;
                user-select: none;
            }
        }
    }
</style>