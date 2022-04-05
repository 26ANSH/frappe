import DoctypeFormBuilder from './FormBuilder.vue';
import { getStore } from "./store";

class FormBuilder {
    constructor({ wrapper, page, doctype_format }) {
        this.$wrapper = $(wrapper);
		this.page = page;
		this.doctype_format = doctype_format;

		this.page.clear_actions();
		this.page.clear_icons();
		this.page.clear_custom_actions();

		this.page.set_title(__("Editing {0}", [this.doctype_format.name]));
		
		this.page.set_primary_action(__("Save"), function() {
			this.$component.$store.save_changes();
		});
		
		// this.page.set_secondary_action(__("settings"), function() {
		// 	$(".doctype-setting-sidebar").toggle();
		// });
		
		let $toggle_preview_btn = this.page.add_button(
			__("Show Preview"),
			() => {
				this.$component.toggle_preview();
			}
		);
		
		let $reset_changes_btn = this.page.add_button(__("Reset Changes"), () =>
			this.$component.$store.reset_changes()
		);

		this.page.add_menu_item(__("Doctype Settings"), () => {
			frappe.set_route("App", "Doctype", this.doctype_format);
		});
		this.page.add_menu_item(__("Change Doctype"), () => {
			frappe.set_route("doctype");
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
		let store = getStore(this.doctype_format.name);
		store.$watch("dirty", value => {
			console.log("Dirty status :",value);
			if (value) {
				this.page.set_indicator("Not Saved", "orange");
				$toggle_preview_btn.hide();
				$reset_changes_btn.show();
			} else {
				this.page.clear_indicator();
				$toggle_preview_btn.show();
				$reset_changes_btn.hide();
			}
		});
		this.$component.$watch("show_preview", value => {
			$toggle_preview_btn.text(
				value ? __("Hide Preview") : __("Show Preview")
			);
		});
    }

}

frappe.provide("frappe.ui");
frappe.ui.FormBuilder = FormBuilder;
export default FormBuilder;