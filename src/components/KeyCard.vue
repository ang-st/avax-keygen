<template>
    <div class="key">
        <div>

        </div>
        <div>
            <div>
                <label>Address</label>
                <p class="important">{{address}}</p>
            </div>
            <div>
                <label>Mnemonic Key Phrase</label>
                <p class="important">{{mnemonic}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            address: String,
            mnemonic: String
        }
    }
</script>
<style scoped lang="scss">
    .important{
        font-family: Helvetica, monospace;
        text-align: left;
        font-size: 15px;
        /*background-color: #f2f2f2;*/
        /*padding: 10px 1;*/
        border-radius: 3px;
    }

    .key{
        margin: 30px 0px;
        padding: 8px 14px;
        /*display: grid;*/
        /*grid-template-columns: 60px 1fr;*/
        border: 1px solid #ddd;
        box-shadow: 2px 0px 4px rgba(0,0,0,0.1);
        border-radius: 8px;
    }
</style>