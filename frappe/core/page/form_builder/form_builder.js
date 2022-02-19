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
		this.create_new_doctype();
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

	// Users can create a very new Doctype
	create_new_doctype(){
		var me = this;
		this.doctype_name_input = frappe.ui.form.make_control({
			parent: this.page.main.find(".doctype-selector"),
			df: {
				fieldtype: "Data",
				label: __("Enter the name for Doctype"),
				reqd:1
			},
			render_input: true
		});

		this.doctype_module_selection = frappe.ui.form.make_control({
			parent: this.page.main.find(".doctype-module-selector"),
			df: {
				fieldtype: "Link",
				options: "DocType",
				filters: {
					read_only: 0     // CHECK THIS
				},
				label: __("Select Module"),
				only_select: true,
				reqd:1
			},
			render_input: true
		});
		
		this.doctype_is_submittable = frappe.ui.form.make_control({
			parent: this.page.main.find(".check-submittable"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable",
				description: "Once submitted, submittable documents cannot be changed. They can only be Cancelled and Amended.",
				fieldname: "is_submittable",
				fieldtype: "Check",
				label: "Is Submittable"
			},
			render_input: true
		});

		this.doctype_is_child = frappe.ui.form.make_control({
			parent: this.page.main.find(".check-child-table"),
			df: {
				default: 0,
				description: "Child Tables are shown as a Grid in other DocTypes",
				fieldname: "istable",
				fieldtype: "Check",
				in_standard_filter: 1,
				label: "Is Child Table",
				oldfieldname: "istable",
				oldfieldtype: "Check"
			},
			render_input: true
		});

		this.doctype_is_single = frappe.ui.form.make_control({
			parent: this.page.main.find(".check-is-single"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable",
				description: "Single Types have only one record no tables associated. Values are stored in tabSingles",
				fieldname: "issingle",
				fieldtype: "Check",
				in_standard_filter: 1,
				label: "Is Single",
				oldfieldname: "issingle",
				oldfieldtype: "Check",
				set_only_once: 1
			},
			render_input: true
		});

		this.doctype_is_tree = frappe.ui.form.make_control({
			parent: this.page.main.find(".check-is-tree"),
			df: {
				default: 0,
				description: "Tree structures are implemented using Nested Set",
				fieldname: "is_tree",
				fieldtype: "Check",
				label: "Is Tree"
			},
			render_input: true
		});

		this.doctype_quick_entry = frappe.ui.form.make_control({
			parent: this.page.main.find(".check-quick-entry"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable && !doc.issingle",
				description: "Open a dialog with mandatory fields to create a new record quickly",
				fieldname: "quick_entry",
				fieldtype: "Check",
				label: "Quick Entry"
			},
			render_input: true
		});

		// For Right hand side checkboxes
		this.doctype_track_changes = frappe.ui.form.make_control({
			parent: this.page.main.find(".track-changes"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable",
				description: "If enabled, changes to the document are tracked and shown in timeline",
				fieldname: "track_changes",
				fieldtype: "Check",
				label: "Track Changes"
			},
			render_input: true
		});

		this.doctype_track_seen = frappe.ui.form.make_control({
			parent: this.page.main.find(".track-seen"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable",
				descriptions: "If enabled, the document is marked as seen, the first time a user opens it",
				fieldname: "track_seen",
				fieldtype: "Check",
				label: "Track Seen"
			},
			render_input: true
		});

		this.doctype_track_views = frappe.ui.form.make_control({
			parent: this.page.main.find(".track-views"),
			df: {
				default: 0,
				depends_on: "eval:!doc.istable",
				description: "If enabled, document views are tracked, this can happen multiple times",
				fieldname: "track_views",
				fieldtype: "Check",
				label: "Track Views"
			},
			render_input: true
		});

		this.doctype_custom_check = frappe.ui.form.make_control({
			parent: this.page.main.find(".custom-checkbox-tracks"),
			df: {
				default: 0,
				fieldname: "custom",
				fieldtype: "Check",
				label: "Custom?"
			},
			render_input: true
		});

		this.doctype_beta_check = frappe.ui.form.make_control({
			parent: this.page.main.find(".beta-checkbox"),
			df: {
				default: 0,
				fieldname: "beta",
				fieldtype: "Check",
				label: "Beta"
			},
			render_input: true
		});

		// Creating new Doctype
		this.page.main.find(".btn-new-doctype-format").on("click", function() {
			var doctype_name= me.doctype_name_input.get_value(),
				module = me.doctype_module_selection.get_value();
				var doctype_settings={
					is_submittable : me.doctype_is_submittable.get_value(),
					is_child : me.doctype_is_child.get_value(),
					is_single : me.doctype_is_single.get_value(),
					is_tree : me.doctype_is_tree.get_value(),
					quick_entry : me.doctype_quick_entry.get_value(),
					track_changes : me.doctype_track_changes.get_value(),
					track_seen : me.doctype_track_seen.get_value(),
					track_views : me.doctype_track_views.get_value(),
					custom : me.doctype_custom_check.get_value(),
					beta : me.doctype_beta_check.get_value()
				}
			if(!(doctype_name && module)) {
				frappe.msgprint(__("Both DocType Name and Module required"));
				return;
			}
			me.setup_new_form_builder(doctype_name, module,doctype_settings);

		});
	}

	setup_new_form_builder(doctype_name, module,settings,based_on,beta){
		frappe.call({
			method: 'frappe.core.page.form_builder.form_builder.create_custom_new_doctype',
			args: {
				doctype : doctype_name,
				module : module,
				settings : settings,
				based_on : based_on,
				beta : Boolean(beta)
			},
			callback: (resp) => {
				if (resp.message) {
					let doc_form_builder = resp.message;
					if (print_format.print_format_builder_beta) {
						frappe.set_route('print-format-builder-beta', print_format.name);
					} else {
						this.print_format = print_format;
						this.refresh();
					}
				}
			}
		})
	}

	setup_form_builder_format() {
		this.page.clear_actions();
		this.page.set_title(__("Form Builder"));
	}
	set_breadcrumbs() {
		frappe.breadcrumbs.add("Setup", this.doctype);
	}
}

