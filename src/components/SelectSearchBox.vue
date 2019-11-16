<template>
    <v-card class="body-2">
        <v-toolbar color="primary" dark flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1">Anzeige anpassen</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="mb-1 pa-4">
            <p>seletct search box:</p>
            <v-checkbox v-model="selected" label="Alle auswählen" value="all" hide-details="true"></v-checkbox>
            <v-checkbox v-model="selected" label="[NameOfSearch]" value="cb1" hide-details="true"></v-checkbox>
            <v-checkbox v-model="selected" label="[NameOfSearch]" value="cb2" hide-details="true"></v-checkbox>
            <v-checkbox v-model="selected" label="[NameOfSearch]" value="cb3" hide-details="true"></v-checkbox>
        </div>
    </v-card>
</template>
<script>
export default {
    name: 'SelectSearchBox',
    data() {
        return {
            selected: [],
        }
            
    },
    watch: {
        
    },
    methods: {

    }
};
</script>

<style>

</style>