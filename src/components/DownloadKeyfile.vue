<template>
    <b-row align-h="center" align-v="center">
        <b-col lg="6" md="10">
            <KeyCard :address="address" :mnemonic="mnemonic" class="keycard"></KeyCard>
        </b-col>
        <b-col lg="5" md="10" class="right_col" offset-lg="1">
            <h1 style="text-align: left">Keyfile</h1>
            <p>Before we reveal your address and key phrase you must download your key file. This key file is encrypted with a password, and can be used to access your wallet.</p>


            <b-row align-h="left">
                <b-col lg="8">
                    <form @submit.prevent="submit">
                        <input type="password" placeholder="Password" autocomplete="off" v-model="password">
                        <input type="password" placeholder="Confirm Password" autocomplete="off" v-model="confirmPass">
                        <p class="errs">{{err}}</p>
                        <div class="submit">
                            <transition name="fade" mode="out-in">
                                <button class="but_primary" :disabled="!canSubmit" v-if="!isLoad">Download Key File <br>& View Address</button>
                                <Spinner v-else></Spinner>
                            </transition>
                        </div>

                    </form>
                </b-col>
            </b-row>
        </b-col>
    </b-row>

</template>
<script>
    import * as avalanche from 'avalanche';
    import KeyCard from "@/components/KeyCard";
    import Spinner from '@/components/misc/Spinner';

    const cryptoHelpers = new avalanche.CryptoHelpers();
    const bintools = avalanche.BinTools.getInstance();

    export default {
        data(){
            return {
                password: "",
                confirmPass: "",
                isLoad: false,
            }
        },
        props: {
            keyPair: Object,
            address: String,
            mnemonic: String
        },
        components: {
            KeyCard,
            Spinner
        },
        computed: {
            err(){
                if(!this.password) return "";

                if(this.password.length < 9) return "Password must be at least 9 characters long.";
                if(this.password != this.confirmPass) return "Passwords do not match.";

                return "";
            },
            canSubmit(){
                let pass = this.password;

                if(pass.length < 9){
                    return false;
                }

                if(pass !== this.confirmPass){
                    return false;
                }
                return true;
            }
        },
        methods: {
            submit(){
                let parent = this;
                this.isLoad = true;

                setTimeout(async ()=> {
                    await parent.exportKey();
                    parent.isLoad = false;
                    parent.oncomplete();
                }, 1000);
            },
            oncomplete(){
                this.$emit('complete');
            },

            async exportKey(){
                let pass = this.password;
                let salt = await cryptoHelpers.makeSalt();
                let passHash = await cryptoHelpers.pwhash(pass, salt);


                // Loop private keys, encrypt them and store in an array
                let key = this.keyPair;
                let pk = key.getPrivateKey();
                let addr = this.address;

                const KEY_TYPE = 'singleton';

                let pk_crypt = await cryptoHelpers.encrypt(pass,pk,salt);
                let key_data = {
                    key: bintools.avaSerialize(pk_crypt.ciphertext),
                    nonce: bintools.avaSerialize(pk_crypt.nonce),
                    address: addr,
                    type: KEY_TYPE
                };

                let keys = [key_data];

                const KEYSTORE_VERSION = '2.0';


                let file_data = {
                    salt: bintools.avaSerialize(salt),
                    pass_hash: bintools.avaSerialize(passHash.hash),
                    keys: keys,
                    version: KEYSTORE_VERSION
                };

                // Download the file

                let text = JSON.stringify(file_data);


                let filename = `AVA_${addr}`;

                var blob = new Blob(
                    [ text ],
                    {
                        type : "application/json"
                    }
                );
                let url = URL.createObjectURL( blob );
                var element = document.createElement('a');
                element.setAttribute('href', url);
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }
    }
</script>
<style scoped lang="scss">
    $blursize: 0.2rem;
    .keycard{
        -webkit-filter: blur($blursize);
        -moz-filter: blur($blursize);
        -o-filter: blur($blursize);
        -ms-filter: blur($blursize);
        filter: blur($blursize);
    }

    .right_col{
        border-left: 2px solid #f2f2f2;
        text-align: left !important;
    }

    .errs{
        font-size: 12px;
        color: #E84142;
    }

    .submit{
        display: flex;
        justify-content: center;
    }
</style>