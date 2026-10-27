import ResourceBundle from "sap/base/i18n/ResourceBundle";
import List from "sap/m/List";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Component from "../Component";
import SearchField from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import FilterType from "sap/ui/model/FilterType";

/**
 * @namespace ui5.tutorial.odatav4.controller
 */
export default class App extends Controller {

	/**
	 *  Hook for initializing the controller
	 */
	onInit(): void {
		const jsonData = {
			busy: false
		};
		const model = new JSONModel(jsonData);

		this.getView().setModel(model, "appView");
	}
	onRefresh(): void {
		const binding = (this.byId("peopleList") as List).getBinding("items") as ODataListBinding;

		if (binding.hasPendingChanges()) {
			MessageBox.error(this._getText("refreshNotPossibleMessage"));
			return;
		}
		binding.refresh();
		MessageToast.show(this._getText("refreshSuccessMessage"));
	}

	onSearch() {
		const view = this.getView();
		const value = (view.byId("searchField") as SearchField).getValue();
		const filter = new Filter({
			path: "LastName",
			operator: FilterOperator.Contains,
			value1: value,
		});

		((view.byId("peopleList") as List).getBinding("items") as ODataListBinding).filter(filter, FilterType.Application);
	}

	/* =========================================================== */
	/*           end: event handlers                               */
	/* =========================================================== */

	/**
	 * Convenience method for retrieving a translatable text.
	 * @param sTextId - the ID of the text to be retrieved.
	 * @param aArgs - optional array of texts for placeholders.
	 * @returns the text belonging to the given ID.
	 */
	_getText(textId: string, args?: unknown[]): string {
		const bundle = ((this.getOwnerComponent() as Component).getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;
		return bundle.getText(textId, args as string[]);
	}

}
