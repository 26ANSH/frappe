<template>
    <div class="layout-side-section">
        <div class="form-sidebar">
            <div class="sidebar-menu">
				<div class="sidebar-label">
					<div class="label-itemsets ">Fields</div>
				</div>
				<div>
					<input
						class="mb-2 form-control form-control-sm"
						type="text"
						:placeholder="__('Search fields')"
						v-model="search_text"
					/>
					<draggable
						class="fields-container"
						:list="fields"
						:group="{ name: 'fields', pull: 'clone', put: false }"
						:sort="false"
					>
						<div
							class="field"
							v-for="df in fields"
							:key="df.fieldname"
							:title="df.fieldname"
						>
						<div title="Label" class="field-label btn btn-default btn-sm sidebar-field ellipsis">
							<div>
								<span class="drag-handle" style="margin-right:0.6rem;" v-if="df.fieldtype=='Data'">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#ACB5BD" class="bi bi-textarea-t" viewBox="0 0 16 16">
									<path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
									<path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z"/>
									</svg>
								</span>
								<span class="drag-handle" style="margin-right:0.6rem;" v-else-if="df.fieldtype=='Attach'">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#ACB5BD" class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
									<path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
									<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
									</svg>
								</span>
								<span class="drag-handle" style="margin-right:0.6rem;" v-else-if="df.fieldtype=='Option'">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#ACB5BD" class="bi bi-list-ul" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
									</svg>
								</span>
								<span class="drag-handle" style="margin-right:0.6rem;" v-else>
									<svg class="icon icon-md"><use xlink:href="#icon-drag"></use></svg>
								</span>
								
								{{ df.label }}
							</div>
							<!-- <span class="fieldtype_label"> {{ df.fieldtype }} </span>

							<span class="drag-handle">
								<svg class="edit-profile-icon icon icon-xs"><use xlink:href="#icon-edit"></use></svg>
							</span> -->
					
						</div>
						</div>
					</draggable>
				</div>
			</div>
        </div>
    </div>
</template>


<script>
import FieldInspector from "./FieldInspector.vue";
import draggable from "vuedraggable";

export default {
    name: "DoctypeFieldSet",
    data() {
		return {
			search_text: "",
			inspect_current_element: null
		};
	},
	components: {
		draggable,
		FieldInspector
	},
	
    computed: {
        fields() {
			// let fields = this.meta.fields
			let fields = [{label:"Email",fieldtype:"Data"},{label:"Name",fieldtype:"Attach"}]
				.filter(df => {
					if (
						["Section Break", "Column Break"].includes(df.fieldtype)
					) {
						return false;
					}
					if (this.search_text) {
						if (df.fieldname.includes(this.search_text)) {
							return true;
						}
						if (df.label && df.label.includes(this.search_text)) {
							return true;
						}
						return false;
					} else {
						return true;
					}
				})
				.map(df => {
					let out = {
						label: df.label,
						fieldname: df.fieldname,
						fieldtype: df.fieldtype,
						options: df.options
					};
					if (df.fieldtype == "Table") {
						out.table_columns = get_table_columns(df);
					}
					return out;
				});

			return [
				{
					label: __("Custom HTML"),
					fieldname: "custom_html",
					fieldtype: "Option",
					html: "",
					custom: 1
				},
				{
					label: __("ID (name)"),
					fieldname: "name",
					fieldtype: "Data"
				},
				{
					label: __("Spacer"),
					fieldname: "spacer",
					fieldtype: "Spacer",
					custom: 1
				},
				{
					label: __("Divider"),
					fieldname: "divider",
					fieldtype: "Divider",
					custom: 1
				},
				...fields
			];
        }
    }
	}
</script>

<style scoped>

.label-itemsets {
	margin-bottom: 0;
	width:100%;
	text-align: center;
	font-weight: 400;
	line-height: 1.5;
	padding: 0.5rem 1rem;
	font-size: larger;
	color: var(--text-color);
	cursor:pointer;
}

.sidebar-label {
	justify-content: space-around;
	padding: 0 var(--padding-xs);
	border-bottom: 2px solid var(--gray-300);
}
.active {
	border-bottom: 4px solid var(--primary);
}
.layout-side-section {
	border-radius: var(--border-radius);
	border: 1px solid var(--gray-300);
	padding: 0 var(--padding-xs);
	margin-top: var(--margin-md);
}
.margin-controls {
	display: flex;
}

.form-control {
	background: var(--control-bg-on-gray);
}

.margin-controls > .form-group + .form-group {
	margin-left: 0.5rem;
}

.margin-controls > .form-group {
	margin-bottom: 0;
}

.field-label {
	display:flex;
	justify-content:space-between;
	text-align: center;
	width:100%;
	align-items: center;
}

.field {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: var(--text-sm);
	cursor: pointer;
}

.fieldtype_label {
	font-size: var(--text-xs);
	color : var(--gray-600)
}

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.sidebar-menu:last-child {
	margin-bottom: 0.5rem;
}

.control-font >>> .frappe-control[data-fieldname="font"] label {
	display: none;
}
</style>
