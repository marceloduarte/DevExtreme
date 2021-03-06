/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ComponentBindings, JSXComponent, OneWay, Component, Fragment,
} from 'devextreme-generator/component_declaration/common';

import { LightButton } from '../common/light_button';
import { FullPageSize } from '../common/types.d';
import { PAGER_SELECTION_CLASS } from '../common/consts';
import PagerProps from '../common/pager_props';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EventCallback } from '../../common/event_callback.d';

export const PAGER_PAGE_SIZE_CLASS = 'dx-page-size';
export const PAGER_SELECTED_PAGE_SIZE_CLASS = `${PAGER_PAGE_SIZE_CLASS} ${PAGER_SELECTION_CLASS}`;

export const viewFunction = ({ pageSizesText }: PageSizeLarge) => (
  <Fragment>
    {
        pageSizesText.map(({
          text, className, label, click,
        }) => (
          <LightButton key={text} className={className} label={label} onClick={click}>
            {text}
          </LightButton>
        ))
    }
  </Fragment>
);
@ComponentBindings()
export class PageSizeLargeProps {
  @OneWay() pageSizes!: FullPageSize[];
}
type PageSizeLargePropsType = Pick<PagerProps, 'pageSize' | 'pageSizeChange'> & PageSizeLargeProps;
@Component({ defaultOptionRules: null, view: viewFunction })
export class PageSizeLarge extends JSXComponent<PageSizeLargePropsType, 'pageSizes'>() {
  get pageSizesText() {
    const { pageSize, pageSizes } = this.props;
    return pageSizes.map(({ value: processedPageSize, text }) => {
      const selected = processedPageSize === pageSize;
      const className = selected ? PAGER_SELECTED_PAGE_SIZE_CLASS : PAGER_PAGE_SIZE_CLASS;
      return {
        className,
        click: this.onPageSizeChange(processedPageSize),
        label: `Display ${processedPageSize} items on page`,
        text,
      };
    });
  }

  private onPageSizeChange(processedPageSize: number) {
    return () => { this.props.pageSize = processedPageSize; };
  }
}
