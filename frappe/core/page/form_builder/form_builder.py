import frappe
import json

@frappe.whitelist()
def create_custom_new_doctype(doctype, module,settings, based_on='Standard', beta=False):
	settings = json.loads(settings)
	doc = frappe.new_doc('DocType')
	doc.name = doctype
	doc.module = module
	
	doc.issingle = settings["is_single"]
	doc.is_tree = settings['is_tree']
	doc.track_changes = settings['track_changes']
	doc.track_seen = settings['track_seen']
	doc.is_submittable = settings['is_submittable']
	doc.quick_entry = settings['quick_entry']
	doc.track_views = settings['track_views']
	doc.custom = settings['custom']
	doc.owner = frappe.session.user
	doc.docstatus= 0

	beta = frappe.parse_json(beta)

	if beta:
		doc.beta = 1
	else:
		doc.beta = 0

	doc.insert(ignore_permissions=True)
	return doc
