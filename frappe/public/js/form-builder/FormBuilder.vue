<template>
    <div class="layout-main-section row">

      <div class="col-2">
        <DoctypeFieldSet/>
      </div>

      <div class="print-format-container col-8">
        Doctype Fields: {{ this.doctype.fields.length }}
        <keep-alive>
          <DoctypeBuilder :doctype="this.doctype"/>
        </keep-alive>
      </div>

      <div class="col-2">

        <!-- <div v-if="this.current_field != null">
          {{ this.current_field.label}}
          </div>
        <div v-else>
          No field Selected
		    </div> -->
        
        <br>

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

.print-format-container {
	height: calc(100vh - 140px);
	overflow-y: auto;
	padding-top: 0.5rem;
	padding-bottom: 4rem;
  margin-top: 0.5rem;
}
</style>