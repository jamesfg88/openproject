import {WorkPackageEditForm} from '../../../wp-edit-form/work-package-edit-form';
import {locateRow} from '../../helpers/wp-table-row-helpers';
import {WorkPackageTable} from '../../wp-fast-table';
import {WorkPackageTableRow} from '../../wp-table.interfaces';
import {SingleRowBuilder} from './single-row-builder';
import {QueryColumn} from '../../../api/api-v3/hal-resources/query-resource.service';

export class EditingRowBuilder extends SingleRowBuilder {

  /**
   * Refresh a row that is currently being edited, that is, some edit fields may be open
   */
  public refreshEditing(row:WorkPackageTableRow, editForm:WorkPackageEditForm):HTMLElement|null {
    // Get the row for the WP if refreshing existing
    const rowElement:HTMLElement|null = row.element || locateRow(row.workPackageId);
    if (!rowElement) {
      return null;
    }

    // Detach all existing columns
    let tds = jQuery(rowElement).find('td').detach();

    // Iterate all columns, reattaching or rendering new columns
    this.columns.forEach((column:QueryColumn) => {
      let oldTd = tds.filter(`td.${column}`);

      // Reattach the column if its currently being edited
      if (editForm.activeFields[column.id] && oldTd.length) {
        rowElement.appendChild(oldTd[0]);
      } else {
        this.buildCell(row.object, column, rowElement);
      }
    });

    return rowElement;
  }
}
