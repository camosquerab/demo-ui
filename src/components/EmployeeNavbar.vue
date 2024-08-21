<template>
    <v-app-bar app>
      <v-toolbar-title>DC Latam</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn 
        :to="{
          name: 'home',
        }"
        >Home
      </v-btn>

      <v-btn 
        :to="{
          name: 'search',
        }"
        >Search
      </v-btn>
    </v-app-bar>
  </template>
  