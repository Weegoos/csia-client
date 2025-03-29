<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-header reveal elevated class="bg-black">
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title> Planta </q-toolbar-title>
          <q-btn
            round
            dense
            icon="notifications"
            color="green-4"
            class="q-mr-xs"
          />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
      <q-footer
        v-model="footer"
        reveal
        elevated
        style="background-color: #30222e"
      >
        <q-toolbar class="text-white" style="background-color: #30222e">
          <div class="row q-mr-sm">
            <div class="col">
              <q-btn flat round dense icon="assignment_ind" />
            </div>
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup></script>

<style></style>
