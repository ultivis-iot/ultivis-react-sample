import previewImage from './img/html.png';
import { HtmlConfigSchema, defaultValues } from './schema/htmlSchema';
import Html from './widget/Html';
import HtmlConfig from './config/HtmlConfig';

export default {
  id: 'html',
  label: 'HTML',
  description: 'Display custom HTML code',
  previewImage,
  component: Html,
  configComponent: HtmlConfig,
  schema: HtmlConfigSchema,
  defaultValues,
  data: {
    options: {
      noDeviceTarget: true,
      noNewWidgets: false,
      deviceTargetNotRequired: false,
      groupsSelectable: true,
    },
  },
};
