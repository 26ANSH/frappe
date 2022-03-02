<template>
    <div class="layout-main-section row">
      <div class="col-2">
        <DoctypeFieldSet />
      </div>
      <div class="print-format-container col-10">
        <keep-alive>
          <DoctypeBuilder />
        </keep-alive>
      </div>
    </div>
</template>
<script>

import DoctypeBuilder from './DoctypeBuilder.vue';
import DoctypeFieldSet from './DoctypeFieldSet.vue';

export default {
  name: "PrintFormatBuilder",
  props : ["doctype_format_name"],
  components: {
    DoctypeBuilder,
    DoctypeFieldSet,
    // DoctypeSetting
  },
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