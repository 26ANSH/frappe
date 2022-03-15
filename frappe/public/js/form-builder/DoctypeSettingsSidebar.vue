<template>
	<div class="doctype-setting-sidebar">
		<div v-for="setting in doctypeSettings" :key="setting.fieldname">
			<div
				v-if="setting['fieldtype'] == 'Section Break'" class="sidebar-section-break">
				<hr/>
				<div v-if="setting['label']">
					{{ setting["label"] }}
				</div>
			</div>

			<div v-else class="form-group frappe-control input-max-width">
                
				<span v-if="setting['fieldtype'] == 'Check'" v-html="loadcheckbox(setting)">
                </span>

                <span v-else-if="setting['fieldtype'] == 'Link'" v-html="loadlink(setting)">
                </span>

				<span v-else-if="setting['fieldtype'] == 'Select'" v-html="loadlink(setting)">
                </span>

				<span v-else-if="setting['fieldtype'] == 'Data'" v-html="loadlink(setting)">
                </span>

				<span v-else>
					{{ setting["label"] }}
				</span>

			</div>
		</div>
	</div>
</template>

<script>
import doctypeFields from "./doctype.json";
export default {
	name: "DoctypeBuilder",
	data() {
		return {
			doctypeSettings: doctypeFields["fields"]
		};
	},
    methods : 
    {
        loadlink: function(setting)
        { 
            return `<div class="frappe-control input-max-width" data-fieldtype="Link" data-fieldname="` + setting["fieldname"] + `">				<div class="form-group">					<div class="clearfix">						<label class="control-label reqd" style="padding-right: 0px;">` + setting["label"] + `</label>					</div>					<div class="control-input-wrapper">						<div class="control-input"><div class="link-field ui-front" style="position: relative;">
			<div class="awesomplete">
			<input type="text" class="input-with-feedback form-control bold" maxlength="140" data-fieldtype="Link" data-fieldname="` + setting["fieldname"] + `" placeholder="" data-doctype="DocType" data-target="` + setting["options"] + `" autocomplete="off" aria-expanded="false" aria-owns="awesomplete_list_3" role="combobox"
			>
			<ul hidden="" role="listbox" id="awesomplete_list_3">
			</ul>
			
			<span class="visually-hidden" role="status" aria-live="assertive" aria-atomic="true">Begin typing for results.</span></div>
			<span class="link-btn">
				<a class="btn-open no-decoration" title="Open Link">
					<svg class="icon  icon-xs" style="">
			<use class="" href="#icon-arrow-right"></use>
		</svg>
				</a>
			</span>
		</div></div>						<div class="control-value like-disabled-input bold" style="display: none;"></div>						<p class="help-box small text-muted"></p>					</div>				</div>			</div>`
        },
        loadcheckbox: function(setting)
        {
            return  `<div class="checkbox">
            <label> 

            <span class="input-area">
            <input type="checkbox" autocomplete="off" class="input-with-feedback"/>
            </span>

			<span class="disp-area" style="display: none;">
            <input type="checkbox" disabled="" class="disabled-deselected"/>
            </span>

			<span class="label-area">` + setting["label"] + `</span>
			</label>
            
            <p class="help-box small text-muted">` + setting["description"] + `</p>
            </div>`
        
        },
		loaddata: function(setting){
			return `<div class="frappe-control input-max-width" data-fieldtype="Data" data-fieldname="` + setting["fieldname"] + `">				<div class="form-group">					<div class="clearfix">						<label class="control-label" style="padding-right: 0px;">` + setting["label"] + `</label>					</div>					<div class="control-input-wrapper">						
			<div class="control-input"><input type="text" autocomplete="off" class="input-with-feedback form-control" maxlength="140" data-fieldtype="Data" data-fieldname="` + setting["fieldname"] + `" placeholder="" data-doctype="DocType"></div>						<div class="control-value like-disabled-input" style="display: none;">undefined</div>						
			
			<p class="help-box small text-muted">
			` + setting["description"] + `
			</p>
			</div>
			</div>			
			</div>
			`
		},
		loadselect: function(setting){
			var options = `<option></option>`;


			for(o in setting['options'])
			{ 
				options += `<option value="`+o+`">`+o+`</option>`
			}


			return `
			<div class="frappe-control input-max-width" data-fieldtype="Select" data-fieldname="` + setting["fieldname"] + `">				
			<div class="form-group">					
			<div class="clearfix">						
			<label class="control-label" style="padding-right: 0px;">` + setting["label"] + `</label>
								
			</div>					
			<div class="control-input-wrapper">						
			<div class="control-input flex align-center">
			
			<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis" maxlength="40" data-fieldtype="Select" data-fieldname="` + setting["fieldname"] + `" placeholder="" data-doctype="DocType">
			`+ 
			options
			+`
			</select>
			
			<div class="select-icon ">
				<svg class="icon  icon-sm" style="">
			<use class="" href="#icon-select"></use>
		</svg>
			</div></div>						
			<div class="control-value like-disabled-input" style="display: none;"></div>
			<p class="help-box small text-muted"></p>
			</div>				
			</div>			
			</div>`
		}

    }
};
</script>

<style>
.doctype-setting-sidebar {
	position: fixed;
	width: 25%;
	height: calc(100vh - 140px);
	background: #fff;
	z-index: 9999;
	float: right;
	right: 0;

	overflow-x: hidden;
	overflow-y: auto;
	text-align: justify;

	padding: 10px 25px;

	display: none;
}

.sidebar-section-break
{
	margin-top: 20px;
	margin-bottom: 20px;
}


</style>
