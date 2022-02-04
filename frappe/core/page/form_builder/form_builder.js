frappe.pages['form-builder'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Form Builder - Drag and Drop',
		single_column: true
	});
}