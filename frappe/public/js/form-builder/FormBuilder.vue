<template>
    <div class="layout-main-section row">

      <div class="col-2">
        <!-- {{this.doctype_format_name.name}} -->
        <DoctypeFieldSet :doctype="this.doctype_format_name" />
      </div>

      <div class="print-format-container col-8">
        <keep-alive>
          <DoctypeBuilder :doctype="this.doctype_format_name"/>
        </keep-alive>
      </div>

      <div class="col-2">
        <FieldInspector/>
      </div>

    </div>
</template>
<script>

import DoctypeBuilder from './DoctypeBuilder.vue';
import DoctypeFieldSet from './DoctypeFieldSet.vue';
import FieldInspector from './FieldInspector.vue';

export default {
  name: "PrintFormatBuilder",
  props : ["doctype_format_name"],
  components: {
    DoctypeBuilder,
    DoctypeFieldSet,
    FieldInspector,
    // SettingsSidebar
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