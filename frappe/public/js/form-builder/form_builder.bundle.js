import DoctypeFormBuilder from './FormBuilder.vue';
frappe.provide("frappe.ui");

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
			console.log(doctype_format)
			console.log("Save ---");
		});
		
		this.page.set_secondary_action(__("settings"), function() {
			$(".doctype-setting-sidebar").toggle();
		});

		
		let $vm = new Vue({
			el: this.$wrapper.get(0),
			render: h =>
				h(DoctypeFormBuilder, {
					props: {
						doctype_meta: doctype_format
					}
				})
		});
		this.layout = frappe.ui.Split(['.left-side', '.center-side', '.right-side'], {
			sizes: [25, 50, 25],
			minSize: [250, 400, 250],
			snapOffset: 5,
			gutterSize: 4,
			cursor: 'col-resize'
		});
		this.$component = $vm.$children[0];
    }
}

frappe.provide("frappe.ui");
frappe.ui.FormBuilder = FormBuilder;
export default FormBuilder;