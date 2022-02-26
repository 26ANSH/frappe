<template>
    <div class="layout-side-section">
        <div class="form-sidebar">
            <div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Fields") }}</div>
				<input
					class="mb-2 form-control form-control-sm"
					type="text"
					:placeholder="__('Search fields')"
					v-model="search_text"
				/>
				<draggable
					class="fields-container"
					:list="fields"
					:group="{ name: 'fields', pull: 'clone', put: true }"
					:sort="false"
				>
					<div
						class="field"
						v-for="df in fields"
						:key="df.fieldname"
						:title="df.fieldname"
					>
					<div title="Label" class="field-label btn btn-default btn-sm sidebar-field ellipsis">
						<span class="drag-handle">
							<svg class="icon icon-xs"><use xlink:href="#icon-drag"></use></svg>
						</span>
						{{ df.label }}
					</div>
					</div>
				</draggable>
			</div>
        </div>
    </div>
</template>


<script>
import draggable from "vuedraggable";

export default {
    name: "DoctypeFieldSet",
    data() {
		return {
			search_text: "",
		};
	},
	components: {
		draggable
	},
    computed: {
        fields() {
			// let fields = this.meta.fields
			let fields = [{label:"Email",fieldtype:"text"},{label:"Name",fieldtype:"text"}]
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
					fieldtype: "HTML",
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

.layout-side-section {
	border-radius: var(--border-radius);
	border: 1px solid var(--gray-400);
	padding: var(--padding-xs);
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


.field {
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

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.sidebar-menu:last-child {
	margin-bottom: 0;
}

.control-font >>> .frappe-control[data-fieldname="font"] label {
	display: none;
}
</style>
