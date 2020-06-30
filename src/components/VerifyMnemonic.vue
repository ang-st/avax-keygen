<template>
    <div class="verify" v-if="isActive">
        <div class="bg" @click="close"></div>
        <div class="content">
            <button @click="close" class="close_but"><fa icon="times"></fa></button>
            <h4>Fill In Mnemonic Phrase Below</h4>
            <div class="words">
                <div v-for="i in 24" :key="i" class="mnemonic_in" tabindex="-1">
                    <p>{{i}}.</p>
                    <input type="text" v-model="keysIn[i-1]" :disabled="!hiddenIndeces.includes(i-1)">
                </div>
            </div>
            <p class="err">{{err}}</p>
            <button class="but_primary" @click="verify">Verify</button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                isActive: false,
                keysIn: [],
                hiddenIndeces: [],
                err: "",
            }
        },
        created(){
            var wordsLen = 24;
            this.keysIn = Array(wordsLen).join(".").split(".");

            // Hide 4 words
            let hideNum = 4;
            let hidden = [];

            while(hidden.length < hideNum){
                let hideIndex = Math.floor(Math.random() * wordsLen);
                if(!hidden.includes(hideIndex)){
                    hidden.push(hideIndex)
                }
            }

            this.words.forEach((word,i) => {
                if(!hidden.includes(i)){
                    this.keysIn[i] = word
                }
            });

            this.hiddenIndeces = hidden;
        },
        props: {
            mnemonic: String
        },
        computed: {
            words(){
                return this.mnemonic.split(' ');
            }
        },
        methods: {
            close(){
                this.isActive = false;
            },
            formCheck(){
                this.err = "";
                let userWords = this.keysIn;

                for(var i=0;i<userWords.length; i++){
                    let userWord = userWords[i].trim();
                    let trueWord = this.words[i].trim();

                    if(userWord.length === 0){
                        this.err = `Oops looks like you forgot to fill number ${i+1}`;
                        return false;
                    }

                    if(userWord !== trueWord){
                        this.err = `The mnemonic phrase you entered for word ${i+1} not match the actual phrase.`;
                        return false;
                    }
                }

                return true;
            },
            verify(){
                if(!this.formCheck()) return;



                this.close();
                this.$emit('complete');
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

    .words{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 14px;
        font-size: 0.8rem;
        margin-bottom: 30px;
    }

    .mnemonic_in{
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #666;
        outline: none;
        /*outline: 2px solid #E84142;*/
        /*border-radius: 2px;*/

        p{
            margin: 0;
            color: #666;
        }

        input{
            background-color: transparent;
            margin: 0;
            border: none;
            width: 40px;
            flex-grow: 1;

            &[disabled]{
                outline: none;
                pointer-events: none;
                opacity: 0.6;
            }
            /*outline: none;*/
        }
    }

    .but_primary{
        /*width: max-content;*/
        width: 80%;
        margin: 0px auto;
        padding: 8px 30px;
    }

    .err{
        width: 80%;
        height: 60px;
        margin: 0px auto;
        text-align: left;
        color: #E84142;
    }
</style>