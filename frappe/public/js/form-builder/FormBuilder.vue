<template>
    <div class="layout-main-section row">

      <div class="left-side">
        <DoctypeFieldSet :doctype="this.doctype"/>
      </div>

      <div class="doctype-container center-side">
        <keep-alive>
          <DoctypeBuilder :doctype="this.doctype"/>
        </keep-alive>
      </div>

      <div class="right-side feild-settings-container ">
        <FieldInspector :doctype="this.doctype"/>
      </div>

    </div>

</template>

<script>

import Vue from 'vue'
import DoctypeBuilder from './DoctypeBuilder.vue';
import DoctypeFieldSet from './DoctypeFieldSet.vue';
import FieldInspector from './FieldInspector.vue';
import { getStore } from "./store";

export const bus = new Vue();

export default {
  name: "DoctypeFormBuilder",
  props: ["doctype_meta"],
  components: {
    DoctypeBuilder,
    DoctypeFieldSet,
    FieldInspector,
  },
  data() {
   return {
       doctype: this.doctype_meta,
     };
  },
  provide() {
    return {
      $store: this.$store
    };
  },
  mounted() {
    this.$store.fetch().then(() => {
      console.log("Pehele:",this.$store.layout);
      if (!this.$store.layout) {
        console.log("Form Layout :",this.$store.layout);
        this.$store.layout = this.$store.get_default_layout();
        this.$store.save_changes();
      }
    });
  },
  computed: {
    $store() {
      return getStore(this.doctype.name);
    },
    shouldRender() {
      return Boolean(
        this.$store.doctype && 
          this.$store.meta && 
          this.$store.layout
      )
    }
  }
};
</script>

<style scoped>
.layout-main-section {
  margin: 0.2rem;
}

.doctype-container {
	height: calc(100vh - 140px);
	overflow-y: auto;
	padding-top: 0.5rem;
	padding-bottom: 4rem;
  margin-top: 0.5rem;
}

.feild-settings-container {
  height: calc(100vh - 140px);
	overflow-y: auto;
	padding-top: 0.5rem;
	padding-bottom: 4rem;
  margin-top: 0.5rem;
}
</style>