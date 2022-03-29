<template>
    <div class="form-builder-workspace">
        <draggable class="draggable-list" :list="this.doctype.fields" group="fields">

            <div v-for="(field, id) in this.doctype.fields" :key="id" @click="select(id)" v-bind:class="issection(field)" >
              
			  <div class="sidebar-menu-sub-section">
					<div class="sidebar-label">{{ field.label }} </div>
					<div class="form-group">
						<div class="control-input-wrapper">
							<div class="control-input">
								<input
									class="mb-2 form-control form-control-sm"
									type="text"
								/>
							</div>
						</div>
					</div>
					
				</div>
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
    
	data() {
		return {
			current_selected_item :null
		};
	},
	components: {
        draggable
    },
  methods: {
	  issection: function(type) 
	  {
		//   if(type.fieldtype == "Section Break" && type.idx ==current_selected_item){
		// 	  return "list-item section-break active"
		//   }
		//   else if (type.idx ==current_selected_item){
		// 	  return "list-item active"
		//   }
		//   else{
		// 	  return "list-item"
		//   }
		return type == "Section Break" ? 'list-item section-break' : 'list-item';
	  },
	  remove: function(id)
	  {
		  this.doctype.fields.splice(id, 1);
	  },
	  select: function(id)
	  { 
		current_selected_item = id;
		if(this.doctype.fields.length <= id)
		id = null

		bus.$emit('fieldchanged', id);
	  }
  }
}
</script>


<style scoped>

.form-builder-workspace 
{
	position: relative;
	background-color: white;
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius);
}

.draggable-list {
    padding: 1rem 0.5rem;
}

.list-item {
	display: flex;
	width:35%;
	/* justify-content: space-between; */
	/* align-items: center; */
	/* background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400); */
	height:100%;
	margin: var(--margin-lg) 0;
	padding:0;
	font-size: var(--text-sm);
	cursor: pointer;
}

.active {
	border-radius: var(--border-radius);
	border: 1px solid var(--primary); 
}
.section-break{
	margin-top: 1em;
	border: none;
	border-radius: none;
	font-size: var(--text-md);
}

.sidebar-menu-sub-section {
    margin: var(--margin-xs); 
	width :100%;
}

.sidebar-label {
    color: var(--text-color);
    line-height: 1.5;
    font-weight: 400;
    font-size: var(--text-sm);
	margin: var(--margin-xs);
}

</style>

