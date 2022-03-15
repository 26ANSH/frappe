import FormBuilderComponent from './FormBuilder.vue';

class FormBuilder {
    constructor({ wrapper, page, doctype_format }) {
        this.$wrapper = $(wrapper);
		this.page = page;
		this.doctype_format = doctype_format;

		// this.page.clear_actions();
		// this.page.clear_icons();
		// this.page.clear_custom_actions();

		this.page.set_title(__("Editing {0}", [this.doctype_format.name]));
		
		this.page.set_primary_action(__("Save"), function() {
			//me.save_doctype_format();
			console.log("Save ---");
		});
		
		this.page.set_secondary_action(__("settings"), function() {
			$(".doctype-setting-sidebar").toggle();
		});

		let $vm = new Vue({
			el: this.$wrapper.get(0),
			render: h =>
				h(FormBuilderComponent, {
					props: {
						doctype_format_name: doctype_format,
					}
				})
		});
		this.$component = $vm.$children[0];
    }
}

frappe.provide("frappe.ui");
frappe.ui.FormBuilder = FormBuilder;
export default FormBuilder;