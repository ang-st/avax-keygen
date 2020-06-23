<template>
    <b-container>
<!--        <transition-group name="fade" mode="out-in" tag="div">-->
            <Intro v-if="stage==='intro'" @generateKey="generateKey" key="intro"></Intro>
            <DownloadKeyfile v-else-if="stage==='keystore'" :mnemonic="mnemonic" :address="address" key="keystore" :key-pair="keyPair" @complete="afterDownload"></DownloadKeyfile>
            <Final v-else-if="stage==='final'" :mnemonic="mnemonic" :address="address" key="final" @restart="restart"></Final>
<!--        </transition-group>-->

    </b-container>
</template>

<script>
    import Intro from "@/components/Intro";
    import DownloadKeyfile from "@/components/DownloadKeyfile";
    import Final from '@/components/Final';

    import {Buffer} from "buffer/";
    import * as bip39 from 'bip39';
    import * as avalanche from 'avalanche';

    // import MnemonicDisplay from '@/components/misc/MnemonicDisplay';


    const IP = 'bootstrap.ava.network';
    const PORT = '21000';
    const PROTOCOL = 'https';
    const NETWORK_ID = '3';
    const CHAIN_ID = 'X';

    const ava = new avalanche.Avalanche(IP, parseInt(PORT), PROTOCOL, parseInt(NETWORK_ID), CHAIN_ID);
    const avm = ava.AVM();
    const keyChain = avm.keyChain();
    const cryptoHelpers = avalanche.CryptoHelpers;
    const bintools = avalanche.BinTools.getInstance();



    export default {
        name: 'Home',
        components:{
            Intro,
            DownloadKeyfile,
            Final
            // MnemonicDisplay
        },
        data(){
            return {
                keyPair: null,
                keyChain: null,
                isKeyDownloaded: false,
                keyPhrase: "",
                newPrivateKey: "",
                address: "",
                mnemonic: ""
            }
        },
        methods: {
            restart(){
                this.keyPair = null;
                this.keyChain = null;
                this.isKeyDownloaded = false;
                this.keyPhrase = "";
                this.newPrivateKey = "";
                this.address = "";
                this.mnemonic = "";
            },

            generateKey(){
                let mnemonic = bip39.generateMnemonic(256);
                let entropy = bip39.mnemonicToEntropy(mnemonic);
                let b = new Buffer(entropy, 'hex');

                const addr = keyChain.importKey(b);
                const keypair = keyChain.getKey(addr);

                this.keyPair = keypair;
                this.address = keypair.getAddressString();
                this.newPrivateKey = keypair.getPrivateKeyString();
                this.mnemonic = mnemonic;
            },

            afterDownload(){
                this.isKeyDownloaded = true;
            }
        },
        computed: {
            stage(){
                if(!this.mnemonic){
                    return 'intro';
                }

                if(this.mnemonic && !this.isKeyDownloaded){
                    return 'keystore';
                }
                return  'final';
            }
        }
    }
</script>
<style scoped lang="scss">

</style>
