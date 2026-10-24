import type {SuiteConfiguration} from "sap/ui/test/starter/config";
export default {
	name: "QUnit test suite for the UI5 Application: com.odata.myorg",
	defaults: {
		page: "ui5://test-resources/com/odata/myorg/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: ["com/odata/myorg/"],
			never: ["test-resources/com/odata/myorg/"]
		},
		loader: {
			paths: {
				"com/odata/myorg": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.odata.myorg"
		},
		"integration/opaTests": {
			title: "Integration tests for com.odata.myorg"
		}
	}
} satisfies SuiteConfiguration;