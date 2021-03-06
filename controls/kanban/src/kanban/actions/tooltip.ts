import { createElement, append, closest, addClass } from '@syncfusion/ej2-base';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Kanban } from '../base';
import * as cls from '../base/css-constant';

/**
 * Tooltip for Kanban board
 * @hidden
 */
export class KanbanTooltip {
    private parent: Kanban;
    public tooltipObj: Tooltip;

    /**
     * Constructor for tooltip module
     * @private
     */
    constructor(parent: Kanban) {
        this.parent = parent;
        this.renderTooltip();
    }

    private renderTooltip(): void {
        this.tooltipObj = new Tooltip({
            cssClass: this.parent.cssClass + ' ' + cls.TOOLTIP_CLASS,
            enableRtl: this.parent.enableRtl,
            mouseTrail: !this.parent.isAdaptive,
            offsetY: 5,
            position: 'BottomCenter',
            showTipPointer: true,
            target: '.' + cls.TOOLTIP_TEXT_CLASS,
            beforeRender: this.onBeforeRender.bind(this),
            beforeClose: this.onBeforeClose.bind(this)
        });
        this.tooltipObj.appendTo(this.parent.element);
        this.tooltipObj.isStringTemplate = true;
    }

    private onBeforeRender(args: TooltipEventArgs): void {
        if (this.parent.dragAndDropModule.isDragging) {
            args.cancel = true;
            return;
        }
        let tooltipContent: HTMLElement | string;
        if (this.parent.tooltipTemplate) {
            tooltipContent = createElement('div');
            let target: Element = closest(args.target, '.' + cls.CARD_CLASS);
            let data: { [key: string]: Object } = this.parent.getCardDetails(target) as { [key: string]: Object };
            let templateId: string = this.parent.element.id + '_tooltipTemplate';
            let tooltipTemplate: Element[] = this.parent.templateParser(
                this.parent.tooltipTemplate)(data, this.parent, 'tooltipTemplate', templateId, false);
            append(tooltipTemplate, tooltipContent);
            this.parent.renderTemplates();
        } else {
            tooltipContent = `<div class="e-card-header-caption">${args.target.innerText}</div>`;
        }
        this.tooltipObj.setProperties({ content: tooltipContent }, true);
    }

    private onBeforeClose(): void {
        this.parent.resetTemplates(['tooltipTemplate']);
    }

    public destroy(): void {
        this.tooltipObj.destroy();
        addClass([this.parent.element], 'e-control');
        this.tooltipObj = null;
    }

}
