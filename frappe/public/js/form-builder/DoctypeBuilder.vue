<template>
    <div class="print-format-main">
        <draggable class="draggable-list" :list="list2" group="fields">
            <div class="list-item" v-for="element in list2" :key="element.name">
              {{ element.label }}
            </div>
        </draggable>
    </div>
</template>


<script>
import draggable from "vuedraggable";

export default {
    name: "DoctypeBuilder",
    components: {
        draggable
    },
	data() {
		return {
		list2: [{
					label: __("ID (name)"),
					fieldname: "name",
					fieldtype: "Data"
				},
				{
					label: __("Email"),
					fieldname: "email",
					fieldtype: "Data"
				},
				],
		};
  },
}

</script>


<style scoped>
.print-format-main {
	position: relative;
	margin-right: auto;
	margin-left: auto;
	background-color: white;
	box-shadow: var(--shadow-lg);
	border-radius: var(--border-radius);
}
.draggable-list {
    height: 50vh;
}

.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 400px;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	cursor: pointer;
}

</style>

