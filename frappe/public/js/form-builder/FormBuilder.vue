<template>
    <div class="layout-main-section row">
      <div class="col-3">
        <DoctypeFieldSet />
      </div>
      <div class="print-format-container col-9">
        <keep-alive>
          <DoctypeBuilder />
        </keep-alive>
      </div>
          <SettingsSidebar />
    </div>
</template>
<script>

import DoctypeBuilder from './DoctypeBuilder.vue';
import DoctypeFieldSet from './DoctypeFieldSet.vue';
import SettingsSidebar from './DoctypeSettingsSidebar.vue';

export default {
  name: "PrintFormatBuilder",
  props : ["doctype_format_name"],
  components: {
    DoctypeBuilder,
    DoctypeFieldSet,
    SettingsSidebar
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