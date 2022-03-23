<template>
    <div class="print-format-main">
        <draggable class="draggable-list" :list="this.doctype.fields" group="fields">

            <div v-for="(field, id) in this.doctype.fields" :key="id" @click="select(id)" v-bind:class="issection(field.fieldtype)">
              {{ field.label }} 
			  <button @click="remove(id)" >delete</button> 
            </div>

        </draggable>
    </div>
</template>


<script>
import draggable from "vuedraggable";
import { bus } from './FormBuilder.vue'

export default {
    name: "DoctypeBuilder",
	props : ["doctype"],
    components: {
        draggable
    },
  methods: {
	  issection: function(type) 
	  {
		  return type == "Section Break" ? 'list-item section-break' : 'list-item';
	  },
	  remove: function(id)
	  {
		  this.doctype.fields.splice(id, 1);
	  },
	  select: function(id)
	  { 
		if(this.doctype.fields.length <= id)
		id = null

		bus.$emit('fieldchanged', id);
	  }
  }
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
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	cursor: pointer;
}

.section-break{
	margin-top: 1em;
	border: none;
	border-radius: none;
	font-size: var(--text-md);
}

</style>

