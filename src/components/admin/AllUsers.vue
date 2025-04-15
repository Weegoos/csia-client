<template>
  <div class="q-pa-sm">
    <q-table
      flat
      dark
      bordered
      title="User(-s)"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-actions>
        <q-td align="center">
          <q-avatar size="60px" font-size="52px">
            <img src="https://picsum.photos/500/300" alt="" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-delete="props">
        <q-td align="center">
          <q-btn
            flat
            color="red-4"
            icon="mdi-delete"
            @click="deleteUser(props)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const columns = [
  {
    name: "actions",
    label: "Image",
    align: "left",
    field: "id",
  },
  {
    name: "id",
    required: true,
    label: "Email",
    align: "left",
    field: (user) => user.email,
    sortable: true,
  },
  {
    name: "username",
    required: true,
    label: "Username",
    align: "left",
    field: (user) => user.username,
    sortable: true,
  },
  {
    name: "fio",
    required: true,
    label: "FCs",
    align: "left",
    field: (user) => user.fio,
    sortable: true,
  },
  {
    name: "delete",
    label: "Delete",
    align: "center",
    field: "id",
  },
];

const allUsers = ref([]);
const rows = ref([]);
const getAllUsers = async () => {
  try {
    await getMethod(
      serverURL,
      "admin/allUsers?page=0&size=10",
      allUsers,
      $q,
      "Ошибка при получении всех пользователей: "
    );
    // console.log(allUsers.value);
    rows.value = allUsers.value.content;
    console.log(rows.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllUsers();
});
</script>

<style></style>
