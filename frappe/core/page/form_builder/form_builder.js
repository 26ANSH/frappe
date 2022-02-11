frappe.pages['form-builder'].on_page_load = function(wrapper) {
	frappe.form_builder = new frappe.FormBuilder(wrapper);
	frappe.breadcrumbs.add("Setup", "Form Builder");
	
}

frappe.pages['form-builder'].on_page_show = function(wrapper) {
	var route = frappe.get_route();   // Get the route
	if(route.length>1) {
		frappe.form_builder.doctype_format = frappe.get_doc('DocType',route[1]);
		frappe.form_builder.refresh();
	} else if(frappe.route_options) {
		// MAke a new doctype option
		console.log("Frappe route option")
	}
}


frappe.FormBuilder = class FormBuilder {
	constructor(parent) {
		this.parent = parent;
		this.make();
		this.refresh();
	}

	make() {
		this.page = frappe.ui.make_app_page({
			parent: this.parent,   // Parent is set to wrapper
			title: 'Form Builder',
		});
		this.page.main.css({"border-color": "transparent"});
		const save_form_builder = () =>{
			console.log("Saving data ....");
		}
	
		const add_new_field = () =>{
			console.log("Adding a new field");
		}
		let $btn_save = this.page.set_primary_action('Save', () => save_form_builder(), 'octicon octicon-plus')
		let $btn_add_new = this.page.set_secondary_action('Add field', () => add_new_field(), 'octicon octicon-sync')

		this.page.sidebar = $('<div class="print-format-builder-sidebar"></div>').appendTo(this.page.sidebar);
		this.page.main = $('<div class="col-md-12 border print-format-builder-main frappe-card"></div>').appendTo(this.page.main);
	}

	refresh() {
		this.custom_html_count = 0;
		if(!this.doctype_format){
			this.show_start();
		}
		else{
			this.page.set_title(this.doctype_format.name);
			//this.setup_form_format();
		}
	}

	show_start(){
		// Select a new Doctype or Create a new one
		this.page.main.html(frappe.render_template("form_builder_start", {}));
		this.page.clear_actions();
		this.page.set_title(__("Form Builder"));
		this.edit_existing_form_doctype();
	}

	// Users can select a doctype to start with Drag-Drop form builder
	edit_existing_form_doctype(){
		var me = this;
		this.doctype_format_input = frappe.ui.form.make_control({
			parent: this.page.main.find(".doctype-format-selector"),
			df: {
				fieldtype: "Link",
				options: "DocType",
				filters: {
					read_only: 0
				},
				label: __("Select DocType to Edit"),
				only_select: true
			},
			render_input: true
		});

		// create a new print format.
		this.page.main.find(".btn-edit-existing-format").on("click", function() {
			var name = me.doctype_format_input.get_value();
			if(!name) return;
			frappe.model.with_doc("DocType", name, function(doc) {
				frappe.set_route('form-builder', name);
			});
		});
	}

	setup_form_builder_format() {
		this.page.clear_actions();
		this.page.set_title(__("Form Builder"));
	}
	set_breadcrumbs() {
		frappe.breadcrumbs.add("Setup", this.doctype);
	}
}

