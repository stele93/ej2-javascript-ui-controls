/**
 * Pivot Field List Slicer with groupingbar Sample
 */

import { IDataSet } from '../../../src/base/engine';
import { pivot_dataset } from '../../../spec/base/datasource.spec';
import { PivotView } from '../../../src/pivotview/base/pivotview';
import { PivotFieldList } from '../../../src/pivotfieldlist/base/field-list';
import { CalculatedField } from '../../../src/common/calculatedfield/calculated-field';
import { GroupingBar } from'../../../src/common/grouping-bar/grouping-bar';

PivotView.Inject(GroupingBar);
PivotFieldList.Inject(CalculatedField);
let pivotGridObj: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlist) {
            fieldlist.update(pivotGridObj);
        }
    },
    width: '99%',
    height: 530,
    showGroupingBar:true,
    gridSettings: { columnWidth: 140 }
});
pivotGridObj.appendTo('#PivotView');
let fieldlist: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        dataSource: pivot_dataset as IDataSet[],
        expandAll: false,
        enableSorting: true,
        sortSettings: [{ name: 'company', order: 'Descending' }],
        calculatedFieldSettings: [{ name: 'price', formula: '(("Sum(balance)"*10^3+"Count(quantity)")/100)+"Sum(balance)"' },
        { name: 'total', formula: '"Sum(balance)"+"Sum(quantity)"' }],
        filterSettings: [
            { name: 'eyeColor', type: 'Include', items: ['blue'] }],
        rows: [{ name: 'product'}, { name: 'state' }],
        columns: [{ name: 'gender' }],
        values: [{ name: 'balance' }, { name: 'price', type: 'CalculatedField' },
        { name: 'quantity' }], 
        filters: [{ name: 'eyeColor' }]
    },
    showValuesButton: true,
    enginePopulated: (): void => {
        fieldlist.updateView(pivotGridObj);
    },
    allowCalculatedField: true,
    renderMode: 'Fixed'
});
fieldlist.appendTo('#FieldList');
