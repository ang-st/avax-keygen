<template>
    <b-row align-h="center">
        <b-col lg="6" md="10">
            <div >
                <h1>AVA Key Generation</h1>
                <p>This is a simple website to generate private keys and addresses to use with AVA. Click <b>Generate Key</b> to get started.</p>
                <button class="but_primary" @click="generateKey" >Generate Key</button>
            </div>
        </b-col>
    </b-row>
</template>
<script>
    export default {
        methods: {
            generateKey(){
                this.$emit('generateKey');
            }
        }
    }
</script>