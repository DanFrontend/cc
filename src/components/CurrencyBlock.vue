<template>
  <v-card class="d-flex pa-6 mb-6">
    <div class="text-subtitle-2">{{ typeBlock[type] }}</div>
    <v-select
      v-model="select"
      class="select mr-6"
      :hint="`${select.name}, ${select.code}`"
      :items="currency"
      :item-text="'name'"
      :item-value="'name'"
      label="Select"
      persistent-hint
      return-object
      single-line
    ></v-select>
    <slot></slot>
    <slot name="reserves"></slot>
  </v-card>
</template>

<script>
export default {
  name: "CurrencyBlock",
  props: {
    code: {
      type: String,
      default: "usd",
    },
    type: {
      type: String,
      default: "",
      require: true,
    },
    selectParent: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currency: [
        {
          id: 11,
          code: "uah",
          name: "Гривня",
        },
        {
          id: 12,
          code: "usd",
          name: "Долар США",
        },
        {
          id: 13,
          code: "eur",
          name: "Євро",
        },
        {
          id: 14,
          code: "zlt",
          name: "Злотий",
        },
      ],
      typeBlock: {
        give: "Віддаю",
        get: "Отримую",
      },
      select: {},
    };
  },
  mounted() {
    this.select = this.currency.find((curr) => curr.code === this.code);
    this.$store.commit(`SET_${this.type.toUpperCase()}`, this.select);
  },
  watch: {
    select(value) {
      this.$store.commit(`SET_${this.type.toUpperCase()}`, value);
      this.$emit("update");
    },
    selectParent(value) {
      this.select = value;
    },
  },
};
</script>

<style scoped>
.select {
  width: 250px;
}
</style>
