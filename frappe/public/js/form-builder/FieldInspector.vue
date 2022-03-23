<template>
    <div>
        <div class="sidebar-menu-inspector">
			<span class="drag-handle" style="float:right">
				<svg class="icon icon-md"><use xlink:href="#icon-setting-gear"></use></svg>
			</span>
				<div class="sidebar-label">{{ __("Label") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<input
                                class="mb-2 form-control form-control-sm"
                                type="text"
                                :placeholder="__('Lable fieldname')"
								v-model='label'
                            />
						</div>
					</div>
				</div>
			</div>
            <div class="sidebar-menu-inspector">
				<div class="sidebar-label">{{ __("Fieldtype") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<select
								class="form-control form-control-sm"
								v-model='fieldtype'
							>
								<option
									v-for="options in data_fieldtypes"
									:value="options.value"
									:key="options.value">
									{{ options.value }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu-inspector">
				<div class="sidebar-label">{{ __("Name") }}</div>
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
			<div class="sidebar-menu-inspector">
				<div class="sidebar-label">{{ __("Length") }}</div>
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
			<div class="sidebar-menu-inspector">
				<div>
					<div class="control-input-wrapper">
						<div class="control-input checkbox">
							<input
                                class="mb-2 form-control form-control-sm"
                                type="checkbox"
                            />
							<div class="sidebar-label">{{ __("Mandatory") }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu-inspector">
				<div>
					<div class="control-input-wrapper">
						<div class="control-input checkbox">
							<input
                                class="mb-2 form-control form-control-sm"
                                type="checkbox"
                            />
							<div class="sidebar-label">{{ __("Index") }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu-inspector">
				<div class="sidebar-label">{{ __("Option") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<textarea class="mb-2 form-control form-control-sm"
                                type="text" height="150"></textarea>
						</div>
						<p class="help-box small text-muted">For Links, enter the DocType as range.\nFor Select, enter list of Options, each on a new line.</p>
					</div>
				</div>
			</div>
			
			<!-- <button class="btn btn-secondary btn-xs float-right">Save</button> -->
			
    </div>
</template>

<script>
import { bus } from './FormBuilder.vue'

export default {
    name: "FieldInspector",
	// props: ["field"],
	props : ["doctype"],
    data() {
        return {
            current_field: null
        };
    },
	created(){
		bus.$on('fieldchanged', (id) =>
		{ 
			this.current_field = id
		});
	},
    computed: {
        data_fieldtypes() {
			return [
				{ value: "Attach" },
				{ value: "Attach Image" },
				{ value: "Barcode" },
				{ value: "Button" },
				{ value: "Check" },
				{ value: "Code" },
				{ value: "Color" },
				{ value: "Column Break"},
				{ value: "Currency"},
				{ value: "Data"},
				{ value: "Date"},
				{ value: "Datetime"},
				{ value: "Duration"},
				{ value: "Dynamic Link"},
				{ value: "Float"},
				{ value: "Fold"},
				{ value: "Geolocation"},
				{ value: "Heading"},
				{ value: "HTML"},
				{ value: "HTML Editor"},
				{ value: "Icon"},
				{ value: "Image"},
				{ value: "Int"},
				{ value: "Link"},
				{ value: "Long Text"},
				{ value: "Markdown Editor"},
				{ value: "Password"},
				{ value: "Percent"},
				{ value: "Read Only"},
				{ value: "Rating"},
				{ value: "Section Break"},
				{ value: "Select"},
				{ value: "Signature"},
				{ value: "Small Text"},
				{ value: "Tab Break"},
				{ value: "Table"},
				{ value: "Table MultiSelect"},
				{ value: "Text"},
				{ value: "Text Editor"},
				{ value: "Time"}
			];
		},
		
		label:
		{ 
			get ()
			{
				if(this.current_field != null)
				{
					var field = this.doctype.fields[this.current_field];
					
					return field.label
				}
				else
				{ 
					return ''
				}
			},
			set(val)
			{ 
				if(this.current_field != null)
				{ 
					this.doctype.fields[this.current_field].label = val
				}
			}
		},

		fieldtype: 
		{ 
			get ()
			{
				if(this.current_field != null)
				{
					var field = this.doctype.fields[this.current_field];
					
					return field.fieldtype
				}
				else
				{ 
					return 'data'
				}
			},
			set(val)
			{ 
				if(this.current_field != null)
				{ 
					this.doctype.fields[this.current_field].fieldtype = val
				}
			}
		},


    }
};
</script>

<style scoped>

.sidebar-menu-inspector {
    margin: var(--margin-xs); 
}
.sidebar-label {
    color: var(--text-color);
    line-height: 1.5;
    font-weight: 400;
    font-size: var(--text-sm);
}
.checkbox {
	display:inline-flex;
}
.float-right {
	margin-left:auto;
	align-self: flex-end;
}
</style>