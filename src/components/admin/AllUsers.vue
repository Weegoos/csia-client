<template>
  <div class="q-pa-sm">
    <q-table
      @row-click="openDetailedInfo"
      flat
      dark
      bordered
      title="User(-s)"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-avatar="props">
        <q-td align="center">
          <q-avatar size="60px" v-if="props.row.photoUrl">
            <img :src="props.row.photoUrl" alt="User Image" />
          </q-avatar>
          <q-avatar size="60px" color="grey-4" text-color="black" v-else>
            ?
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-delete="props">
        <q-td align="center">
          <q-btn
            flat
            color="red-4"
            icon="mdi-delete"
            @click="deleteUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <DetailedInformationAboutUsers
      :isOpenedDetailedInfoAboutUser="Boolean(isOpenedDetailedInfoAboutUser)"
      @closeDetailedInformationAboutUser="closeDetailedInformationAboutUser"
      :allInfoAboutUser="Object(allInfoAboutUser)"
    />
  </div>
</template>

<script setup>
import { Cookies, useQuasar } from "quasar";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";
import DetailedInformationAboutUsers from "./DetailedInformationAboutUsers.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const columns = [
  {
    name: "avatar",
    label: "Фото",
    field: "photoUrl",
    align: "center",
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

    const users = allUsers.value.content ?? [];

    const usersWithPhotos = await Promise.all(
      users.map(async (user) => {
        if (user.profileImage) {
          try {
            const response = await fetch(
              `${serverURL}user/image/${user.profileImage}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`, // или cookies
                },
              }
            );
            if (!response.ok)
              throw new Error("Не удалось получить изображение");

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            return { ...user, photoUrl: imageUrl };
          } catch (err) {
            console.warn(`Ошибка загрузки фото для user ${user.id}`, err);
            return { ...user, photoUrl: null };
          }
        } else {
          return { ...user, photoUrl: null };
        }
      })
    );

    rows.value = usersWithPhotos;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (row) => {
  try {
    deleteMethod(serverURL, "user", `delete?id=${row.id}`);
    console.log(row);
  } catch (error) {
    console.error(error);
  }
};

const isOpenedDetailedInfoAboutUser = ref(false);
const allInfoAboutUser = ref([]);
const openDetailedInfo = (err, row, instance) => {
  console.log(row);
  isOpenedDetailedInfoAboutUser.value = true;
  allInfoAboutUser.value = row;
};

const closeDetailedInformationAboutUser = () => {
  isOpenedDetailedInfoAboutUser.value = false;
};

onMounted(() => {
  getAllUsers();
});
</script>

<style></style>
