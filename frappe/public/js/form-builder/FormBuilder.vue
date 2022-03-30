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
export const bus = new Vue();

export default {
  name: "DoctypeFormBuilder",
  props : ["doctype_meta"],
  data() {
   return {
       doctype: this.doctype_meta,
     }
   },
  components: {
    DoctypeBuilder,
    DoctypeFieldSet,
    FieldInspector,
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