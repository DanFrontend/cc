<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <h2>Currenncy Converter</h2>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="main">
      <div class="d-flex">
        <div class="pr-12">
          <currency-block
            type="give"
            :selectParent="selectGive"
            @update="setCountGive()"
          >
            <v-text-field
              ref="give"
              v-model.lazy.number="countGive"
              label="Amount of money"
              type="number"
            />
          </currency-block>

          <div
            @click="revers()"
            class="revers"
            :class="{ disabled: !isPairRevers }"
          >
            &#8593;&#8595;
          </div>

          <currency-block
            type="get"
            code="uah"
            :selectParent="selectGet"
            @update="setCountGet()"
          >
            <v-text-field
              ref="get"
              v-model.lazy.number="countGet"
              label="Amount of money"
              type="number"
            />
            <template #reserves>
              <div class="reserv">
                Резерв:
                {{ $store.getters.reserv && $store.getters.reserv.value }}
              </div>
            </template>
          </currency-block>

          <div v-if="$store.getters.pair" class="d-flex justify-space-between">
            <div class="text-uppercase">
              Курс обміну: 1 {{ $store.getters.pair.send.code }} =
              {{ $store.getters.pair.rate.receive }}
              {{ $store.getters.pair.receive.code }}
            </div>
            <v-btn
              @click="change()"
              :disabled="!isReserv || !countGet || !countGive"
              >Обміняти</v-btn
            >
          </div>

          <v-alert v-if="!isReserv" class="mt-3" density="compact" type="error"
            >Недостатній резерв</v-alert
          >
          <v-alert
            v-if="!$store.getters.pair"
            class="mt-3"
            density="compact"
            type="error"
            >Пари немає</v-alert
          >
        </div>
        <table-change />
      </div>
    </v-main>
    <chart />
  </v-app>
</template>

<script>
import CurrencyBlock from "./components/CurrencyBlock";
import TableChange from "./components/TableChange";
import currencyPairs from "../enums/currencyPairs";
import Chart from "./components/Chart";
export default {
  name: "App",
  components: {
    CurrencyBlock,
    TableChange,
    Chart,
  },
  data() {
    return {
      countGive: 0,
      countGet: 0,
      selectGive: {},
      selectGet: {},
    };
  },
  watch: {
    countGive() {
      if (this.$refs.get.$el.classList.contains("v-input--is-focused")) return;
      this.setCountGive();
    },
    countGet() {
      if (this.$refs.give.$el.classList.contains("v-input--is-focused")) return;
      this.setCountGet();
    },
    "$store.getters.pair"(value) {
      if (!value) {
        this.countGive = 0;
        this.countGet = 0;
      }
    },
  },
  computed: {
    isReserv() {
      return this.$store.getters.reserv?.value - this.countGet > 0;
    },
    isPairRevers() {
      return currencyPairs.filter(
        (pair) =>
          pair.receive.id === this.$store.state.give.id &&
          pair.send.id === this.$store.state.get.id
      )[0];
    },
  },
  methods: {
    change() {
      this.$store.commit("ADD_EXCHANGE_OPERATION", {
        id: this.$store.state.exchangeOperations.length + 1,
        get: `${this.countGet} ${this.$store.state.get.code}`,
        give: `${this.countGive} ${this.$store.state.give.code}`,
        code: this.$store.state.give.code,
        receive: `1 = ${this.$store.getters.pair.rate.receive}`,
      });
      this.$store.commit("SET_RESERV", this.countGet);
    },
    setCountGive() {
      if (!this.countGive || !this.$store.getters.pair) return;
      this.countGet = (
        this.countGive * this.$store.getters.pair.rate.receive
      ).toFixed(2);
    },
    setCountGet() {
      if (!this.countGet || !this.$store.getters.pair) return;
      this.countGive = (
        this.countGet / this.$store.getters.pair.rate.receive
      ).toFixed(2);
    },
    revers() {
      this.selectGet = this.$store.state.give;
      this.selectGive = this.$store.state.get;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 20px auto;
  max-width: 1200px;
  max-height: 500px;
}
.reserv {
  position: absolute;
  right: 10px;
  top: 3px;
}
.revers {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-bottom: 18px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px gray;
  }
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
