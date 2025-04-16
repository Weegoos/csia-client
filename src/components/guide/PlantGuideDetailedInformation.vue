<template>
  <div v-show="isClicked">
    <section v-if="isClicked === true">
      <q-btn icon="mdi-arrow-left" @click="goToTheWrapper" />
    </section>
    <q-img
      v-if="imageSrc"
      :src="imageSrc"
      style="border-radius: 7px"
      :ratio="16 / 9"
      spinner-color="primary"
      spinner-size="82px"
    />
    <div v-else>Загрузка...</div>
    <section class="info">
      <span class="text-h4 text-body">{{ allInformationAboutPlant.name }}</span
      ><br />
      <span class="text-subtitle1 text-grey">
        {{ allInformationAboutPlant.type }}
      </span>
    </section>
    <section class="sentences q-pa-sm q-my-md">
      <span class="text-body2 text-white">
        {{ allInformationAboutPlant.characteristic.temperatures.sentence }}
      </span>
      <br />
      <br />
    </section>
    <section>
      <div class="row q-gutter-md">
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-flower" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.difficulty }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-thermometer" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.characteristic.humidity.scale }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-water" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.characteristic.water.difficulty }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-fire-alert" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.characteristic.toxicity.toxicTo }}
          </p>
        </section>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Water</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #1a5276"
          name="mdi-water-plus"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.water.when
        }}</span>
      </div>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #1a5276"
          name="mdi-water-check"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.water.tip
        }}</span>
      </div>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #1a5276"
          name="mdi-water-outline "
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.water.difficulty
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Light</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #d4ac0d"
          name="mdi-lightbulb-on"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.light.preferredLight
        }}</span>
      </div>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #d4ac0d"
          name="mdi-lightbulb"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.light.preferredLight
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Toxicity</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #e74c3c"
          name="mdi-water-alert"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.toxicity.toxicTo
        }}</span>
      </div>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #e74c3c"
          name="mdi-skull"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.toxicity.power
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Humidity</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #95a5a6"
          name="mdi-weather-pouring"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.humidity.scale
        }}</span>
      </div>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #95a5a6"
          name="mdi-water-percent"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.humidity.ratio
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Common Problems</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #922b21"
          name="mdi-seed"
          size="20px"
        />
        <span class="q-ml-sm text-body2"
          >{{ allInformationAboutPlant.characteristic.common_problems.name }} -
          <span>{{
            allInformationAboutPlant.characteristic.common_problems.detail
          }}</span>
        </span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Common Pests</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #922b21"
          name="mdi-seed"
          size="20px"
        />
        <span class="q-ml-sm text-body2"
          >{{ allInformationAboutPlant.characteristic.common_pests.name }} -
          <span>{{
            allInformationAboutPlant.characteristic.common_pests.detail
          }}</span>
        </span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Liguid Fertilizing</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #9a7d0a"
          name="mdi-sprout"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.liquid_fertilizing
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Hardiness</span>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              color="white"
              style="background-color: #52be80; border-radius: 54px"
              name="mdi-thermometer"
              class="q-pa-sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-white text-bold text-body1"
              caption
              lines="2"
              >{{
                allInformationAboutPlant.characteristic.temperatures.start
              }}°C
            </q-item-label>
            <q-item-label class="text-white text-body2" caption lines="2">
              Lowest temp.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              color="white"
              style="background-color: #52be80; border-radius: 54px"
              name="mdi-thermometer"
              class="q-pa-sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-white text-bold text-body1"
              caption
              lines="2"
              >{{ allInformationAboutPlant.characteristic.temperatures.end }}°C
            </q-item-label>
            <q-item-label class="text-white text-body2" caption lines="2">
              Highest temp.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 text-grey">Indoor months</q-item-label>
            <q-item-label lines="2">{{
              allInformationAboutPlant.characteristic.temperatures.indoorMonths
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 text-grey"
              >Outdoor months</q-item-label
            >
            <q-item-label lines="2">{{
              allInformationAboutPlant.characteristic.temperatures.outDoorMonths
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Clean</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #f1948a"
          name="mdi-broom"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.clean
        }}</span>
      </div>
    </section>
    <section class="sentences q-my-md q-pa-md">
      <span class="text-h6 text-bold">Leaves</span>
      <div class="q-py-sm">
        <q-icon
          class="q-pa-sm"
          style="border-radius: 54px; background-color: #239b56"
          name="mdi-leaf"
          size="20px"
        />
        <span class="q-ml-sm text-body2">{{
          allInformationAboutPlant.characteristic.leaves.type
        }}</span>
      </div>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-grey">Leaf color</q-item-label>
          <q-item-label
            class="q-pa-sm"
            lines="2"
            style="
              border: solid white 1px;
              border-radius: 54px;
              width: 75px;
              text-align: center;
            "
            >{{
              allInformationAboutPlant.characteristic.leaves.color
            }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import JSZip from "jszip";
import { Cookies } from "quasar";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const props = defineProps({
  isClickedToTheDetailedPage: {
    type: Boolean,
    default: false,
  },
  allInformationAboutPlant: {
    type: Object,
    default: () => ({}),
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

const isClicked = ref(props.isClickedToTheDetailedPage);
watch(
  () => props.isClickedToTheDetailedPage,
  (newValue) => {
    isClicked.value = newValue;
  }
);

const imageSrc = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get(
      `${serverURL}plant/images?fileIds=${props.allInformationAboutPlant.images[0]}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        responseType: "blob",
      }
    );

    const zip = await JSZip.loadAsync(response.data);
    const files = Object.keys(zip.files);
    console.log("ZIP содержимое:", files);

    for (const fileName of files) {
      const file = zip.files[fileName];
      if (!file.dir && file.name.match(/\.(jpg|jpeg|png|gif|jfif)$/i)) {
        const blob = await file.async("blob");
        imageSrc.value = URL.createObjectURL(blob);
        break;
      }
    }
  } catch (error) {
    console.error("Ошибка при извлечении изображения из ZIP:", error);
  }
});

const emit = defineEmits(["goToTheWrapper"]);
const goToTheWrapper = () => {
  emit("goToTheWrapper");
};
</script>

<style scoped>
.sentences {
  background-color: #30322e;
  border-radius: 8px;
}
</style>
