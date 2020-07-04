<template>
    <b-container>
        <Intro v-if="stage==='intro'" @generateKey="generateKey" key="intro"></Intro>
        <FormSteps v-else :mnemonic="mnemonic" :hd_address="hdAddress" :master_keypair="master_keypair"></FormSteps>
    </b-container>
</template>

<script>
    import Intro from "@/components/Intro";
    // import DownloadKeyfile from "@/components/DownloadKeyfile";
    import FormSteps from '@/components/FormSteps';
    // import Final from '@/components/Final';

    import {Buffer} from "buffer/";
    import * as bip39 from 'bip39';
    import HDKey from 'hdkey';
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


    // m / purpose' / coin_type' / account' / change / address_index
    const AVA_TOKEN_INDEX = "9000";
    const HD_PATH = `m/44'/${AVA_TOKEN_INDEX}'/0'/0/0`; // Path that will derive the first key


    export default {
        name: 'Home',
        components:{
            Intro,
            // DownloadKeyfile,
            // Final,
            FormSteps
            // MnemonicDisplay
        },
        data(){
            return {
                master_keypair: null,
                keyChain: null,
                isKeyDownloaded: false,
                keyPhrase: "",
                hdAddress: "",
                mnemonic: ""
            }
        },
        methods: {
            restart(){
                this.keyPair = null;
                this.keyChain = null;
                this.isKeyDownloaded = false;
                this.keyPhrase = "";
                this.address = "";
                this.mnemonic = "";
            },

            generateKey(){
                let mnemonic = bip39.generateMnemonic(256);

                // Get HD Key
                let seed = bip39.mnemonicToSeedSync(mnemonic);
                let hdkey = HDKey.fromMasterSeed(seed);

                let key = hdkey.derive(HD_PATH);

                let pkHex = key.privateKey.toString('hex');
                let pkBuf = new Buffer(pkHex, 'hex');
                let addr = keyChain.importKey(pkBuf);

                // Get master key
                let entropy = bip39.mnemonicToEntropy(mnemonic);
                let b = new Buffer(entropy, 'hex');
                const masterAddr = keyChain.importKey(b);

                const masterKeypair = keyChain.getKey(masterAddr);
                const hdKeypair = keyChain.getKey(addr);

                this.master_keypair = masterKeypair;
                this.hdAddress = hdKeypair.getAddressString();
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
