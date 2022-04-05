import { create_default_layout } from "../print_format_builder/utils";

let stores = {};

export function getStore(doctype_name) {
    if(stores[doctype_name]) {
        return stores[doctype_name];
    }

    let options = {
        data() {
            return {
                doctype_name,
                doctype: null,
                meta: null,
                layout: null,
                dirty: false,
                response: null,
            };
        },
        watch: {
            layout: {
                deep: true,
                handler() {
                    this.dirty = true;
                }
            },
            doctype: {
                deep: true,
                handler() {
                    this.dirty = true;
                }
            }
        },
        methods: {
            fetch() {
                return new Promise(resolve => {
                    frappe.model.clear_doc(
                        "DocType",
                        this.doctype_name
                    );

                    frappe.model.with_doc(
                        "DocType",
                        this.doctype_name,
                        () => {
                            let doctype = frappe.get_doc(
                                "DocType",
                                this.doctype_name
                            );
                            this.meta = frappe.get_meta(
                                doctype
                            );
                            this.doctype = doctype;
                            this.layout = this.get_layout();
                            this.$nextTick(() => (this.dirty = false));
                            resolve();
                        }
                    )
                })
            },
            update({ fieldname, value}) {
                this.$set(this.doctype, fieldname, value);
            },
            save_changes() {
                frappe.dom.freeze(__("Saving..."));
                this.doctype.fields = this.layout;
                frappe
                    .call("frappe.client.save", {
                        doc: this.doctype
                    })
                    .then(() => this.fetch())
					.always(() => {
						frappe.dom.unfreeze();
						this.$emit("after_save");
					});
            },
            reset_changes() {
                this.fetch();
            },
            get_layout() {
                if (this.doctype) {
                    return this.doctype.fields;
                }
                return null;
            },
            get_default_layout() {
                return doctype.fields;
            }
        }
    };
    stores[doctype_name] = new Vue(options);
	return stores[doctype_name];
}

export let storeMixin = {
	inject: ["$store"],
	computed: {
		doctype_builder() {
			return this.$store.doctype;
		},
        layout() {
            return this.$store.layout;
        },
		meta() {
			return this.$store.meta;
		}
	}
};
